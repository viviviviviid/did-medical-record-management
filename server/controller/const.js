const { ethers } = require('ethers');
const EthrDID = require('ethr-did');

require("dotenv").config();

const chainNameOrId = 5; // goerli
const rpcUrl = process.env.RPC_URL;
// const provider = new ethers.InfuraProvider(chainNameOrId, rpcUrl);
console.log(provider)
// const ethrDid = new EthrDID({ identifier: '0x...', privateKey: '...', provider, chainNameOrId });