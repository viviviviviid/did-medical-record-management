import dotenv from 'dotenv';
dotenv.config({path: "./.env"});
import { EthrDID, DelegateTypes } from 'ethr-did';
import { createVerifiableCredentialJwt, verifyCredential, createVerifiablePresentationJwt, verifyPresentation } from 'did-jwt-vc';
import ethers from "ethers";
import did from "./did.instance.js";

const chainNameOrId = "goerli"

/**
 * 환자 회원가입으로 DID 식별자 생성 및 신원 VC 발급
 * @returns 신원 VC 반환
 */
const signUp_DID = async (req, res) => {
  console.log("/register")
  try{
    const data = req.body.userInfo;
    const wallet = ethers.Wallet.createRandom()
    const walletInfo = {
      address: wallet.address,
      privateKey: wallet.privateKey,
    }

    // Create Holder/Subject DID
    const SUBJECT_DID = new EthrDID({
      identifier: walletInfo.address,
      chainNameOrId
    })

    const vcPayload = {
      sub: SUBJECT_DID,
      vc: {
        '@context': ['https://www.w3.org/2018/credentials/v1'],
        type: ['VerifiableCredential'],
        credentialSubject: {
          issuer: {
            name: 'Medical Record Management Association',
            address: process.env.ISSUER_ADDRESS,
          },
          userInfo: {
            name: data.name,
            email: data.email,
            birthday: data.birthday,
            phoneNumber: data.phoneNumber,
            isDoctor: data.isDoctor,
            address: walletInfo.address,
          },
          doctorLicense: false,
        }
      }
    }
    
    const vcJwt = await createVcJwtWithPayload(vcPayload);
  
    res.status(200).json({jwt: vcJwt, wallet: walletInfo, SUBJECT_DID: SUBJECT_DID});
  }catch(error){
    console.log("signUp_DID function error: ", error);
    res.status(400).send(error);
  }
}

/**
 * 환자 병원 진료 후, 진료기록 VC 발급
 * @returns 진료기록 VC 반환
 */
const issueVc_DID = async (req, res) => {
  console.log("/issue/vc")

  const SUBJECT_DID = req.body.patientDID;
  const hospital = req.body.medicalRecord.hospital;
  const medicalRecord = req.body.medicalRecord;

  const vcPayload = {
    sub: SUBJECT_DID,
    vc: {
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiableCredential'],
      credentialSubject: {
        issuer: {
          name: 'Medical Record Management Association',
          address: process.env.ISSUER_ADDRESS,
        },
        hospital: hospital,
        medicalRecords: [medicalRecord]
      }
    }
  }
  const vcJwt = await createVcJwtWithPayload(vcPayload);
  res.status(200).send(vcJwt)
}

/**
 * 진료기록 VC의 내용을 업데이트하고 재발급해야할 경우 (특정 병원에서 진료 추가가 되었을때
 * @returns 진료기록 VC 반환
 */
const reissueVc_DID = async (req, res) => {
  console.log("/update/vc")
  try{
    const newRecord = req.body.medicalRecord;
    var hospitalVC = req.body.hospitalVC[0];
    hospitalVC.vc.credentialSubject.medicalRecords.push(newRecord);
    const vcPayload = {
      sub: hospitalVC.sub,
      vc: hospitalVC.vc,
    }
    const vcJwt = await createVcJwtWithPayload(vcPayload);
    res.status(200).send(vcJwt);
  }catch(error){
    console.log(error);
    res.status(400).send(error);
  }
}

/**
 * 만들어진 vcPayload를 받아 vcJwt로 만들어 서명
 * @returns vcJwt 반환
 */
const createVcJwtWithPayload = async (vcPayload) => {
  // web3 공급자들은 JWT ES256K나 (등록되지 않은) ES256K-R 알고리즘과 호환되는 방식으로 직접 데이터에 서명하는 능력이 없기에 대리자를 임명 또는 생성시켜 서명해야한다.
  const { kp, txHash } = await did.ISSUER_DID.createSigningDelegate(
    DelegateTypes.veriKey, // JWT에 서명하기 위한 기본 옵션
    3600, // expiresIn : 3600s
  )

  // 대리 서명자의 DID 생성
  const DELEGATE_ISSUER_DID = new EthrDID({
    identifier: kp.address,
    privateKey: kp.privateKey,
    provider: did.issuerSigner.provider, 
    chainNameOrId
  });
  
  // VC JWT 생성
  const vcJwt = await createVerifiableCredentialJwt(vcPayload, DELEGATE_ISSUER_DID);
  return vcJwt;
}

/**
 * vcJwt 검증
 * @returns 검증 유/무 반환
 */
const verifyVc_DID = async (req, res) => {
  console.log("/verify/vc")
  try{
    const vcJwt = req.body.vcJwt;
    const verifiedVC = await verifyCredential(vcJwt, did.resolver)
    res.status(200).send(verifiedVC);
  }catch(error){
    console.log(error);
    res.status(400).send(error);
  }
}

/**
 * 전달받은 VC들로 VP를 구성 및 발급
 * @returns vpJwt
 */
const issueVp_DID = async (req, res) => {
  console.log("/issue/vp")
  try{
    const vcJwts = req.body.vcJwts;
    const vpPayload = {
      vp: {
        '@context': ['https://www.w3.org/2018/credentials/v1'],
        type: ['VerifiablePresentation'],
        verifiableCredential: vcJwts
      }
    }
    const vpJwt = await createVpJwtWithPayload(vpPayload)
    res.status(200).send(vpJwt)
  }catch(error){
    console.log(error);
    res.status(400).send(error);
  }
}

/**
 * 만들어진 vpPayload를 받아 vpJwt로 만들어 서명
 * @returns vpJwt
 */
const createVpJwtWithPayload = async (vpPayload) => {
  // web3 공급자들은 JWT ES256K나 (등록되지 않은) ES256K-R 알고리즘과 호환되는 방식으로 직접 데이터에 서명하는 능력이 없기에 대리자를 임명 또는 생성시켜 서명해야한다.
  const { kp, txHash } = await did.ISSUER_DID.createSigningDelegate(
    DelegateTypes.veriKey, 
    3600, 
  )

  // 대리 서명자의 DID 생성
  const DELEGATE_ISSUER_DID = new EthrDID({
    identifier: kp.address,
    privateKey: kp.privateKey,
    provider: did.issuerSigner.provider, 
    chainNameOrId
  });
  
  // VP JWT 생성
  const vpJwt = await createVerifiablePresentationJwt(vpPayload, DELEGATE_ISSUER_DID)
  
  return vpJwt;
}

/**
 * vpJwt 검증
 * @returns 검증 유/무 반환
 */
const verifyVp_DID = async (req, res) => {
  console.log("/verify/vp")
  try{
    const vpJwt = req.body.vpJwt;
    const verifiedVP = await verifyPresentation(vpJwt, did.resolver)
    res.status(200).send(verifiedVP);
  }catch(error){
    console.log(error);
    res.status(400).send(error);
  }
}

export default { 
  signUp_DID, 
  issueVc_DID, 
  reissueVc_DID,
  issueVp_DID, 
  verifyVc_DID, 
  verifyVp_DID 
};
