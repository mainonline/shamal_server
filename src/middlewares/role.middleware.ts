import jwt from "jsonwebtoken";
import {NextFunction, Request, Response} from "express";
import {UserToken} from "./generateJwt";


export const roleCheck = (role: string) => {

    return function (req: Request, res: Response, next: NextFunction) {
        if (req.method === "OPTIONS") next();

        try {
            let token = req.headers.authorization?.split(' ')[1];
            if (!token) return res.status(401).json({message: "Not authorized"});

            const decoded = <UserToken>jwt.verify(token, process.env.SECRET_KEY as string);



            // const isRolesValid = () => {
                // if (roles && decoded.roles && roles.length && decoded.roles.length && roles.length >= decoded.roles.length) {
                //     let decodedRoles:string[] = [];
                //     decodedRoles = Array.from(decoded.roles)
                //     roles.map((role: string) => {return decodedRoles.includes(role)})
                    // for (let i = 0; i < roles.length; i++) {
                    //     decoded.roles.includes(roles[i])
                    // }
            //     }
            // }
            if (decoded.role !== role) {
                return res.status(403).json({message: "You are not allowed!"})
            }


            // console.log("\n");
            // console.log(decoded);
            // console.log("\n");
            next();
        } catch (error) {
            res.status(401).json({message: "Not authorized"})
        }
    }

}