import { decodeToken, verifyToken } from "../utils/generateTokens.js";
import User from "../model/userModel.js";
export default async function protect(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = verifyToken(token);
        req.userData = decodedToken;
        req.user = await User.findById(decodedToken.id);
        next();
    } catch (error) {
        res.status(401).json({ message: "Authentication failed" });
    }
};