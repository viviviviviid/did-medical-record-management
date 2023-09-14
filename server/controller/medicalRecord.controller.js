require("dotenv").config();
const db = require("../model/index.js");
const jwt = require("jsonwebtoken");
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

  doctorDID = JSON.stringify(doctorDID)
  patientDID = JSON.stringify(patientDID)

  console.log("doctorDID: ", doctorDID)
  console.log("patientDID: ", patientDID)

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
const filter4nonDuplicate = async (targetArray) => {
  try{
    const nonDuplicated_Set = new Set(targetArray);
    const promises = [...nonDuplicated_Set].map(patientDID => 
      db.User.findOne({
        where: {did: patientDID},
      })
    );
    return await Promise.all(promises);
  }catch(error){
    console.log("filter4nonDuplicate function error :", error)
    return error
  }
}

const getAllMyRecords_DB = async (patientDID) => {
  try{
    patientDID = JSON.stringify(patientDID);
    console.log(patientDID);
    return await db.MedicalRecords.findAll({
      where: {patientDID: patientDID},
      order: [['recordNumber', 'DESC']] // 내림차순(최근 -> 과거)로 정렬해서 변동성이 없도록
    });
  }catch(error){
    console.log("getAllMyRecords_DB function error :", error)
    return error
  }
}

const getAllMyPatientsList_DB = async (doctorDID) => {
  try{
    doctorDID = JSON.stringify(doctorDID);
    const dbData = await db.MedicalRecords.findAll({
      where: {doctorDID: doctorDID},
      attributes: ["patientDID"],
      order: [['recordNumber', 'DESC']], // 내림차순(최근 -> 과거)로 정렬해서 변동성이 없도록
    });
    const patientDidList = dbData.map(el => {
      return el.dataValues.patientDID
    });
    return filter4nonDuplicate(patientDidList);
  }catch(error){
    console.log("getAllMyPatientsList_DB function error :", error)
    return error
  }
}

const getAllMyPatientsRecords_DB = async (doctorDID, patientDID) => {
  doctorDID = JSON.stringify(doctorDID);
  patientDID = JSON.stringify(patientDID);
  console.log("doctorDID: ",doctorDID)
  console.log("patientDID: " ,patientDID)
  return await db.MedicalRecords.findAll({
    where: {
      doctorDID: doctorDID,
      patientDID: patientDID
    },
    order: [['recordNumber', 'DESC']] // 내림차순(최근 -> 과거)로 정렬해서 변동성이 없도록
  });
}

const getAllMyPatientList = async (req, res) => {
  try{
    // 로그인 후 의사 개인 페이지에 온 것이므로 따로 검증할 필요는 없음
    // const decodedPayload = await jwt.decode(req.body.doctorJwt)
    // console.log(decodedPayload.vc.credentialSubject.userInfo)
    // const doctorDID = decodedPayload.sub.did;
    // console.log("doctorDID를 가져옴: ", doctorDID);
    // 환자들 유저 정보 리스트만 필요
    // const dbData = await getAllMyPatientsList_DB(JSON.stringify(doctorDID));

    // #### TEST CODE #### //
    // 원래는 jwt에서 did를 추출하지만, 테스트용이므로 의사의 did 직접 제공
    const tempDoctorDID = JSON.parse(process.env.TEMP_DOCTOR_DID);
    console.log(tempDoctorDID)

    // 환자들 유저 정보 리스트만 필요
    const dbData = await getAllMyPatientsList_DB(tempDoctorDID);
    console.log(dbData);
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
    console.log(req.body)
    const decodedPayload = await jwt.decode(req.body.doctorJwt);
    const doctorDID = decodedPayload.sub.did;
    const patientDID = req.body.patientDid;
    
    console.log("doctorDID를 가져옴: ", doctorDID);
    console.log("patientDID 가져옴: ", patientDID);

    // 프론트랑 연결될때까지, DID 직접 주입 => patientDID 뽑아오는게 제일 시급.s
    const tempDoctorDID = JSON.parse(process.env.TEMP_DOCTOR_DID);
    const tempPatientDID = JSON.parse(process.env.TEMP_PATIENT_DID);

    const dbData = await getAllMyPatientsRecords_DB(tempDoctorDID, tempPatientDID);

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