const db = require("../model/index.js");

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

module.exports = { medicalRecordRegister }