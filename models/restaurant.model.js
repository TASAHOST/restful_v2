const { DataType, DataTypes} = require("sequelize");
const sequelize = require("./db");

const Restaurant = sequelize.define("restuarant",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false

    },
    Image:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    createdAt:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue : Date.now

    },
    updateAt:{
        type:DataTypes.DATE,
        allowNull: true,
        defaultValue :Date.now
    }
});

module.exports = Restaurant;