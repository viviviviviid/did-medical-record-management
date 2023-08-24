const db = require("../model/index.js");
const crypto = require('crypto');

const medicalRecordRegister = async (medicalRecord) => {
  const { 
    did, hospital, doctor, dateOfVisit, historyOfPresentIllness, pastMedicalHistory, medications, allergies, physicalExamination, laboratoryResults, radiologicalFindings, diagnosis, treatment, medicationPrescribed, followUp, additionalComments
  } = medicalRecord;

  try {
    await db.MedicalRecords.create({
      did,
      hospital,
      doctor,
      dateOfVisit,
      historyOfPresentIllness,
      pastMedicalHistory,
      medications,
      allergies,
      physicalExamination,
      laboratoryResults,
      radiologicalFindings,
      diagnosis,
      treatment,
      medicationPrescribed,
      followUp,
      additionalComments
    });
    return true;
  } catch (error) {
    console.error("Error while saving medical record:", error);
    return false;
  }
}

const findAll_DID = async (target) => {
  return await db.MedicalRecords.findAll({
    where: {did: `${target}`},
    order: [['dateOfVisit', 'DESC']] // 내림차순(최근 -> 과거)로 정렬해서 변동성이 없도록
  });
}

/**
 * JWT에 삽입할 유저진료기록의 해시값
 */
const createHash4DidUpdate = async (dbData) => {
  const stringFormData = JSON.stringify(dbData);
  const hash = crypto.createHash('sha256');
  hash.update(stringFormData);
  return hash.digest('hex');
}

module.exports = { medicalRecordRegister, createHash4DidUpdate, findAll_DID }


// 테스트용

// const medicalRecordRegister = async (medicalRecord) => {
//   try {
//     await db.MedicalRecords.create({
//       did: "FILL_ME_IN",
//       hospital: "FILL_ME_IN",
//       doctor: "FILL_ME_IN",
//       dateOfVisit: "FILL_ME_IN",
//       historyOfPresentIllness: "FILL_ME_IN",
//       pastMedicalHistory: "FILL_ME_IN",
//       medications: "FILL_ME_IN",
//       allergies: "FILL_ME_IN",
//       physicalExamination: "FILL_ME_IN",
//       laboratoryResults: "FILL_ME_IN",
//       radiologicalFindings: "FILL_ME_IN",
//       diagnosis: "FILL_ME_IN",
//       treatment: "FILL_ME_IN",
//       medicationPrescribed: "FILL_ME_IN",
//       followUp: "FILL_ME_IN",
//       additionalComments: "FILL_ME_IN"
//     });
//     return true;
//   } catch (error) {
//     console.error("Error while saving medical record:", error);
//     return false;
//   }
// }