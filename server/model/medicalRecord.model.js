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
    hospital: { 
      type: DataTypes.STRING, // 진료를 받은 병원 이름
    },
    doctor: { 
      type: DataTypes.STRING, // 담당 의사 이름
    },
    dateOfVisit: { 
      type: DataTypes.STRING, // 진료받은 날짜 및 시간
    },
    // Clinical Information
    historyOfPresentIllness: {
      type: DataTypes.STRING, // 주요 증상
    },
    pastMedicalHistory: {
      type: DataTypes.STRING, // 현재의 질병에 대한 진행 이력
    },
    medications: {
      type: DataTypes.STRING, // 과거 의료 이력
    },
    allergies: {
      type: DataTypes.STRING, // 현재 복용 중인 약물
    },
    allergies: {
      type: DataTypes.STRING, // 알레르기 정보
    },
    // Examination Findings
    physicalExamination: {
      type: DataTypes.STRING, // 신체 검사 결과
    },
    laboratoryResults: {
      type: DataTypes.STRING, // 실험실 검사 결과 (예: 혈액 검사) 
    },
    radiologicalFindings: {
      type: DataTypes.STRING, // 영상 검사 결과 (예: X-ray, MRI 등)
    },
    // Diagnosis and Treatment
    diagnosis: {
      type: DataTypes.STRING, // 진단 결과
    },
    treatment: {
      type: DataTypes.STRING, // 치료 방법 및 계획
    },
    medicationPrescribed: {
      type: DataTypes.STRING, // 처방된 약물
    },
    // Additional Notes
    followUp: {
      type: DataTypes.STRING, // 후속 진료 정보
    },
    additionalComments: {
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
