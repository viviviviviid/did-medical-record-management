const db = require("../model/index.js");
const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const { use } = require("../routes/user.route");
const app = express();
const { medicalRecordRegister, createHash4DidUpdate, findAll_DID } = require("./medicalRecord.controller.js");

/**
 * 로그인 시 유저가 회원가입을 했는지 DB 체크
 * @returns DB 저장유무에 따른 boolean 반환 
 */
const isUserRegistered = async (req, res) => {
  try {

    const access_token = req.body.token.access_token;

    const userInfo = await axios.post("https://kapi.kakao.com/v2/user/me", {}, {  // 두번째는 받는 파라미터, 세번째가 보내는 파라미터
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    });

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
    // return res.status(400).send(error);
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
    let jwt, wallet, SUBJECT_DID;
    const { name, email, birthday, phoneNumber, isDoctor } = req.body;
    const hash = await createHash4DidUpdate(findAll_DID("")); // 회원가입 전이므로 비어있는체로 내용이 올 것 // 그거라도 hash화 해둬야 무결성 검증가능

    await axios.post('http://localhost:5002/did/register', {userInfo: req.body, hash: hash})
      .then(res => {
        ({ jwt, wallet, SUBJECT_DID } = res.data);
        const userInfo = { name, email, birthday, phoneNumber, isDoctor, wallet, SUBJECT_DID };
        userRegister(userInfo); // DB에 저장
      })
      .catch(err => console.log(err))

      console.log(jwt);

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
 * 의사가 요청한 진료결과 DID 업데이트 및 DB 등록
 */
const newRecord = async (req, res) => {
  try{
    // 이미 환자에게 vcJwt를 받은 후 검증하였으므로 문제가 없다고 판단.
    const decodedPayload = await jwt.decode(req.body.vcJwt);
    const did = decodedPayload.sub.did;
    const userInfo = decodedPayload.vc.credentialSubject.userInfo;

    // 새롭게 추가된 진료내용을 db에 저장 
    medicalRecordRegister(did, req.body.recordData);

    // 방금 저장된 것을 포함, db에 저장된 환자의 모든 내용을 반환
    const dbData = await findAll_DID(did);

    // // 그 내용 중 medicalRecords 카테고리에 새로운 해시 하나를 추가
    const hash = await createHash4DidUpdate(dbData);

    // // 방금 만든 hash를 넣어 vcPayload를 재구성하고 vcJwt를 만들어 서명하기
    await axios.post('http://localhost:5002/did/new-record', {hash: hash, decodedPayload:decodedPayload})
      .then(result => {
        const updatedVcJwt = result.data
        return res.status(200).send({dbData, updatedVcJwt});
      })
      .catch(err => console.log("here", err))
  }catch(error){
    console.log(error)
    return res.status(400).send(error);
  }
}

// ========================== 미완 ============================== //

/**
 * VC 요청
 */
// const claim = async (req, res) => {
//     // did 폴더내의 vc 받아오는 함수 호출
// }

/**
 * 보유한 VC를 공유하기 위해 QR코드로 변환 후 화면에 송출
 */
// const share = async (req, res) => {
//     // VC가 유효기간이 지났는지 확인
//     // claim을 통해 vc를 받은사람에 한해서, 의사에게 의료정보 공유할 시, vc 내용을 qr코드로 변환
//     // 변환된 qr코드를 화면에 송출
// }

/**
 * 의사가 요청한 DID 업데이트 승인 여부
 */
// const approve = async (req, res) => {
//     // 의사가 요청한 did 업데이트 승인 버튼
// }

/**
 * 보유중인 VC를 이용하여 1056 레지스트리를 조회
 */
// const retrieve = async (req, res) => {
//     // vc를 보유중인 상태에서, 환자가 자신의 정보를 확인하기위해 did폴더내의 조회 함수 호출
// }

/**
 * retrieve 함수를 통해 조회한 의료기록을 프론트로 전달
 */
// const display = async (req, res) => {
//     // 조회된 내역 프론트로 보내기
// }


module.exports = {
  isUserRegistered,
  signUp,
  newRecord
};