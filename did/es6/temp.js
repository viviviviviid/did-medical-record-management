import { EthrDID } from 'ethr-did';
import { ethers } from 'ethers';

let chainNameOrId = 'goerli';

// 유저를 위한 자체적 키페어 생성 및 did 등록
const registerDid4user = () => {
  const keypair = EthrDID.createKeyPair();
  console.log("keypair: ", keypair);
  const ethrDidOnGoerliNamed = new EthrDID({...keypair, chainNameOrId});
  console.log("ethrDidOnGoerliNamed: ", ethrDidOnGoerliNamed)
}

// 외부 메타마스크 모듈 이용하여 did 등록
// 미완성
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