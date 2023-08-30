const db = require("../model/index.js");
const crypto = require('crypto');

/**
 * 진료기록 DB에 등록
 */
const medicalRecordRegister = async (doctorDID, patientDID, medicalRecord) => {

  console.log(medicalRecord)

  const { 
    name, hospital, doctorName, dateOfVisit, historyOfPresentIllness, 
    pastMedicalHistory, medications, allergies, physicalExamination, 
    laboratoryResults, radiologicalFindings, diagnosis, treatment, 
    medicationPrescribed, followUp, additionalComments
  } = medicalRecord;

  try {
    await db.MedicalRecords.create({
      // DID
      doctorDID, patientDID,
      // medicalRecord
      name, hospital, doctorName, dateOfVisit, historyOfPresentIllness, 
      pastMedicalHistory, medications, allergies, physicalExamination, 
      laboratoryResults, radiologicalFindings, diagnosis, treatment, 
      medicationPrescribed, followUp, additionalComments
    });
    return true;
  } catch (error) {
    console.error("Error while saving medical record:", error);
    return false;
  }
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

const getAllMyRecords_DB = async (patientDID) => {
  return await db.MedicalRecords.findAll({
    where: {patientDID: `${patientDID}`},
    order: [['recordNumber', 'DESC']] // 내림차순(최근 -> 과거)로 정렬해서 변동성이 없도록
  });
}

const getAllMyPatientsRecords_DB = async (doctorDID) => {
  return await db.MedicalRecords.findAll({
    where: {doctorDID: `${doctorDID}`},
    order: [['recordNumber', 'DESC']] // 내림차순(최근 -> 과거)로 정렬해서 변동성이 없도록
  });
}

const getAllMyPatientList = async (req, res) => {
  try{
    // 로그인 후 의사 개인 페이지에 온 것이므로 따로 검증할 필요는 없음
    const decodedPayload = await jwt.decode(req.body.vcJwt);
    const did = decodedPayload.sub.did;
    // 환자들 유저 정보 리스트만 필요
    // 유저정보에서 wallet, did는 필요없음 -> 제거하고 보내야 함
    res.status(200).send(dbData);
  }catch(error){
    console.log("getAllPatientRecords function error: ", error);
    res.status(400).send(error);
  }
}

const getAllMyPatientsRecords = async (req, res) => {
  try{
    // 로그인 후 의사 개인 페이지에 온 것이므로 따로 검증할 필요는 없음
    const decodedPayload = await jwt.decode(req.body.vcJwt);
    const doctorDID = decodedPayload.sub.did;
    const dbData = getAllMyPatientsRecords_DB(doctorDID);
    res.status(200).send(dbData);
  }catch(error){
    console.log("getAllPatientRecords function error: ", error);
    res.status(400).send(error);
  }
}

module.exports = { 
  medicalRecordRegister, 
  createHash4DidUpdate, 
  getAllMyPatientList, 
  getAllMyPatientsRecords,
  // DB Modules 
  getAllMyRecords_DB, 
  getAllMyPatientsRecords_DB
}