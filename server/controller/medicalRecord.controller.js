require("dotenv").config();
const db = require("../model/index.js");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');

/**
 * 진료기록 병원 자체 DB에 등록
 */
const medicalRecordRegister = async (doctorDID, patientDID, medicalRecord) => {

  console.log(medicalRecord)

  const { 
    hospital, dn, hi, 
    ph, me, al, di, tr, ac
  } = medicalRecord;

  patientDID = JSON.stringify(patientDID)
  doctorDID = JSON.stringify(doctorDID)

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
      order: [['id', 'DESC']], // 내림차순(최근 -> 과거)로 정렬해서 변동성이 없도록
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
  doctorDID = JSON.stringify(doctorDID);
  patientDID = JSON.stringify(patientDID);
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
    console.log("/get-patients-list");
    console.log("body: ", req.body)
    const doctorDID = req.body.doctorDID;
    console.log("doctorDID",doctorDID);
    const dbData = await getAllMyPatientsList_DB(doctorDID);
    console.log("dbData", dbData);
    res.status(200).send(dbData);
  }catch(error){
    console.log("getAllPatientRecords function error: ", error);
    res.status(400).send(error);
  }
}

const getAllMyPatientsRecords = async (req, res) => {
  try{
    console.log("/get-all-patient-records");
    console.log("body: ", req.body)
    // 로그인 후 의사 개인 페이지에 온 것이므로 따로 검증할 필요는 없음
    const doctorDID = req.body.doctorDID;
    const patientDID = req.body.patientDID;
    const dbData = await getAllMyPatientsRecords_DB(doctorDID, patientDID);
    console.log("dbData: ", dbData);
    res.status(200).send(dbData);
  }catch(error){
    console.log("getAllMyPatientsRecords function error: ", error);
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

const getNeedUpdateList_DB = (medicalRecord) => {
  console.log(medicalRecord);
  var hospitals = medicalRecord
    .filter(el => !el.dataValues.isIssued) // 발급된 이력이 있는지 확인
    .map(el => el.dataValues.hospital); 
  if (!(hospitals.length))
    return null 
  hospitals = Array.from(new Set(hospitals))
  console.log("Need Update Hospital List: ", hospitals)
  return hospitals;
}

const update2UpToDate = async (patientDID) => { // 환자의 모든 진료내역이 발급된적이 있다고 DB상에서 bool로 마킹
  patientDID = JSON.stringify(patientDID)
  await db.MedicalRecords.update({ isIssued: true }, { where: { patientDID: patientDID } });
  console.log("All updated to true in isIssued column!")
}


module.exports = { 
  medicalRecordRegister, 
  createHash4DidUpdate, 
  getAllMyPatientList, 
  getAllMyPatientsRecords,
  getHospitalRecords_DB,
  getAllMyRecords_DB, 
  getAllMyPatientsRecords_DB,
  getNeedUpdateList_DB,
  update2UpToDate
}
