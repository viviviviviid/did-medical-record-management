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
    dv: { // dateOfVisit
      type: DataTypes.STRING, // 진료받은 날짜 및 시간
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
    pe: { // physicalExamination
      type: DataTypes.STRING, // 신체 검사 결과
    },
    lr: { // laboratoryResults
      type: DataTypes.STRING, // 실험실 검사 결과 (예: 혈액 검사) 
    },
    rf: { // radiologicalFindings
      type: DataTypes.STRING, // 영상 검사 결과 (예: X-ray, MRI 등)
    },
    di: { // diagnosis
      type: DataTypes.STRING, // 진단 결과
    },
    tr: { // treatment
      type: DataTypes.STRING, // 치료 방법 및 계획
    },
    mp: { // medicationPrescribed
      type: DataTypes.STRING, // 처방된 약물
    },
    fu: { // followUp
      type: DataTypes.STRING, // 후속 진료 정보
    },
    ac: { // additionalComments
      type: DataTypes.STRING, // 의사나 기타 의료 직원의 추가적인 코멘트
    },
    update_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('now()'),
    }
  },
  {
    timestamps: false,
  }
);

module.exports = { MedicalRecords }
