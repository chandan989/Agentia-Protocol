require('dotenv').config();
const { Client, AccountId, PrivateKey, ContractInfoQuery, ContractId } = require('@hashgraph/sdk');

function getClient(network) {
  switch ((process.env.NETWORK || network || 'testnet').toLowerCase()) {
    case 'mainnet': return Client.forMainnet();
    case 'previewnet': return Client.forPreviewnet();
    default: return Client.forTestnet();
  }
}

(async () => {
  const OPERATOR_ID = process.env.OPERATOR_ID;
  const OPERATOR_KEY = process.env.OPERATOR_KEY;
  const NETWORK = process.env.NETWORK || 'testnet';
  const CONTRACT_ID = process.argv[2] || '0.0.7304645';
  if (!OPERATOR_ID || !OPERATOR_KEY) {
    console.error('Missing OPERATOR_ID or OPERATOR_KEY in .env');
    process.exit(1);
  }
  const contractId = ContractId.fromString(CONTRACT_ID);
  const evmFromId = '0x' + contractId.toSolidityAddress();
  console.log('Contract ID:', contractId.toString());
  console.log('EVM Address:', evmFromId);
})();