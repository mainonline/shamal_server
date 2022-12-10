import jwt, { Secret } from 'jsonwebtoken';


export interface UserToken {
    id: number;
    email: string;
    roles: any[];
    center: number;
    layout?: string;
}

export interface UserAccessToken {
    email: string;
}


export const generateRefreshToken = (user: UserToken) => {
    return jwt.sign(user, process.env.REFRESH_SECRET_KEY as Secret, {
        expiresIn: '24h',
    });
};

export const generateAccessToken = (user: UserAccessToken) => {
    return jwt.sign(user, process.env.ACCESS_SECRET_KEY as Secret, {
        expiresIn: '1h',
    });
};
