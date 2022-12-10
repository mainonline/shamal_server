import {NextFunction, Request, Response} from "express";
import {CreationAttributes, Sequelize, Transaction} from "sequelize";
import User, {UserModel} from "../models/User/user.model"
import {ApiError} from "../error/api.error";
import bcrypt from "bcrypt";
import Center, {CenterModel} from "../models/center.model";
import Role, {RoleModel} from "../models/User/role.model";
import {generateAccessToken, generateRefreshToken, UserAccessToken, UserToken} from "../helpers/token.helper";
import UserRole, {UserRoleModel} from "../models/User/userRole.model";
import {validatePassword} from "../helpers/validation";
import jwt from "jsonwebtoken";

export const registration = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, password, name, centerName, description, layout } = req.body;

        if (!email || !password) {
            return next(ApiError.badRequest('Please provide email and password'));
        }
        validatePassword(password);

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

        let roleInfo:string[] = [];
        roleInfo.push(roleInsertData.name);

        const userRoleInsertData: CreationAttributes<UserRoleModel> = {
            userId: user.id,
            roleId: role ? role.id : undefined,
            centerId: center.id
        };
        await UserRole.create({...userRoleInsertData });

        const insertUserJwt: UserToken = {
            id: user.id,
            email: user.email,
            roles: roleInfo,
            layout: layout,
            center: center.id
        }

        const insertUserJwtAccess: UserAccessToken = {
            email: user.email,
        }
        const refreshToken = generateRefreshToken(insertUserJwt);
        const accessToken = generateAccessToken(insertUserJwtAccess);

        return res.send({accessToken, refreshToken});
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
            roles: user.roles ? user.roles : [],
            layout: user.layout,
            center: user.centerId
        }
        const insertUserJwtAccess: UserAccessToken = {
            email: user.email,
        }
        const refreshToken = generateRefreshToken(insertUserJwt);
        const accessToken = generateAccessToken(insertUserJwtAccess);

        return res.send({accessToken, refreshToken});
    } catch (e:any) {
        return res.status(404).json(e.message)
    }
}


export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, password, roles } = req.body;

        if (!email || !password) {
            return next(ApiError.badRequest('Please  provide email and password'));
        }
        validatePassword(password);

        const candidate = await User.findOne({where: {email}});
        if (candidate) {
            return next(ApiError.badRequest('UserModel with this email already exists'));
        }


        let token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({message: "Not authorized"});
        const decoded = <UserToken>jwt.verify(token, process.env.REFRESH_SECRET_KEY as string);

        const hashPassword = await bcrypt.hash(password, 5);
        const userInsertData: CreationAttributes<UserModel> = {
            email: email,
            password: hashPassword,
            centerId: decoded.center
        };
        const user = await User.create({...userInsertData});

        if (roles) {
            await Promise.all(
                roles.map(async (roleName:string) => {
                    await Role.findOrCreate({
                        where: {name: roleName, centerId: decoded.center},
                    });

                    const role = await Role.findOne({
                        where: {name: roleName, centerId: decoded.center}
                    });

                    await UserRole.create({
                        userId: user.id,
                        roleId: role ? role.id : undefined,
                        centerId: decoded.center
                    });
                })
            )
        }

        return res.json(user)
    } catch (e:any) {
        return res.status(404).json(e.message)
    }
}


export const updateUser = async (req: Request<{id: string}>, res: Response) => {
    try {
        const {name, email, password, img, phone, layout, roles, centerId} = req.body;
        const id = req.params.id;

        validatePassword(password);

        const hashPassword = await bcrypt.hash(password, 5);

        const userUpdateData: CreationAttributes<UserModel> = {
            name: name,
            email: email,
            password: hashPassword,
            img: img,
            phone: phone,
            layout: layout,
        };

        const user = await User.update({...userUpdateData}, {where: {id}, returning: true});


        if (roles) {
            await Promise.all(
                roles.map(async (roleName:string) => {
                    await Role.findOrCreate({where: {name: roleName, centerId: centerId}});
                    const foundRole = await Role.findOne({where: {name: roleName, centerId: centerId}});
                    await UserRole.findOrCreate({
                        where: {userId: id, roleId: foundRole ? foundRole.id : undefined, centerId: centerId}
                    });
                })
            )
        }

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


export const deleteUser = async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        let token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({message: "Not authorized"});
        const decoded = <UserToken>jwt.verify(token, process.env.REFRESH_SECRET_KEY as string);

        if (decoded.id === parseInt(id)) {
            return next(ApiError.badRequest('Can not delete own account'));
        }

        const user = await User.findOne({
            where: {id}
        });

        if (!user) {
            return next(ApiError.badRequest('User with this id not found'));
        }
        await User.destroy({
            where: {id},
        });

        await UserRole.destroy({where: {userId: id}})

        return res.status(200).json({message: "deleted"});
    } catch (e:any) {
        return res.status(404).json(e.message)
    }
}