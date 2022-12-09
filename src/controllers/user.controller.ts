import {NextFunction, Request, Response} from "express";
import { CreationAttributes, IncludeOptions, InferAttributes } from "sequelize";
import User, {UserModel} from "../models/User/user.model"
import {ApiError} from "../error/api.error";
import bcrypt from "bcrypt";
import Center, {CenterModel} from "../models/center.model";
import Role, {RoleModel} from "../models/User/role.model";
import generateJwt, {UserToken} from "../middlewares/generateJwt";
import {roleCheck} from "../middlewares/role.middleware";
import UserRole from "../models/User/userRole.model";

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

        const hashPassword = await bcrypt.hash(password, 5);
        const userInsertData: CreationAttributes<UserModel> = {
            name: name,
            email: email,
            password: hashPassword,
        };
        const user = await User.create({...userInsertData });

        const centerInsertData: CreationAttributes<CenterModel> = {
            name: centerName,
            description: description,
            userId: user.id
        }
        const center = await Center.create({...centerInsertData});

        const roleInsertData: CreationAttributes<RoleModel> = {
            name: process.env.SUPER_ADMIN_ROLE as string,
            centerId: center.id
        };

        const role = await Role.findOrCreate({
            where: {...roleInsertData},
        });

        const insertUserJwt: UserToken = {id: user.id, email: user.email, role: roleInsertData.name, layout: layout}
        const token = generateJwt(insertUserJwt);

        return res.json(token);
    } catch (e:any) {
        return res.status(404).json(e.message)
    }
}

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.findAll({
            include: {model: UserRole}
        });


        return res.json(users);
    } catch (e:any) {
        return res.status(404).json(e.message)
    }
}
