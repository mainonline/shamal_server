import jwt from "jsonwebtoken";
import {NextFunction, Request, Response} from "express";
import {UserToken} from "../helpers/token.helper";


export const roleCheck = (role: string) => {

    return function (req: Request, res: Response, next: NextFunction) {
        if (req.method === "OPTIONS") next();

        try {
            let token = req.headers.authorization?.split(' ')[1];
            if (!token) return res.status(401).json({message: "Not authorized"});

            const decoded = <UserToken>jwt.verify(token, process.env.REFRESH_SECRET_KEY as string);

            if (!decoded.roles.includes(process.env.SUPER_ADMIN_ROLE)) {
                if (
                    (role === process.env.SUPER_ADMIN_ROLE && !decoded.roles.includes(process.env.SUPER_ADMIN_ROLE)) ||
                    (role === process.env.ADMIN_ROLE && !decoded.roles.includes(process.env.ADMIN_ROLE)) ||
                    (role === process.env.MANAGER_ROLE && !decoded.roles.includes(process.env.MANAGER_ROLE)) ||
                    (role === process.env.TEACHER_ROLE && !decoded.roles.includes(process.env.TEACHER_ROLE)) ||
                    (role === process.env.STUDENT_ROLE && !decoded.roles.includes(process.env.STUDENT_ROLE))
                ) {
                    return res.status(403).json({message: "You are not allowed!"})
                }
            }

            next();
        } catch (error) {
            res.status(401).json({message: "Not authorized!"})
        }
    }
}