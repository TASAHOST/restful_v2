const  config  = require("../config/auth.config") ;
const {v4:uuidv4} = require("uuid");

module.exports = (sequelize,Sequelize)=>{
    const RefreshToken = sequelize.define("refreshToken",{
        token:{
            type:Sequelize.STRING
        },
        expiryDate:{
            type: Sequelize.DATE
        }
    });
    RefreshToken.createToken = async function (user) {
        let expiredAT = new Date();
        expiredAT.setSeconds(expiredAT.getSeconds() + config.jwtExpiration);
        let _token = uuidv4();
        let refreshToken = await this.create({
            token: _token,
            userId: user.id,
            expriryDate: expiredAT,
        })
        return refreshToken.token
    }

    RefreshToken.verifyExpiration = (token) => {
        //true = expired, false not expired
        return token.expiryDate.getTime() < new Date().getTime();
    }
    return RefreshToken;
}