import { compare, genSalt, hash } from "bcryptjs";
import userService from "../users/user.service";
import { IUser } from "../users/user.type";
import { Roles } from "../role/role.type";
import { ICredential, Payload } from "./auth.type";
import { AUTH_RESPONSES } from "./auth.response";
import jwt, { verify } from 'jsonwebtoken';
import fs from "fs"
import path from "path"

const encryptedPassword = async (user:IUser)=>{
    const salt = await genSalt(10);
    
    const hashedPassword = await hash(user.password,salt);
    user.password = hashedPassword;
    return user;
}

const registerUser = async(user:IUser)=>{
    user = await encryptedPassword(user);
    user.role = [Roles.player];
    
    const record = userService.createUser(user);

    return record;
}

const login = async (cred: ICredential) => {
    const user = await userService.findUser({ email: cred.email })

    if (!user) throw AUTH_RESPONSES.INVALID_USER_CREDENTIALS;

    const isPasswordValid = await compare(cred.password, user.password);
    if (!isPasswordValid) throw AUTH_RESPONSES.INVALID_USER_CREDENTIALS;

    const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, "..\\..\\keys\\private.pem"), { encoding: "utf-8" })
    const { _id, role } = user;

    try {
        const token = jwt.sign({ id: _id, role: role }, PRIVATE_KEY || "", { algorithm: 'RS256',expiresIn:'900s' });
        const refreshToken = jwt.sign({ id: _id, role: role }, PRIVATE_KEY || "", { algorithm: 'RS256',expiresIn:'9000s' });

        return { token,refreshToken };

    } catch (error) {
        console.log(error)
    }

}

const refreshToken = (token: string) => {
    const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, "..\\..\\keys\\public.pem"), { encoding: "utf-8" })

    const tokenDecode = verify(token || "", PUBLIC_KEY || "") as Payload;
    console.log(tokenDecode)
    const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, "..\\..\\keys\\private.pem"), { encoding: "utf-8" })

    if (tokenDecode) {
        const accessToken = jwt.sign({ id: tokenDecode.id, role: tokenDecode.role }, PRIVATE_KEY || "", { algorithm: 'RS256' ,expiresIn:'900s'});
        return { accessToken }
    } else {
        throw { statusCode: 400, message: "Token invalid" }
    }
}

export default {
    registerUser,
    login,
    refreshToken
}