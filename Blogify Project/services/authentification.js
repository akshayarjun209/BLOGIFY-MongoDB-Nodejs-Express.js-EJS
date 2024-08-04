import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

export function createToken (user){

    const payload = {
        name:user.name,
        id: user.id,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
        role: user.role
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET)

    return token;
}


export function validateToken(token){
    
    const payload= jwt.verify(token, process.env.JWT_SECRET);
    return payload;
}