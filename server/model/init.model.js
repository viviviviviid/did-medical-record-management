const { sequelize } = require("./sequelize/sq.instance");

const initModels = (db) => {
  // 추후 관계 설정 시

  // 데이터베이스 동기화
  db.sequelize
    .sync({ force: false }) 
    .then(() => {
      console.log('Database synced');
    })
    .catch((error) => {
      console.error('Error syncing database:', error);
    });
}

module.exports = { initModels };