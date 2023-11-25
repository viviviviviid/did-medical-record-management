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
    const hash = await createHash4DidUpdate([]); // 회원가입 전이므로 빈객체

    await axios.post(`http://${serverIP}:5002/did/register`, {userInfo: req.body, hash: hash})
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
    var {medicalRecord, doctorDID, patientDID: vcJwt} = req.body
    console.log("medicalRecord: ", medicalRecord, "\ndoctorDID: ", doctorDID, "\nvcJwt: ", vcJwt)
    // 모바일 완료전까지만 환자는 하드코딩
    vcJwt = "eyJhbGciOiJFUzI1NkstUiIsInR5cCI6IkpXVCJ9.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7Imlzc3VlciI6eyJuYW1lIjoiTWVkaWNhbCBSZWNvcmQgTWFuYWdlbWVudCBBc3NvY2lhdGlvbiIsImFkZHJlc3MiOiIweDNGZTdEQjQ3MDcyMDBlY0RlN2Q0Nzg4YjgwNWYyMjU2RTNiQzQ4NjcifSwidXNlckluZm8iOnsibmFtZSI6Iu2ZmOyekCIsImVtYWlsIjoic2VvLW1pbnNlb2tAZGF1bS5uZXQiLCJiaXJ0aGRheSI6IjAwMDEwMSIsInBob25lTnVtYmVyIjoiMDEwLTM4MjktMTAyMiIsImlzRG9jdG9yIjp0cnVlLCJhZGRyZXNzIjoiMHgyQ0IxNzVBOTcyMDMwNjQzQjhkMmYxNjlFMzUxZTM5MzcwMmE4ODZhIn0sIm1lZGljYWxSZWNvcmRzIjoiNGY1M2NkYTE4YzJiYWEwYzAzNTRiYjVmOWEzZWNiZTVlZDEyYWI0ZDhlMTFiYTg3M2MyZjExMTYxMjAyYjk0NSIsImRvY3RvckxpY2Vuc2UiOmZhbHNlfX0sInN1YiI6eyJkaWQiOiJkaWQ6ZXRocjpnb2VybGk6MHgyQ0IxNzVBOTcyMDMwNjQzQjhkMmYxNjlFMzUxZTM5MzcwMmE4ODZhIiwiYWRkcmVzcyI6IjB4MkNCMTc1QTk3MjAzMDY0M0I4ZDJmMTY5RTM1MWUzOTM3MDJhODg2YSJ9LCJpc3MiOiJkaWQ6ZXRocjpnb2VybGk6MHgzZTcwMzkyOWM2YzQxYjAwZmJhM0FCMzU1RmM1OUUzNEE3MTQ3MTFGIn0.sZrMa1rOzbDJDmqCxEp15lJoF40mDQdfV83PcS_nWhkSis-GWCZo1ZhjV-KcD9lo1MtjutRpvtKPiMBf0bJJNwA"
    patientDID = await jwt.decode(vcJwt).sub
    await medicalRecordRegister(doctorDID, patientDID, medicalRecord); // 병원 자체 DB에 저장
    vcJwt = await issueVC(medicalRecord, patientDID, vcJwt);
    console.log("Updated vcJwt: ", vcJwt);
    return vcJwt
  }catch(error){
    console.log(error);
    return res.status(400).send(error);
  }
}

const issueVC = async (medicalRecord, patientDID, vcJwt) => {
  var updatedVcJwt;
  if(vcJwt === null){ // 병원 vcJwt 없이 진료기록만 넘어왔을때 => 이 병원에서 진료한적이 없으므로 이번 기회에 이 병원 VC를 첫 발급 해줘야함
    await axios.post(`http://localhost:5002/did/issue/vc`, {medicalRecord: medicalRecord, patientDID: patientDID})
    .then(result => {
      updatedVcJwt = result.data;
    })
    .catch(err => console.log(err))
  }else{             // 병원 vcJwt가 넘어왔을때 => 진료한적이 있다는 뜻 => 업데이트해서 재발급해줘야함
    await axios.post(`http://localhost:5002/did/update/vc`, {medicalRecord: medicalRecord, vcJwt: vcJwt})
    .then(result => {
      updatedVcJwt = result.data;
    })
    .catch(err => console.log(err))
  }
  return updatedVcJwt
}

// 업데이트를 따로 체크할 필요 없이, 환자의 모바일에서 앱을 킬때마다 GET으로 내용이 대기중인지 확인하면 됨.
// const checkUpdate = async (req, res) => {
//   try{
//     const patientDID = req.body.patientDID;
//     const notUpdatedList = getNeedUpdateList_DB(await getAllMyRecords_DB(patientDID));
//     var jwtVcList = {};
    
//     if(notUpdatedList == null)
//       return res.status(204).send("Already up-to-date");

//     await update2UpToDate(patientDID)

//     for(let i=0; i<notUpdatedList.length; i++){
//       jwtVcList[notUpdatedList[i]] = (await issueHospitalVc(patientDID, notUpdatedList[i]));
//     }

//     return res.status(200).send(jwtVcList);
//   }catch(error){
//     console.log("checkUpdate function error: ", error);
//     return res.status(400).send(error);
//   }
// }

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

    // 해쉬 관련된 검증 필요할때 해제하기
    // let did, hashInJwt, integrityCheck; 

    // vcJwt 검증
    await axios.post(`http://${serverIP}:5002/did/verify/vc`, {vcJwt: vcJwt})
    .then(result => {
      // did = result.data.payload.sub;
      // hashInJwt = result.data.payload.vc.credentialSubject.medicalRecords;
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

    // DB 무결성 해쉬 관련된 검증 필요할때 해제하기
    // // 문제가 없다면 vcJwt검증 api에서 받아온 did로 DB에서 내용 조회 후 반환.
    // const dbData = await getAllMyRecords_DB(did);
    // console.log(dbData)
  
    // // vcJwt내의 medicalRecord의 hash와 dbData를 hash화 시켜 같은지 확인함으로써 무결성 검증
    // const hashInDB = await createHash4DidUpdate(dbData);

    // console.log("hashInDB: ", hashInDB)
    // console.log("hashInJwt: ", hashInJwt)

    // // 무결성 검증 integrityCheck가 OK라면 dbData를 보내줌
    // integrityCheck = hashInDB === hashInJwt;

    // // integrityCheck가 OK라면 dbData를 보내줌
    // return integrityCheck 
    // ? res.status(200).send(dbData)
    // : res.status(404).send("Integrity check failed. Engineer will fix it")
  
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
    console.log("body: ",req.body)
    const vpJwt = req.body.vpJwt;
    const did = req.body.did;
    var decodedVpContents;

    // 해쉬 관련된 검증 필요할때 해제하기
    // let did, hashInJwt, integrityCheck; 

    // vcJwt 검증
    await axios.post(`http://${serverIP}:5002/did/verify/vp`, {vpJwt: vpJwt})
    .then(result => {
      // did = result.data.payload.sub;
      // hashInJwt = result.data.payload.vc.credentialSubject.medicalRecords;
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

    await axios.post(`https://${serverIP}:5003/link/generate`, {payload: decodedVpContents, did: did})
    .then(result => {
      tempLink = result.data;
      res.status(200).send(tempLink);
    })
    .catch(err => console.log(err))

    // DB 무결성 해쉬 관련된 검증 필요할때 해제하기
    // // 문제가 없다면 vcJwt검증 api에서 받아온 did로 DB에서 내용 조회 후 반환.
    // const dbData = await getAllMyRecords_DB(did);
    // console.log(dbData)
  
    // // vcJwt내의 medicalRecord의 hash와 dbData를 hash화 시켜 같은지 확인함으로써 무결성 검증
    // const hashInDB = await createHash4DidUpdate(dbData);

    // console.log("hashInDB: ", hashInDB)
    // console.log("hashInJwt: ", hashInJwt)

    // // 무결성 검증 integrityCheck가 OK라면 dbData를 보내줌
    // integrityCheck = hashInDB === hashInJwt;

    // // integrityCheck가 OK라면 dbData를 보내줌
    // return integrityCheck 
    // ? res.status(200).send(dbData)
    // : res.status(404).send("Integrity check failed. Engineer will fix it")
  
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

// /**
//  * 모바일 기기에서 환자의 jwt 받아오는 함수
//  */
// const jwtFromApp = async (req, res) => {
//   try{
//     const vcJwt = req.body.patientVcJwt
//     await jwtToWeb(vcJwt)
//   }catch(error){
//     return res.status(400).status(error)
//   }
// }

// /**
//  * 받아온 환자의 jwt를 의사의 웹으로 보내주는 함수
//  */
// const jwtToWeb = (vcJwt) => {
//   try{

//   }catch(error){

//   }
// }



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
// ========================== 미완 ============================== //

/**
 * 보유한 VC를 공유하기 위해 QR코드로 변환 후 화면에 송출
 */
// const share = async (req, res) => {
//     // VC가 유효기간이 지났는지 확인
//     // claim을 통해 vc를 받은사람에 한해서, 의사에게 의료정보 공유할 시, vc 내용을 qr코드로 변환
//     // 변환된 qr코드를 화면에 송출
// }

module.exports = {
  isUserRegistered,
  signUp,
  // checkUpdate,
  newRecord,
  recordVc,
  recordVp,
  getDoctorWaitingList_DB,
  issueVp,
  // jwtFromApp,
  test
};

