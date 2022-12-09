import {NextFunction, Request, Response} from "express";
import {CreationAttributes, ForeignKey, IncludeOptions, InferAttributes} from "sequelize";
import User, {UserModel} from "../models/User/user.model"
import {ApiError} from "../error/api.error";
import bcrypt from "bcrypt";
import Center, {CenterModel} from "../models/center.model";
import Role, {RoleModel} from "../models/User/role.model";
import generateJwt, {UserToken} from "../middlewares/generateJwt";
import UserRole, {UserRoleModel} from "../models/User/userRole.model";
import {validatePassword} from "../helpers/validation";

export const registration = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, password, name, centerName, description, layout } = req.body;

        if (!email || !password) {
            return next(ApiError.badRequest('Please provide email and password'));
        }
        const candidate = await User.findOne({where: {email}});
        if (candidate) {
            return next(ApiError.badRequest('UserModel with this email already exists'));
        }
        const centerInsertData: CreationAttributes<CenterModel> = {
            name: centerName,
            description: description,
        }
        const center = await Center.create({...centerInsertData});

        const hashPassword = await bcrypt.hash(password, 5);
        const userInsertData: CreationAttributes<UserModel> = {
            name: name,
            email: email,
            password: hashPassword,
            centerId: center.id
        };
        const user = await User.create({...userInsertData });

        const roleInsertData: CreationAttributes<RoleModel> = {
            name: process.env.SUPER_ADMIN_ROLE as string,
            centerId: center.id
        };

        await Role.findOrCreate({
            where: {...roleInsertData},
        });

        const role = await Role.findOne({
            where: {...roleInsertData}
        })


        const userRoleInsertData: CreationAttributes<UserRoleModel> = {
            userId: user.id,
            roleId: role ? role.id : undefined,
            centerId: center.id
        };
        await UserRole.create({...userRoleInsertData });

        const insertUserJwt: UserToken = {
            id: user.id,
            email: user.email,
            role: roleInsertData.name,
            layout: layout,
            center: center.id
        }
        const token = generateJwt(insertUserJwt);

        return res.json(token);
    } catch (e:any) {
        return res.status(404).json(e.message)
    }
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, password, centerId} = req.body;

        if (!email || !password) {
            return next(ApiError.badRequest('Please  provide email and password'));
        }
        const candidate = await User.findOne({where: {email}});
        if (candidate) {
            return next(ApiError.badRequest('UserModel with this email already exists'));
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const userInsertData: CreationAttributes<UserModel> = {
            email: email,
            password: hashPassword,
            centerId: centerId
        };
        const user = await User.create({...userInsertData});

        return res.json(user)
    } catch (e:any) {
        return res.status(404).json(e.message)
    }
}


export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({
            where: {email},
            include: { model: Role }
        });

        if (!user) {
            return next(ApiError.internal('User with this email not found'));
        }

        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return next(ApiError.internal('Not valid password'));
        }

        const insertUserJwt: UserToken = {
            id: user.id,
            email: user.email,
            role: user.roles ? user.roles[0].name : "",
            layout: user.layout,
            center: user.centerId
        }
        const token = generateJwt(insertUserJwt);

        return res.json(token);
    } catch (e:any) {
        return res.status(404).json(e.message)
    }
}

export const updateUser = async (req: Request<{id: string}>, res: Response) => {
    try {
        const {name, email, password, img, phone, layout} = req.body;
        const id = req.params.id;

        validatePassword(password);

        const hashPassword = await bcrypt.hash(password, 5);

        const userUpdateData: CreationAttributes<UserModel> = {
            name: name,
            email: email,
            password: hashPassword,
            img: img,
            phone: phone,
            layout: layout
        };

        const user = await User.update({...userUpdateData}, {where: {id}, returning: true});

        return res.json(user);
    } catch (e:any) {
        return res.status(404).json(e.message)
    }
}



export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll({
            include: {model: Role},
            attributes: {
                exclude: ['password']
            }
        });

        return res.json(users);
    } catch (e:any) {
        return res.status(404).json(e.message)
    }
}

export const getOneUser = async (req: Request<{id: string}>, res: Response) => {
    try {
        const id = req.params.id;
        const users = await User.findOne({
            where: {id},
            include: {model: Role},
            attributes: {
                exclude: ['password']
            }
        });

        return res.json(users);
    } catch (e:any) {
        return res.status(404).json(e.message)
    }
}
