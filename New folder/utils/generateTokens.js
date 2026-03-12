import jwt from "jsonwebtoken";

export const generateToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_ACCESSTOKEN_EXPAIRY });
};

export const generateRefreshToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_REFRESHTOKEN_EXPAIRY });
};
export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
};
export const verifyRefreshToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
};
export const decodeToken = (token) => {
    return jwt.decode(token);
};
