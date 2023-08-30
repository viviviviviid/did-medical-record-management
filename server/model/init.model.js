const { sequelize } = require("./sequelize/sq.instance");

const initModels = (db) => {
  // 추후 관계 설정 시
  db.Doctor.hasMany(db.MedicalRecords, {foreignKey: "doctorDID", sourceKey: "did"})
  db.MedicalRecords.belongsTo(db.MedicalRecords, {foreignKey: "doctorDID", sourceKey: "did"})
  db.User.hasMany(db.MedicalRecords, {foreignKey: "patientDID", sourceKey: "did"})
  db.MedicalRecords.belongsTo(db.MedicalRecords, {foreignKey: "patientDID", sourceKey: "did"})
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