import dotenv from 'dotenv';
dotenv.config({path: "./.env"});

import { EthrDID } from 'ethr-did';
import { Resolver } from 'did-resolver'
import { getResolver } from 'ethr-did-resolver'
import { ethers } from 'ethers';

const chainNameOrId = 'goerli';
const rpcUrl = process.env.RPC_URL;
// JsonRpcProvider은 ethers의 안정화된 5.7.2 버전에서 사용가능 
const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
const resolver = new Resolver(getResolver({ rpcUrl, name: "goerli" }));
const issuerSigner = new ethers.Wallet(process.env.ISSUER_PRIVATEKEY, provider);

// Create Issuer DID
const ISSUER_DID = new EthrDID({
  identifier: process.env.ISSUER_ADDRESS,
  privateKey: process.env.ISSUER_PRIVATEKEY,
  provider: issuerSigner.provider, 
  chainNameOrId,
  txSigner: issuerSigner,
  alg: "ES256K",
})

const did = {};

did.chainNameOrId = chainNameOrId;
did.provider = provider;
did.resolver = resolver;
did.issuerSigner = issuerSigner;
did.ISSUER_DID = ISSUER_DID;

export default did;

