import { EthrDID, DelegateTypes } from 'ethr-did';
import { verifyCredential, createVerifiableCredentialJwt} from 'did-jwt-vc';
import dotenv from "dotenv";
import did from "./did.instance.js";
import jwt from "jsonwebtoken";
import ethers from "ethers";

dotenv.config({
  path: "./.env"
});

const chainNameOrId = "goerli"
const rpcUrl = process.env.RPC_URL;

const signUp_DID = async (data) => {

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

  // 첫 생성이라 medicalRecords 테이블내에 아무것도 없겠지만, findAll_DID을 했을때 null 값이 오는게 아니므로 그걸 해시화해서 삽입
  const dbData = findAll_DID(SUBJECT_DID);
  const hash = createHash4DidUpdate(dbData);

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
        medicalRecords: hash,
        doctorLicense: null,
      }
    }
  }
  
  const vcJwt = await createVcJwtWithPayload(vcPayload);
 
  return {jwt: vcJwt, wallet: walletInfo, did: SUBJECT_DID};
}

const update_DID = async (lastVcJwt, hash) => {
  
  // VC JWT 검증없이 내부 payload 가져오기, 이미 진료전에 받은 vcJwt를 검증했기 때문
  const decodedPayload = jwt.decode(lastVcJwt);

  const vcPayload = {
    sub: decodedPayload.sub,
    vc: {
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiableCredential'],
      credentialSubject: {
        issuer: {
          name: 'Medical Record Management Association',
          address: process.env.ISSUER_ADDRESS,
        },
        userInfo: decodedPayload.vc.credentialSubject.userInfo,
        medicalRecords: hash,
        doctorLicense: null,
      }
    }
  }

  return createVcJwtWithPayload(vcPayload);
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

export { signUp_DID, update_DID };