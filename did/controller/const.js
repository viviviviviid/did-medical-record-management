const { ethers } = require('ethers');
// const { EthrDID, DelegateTypes } = require('ethr-did');
// const { EthereumDIDRegistry } = require('ethr-did-registry');

require("dotenv").config();

const chainNameOrId = 5; // goerli
const rpcUrl = process.env.RPC_URL;
const provider = new ethers.InfuraProvider(chainNameOrId, rpcUrl);
// const ethrDid = new EthrDID({ identifier: '0x...', privateKey: '...', provider, chainNameOrId });