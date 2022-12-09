import jwt, { Secret } from 'jsonwebtoken';


export interface UserToken {
    id: number;
    email: string;
    role: string;
    center: number;
    layout?: string;
}


export default function generateJwt(user: UserToken) {
    return jwt.sign(user, process.env.SECRET_KEY as Secret, {
        expiresIn: '24h',
    });
};
