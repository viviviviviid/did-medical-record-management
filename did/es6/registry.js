const { EthereumDIDRegistry } = require('ethr-did-registry')

const chainNameOrId = 5 // goerli
const provider = InfuraProvider("<infura project ID>", chainNameOrId)
const ethrDid = new EthrDID({ identifier: '0x...', privateKey: '...', provider, chainNameOrId }) 