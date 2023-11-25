import dotenv from 'dotenv';
dotenv.config({path: "./.env"});

import { EthrDID, DelegateTypes } from 'ethr-did';
import { createVerifiableCredentialJwt, verifyCredential, createVerifiablePresentationJwt, verifyPresentation } from 'did-jwt-vc';
import ethers from "ethers";
import did from "./did.instance.js";

const chainNameOrId = "goerli"
const rpcUrl = process.env.RPC_URL;

const signUp_DID = async (req, res) => {
  try{
    console.log("/register")
    console.log(req.body.userInfo);
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
          medicalRecords: req.body.hash,
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

// const addRecordHash_DID = async (req, res) => {
//   console.log("/new-record")
//   const SUBJECT_DID = req.body.decodedPayload.sub;
//   const recordHash = req.body.hash;
//   const userInfo = req.body.decodedPayload.vc.credentialSubject.userInfo;

//   const vcPayload = {
//     sub: SUBJECT_DID,
//     vc: {
//       '@context': ['https://www.w3.org/2018/credentials/v1'],
//       type: ['VerifiableCredential'],
//       credentialSubject: {
//         issuer: {
//           name: 'Medical Record Management Association',
//           address: process.env.ISSUER_ADDRESS,
//         },
//         userInfo: userInfo,
//         medicalRecords: recordHash,
//         doctorLicense: null,
//       }
//     }
//   }

//   const vcJwt = await createVcJwtWithPayload(vcPayload);
//   res.status(200).send(vcJwt)
// }

const issueVc_DID = async (req, res) => {
  console.log("/issue-vc")
  console.log(req.body)
  const SUBJECT_DID = req.body.patientDID;
  const hospital = req.body.newRecord.hospital;
  const medicalRecords = req.body.newRecord;

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
        medicalRecords: medicalRecords
      }
    }
  }
  console.log("issueVc_DID function vcPayload: ", vcPayload);
  const vcJwt = await createVcJwtWithPayload(vcPayload);
  console.log("issueVc_DID function vcJwt: ", vcJwt);
  res.status(200).send(vcJwt)
}

// vc의 내용을 업데이트하고 재발급해야할 경우 (특정 병원에서 진료 추가가 되었을때)
const reissueVc_DID = async (req, res) => {
  console.log("/reissue-vc")
  console.log(req.body)
  const newRecord = req.body.newRecord;
  const vcJwt = req.body.vcJwt;

  // vcJwt의 medicalrecord 부분에 내용에 newRecord를 추가
 
  console.log("issueVc_DID function vcPayload: ", vcPayload);
  vcJwt = await createVcJwtWithPayload(vcPayload);
  console.log("issueVc_DID function vcJwt: ", vcJwt);
  res.status(200).send(vcJwt)
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
  try{
    console.log("/verify-vc")
    console.log(req.body)
    const vcJwt = req.body.vcJwt;
    const verifiedVC = await verifyCredential(vcJwt, did.resolver)
    console.log(verifiedVC)
    res.status(200).send(verifiedVC);
  }catch(error){
    console.log(error);
    res.status(400).send(error);
  }
}

/**
 * 
 */
const issueVp_DID = async (req, res) => {
  try{
    console.log("/issue-vp")
    const vcJwts = req.body.vcJwts;
    console.log(vcJwts)
    const vpPayload = {
      vp: {
        '@context': ['https://www.w3.org/2018/credentials/v1'],
        type: ['VerifiablePresentation'],
        verifiableCredential: vcJwts
      }
    }
    console.log("issueVp_DID function vcPayload: ", vpPayload.vp);
    const vpJwt = await createVpJwtWithPayload(vpPayload)
    console.log("issueVp_DID function vcJwt: ", vpJwt);
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
  try{
    console.log("/verify-vp")
    const vpJwt = req.body.vpJwt;
    const verifiedVP = await verifyPresentation(vpJwt, did.resolver)
    console.log(verifiedVP)
    res.status(200).send(verifiedVP);
  }catch(error){
    console.log(error);
    res.status(400).send(error);
  }
}

export default { 
  // addRecordHash_DID, 
  signUp_DID, 
  issueVp_DID, 
  issueVc_DID, 
  verifyVc_DID, 
  verifyVp_DID 
};
