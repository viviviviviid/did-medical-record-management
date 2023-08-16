import { ethers } from 'ethers';
import { verifyCredential, createVerifiableCredentialJwt} from 'did-jwt-vc';
import { EthrDID, DelegateTypes } from 'ethr-did';
import dotenv from "dotenv";
// import { ISSUER_DID } from './did.js';

dotenv.config({
  path: "../.env"
});

const chainNameOrId = 5;

// Create Holder/Subject DID
const SUBJECT_DID = new EthrDID({
  chainNameOrId,
  identifier: process.env.SUBJECT_ADDRESS
})

const vcPayload = {
  sub: subjectDID,
  vc: {
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    type: ['VerifiableCredential'],
    credentialSubject: {
      issuer: {
        name: 'Medical Record Management Association',
        // id: ISSUER_DID,
      },
      userInfo: {
        // 지금은 테스트용, 추후 회원가입 내용을 DB통해서 받아와야함
        name: "홍길동",
        email: "hello@world.com",
        birthDay: "970723",
        phoneNumber: "010-1234-5678",
        isDoctor: true,
        address: "0x093018c5F85DeDeC37AbE7ec189C669B1c117245",
      }
    }
  }
}

// console.log(vcPayload);