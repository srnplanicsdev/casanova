export default function verificationMiddleware(req, res, next) {
    if (!req.user.isVerified) {
        return res.status(403).json({ message: "User is not verified, Please contact admin for verification" });
    }
    next();
}