const db = require("../model/index.js");
const express = require("express");
const axios = require("axios");
const { use } = require("../routes/user.route");
const app = express();
const { medicalRecordRegister, createHash4DidUpdate, findAll } = require("./medicalRecord.controller.js");

/**
 * 로그인 시 유저가 회원가입을 했는지 DB 체크
 * @returns DB 저장유무에 따른 boolean 반환 
 */
// const isUserRegistered = async (req, res) => {
//   try {
//     const access_token = req.body.token;
//     const userInfo = await axios.post("https://kapi.kakao.com/v2/user/me", {}, {  // 두번째는 받는 파라미터, 세번째가 보내는 파라미터
//       headers: {
//         Authorization: `Bearer ${access_token}`,
//       }
//     });
//     return await userFind(userInfo.data.kakao_account).then(result => {
//       result
//       ? (res.status(200).json({
//         dbData: result, 
//         msg: "already exist in DB"
//       })) 
//       : (res.status(400).send("not exist in DB")) // 이때 프론트는 회원가입 창으로 연결
//     })
//   } catch (error) {
//     return res.status(400).send(error);
//   }
// }

/**
 * 유저가 회원가입을 진행했는지 DB 탐색
 */
// const userFind = async (userInfo) => {
//   const data = await Member.findOne({where: {email: `${userInfo.email}`}});
//   if(data !== null){
//     console.log("already exist");
//     return true;
//   }else{
//     console.log("not exist")
//     return false;
//   }
// }

/**
 * 유저 정보 DB 등록
 */
// const userRegister = async (userInfo) => {
//   try{
//     db.User.create({
//       name: `${userInfo.name}`,
//       email: `${userInfo.email}`,
//       birthday: `${userInfo.birthday}`,
//       phoneNumber:  `${userInfo.phoneNumber}`,
//       isDoctor: `${userInfo.isDoctor}`,
//       wallet: `${userWallet.wallet}`,
//     });
//   }catch(error){
//     console.log("userRegister function Error: ",error);
//   }
// }

/**
 * 회원가입
 */
// const signUp = async (req, res) => {
//   try {
//     const {name, email, birthday, phoneNumber, isDoctor} = req.body.data;
//
//     // 회원가입이 완료되면 자동으로 로그인 완료 화면으로 넘기기
//     // 지갑주소 만들어주고 레지스트리에 등록
//     // es6 내용이므로 babel로 묶어 쓰거나, 동적 호출을 하던가.
//     const {jwt, wallet, did} = await signUp_DID({
//       name: name, 
//       email: email, 
//       birthday: birthday,
//       phoneNumber: phoneNumber,
//       isDoctor: isDoctor,
//     });
//
//     const userInfo = {name, email, birthday, phoneNumber, isDoctor, wallet};
//
//     // 회원가입 정보와 지갑 관련 정보(PK 포함)를 DB에 저장
//     userRegister(userInfo);
//
//   }catch(error){
//     console.log("signUp function error: ", error);
//   }
//
// }

/**
 * 의사가 요청한 DID 업데이트
 */
// const update = async (req, res) => {
//   try{
//     // 이미 환자에게 vcJwt를 받은 후 검증하였으므로 문제가 없다고 판단.
//     // 즉 추가되는 내용말고는 과정 필요없음.
//
//     const lastVcJwt = req.body.vcJwt;
//     const did = jwt.decode(lastVcJwt).sub.did;
//
//     // 새롭게 추가된 진료내용을 db에 저장 
//     medicalRecordRegister(req.body.medicalRecord);
//
//     // 방금 저장된 것을 포함, db에 저장된 환자의 모든 내용을 반환
//     const dbData = findAll(did);
//
//     // 그 내용 중 medicalRecords 카테고리에 새로운 해시 하나를 추가
//     const hash = createHash4DidUpdate(dbData);
//
//     // 방금 만든 hash를 넣어 vcPayload를 재구성하고 vcJwt를 만들어 서명하기
//     // 새로 만들어진 vcJwt를 프론트에 보내기 위해 받아두기. did 폴더에서 가져와야하므로 babel 과정 거쳐야함
//     const updatedVcJwt = update_DID(lastVcJwt, hash);
//
//     return res.status(200).send({dbData, updatedVcJwt});
//   }catch(error){
//     return res.status(400).send(error);
//   }
// }




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
    claim,
    share,
    approve,
    retrieve,
    display,
};