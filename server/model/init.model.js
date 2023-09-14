const { sequelize } = require("./sequelize/sq.instance");

const initModels = (db) => {
  // 추후 관계 설정 시
  db.Doctor.hasMany(db.MedicalRecords, {foreignKey: "doctorDID", sourceKey: "did"});
  db.MedicalRecords.belongsTo(db.Doctor, {foreignKey: "doctorDID", sourceKey: "did"});
  db.User.hasMany(db.MedicalRecords, {foreignKey: "patientDID", sourceKey: "did"});
  db.MedicalRecords.belongsTo(db.User, {foreignKey: "patientDID", sourceKey: "did"});
  // 데이터베이스 동기화
  syncDatabase(db);
}

const syncDatabase = async (db) => {
  try {
    await db.Doctor.sync();
    console.log('Doctor Database synced');

    await db.User.sync();
    console.log('User Database synced');

    await db.MedicalRecords.sync();
    console.log('MedicalRecords Database synced');
  } catch (error) {
    console.error('Error syncing the database:', error);
  }
}

    
    

module.exports = { initModels };