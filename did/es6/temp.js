import { EthrDID } from 'ethr-did';
import { Resolver } from 'did-resolver'
import { getResolver } from 'ethr-did-resolver'
import { ethers } from 'ethers';
import dotenv from "dotenv";

dotenv.config({
  path: "../.env"
});

let chainNameOrId = 'goerli';

// Issuer의 DID 필드 생성
const createDID4issuer = () => {
   // Issuer의 지갑주소는 메타마스크 5번 지갑
  const rpcUrl = process.env.RPC_URL;
  const provider = new ethers.InfuraProvider(chainNameOrId, rpcUrl);
  const ISSUER_SIGNER = new ethers.Wallet(process.env.ISSUER_PK, provider);
  const ISSUER_DID = new EthrDID({
    identifier: process.env.ISSUER_ADDRESS,
    privateKey: process.env.ISSUER_PK,
    provider: ISSUER_SIGNER.InfuraProvider, chainNameOrId,
    txSigner: ISSUER_SIGNER,
    alg: "ES256K",
  })
}

// 유저를 위한 자체적 키페어 생성 및 did 등록
const registerDID4user = () => {
  const keypair = EthrDID.createKeyPair();
  console.log("keypair: ", keypair);
  const ethrDidOnGoerliNamed = new EthrDID({...keypair, chainNameOrId});
  console.log("ethrDidOnGoerliNamed: ", ethrDidOnGoerliNamed)
}

// 미완성
// 외부 메타마스크 모듈 이용하여 did 등록
// const importMetamask2DID = async () => {
//   const rpcUrl = process.env.RPC_URL;
//   const provider = new ethers.InfuraProvider(chainNameOrId, rpcUrl);
//   console.log("1")
//   const accounts = await provider.listAccounts();
//   console.log(accounts)
//   // const ethrDid = new EthrDID({identifier: accounts[0], provider, chainNameOrId});
//   console.log("3")
// }



// 어떤 모듈이 존재하는지 주석달기
// 어떤 기능이 필요한지 주석달기