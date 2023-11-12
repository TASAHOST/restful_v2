const db = require("../models");
const config = require("../config/auth.config");
const {user:User, role:Role , refreshToken:RefreshToken} = db;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { where } = require("sequelize");
const Op = db.Sequelize.Op;

//SignUp
exports.signup = (req, res) => {
    User.create({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
        })
        .then(
            (user) => {
                if (req.body.roles) {
                    Role.findAll({
                        where: {
                            name: {
                                [Op.or]: req.body.roles,
                            },
                        },
                    }).then(roles => {
                        user.setRoles(roles).then(() => {
                            res.send({
                                message: "User was registered successfully"
                            });
                        });
                    });
                } else {
                    //user roles = 1 {user}
                    user.setRoles([1]).then(() => {
                        res.send({
                            message: "User was registered successfully"
                        });
                    });
                }
            }).catch(err => {
            res.status(500), send({
                message: err.message
            });
        })
};


//signin
exports.signin = async (req, res) => {
    try {
        const user = await User.findOne({
            where: { username: req.body.username }
        });

        if (!user) {
            return res.status(404).send({
                message: "User not found"
            });
        }
        
        const passwordIsValid = await bcrypt.compare(req.body.password, user.password);

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password"
            });
        }

        const token = jwt.sign({ id: user.id }, config.secret, {
            algorithm: "HS256",
            allowInsecureKeySizes: true,
            expiresIn: config.jwtExpiration,
        });

        const refreshToken = await RefreshToken.createToken(user);

        const authorities = (await user.getRoles()).map(role => "ROLES_" + role.name.toUpperCase());

        res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token,
            refreshToken: refreshToken,
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};


exports.refreshToken = async (req, res) => {
    const {refreshToken:refreshToken} = req.body;

    if (refreshToken == null) {
        return res.status(403).json({ message: "Refresh Token is required" });
    }

    try {
        const foundRefreshToken = await RefreshToken.findOne({
            where: {
                token: refreshToken,
            },
        });

        if (!foundRefreshToken) {
            res.status(403).json({
                message: "Refresh Token is not in the Database!"
            });
            return;
        }

        if (await RefreshToken.verifyExpiration(foundRefreshToken)) {
            await RefreshToken.destroy({
                where: {
                    id: foundRefreshToken.id
                }
            });
            res.status(403).json({
                message: "Refresh Token has expired. Please make a new sign-in request"
            });
            return;
        }

        const user = await foundRefreshToken.getUser();
        const newAccessToken = jwt.sign({
            id: user.id
        }, config.secret, {
            algorithm: "HS256",
            allowInsecureKeySizes: true,
            expiresIn: config.jwtExpiration,
        });

        return res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: foundRefreshToken.token
        });
    } catch (error) {
        return res.status(500).send({
            message: error.message
        });
    }
};