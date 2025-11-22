require('dotenv').config();
const {
  Client,
  AccountId,
  PrivateKey,
  Hbar,
  FileCreateTransaction,
  FileAppendTransaction,
  FileUpdateTransaction,
  FileDeleteTransaction,
  FileContentsQuery,
} = require('@hashgraph/sdk');

function getClient() {
  const network = (process.env.NETWORK || 'testnet').toLowerCase();
  const OPERATOR_ID = process.env.OPERATOR_ID;
  const OPERATOR_KEY = process.env.OPERATOR_KEY;
  if (!OPERATOR_ID || !OPERATOR_KEY) throw new Error('Missing OPERATOR_ID/OPERATOR_KEY');
  const client =
    network === 'mainnet' ? Client.forMainnet() : network === 'previewnet' ? Client.forPreviewnet() : Client.forTestnet();
  client.setOperator(AccountId.fromString(OPERATOR_ID), PrivateKey.fromString(OPERATOR_KEY));
  return client;
}

async function fileCreate({ contents = '', keys = [] }) {
  const client = getClient();
  const tx = new FileCreateTransaction()
    .setKeys(keys.length ? keys.map(PrivateKey.fromString) : [PrivateKey.fromString(process.env.OPERATOR_KEY)])
    .setContents(contents);
  const resp = await tx.execute(client);
  const receipt = await resp.getReceipt(client);
  return receipt.fileId.toString();
}

async function fileAppend(fileId, contents) {
  const client = getClient();
  const tx = new FileAppendTransaction().setFileId(fileId).setContents(contents);
  const resp = await tx.execute(client);
  const receipt = await resp.getReceipt(client);
  return receipt.status.toString();
}

async function fileUpdate(fileId, contents) {
  const client = getClient();
  const tx = new FileUpdateTransaction().setFileId(fileId).setContents(contents);
  const resp = await tx.execute(client);
  const receipt = await resp.getReceipt(client);
  return receipt.status.toString();
}

async function fileDelete(fileId) {
  const client = getClient();
  const tx = new FileDeleteTransaction().setFileId(fileId);
  const resp = await tx.execute(client);
  const receipt = await resp.getReceipt(client);
  return receipt.status.toString();
}

async function fileRead(fileId) {
  const client = getClient();
  const contents = await new FileContentsQuery().setFileId(fileId).execute(client);
  return contents.toString();
}

module.exports = {
  fileCreate,
  fileAppend,
  fileUpdate,
  fileDelete,
  fileRead,
};