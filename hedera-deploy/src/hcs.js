require('dotenv').config();
const {
  Client,
  AccountId,
  PrivateKey,
  TopicCreateTransaction,
  TopicUpdateTransaction,
  TopicDeleteTransaction,
  TopicMessageSubmitTransaction,
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

async function topicCreate({ memo = '', adminKey = null, submitKey = null }) {
  const client = getClient();
  const tx = new TopicCreateTransaction().setTopicMemo(memo);
  if (adminKey) tx.setAdminKey(PrivateKey.fromString(adminKey));
  if (submitKey) tx.setSubmitKey(PrivateKey.fromString(submitKey));
  const resp = await tx.execute(client);
  const receipt = await resp.getReceipt(client);
  return receipt.topicId.toString();
}

async function topicUpdate(topicId, { memo = null, adminKey = null, submitKey = null }) {
  const client = getClient();
  const tx = new TopicUpdateTransaction().setTopicId(topicId);
  if (memo !== null) tx.setTopicMemo(memo);
  if (adminKey) tx.setAdminKey(PrivateKey.fromString(adminKey));
  if (submitKey) tx.setSubmitKey(PrivateKey.fromString(submitKey));
  const resp = await tx.execute(client);
  const receipt = await resp.getReceipt(client);
  return receipt.status.toString();
}

async function topicDelete(topicId) {
  const client = getClient();
  const tx = new TopicDeleteTransaction().setTopicId(topicId);
  const resp = await tx.execute(client);
  const receipt = await resp.getReceipt(client);
  return receipt.status.toString();
}

async function topicMessageSubmit(topicId, message) {
  const client = getClient();
  const tx = new TopicMessageSubmitTransaction().setTopicId(topicId).setMessage(message);
  const resp = await tx.execute(client);
  const receipt = await resp.getReceipt(client);
  return receipt.status.toString();
}

// NOTE: HCS message subscription is done client-side via mirror node REST/WebSocket.
// Provide a helper to construct a REST URL for range queries and a WebSocket URL.
function mirrorUrls(topicId, { startTime = null, endTime = null, network = (process.env.NETWORK || 'testnet') }) {
  const base = network.toLowerCase() === 'mainnet'
    ? 'https://mainnet-public.mirrornode.hedera.com'
    : network.toLowerCase() === 'previewnet'
    ? 'https://previewnet.mirrornode.hedera.com'
    : 'https://testnet.mirrornode.hedera.com';
  const params = [];
  if (startTime) params.push(`timestamp=gte:${startTime}`);
  if (endTime) params.push(`timestamp=lte:${endTime}`);
  const restUrl = `${base}/api/v1/topics/${topicId}/messages${params.length ? '?' + params.join('&') : ''}`;
  const wsUrl = `${base.replace('https://', 'wss://')}/api/v1/topics/${topicId}/messages?format=protobuf`;
  return { restUrl, wsUrl };
}

module.exports = {
  topicCreate,
  topicUpdate,
  topicDelete,
  topicMessageSubmit,
  mirrorUrls,
};