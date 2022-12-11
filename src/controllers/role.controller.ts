import {NextFunction, Request, Response} from "express";
import {CreationAttributes, where} from "sequelize";
import {UserToken} from "../helpers/token.helper";
import jwt from "jsonwebtoken";
import Role, {RoleModel} from "../models/User/role.model";
import UserRole from "../models/User/userRole.model";

export const createRole = async (req: Request, res: Response) => {
    try {
        const {name} = req.body;

        let token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({message: "Not authorized"});
        const decoded = <UserToken>jwt.verify(token, process.env.REFRESH_SECRET_KEY as string);

        const roleInsertData: CreationAttributes<RoleModel> = {
            name: name,
            centerId: decoded.center
        };

        const role = await Role.create({...roleInsertData});

        return res.json(role);
    } catch (e:any) {
        return res.status(404).json(e.message)
    }
}

export const updateRole = async (req: Request, res: Response) => {
    try {
        const {name} = req.body;
        const id = req.params.id;

        let token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({message: "Not authorized"});
        const decoded = <UserToken>jwt.verify(token, process.env.REFRESH_SECRET_KEY as string);

        const foundSameRole = await Role.findOne({where: {name: name}});

        if (foundSameRole) {
            return res.status(404).json({message: "The role with provided name already exist"});
        }

        const roleUpdateData: CreationAttributes<RoleModel> = {
            name: name,
            centerId: decoded.center
        };

        const role = await Role.update({...roleUpdateData},{where: {id}, returning: true});

        return res.json(role);
    } catch (e:any) {
        return res.status(404).json(e.message)
    }
}

export const getAllRoles = async (req: Request, res: Response) => {
    try {
        let token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({message: "Not authorized"});
        const decoded = <UserToken>jwt.verify(token, process.env.REFRESH_SECRET_KEY as string);

        const roles = await Role.findAll({where: {centerId: decoded.center}});

        return res.json(roles);
    } catch (e:any) {
        return res.status(404).json(e.message)
    }
}

export const getRole = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        let token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({message: "Not authorized"});
        const decoded = <UserToken>jwt.verify(token, process.env.REFRESH_SECRET_KEY as string);

        const role = await Role.findOne({where: {id: id, centerId: decoded.center}});

        return res.json(role)
    } catch (e:any) {
        return res.status(404).json(e.message)
    }
}

export const deleteRole = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        let token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({message: "Not authorized"});
        const decoded = <UserToken>jwt.verify(token, process.env.REFRESH_SECRET_KEY as string);

        await Role.destroy({where: {id: id, centerId: decoded.center}});
        await UserRole.destroy({where: {roleId: id, centerId: decoded.center}});

        return res.status(200).json({message: "deleted"});
    } catch (e:any) {
        return res.status(404).json(e.message)
    }
}