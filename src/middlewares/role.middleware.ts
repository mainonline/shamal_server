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

            // if (decoded.role !== process.env.SUPER_ADMIN_ROLE) {
            //
            //     if (role === process.env.SUPER_ADMIN_ROLE && decoded.role !== process.env.SUPER_ADMIN_ROLE) {
            //         return res.status(403).json({message: "Only for super admin allowed!"})
            //     }
            //
            //     if (role === process.env.ADMIN_ROLE &&
            //         (
            //             decoded.role !== process.env.ADMIN_ROLE ||
            //             decoded.role !== process.env.SUPER_ADMIN_ROLE
            //         )
            //     ) {
            //         return res.status(403).json({message: "Only for admin allowed!"})
            //     }
            //
            //     if (role === process.env.MANAGER_ROLE &&
            //         (
            //             decoded.role !== process.env.MANAGER_ROLE ||
            //             decoded.role !== process.env.ADMIN_ROLE ||
            //             decoded.role !== process.env.SUPER_ADMIN_ROLE
            //         )
            //     ) {
            //         return res.status(403).json({message: "Only for admin and manager allowed!"})
            //     }
            //
            //     if (role === process.env.TEACHER_ROLE &&
            //         (
            //             decoded.role === process.env.TEACHER_ROLE ||
            //             decoded.role !== process.env.MANAGER_ROLE ||
            //             decoded.role !== process.env.ADMIN_ROLE ||
            //             decoded.role !== process.env.SUPER_ADMIN_ROLE
            //         )
            //     ) {
            //         console.log("\n");
            //         console.log("TRUE TEACHER IF");
            //         console.log("\n");
            //         return res.status(403).json({message: "Only for admin, manager and teacher allowed!"})
            //     }
            //
            //     if (role === process.env.STUDENT_ROLE &&
            //         (
            //             decoded.role !== process.env.STUDENT_ROLE ||
            //             decoded.role !== process.env.TEACHER_ROLE ||
            //             decoded.role !== process.env.MANAGER_ROLE ||
            //             decoded.role !== process.env.ADMIN_ROLE ||
            //             decoded.role !== process.env.SUPER_ADMIN_ROLE
            //         )
            //     ) {
            //         return res.status(403).json({message: "Only for admin, manager, teacher and student allowed!"})
            //     }
            // }
            next();
        } catch (error) {
            res.status(401).json({message: "Not authorized!"})
        }
    }
}