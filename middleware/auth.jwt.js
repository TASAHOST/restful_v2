const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const {TokenExpiredError} = jwt;

const catchError = (err,res) =>{
    if (err instanceof TokenExpiredError) {
        return res.status(401).send({
            message: "Unauthrized Access Token was expired"
        })
    }
    return res.status(401).send({message:"Unauthorized"})
};

verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).send({ message: "ไม่ได้รับ Token!" });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return catchError(err, res);
        }
        req.userId = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            let isAdmin = roles.some(role => role.name === "admin");
            if (isAdmin) {
                next();
            } else {
                res.status(403).send({ message: "ต้องการสิทธิ์ Admin!" });
            }
        });
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
};
module.exports = authJwt;