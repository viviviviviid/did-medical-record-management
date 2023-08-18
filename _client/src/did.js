import { EthrDID } from 'ethr-did'
import { Resolver } from 'did-resolver'
import { createJWT, decodeJWT } from 'did-jwt'
import { getResolver } from 'ethr-did-resolver'
import { ethers, Contract } from "ethers"

const chainNameOrId = 5; // goerli
const rpcUrl = process.env.RPC_URL;
const provider = new ethers.InfuraProvider(chainNameOrId, rpcUrl);
console.log(provider);

const registerDID = (data) => { 
  const ethrDid = new EthrDID({ identifier: '0x...', privateKey: '...', provider, chainNameOrId, signer: '...' });
}

export {
    registerDID,
}


