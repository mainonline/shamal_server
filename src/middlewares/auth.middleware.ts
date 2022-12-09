import jwt from "jsonwebtoken";
import {NextFunction, Request, Response} from "express";

interface CustomRequest extends Request {
    user: {
        id: number;
        email: string;
        role: string;
        layout: string;
    };
    headers: {
        authorization: string
    };
}

export const authCheck =(req: Request, res: Response, next: NextFunction) => {

    if (req.method === "OPTIONS") { next() }

    try {
        let token;
        if (req.headers.authorization) token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({message: "Не авторизован"});
        }
        const jwtPayload = <any>jwt.verify(token, process.env.SECRET_KEY as string);
        res.locals.jwtPayload = jwtPayload;
        res.locals.username = jwtPayload["email"];
        next();
    } catch (e) {
        res.status(401).json({message: "Не авторизован catch"})
    }
};
