import { EthrDID, DelegateTypes } from 'ethr-did';
import { verifyCredential, createVerifiableCredentialJwt} from 'did-jwt-vc';
import { Resolver } from 'did-resolver'
import { getResolver } from 'ethr-did-resolver'
import { ethers } from 'ethers';
import dotenv from "dotenv";

dotenv.config({
  path: "./.env"
});

const chainNameOrId = 'goerli';
const rpcUrl = process.env.RPC_URL;
// JsonRpcProvider은 ethers의 안정화된 5.7.2 버전에서 사용가능 
const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
const ISSUER_SIGNER = new ethers.Wallet(process.env.ISSUER_PRIVATEKEY, provider);

// Create Issuer DID
export const ISSUER_DID = new EthrDID({
  identifier: process.env.ISSUER_ADDRESS,
  privateKey: process.env.ISSUER_PRIVATEKEY,
  provider: ISSUER_SIGNER.provider, 
  chainNameOrId,
  txSigner: ISSUER_SIGNER,
  alg: "ES256K",
})

// Create Holder/Subject DID
const SUBJECT_DID = new EthrDID({
  identifier: process.env.SUBJECT_ADDRESS,
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

// web3 공급자들은 JWT ES256K나 (등록되지 않은) ES256K-R 알고리즘과 호환되는 방식으로 직접 데이터에 서명하는 능력이 없기에 대리자를 임명 또는 생성시켜 서명해야한다.
const { kp, txHash } = await ISSUER_DID.createSigningDelegate(
  DelegateTypes.veriKey, // JWT에 서명하기 위한 기본 옵션
  3600, // expiresIn : 3600s
)

// 대리 서명자의 DID 생성
const DELEGATE_ISSUER_DID = new EthrDID({
  identifier: kp.address,
  privateKey: kp.privateKey,
  provider: ISSUER_SIGNER.provider, 
  chainNameOrId
});

// VC JWT 생성
const vcJwt = await createVerifiableCredentialJwt(vcPayload, DELEGATE_ISSUER_DID);

// VC JWT 검증
const resolver = new Resolver(getResolver({ rpcUrl, name: "goerli" }));
const verifiedVC = await verifyCredential(vcJwt, resolver)

console.log(verifiedVC)

// DID resolver 사용 및 DID Document 생성

// const didResolving = async (ISSUER_DID) => {
//   const didResolver = new Resolver(getResolver({ rpcUrl, name: "goerli" }));
//   const didDocument = (await didResolver.resolve(ISSUER_DID.did)).didDocument

//   // JWT로 인코딩, 디코딩, 유효확인 테스트 -> 사용은 안할 듯
//   // const tempJwt = await ISSUER_DID.signJWT({hello: 'world'});
//   // console.log("TEMP JWT", tempJwt);
//   // const decoded = decodeJWT(tempJwt)
//   // console.log("DECODED",decoded)
//   // try{
//   //   const {payload, issuer} = await ISSUER_DID.verifyJWT(tempJwt, didResolver);
//   //   console.log("PAYLOAD", payload);
//   //   console.log("ISSUER", issuer);
//   // }catch(err){
//   //   console.log("verifying JWT error: ", err);
//   // }
  
//   // addDelegate로 일시적 서명 위임
//   // web3에다가 provider 주입하고 web3.eth.주소 이런식으로해야 이더리움 네트워크에 트잭 남길 수 있음
//   // await ISSUER_DID.addDelegate("0x093018c5F85DeDeC37AbE7ec189C669B1c117245", {expiresIn: 8640000, delegateType: 'sigAuth'})

// }
// // didResolving(ISSUER_DID)

// 유저를 위한 자체적 키페어 생성 및 did 등록

// const registerDID4user = () => {
//   const keypair = EthrDID.createKeyPair();
//   console.log("keypair: ", keypair);
//   const ethrDidOnGoerliNamed = new EthrDID({...keypair, chainNameOrId});
//   console.log("ethrDidOnGoerliNamed: ", ethrDidOnGoerliNamed)
// }

// 미완성

// 외부 메타마스크 모듈 이용하여 did 등록
// const importMetamask2DID = async () => {
//   const accounts = await provider.listAccounts();
// const ethrDid = new EthrDID({identifier: accounts[0], provider, chainNameOrId});
// }
