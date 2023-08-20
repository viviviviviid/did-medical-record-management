import { EthrDID, DelegateTypes } from 'ethr-did';
import { verifyCredential, createVerifiableCredentialJwt} from 'did-jwt-vc';
import dotenv from "dotenv";
import did from "./did.instance.js";

dotenv.config({
  path: "./.env"
});

export const signUp_DID = async (data) => {

  const chainNameOrId = "goerli"
  const rpcUrl = process.env.RPC_URL;
  
  // Create Holder/Subject DID
  const SUBJECT_DID = new EthrDID({
    identifier: data.address, // db data로 address가 와야함
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
          address: data.address,
        },
        medicalRecords: {

        }
      }
    }
  }

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

  const verifiedVC = await verifyCredential(vcJwt, did.resolver)

  console.log(verifiedVC)
}
