const {DataTypes} = require("sequelize");
const sequelize = require("./db");

const Restaurant = sequelize.define("restaurant",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false

    },
    type:{
        type:DataTypes.STRING,
        allowNull:false
    },
    image:{
        type:DataTypes.STRING,
        allowNull:false
    },
    createdAt:{
        type:DataTypes.DATE,
        allowNull:true,
        defaultValue : DataTypes.NOW

    },
    updatedAt:{
        type:DataTypes.DATE,
        allowNull: true,
        defaultValue :DataTypes.NOW
    },
});

Restaurant.sync({   //ใน Sequelize, sync เป็นเมธอดที่ใช้ในการสร้างตารางในฐานข้อมูลหรือปรับปรุงโครงสร้างของตารางตามโมเดลของ Sequelize 
                    //ที่คุณได้กำหนดไว้. การเรียกใช้ sync จะสร้างตารางในฐานข้อมูลถ้าตารางยังไม่มีอยู่ หรือปรับปรุงโครงสร้างของตารางตามโมเดล หากตารางนั้นมีอยู่แล้ว.
    force: false
})
.then(() => {
    console.log("ตารางถูกสร้างหรือมีอยู่แล้ว"); // พิมพ์ข้อความนี้ถ้าสร้างตารางสำเร็จ
})
.catch((error) => {
    console.log("เกิดข้อผิดพลาดในการสร้างตาราง:", error); // พิมพ์ข้อความนี้ถ้ามีข้อผิดพลาดในการสร้างตาราง
});

module.exports = Restaurant;