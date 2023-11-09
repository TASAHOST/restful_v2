const {Sequelize} = require("sequelize");
const dbConfig = require("../config/db.config");
//Create sequelize instance
const sequelize = new Sequelize(dbConfig.DB , dbConfig.USER, dbConfig.PASSWORD ,{
    host:dbConfig.HOST,
    dialect:"postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
})

async function testConnection(){
  try {
  await sequelize.authenticate();
  console.log('เชื่อมต่อได้เเล้วเว้ยยย');
} catch (error) {
  console.error('ล้มเหลวจ้าาา:', error);
}
}
testConnection();
module.exports = sequelize;
