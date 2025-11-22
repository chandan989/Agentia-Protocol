require('dotenv').config();
const fs = require('fs');
const path = require('path');
const solc = require('solc');
const { Client, AccountId, PrivateKey, ContractCreateFlow, TransactionRecordQuery } = require('@hashgraph/sdk');

function compileContract(contractPath) {
  const source = fs.readFileSync(contractPath, 'utf8');
  const input = {
    language: 'Solidity',
    sources: {
      [path.basename(contractPath)]: { content: source },
    },
    settings: {
      optimizer: { enabled: true, runs: 200 },
      outputSelection: {
        '*': {
          '*': ['abi', 'evm.bytecode.object']
        }
      }
    }
  };
  const output = JSON.parse(solc.compile(JSON.stringify(input)));
  const file = Object.keys(output.contracts)[0];
  const contractName = Object.keys(output.contracts[file])[0];
  const artifact = output.contracts[file][contractName];
  if (!artifact || !artifact.evm || !artifact.evm.bytecode || !artifact.evm.bytecode.object) {
    throw new Error('Compilation failed or bytecode missing');
  }
  return { abi: artifact.abi, bytecodeHex: artifact.evm.bytecode.object.replace(/^0x/, ''), contractName };
}

function getClient(network) {
  switch ((network || 'testnet').toLowerCase()) {
    case 'mainnet':
      return Client.forMainnet();
    case 'previewnet':
      return Client.forPreviewnet();
    default:
      return Client.forTestnet();
  }
}

(async () => {
  const OPERATOR_ID = process.env.OPERATOR_ID;
  const OPERATOR_KEY = process.env.OPERATOR_KEY;
  const NETWORK = process.env.NETWORK || 'testnet';

  if (!OPERATOR_ID || !OPERATOR_KEY) {
    console.error('Missing OPERATOR_ID or OPERATOR_KEY in .env');
    process.exit(1);
  }

  const contractPath = path.resolve(__dirname, '../contracts/AgentRegistry.sol');
  console.log(`Compiling: ${contractPath}`);
  const { bytecodeHex, contractName } = compileContract(contractPath);
  console.log(`Bytecode length: ${bytecodeHex.length}`);
  console.log(`Bytecode prefix: ${bytecodeHex.slice(0, 20)}...`);

  const client = getClient(NETWORK);
  client.setOperator(AccountId.fromString(OPERATOR_ID), PrivateKey.fromString(OPERATOR_KEY));

  console.log(`Deploying ${contractName} to Hedera ${NETWORK}...`);
  const flow = new ContractCreateFlow().setBytecode(bytecodeHex).setGas(5_000_000);

  try {
    const txResponse = await flow.execute(client);
    console.log('Submitted create tx, awaiting receipt...');
    const record = await txResponse.getRecord(client);
    if (record?.contractCreateResult?.errorMessage) {
      console.error('EVM error message:', record.contractCreateResult.errorMessage);
    }
    const receipt = await txResponse.getReceipt(client);
    const contractId = receipt.contractId?.toString?.() || 'UNKNOWN';
    console.log(`Contract deployed: ${contractId}`);
  } catch (err) {
    const status = err?.status?.toString?.() || 'UNKNOWN';
    console.error('Deployment failed with status:', status);
    if (err?.transactionId) {
      console.error('Transaction ID:', err.transactionId.toString());
      try {
        const record = await new TransactionRecordQuery().setTransactionId(err.transactionId).execute(client);
        if (record?.contractCreateResult?.errorMessage) {
          console.error('EVM error message:', record.contractCreateResult.errorMessage);
        } else {
          console.error('No EVM error message available in record.');
        }
      } catch (recordErr) {
        console.error('Failed to fetch transaction record:', recordErr?.message || recordErr);
      }
    }
    if (err?.message) {
      console.error('Error message:', err.message);
    }
    console.error(err);
    process.exit(1);
  }
})();