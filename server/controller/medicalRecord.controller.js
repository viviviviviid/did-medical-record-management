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

const createHash4DidUpdate = (data) => {

  const target = data; // db에서 찾은 내용을 그대로 가져와서 해시화 할까
  const hash = crypto.createHash('sha256');
  hash.update(target);
  return hash.digest('hex');

}

module.exports = { medicalRecordRegister, createHash4DidUpdate }