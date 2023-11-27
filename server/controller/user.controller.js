require("dotenv").config();
const db = require("../model/index.js");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const { medicalRecordRegister, createHash4DidUpdate, getAllMyRecords_DB, getHospitalRecords_DB, getNeedUpdateList_DB, update2UpToDate } = require("./medicalRecord.controller.js");

const serverIP = process.env.SERVER_IP_ADDRESS;

/**
 * 로그인 시 유저가 회원가입을 했는지 DB 체크
 * @returns DB 저장유무에 따른 boolean 반환 
 */
const isUserRegistered = async (req, res) => {
  try {
  console.log("/login")
	console.log(req.body);
    const access_token = req.body.token.access_token;
	console.log(access_token);
    const userInfo = await axios.post("https://kapi.kakao.com/v2/user/me", {}, {  // 두번째는 받는 파라미터, 세번째가 보내는 파라미터
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    })

    return await userFind(userInfo.data.kakao_account).then(dbData => {
      dbData
      ? (res.status(200).json({
        dbData: dbData, 
        msg: "already exist in DB"
      })) 
      : (res.status(201).json({
        dbData: null,
        userInfo: userInfo.data.kakao_account,
        msg: "not exist"
      })) 
    })
    .catch(err => console.log(err))

  } catch (error) {
    console.log("isUserRegistered function error: ", error)
    res.status(400).send(error);
  }
}

/**
 * 유저가 회원가입을 진행했는지 DB 탐색
 */
const userFind = async (userInfo) => {
  return await db.User.findOne({where: {email: `${userInfo.email}`}});
}

/**
 * 회원가입
 */
const signUp = async (req, res) => {
  try {
    console.log("/signup")
    console.log(req.body);
	  let jwt, wallet, SUBJECT_DID;
    const { name, email, birthday, phoneNumber, isDoctor } = req.body;

    await axios.post(`http://${serverIP}:5002/did/register`, {userInfo: req.body})
      .then(res => {
        ({ jwt, wallet, SUBJECT_DID } = res.data);
        const userInfo = { name, email, birthday, phoneNumber, isDoctor, wallet, SUBJECT_DID };
        userRegister(userInfo); // DB에 저장
      })
      .catch(err => console.log(err))

      res.status(200).json({jwt:jwt, did:SUBJECT_DID});
  } catch (error) {
    console.log("signUp function error: ", error);
    return res.send(400).send(error);
  }
}

/**
 * 유저 정보 DB 등록
 */
const userRegister = async (userInfo) => {
  try{
    db.User.create({
      name: `${userInfo.name}`,
      email: `${userInfo.email}`,
      birthday: `${userInfo.birthday}`,
      phoneNumber:  `${userInfo.phoneNumber}`,
      isDoctor: `${userInfo.isDoctor}`,
      wallet: JSON.stringify(userInfo.wallet), // JSON 타입의 컬럼에 객체를 넣을때는, 문자열화 시켜주고 넣어야함
      did: JSON.stringify(userInfo.SUBJECT_DID),
    });
  }catch(error){
    console.log("userRegister function Error: ",error);
  }
}

/**
 * 신원 Vc에 진료결과의 Hash를 담아 Vc 재발급 및 협회 DB 등록
 */
const newRecord = async (req, res) => {
  try{
    console.log("/new-record")
    var {medicalRecord, doctorDID, vpJwt} = req.body
    // 모바일 완료전까지만 환자는 하드코딩
    vpJwt = "eyJhbGciOiJFUzI1NkstUiIsInR5cCI6IkpXVCJ9.eyJ2cCI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVQcmVzZW50YXRpb24iXSwidmVyaWZpYWJsZUNyZWRlbnRpYWwiOlsiZXlKaGJHY2lPaUpGVXpJMU5rc3RVaUlzSW5SNWNDSTZJa3BYVkNKOS5leUoyWXlJNmV5SkFZMjl1ZEdWNGRDSTZXeUpvZEhSd2N6b3ZMM2QzZHk1M015NXZjbWN2TWpBeE9DOWpjbVZrWlc1MGFXRnNjeTkyTVNKZExDSjBlWEJsSWpwYklsWmxjbWxtYVdGaWJHVkRjbVZrWlc1MGFXRnNJbDBzSW1OeVpXUmxiblJwWVd4VGRXSnFaV04wSWpwN0ltbHpjM1ZsY2lJNmV5SnVZVzFsSWpvaVRXVmthV05oYkNCU1pXTnZjbVFnVFdGdVlXZGxiV1Z1ZENCQmMzTnZZMmxoZEdsdmJpSXNJbUZrWkhKbGMzTWlPaUl3ZUROR1pUZEVRalEzTURjeU1EQmxZMFJsTjJRME56ZzRZamd3TldZeU1qVTJSVE5pUXpRNE5qY2lmU3dpZFhObGNrbHVabThpT25zaWJtRnRaU0k2SXUyWm1PeWVrQ0lzSW1WdFlXbHNJam9pYzJWdkxXMXBibk5sYjJ0QVpHRjFiUzV1WlhRaUxDSmlhWEowYUdSaGVTSTZJakF3TURFd01TSXNJbkJvYjI1bFRuVnRZbVZ5SWpvaU1ERXdMVE00TWprdE1UQXlNaUlzSW1selJHOWpkRzl5SWpwMGNuVmxMQ0poWkdSeVpYTnpJam9pTUhneVEwSXhOelZCT1RjeU1ETXdOalF6UWpoa01tWXhOamxGTXpVeFpUTTVNemN3TW1FNE9EWmhJbjBzSW0xbFpHbGpZV3hTWldOdmNtUnpJam9pTkdZMU0yTmtZVEU0WXpKaVlXRXdZekF6TlRSaVlqVm1PV0V6WldOaVpUVmxaREV5WVdJMFpEaGxNVEZpWVRnM00yTXlaakV4TVRZeE1qQXlZamswTlNJc0ltUnZZM1J2Y2t4cFkyVnVjMlVpT21aaGJITmxmWDBzSW5OMVlpSTZleUprYVdRaU9pSmthV1E2WlhSb2NqcG5iMlZ5YkdrNk1IZ3lRMEl4TnpWQk9UY3lNRE13TmpRelFqaGtNbVl4TmpsRk16VXhaVE01TXpjd01tRTRPRFpoSWl3aVlXUmtjbVZ6Y3lJNklqQjRNa05DTVRjMVFUazNNakF6TURZME0wSTRaREptTVRZNVJUTTFNV1V6T1RNM01ESmhPRGcyWVNKOUxDSnBjM01pT2lKa2FXUTZaWFJvY2pwbmIyVnliR2s2TUhnelpUY3dNemt5T1dNMll6UXhZakF3Wm1KaE0wRkNNelUxUm1NMU9VVXpORUUzTVRRM01URkdJbjAuc1pyTWExck96YkRKRG1xQ3hFcDE1bEpvRjQwbURRZGZWODNQY1Nfbldoa1Npcy1HV0NabzFaaGpWLUtjRDlsbzFNdGp1dFJwdnRLUGlNQmYwYkpKTndBIiwiZXlKaGJHY2lPaUpGVXpJMU5rc3RVaUlzSW5SNWNDSTZJa3BYVkNKOS5leUoyWXlJNmV5SkFZMjl1ZEdWNGRDSTZXeUpvZEhSd2N6b3ZMM2QzZHk1M015NXZjbWN2TWpBeE9DOWpjbVZrWlc1MGFXRnNjeTkyTVNKZExDSjBlWEJsSWpwYklsWmxjbWxtYVdGaWJHVkRjbVZrWlc1MGFXRnNJbDBzSW1OeVpXUmxiblJwWVd4VGRXSnFaV04wSWpwN0ltbHpjM1ZsY2lJNmV5SnVZVzFsSWpvaVRXVmthV05oYkNCU1pXTnZjbVFnVFdGdVlXZGxiV1Z1ZENCQmMzTnZZMmxoZEdsdmJpSXNJbUZrWkhKbGMzTWlPaUl3ZUROR1pUZEVRalEzTURjeU1EQmxZMFJsTjJRME56ZzRZamd3TldZeU1qVTJSVE5pUXpRNE5qY2lmU3dpYUc5emNHbDBZV3dpT2lMc2hKenNtcmpyczVIc201QWlMQ0p0WldScFkyRnNVbVZqYjNKa2N5STZXM3NpYUc5emNHbDBZV3dpT2lMc2hKenNtcmpyczVIc201QWlMQ0prYmlJNkl1MlpqZXV3bGV5Q3JDSXNJbVIySWpvaU1qQXlNeTh4TVM4eU5TSXNJbWhwSWpvaTdKV1VJaXdpY0dnaU9pTHJzTEh0bUlqcnM1RWlMQ0p0WlNJNkl1MlZyZXlEbmV5Z25DSXNJbUZzSWpvaTZyQ1I2ckNCNjZXWUlpd2laR2tpT2lMc2dxenJwNTBpTENKMGNpSTZJdXV6dGVxMXJPdTJpT3F3Z0NJc0ltRmpJam9pN0pXSTdZT0E2cm1kN0lxMTY0dUk2NHVrSW4xZGZYMHNJbk4xWWlJNmV5SmthV1FpT2lKa2FXUTZaWFJvY2pwbmIyVnliR2s2TUhneVEwSXhOelZCT1RjeU1ETXdOalF6UWpoa01tWXhOamxGTXpVeFpUTTVNemN3TW1FNE9EWmhJaXdpWVdSa2NtVnpjeUk2SWpCNE1rTkNNVGMxUVRrM01qQXpNRFkwTTBJNFpESm1NVFk1UlRNMU1XVXpPVE0zTURKaE9EZzJZU0o5TENKcGMzTWlPaUprYVdRNlpYUm9janBuYjJWeWJHazZNSGcwT1VOa01qWTROVE5tUXpZd016WTRZMFE0TnpFMlFqQXlZamMxTnpjNFFUUTJOVU5FTlRReUluMC5fYU1kbU1CY09NZEZCczZYZ2F6TzNrUVhGZDZaRG9xMmJIRWs3SWdMQ0xCWEx4M1BiZUtVTFpOWjlFalViRllpRDhUTmJ1Y3JMbGw2eEljR0xyTzhNQUUiXX0sImlzcyI6ImRpZDpldGhyOmdvZXJsaToweDdmYWJmZEVlZDI1NThBQTI0NDc2NzdFNUZEMTU0RDFDRjQ1QzZCN0EifQ.OKyLtPKP10hUjETkgLwzqTsb7khZT1FSiNQvi37x2hd0pcGw5OKVClsa1e5IxtNZkdki1HkT7csKfIVb7M2ZogE"
    const VCs = await extractVP(vpJwt, medicalRecord.hospital);
    if (!(VCs.userInfoVC.length)){ // 신원정보 VC가 포함되지 않았을경우의 예외처리
      res.status(400).send("Not contained userInfo VC in VP");
      return;
    }
    patientDID = VCs.userInfoVC[0].sub;
    await medicalRecordRegister(doctorDID, patientDID, medicalRecord); // 병원 자체 DB에 저장
    vcJwt = await issueVC(medicalRecord, patientDID, VCs);
    console.log("Updated vpJwt: ", vcJwt);

    await axios.post(`https://${serverIP}:5003/link/generate`, {payload: vcJwt, did: patientDID})
    .then(result => {
      tempLink = result.data;
      res.status(200).send(tempLink);
    })
    .catch(err => console.log(err))

  }catch(error){
    console.log(error);
    return res.status(400).send(error);
  }
}

const issueVC = async (medicalRecord, patientDID, VCs) => {
  try{
    var updatedVcJwt;

    if(!(VCs.hospitalVC.length)){ // vpJwt의 내용중 병원 VC가 없을때 => 신원 정보 VC만 존재하므로, 이 병원에 대한 VC는 신규발급이어야함
      await axios.post(`http://${serverIP}:5002/did/issue/vc`, {medicalRecord: medicalRecord, patientDID: patientDID})
        .then(result => {
          updatedVcJwt = result.data;
        })
        .catch(err => console.log(err))
    }else{             // 병원 vcJwt가 넘어왔을때 => 진료한적이 있다는 뜻 => 업데이트해서 재발급해줘야함
      await axios.post(`http://${serverIP}:5002/did/update/vc`, {medicalRecord: medicalRecord, hospitalVC: VCs.hospitalVC})
        .then(result => {
          updatedVcJwt = result.data;
        })
        .catch(err => console.log(err))
    }
    return updatedVcJwt;
  }catch(error){
    console.log("issueVC function error: ",error);
    return res.status(400).send(error);
  }
}

/**
 * 원하는 VC들을 선택해 VP로 변환 및 발급
 */
const issueVp = async (req, res) => {
  try{
    const vcJwts = req.body.vcJwts;
    var vpJwt;

    await axios.post(`http://${serverIP}:5002/did/issue/vp`, {vcJwts: vcJwts})
      .then(result => {
        vpJwt = result.data;
        console.log(vpJwt);
      })
      .catch(err => console.log(err))

    await axios.post(`https://${serverIP}:5003/link/generate`, {payload: vpJwt})
      .then(result => {
        tempLink = result.data;
        return res.status(200).send(tempLink);
      })
      .catch(err => console.log(err))

  }catch(error){
    console.log("issueVp function error: ",error);
    return res.status(400).send(error);
  }
}

/**
 * 모바일 기기에서 보유중인 VC를 이용하여 1056 레지스트리를 조회
 */
const recordVc = async (req, res) => {
  try{
    console.log("/get-my-record")
    const vcJwt = req.body.vcJwt;

    await axios.post(`http://${serverIP}:5002/did/verify/vc`, {vcJwt: vcJwt})
    .then(result => {
      const verifyCheck = result.data.verified;
      if(!verifyCheck){
        res.status(400).send("vcJwt is not verified");
        return 
      }
      res.status(200).send(result.data.verifiableCredential.credentialSubject);
    })
    .catch(err => {
      console.log("getRecord function: ", err)
      res.status(404).send(err);
    })
  
  }catch(error){
    console.log(error);
    res.status(400).send(error);
  }
}

/**
 * 모바일 기기에서 보유중인 VP를 이용하여 1056 레지스트리를 조회 및 GET url로 재구성
 */
const recordVp = async (req, res) => {
  try{
    console.log("/record/vp")
    const vpJwt = req.body.vpJwt;
    const did = req.body.did;
    var decodedVpContents;
    console.log("recordVp body: ", req.body)

    const VCs = await extractVP(vpJwt);
    if (!(VCs.userInfoVC.length)){ // 신원정보 VC가 포함되지 않았을경우의 예외처리
      res.status(400).send("Not contained userInfo VC in VP");
      return;
    }
    
    await axios.post(`http://${serverIP}:5002/did/verify/vp`, {vpJwt: vpJwt})
    .then(result => {
      const verifyCheck = result.data.verified;
      if(!verifyCheck){
        res.status(400).send("vpJwt is not verified");
        return 
      }
      decodedVpContents = result.data.verifiablePresentation.verifiableCredential.map(el => {
        return el.credentialSubject
      })
    })
    .catch(err => {
      console.log("getRecord function: ", err)
      res.status(400).send(err);
    })

    const payload = {
      decodedVpContents: decodedVpContents,
      vpJwt: vpJwt
    }

    await axios.post(`https://${serverIP}:5003/link/generate`, {payload: payload, did: did})
    .then(result => {
      tempLink = result.data;
      res.status(200).send(tempLink);
    })
    .catch(err => console.log(err))
  
  }catch(error){
    console.log(error);
    res.status(400).send(error);
  }
}

const getDoctorWaitingList_DB = async (req, res) => { 
  try{
    console.log("/get-doctor-waiting-list")
    // 나중에 쿼리문 하나로 해결하기

    // 1. isDoctor가 true인 모든 User 가져오기
    const users = await db.User.findAll({
      where: { isDoctor: true },
      attributes: ["name", "birthday", "did"]
    });

    // 2. 각 did에 대해 Doctor 테이블에 존재하는지 확인하고, 존재한다면 User 목록에서 제거
    const waitingList = [];

    for (const user of users) {
      const doctorExists = await db.Doctor.findOne({
        where: { did: user.did }
      });

      // Doctor 테이블에 해당 did가 존재하지 않는 경우에만 목록에 추가
      if (!doctorExists) {
        waitingList.push(user);
      }
    }

    res.status(200).send(waitingList)
  }catch(error){
    console.log("getDoctorWaitingList_DB function error: ",error)
    res.status(400).send(error)
  }
} 

const extractVP = async (vpJwt, hospital) => {
  var result = {};

  vpJwtContents = await jwt.decode(vpJwt).vp.verifiableCredential;
  const VCs = vpJwtContents.map(el => {
    return jwt.decode(el);
  })

  result["userInfoVC"] = VCs.filter(el => {
    return el.vc.credentialSubject.userInfo 
  })

  if(hospital !== null) {
    result["hospitalVC"] = VCs.filter(el => {
      return el.vc.credentialSubject.hospital === hospital
    })
  }
  
  return result
}



const test = async (req, res) => { 
  try{
    issueHospitalVc()
    console.log("/test")
    console.log("test success")
    res.status(200).send("test success")
  }catch(error){
    console.log("test fail")
    res.status(400).send("test fail")
  }
}

module.exports = {
  isUserRegistered,
  signUp,
  newRecord,
  recordVc,
  recordVp,
  getDoctorWaitingList_DB,
  issueVp,
  test
};

