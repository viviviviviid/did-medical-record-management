require("dotenv").config();
const db = require("../model/index.js");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');

/**
 * 진료기록 DB에 등록
 */
const medicalRecordRegister = async (doctorDID, patientDID, medicalRecord) => {

  console.log(medicalRecord)
  console.log(medicalRecord.hospital)


  const { 
    hospital, dn, hi, 
    ph, me, al, di, tr, ac
  } = medicalRecord;

  patientDID = JSON.stringify(patientDID)

  console.log("doctorDID: ", doctorDID)
  console.log("patientDID: ", patientDID)

  try {
    await db.MedicalRecords.create({
      // DID
      doctorDID, patientDID,
      // medicalRecord
      hospital, dn, hi, 
      ph, me, al, di, tr, ac
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
      order: [['id', 'DESC']] // 내림차순(최근 -> 과거)로 정렬해서 변동성이 없도록
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
      order: [['id', 'DESC']], // 내림차순(최근 -> 과거)로 정렬해서 변동성이 없도록
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
  return await db.MedicalRecords.findAll({
    where: {
      doctorDID: doctorDID,
      patientDID: patientDID
    },
    order: [['id', 'DESC']] // 내림차순(최근 -> 과거)로 정렬해서 변동성이 없도록
  });
}

const getAllMyPatientList = async (req, res) => {
  try{
	  await console.log("req.body", req.body)
    // 로그인 후 의사 개인 페이지에 온 것이므로 따로 검증할 필요는 없음
    const decodedPayload = await jwt.decode(req.body.doctorJwt)
	  await console.log("decodedPayload", decodedPayload);
    const doctorDID = await decodedPayload.sub;
    await console.log("doctorDID",doctorDID);
    // 환자들 유저 정보 리스트만 필요
    const dbData = await getAllMyPatientsList_DB(doctorDID);
    console.log("dbData",dbData);
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
    const decodedPayload = await jwt.decode(req.body.doctorJwt);
    const doctorDID = decodedPayload.sub;
    const patientDID = req.body.patientDid;
    console.log("doctorDID: ", doctorDID);
    console.log("patientDID: ", patientDID);
    const dbData = await getAllMyPatientsRecords_DB(JSON.stringify(doctorDID), patientDID);
    console.log("dbData: ", dbData);
    res.status(200).send(dbData);
  }catch(error){
    console.log("getAllPatientRecords function error: ", error);
    res.status(400).send(error);
  }
}

const getHospitalRecords_DB = async (patientDID, hospital) => {
  patientDID = JSON.stringify(patientDID);
  return await db.MedicalRecords.findAll({
    where: {
      patientDID: patientDID,
      hospital: hospital
    },
    order: [['id', 'DESC']] // 내림차순(최근 -> 과거)로 정렬해서 변동성이 없도록
  });
}


module.exports = { 
  medicalRecordRegister, 
  createHash4DidUpdate, 
  getAllMyPatientList, 
  getAllMyPatientsRecords,
  getHospitalRecords_DB,
  getAllMyRecords_DB, 
  getAllMyPatientsRecords_DB
}
