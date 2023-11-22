const { DataTypes } = require("sequelize");
const { sequelize } = require("./sequelize/sq.instance");

const MedicalRecords = sequelize.define(
  "medicalRecords", 
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // DID
    doctorDID: {
      type: DataTypes.STRING, // 의사 DID
      references: {
        model: 'doctors', 
        key: 'did',
      },
    },
    patientDID: {
      type: DataTypes.STRING, // 환자 DID
      references: {
        model: 'users', 
        key: 'did',
      },
    },
    // Basic Information
    hospital: {  // hospital
      type: DataTypes.STRING, // 진료를 받은 병원 이름
    },
    dn: {  // doctorName
      type: DataTypes.STRING, // 담당 의사 이름
    },
    hi: { // historyOfPresentIllness
      type: DataTypes.STRING, 
    },
    ph: { // pastMedicalHistory
      type: DataTypes.STRING, 
    },
    me: { // medications
      type: DataTypes.STRING, 
    },
    al: { // allergies
      type: DataTypes.STRING, 
    },
    di: { // diagnosis
      type: DataTypes.STRING, // 진단 결과
    },
    tr: { // treatment
      type: DataTypes.STRING, // 치료 방법 및 계획
    },
    ac: { // additionalComments
      type: DataTypes.STRING, // 의사나 기타 의료 직원의 추가적인 코멘트
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('now()'),
    },
    isIssued: { 
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  },
  {
    timestamps: false,
  }
);

module.exports = { MedicalRecords }
