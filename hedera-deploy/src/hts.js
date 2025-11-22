require('dotenv').config();
const {
  Client,
  AccountId,
  PrivateKey,
  Hbar,
  TokenCreateTransaction,
  TokenType,
  TokenSupplyType,
  TokenMintTransaction,
  TokenBurnTransaction,
  TokenAssociateTransaction,
  TokenDissociateTransaction,
  TokenFreezeTransaction,
  TokenUnfreezeTransaction,
  TokenGrantKycTransaction,
  TokenRevokeKycTransaction,
  TokenPauseTransaction,
  TokenUnpauseTransaction,
  TokenWipeTransaction,
  TokenDeleteTransaction,
  TokenUpdateTransaction,
  TransferTransaction,
  AccountAllowanceApproveTransaction,
  AccountBalanceQuery,
  TokenInfoQuery,
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

async function createFungibleToken({ name, symbol, decimals = 6, initialSupply = 0, treasuryAccountId }) {
  const client = getClient();
  const treasury = AccountId.fromString(treasuryAccountId || process.env.OPERATOR_ID);
  const tx = new TokenCreateTransaction()
    .setTokenName(name)
    .setTokenSymbol(symbol)
    .setTokenType(TokenType.FungibleCommon)
    .setDecimals(decimals)
    .setInitialSupply(initialSupply)
    .setTreasuryAccountId(treasury)
    .setSupplyType(TokenSupplyType.Infinite);
  const resp = await tx.execute(client);
  const receipt = await resp.getReceipt(client);
  return receipt.tokenId.toString();
}

async function mintToken(tokenId, amount) {
  const client = getClient();
  const tx = new TokenMintTransaction().setTokenId(tokenId).setAmount(amount);
  const resp = await tx.execute(client);
  const receipt = await resp.getReceipt(client);
  return receipt.status.toString();
}

async function burnToken(tokenId, amount) {
  const client = getClient();
  const tx = new TokenBurnTransaction().setTokenId(tokenId).setAmount(amount);
  const resp = await tx.execute(client);
  const receipt = await resp.getReceipt(client);
  return receipt.status.toString();
}

async function associateToken(accountId, tokenId) {
  const client = getClient();
  const tx = new TokenAssociateTransaction().setAccountId(AccountId.fromString(accountId)).setTokenIds([tokenId]);
  const resp = await tx.execute(client);
  const receipt = await resp.getReceipt(client);
  return receipt.status.toString();
}

async function dissociateToken(accountId, tokenId) {
  const client = getClient();
  const tx = new TokenDissociateTransaction().setAccountId(AccountId.fromString(accountId)).setTokenIds([tokenId]);
  const resp = await tx.execute(client);
  const receipt = await resp.getReceipt(client);
  return receipt.status.toString();
}

async function freezeToken(tokenId, accountId) {
  const client = getClient();
  const tx = new TokenFreezeTransaction().setTokenId(tokenId).setAccountId(AccountId.fromString(accountId));
  const resp = await tx.execute(client);
  const receipt = await resp.getReceipt(client);
  return receipt.status.toString();
}

async function unfreezeToken(tokenId, accountId) {
  const client = getClient();
  const tx = new TokenUnfreezeTransaction().setTokenId(tokenId).setAccountId(AccountId.fromString(accountId));
  const resp = await tx.execute(client);
  const receipt = await resp.getReceipt(client);
  return receipt.status.toString();
}

async function grantKyc(tokenId, accountId) {
  const client = getClient();
  const tx = new TokenGrantKycTransaction().setTokenId(tokenId).setAccountId(AccountId.fromString(accountId));
  const resp = await tx.execute(client);
  const receipt = await resp.getReceipt(client);
  return receipt.status.toString();
}

async function revokeKyc(tokenId, accountId) {
  const client = getClient();
  const tx = new TokenRevokeKycTransaction().setTokenId(tokenId).setAccountId(AccountId.fromString(accountId));
  const resp = await tx.execute(client);
  const receipt = await resp.getReceipt(client);
  return receipt.status.toString();
}

async function pauseToken(tokenId) {
  const client = getClient();
  const tx = new TokenPauseTransaction().setTokenId(tokenId);
  const resp = await tx.execute(client);
  const receipt = await resp.getReceipt(client);
  return receipt.status.toString();
}

async function unpauseToken(tokenId) {
  const client = getClient();
  const tx = new TokenUnpauseTransaction().setTokenId(tokenId);
  const resp = await tx.execute(client);
  const receipt = await resp.getReceipt(client);
  return receipt.status.toString();
}

async function wipeToken(tokenId, accountId, amount) {
  const client = getClient();
  const tx = new TokenWipeTransaction().setTokenId(tokenId).setAccountId(AccountId.fromString(accountId)).setAmount(amount);
  const resp = await tx.execute(client);
  const receipt = await resp.getReceipt(client);
  return receipt.status.toString();
}

async function deleteToken(tokenId) {
  const client = getClient();
  const tx = new TokenDeleteTransaction().setTokenId(tokenId);
  const resp = await tx.execute(client);
  const receipt = await resp.getReceipt(client);
  return receipt.status.toString();
}

async function updateToken(tokenId, { name, symbol, treasuryAccountId }) {
  const client = getClient();
  const tx = new TokenUpdateTransaction().setTokenId(tokenId);
  if (name) tx.setTokenName(name);
  if (symbol) tx.setTokenSymbol(symbol);
  if (treasuryAccountId) tx.setTreasuryAccountId(AccountId.fromString(treasuryAccountId));
  const resp = await tx.execute(client);
  const receipt = await resp.getReceipt(client);
  return receipt.status.toString();
}

async function transferToken(tokenId, fromAccountId, toAccountId, amount) {
  const client = getClient();
  const tx = new TransferTransaction()
    .addTokenTransfer(tokenId, AccountId.fromString(fromAccountId), -amount)
    .addTokenTransfer(tokenId, AccountId.fromString(toAccountId), amount);
  const resp = await tx.execute(client);
  const receipt = await resp.getReceipt(client);
  return receipt.status.toString();
}

async function approveTokenAllowance(tokenId, ownerAccountId, spenderAccountId, amount) {
  const client = getClient();
  const tx = new AccountAllowanceApproveTransaction().approveTokenAllowance(
    tokenId,
    AccountId.fromString(ownerAccountId),
    AccountId.fromString(spenderAccountId),
    amount
  );
  const resp = await tx.execute(client);
  const receipt = await resp.getReceipt(client);
  return receipt.status.toString();
}

async function approveHbarAllowance(ownerAccountId, spenderAccountId, amountTinybars) {
  const client = getClient();
  const tx = new AccountAllowanceApproveTransaction().approveHbarAllowance(
    AccountId.fromString(ownerAccountId),
    AccountId.fromString(spenderAccountId),
    new Hbar(amountTinybars).toTinybars()
  );
  const resp = await tx.execute(client);
  const receipt = await resp.getReceipt(client);
  return receipt.status.toString();
}

async function transferHbar(toAccountId, amountHbar) {
  const client = getClient();
  const tx = new TransferTransaction()
    .addHbarTransfer(AccountId.fromString(process.env.OPERATOR_ID), new Hbar(-amountHbar))
    .addHbarTransfer(AccountId.fromString(toAccountId), new Hbar(amountHbar));
  const resp = await tx.execute(client);
  const receipt = await resp.getReceipt(client);
  return receipt.status.toString();
}

async function getAccountBalance(accountId) {
  const client = getClient();
  const balance = await new AccountBalanceQuery().setAccountId(AccountId.fromString(accountId)).execute(client);
  const tokens = {};
  for (const [tokenId, bal] of balance.tokens) {
    tokens[tokenId.toString()] = bal;
  }
  return {
    hbar: balance.hbars.toTinybars(),
    tokens,
  };
}

async function getTokenInfo(tokenId) {
  const client = getClient();
  const info = await new TokenInfoQuery().setTokenId(tokenId).execute(client);
  return {
    tokenId: info.tokenId.toString(),
    name: info.name,
    symbol: info.symbol,
    decimals: info.decimals,
    totalSupply: info.totalSupply.toString(),
    treasury: info.treasuryAccountId.toString(),
    adminKey: info.adminKey ? 'set' : 'unset',
    supplyKey: info.supplyKey ? 'set' : 'unset',
    pauseKey: info.pauseKey ? 'set' : 'unset',
    kycKey: info.kycKey ? 'set' : 'unset',
    freezeKey: info.freezeKey ? 'set' : 'unset',
  };
}

module.exports = {
  createFungibleToken,
  mintToken,
  burnToken,
  associateToken,
  dissociateToken,
  freezeToken,
  unfreezeToken,
  grantKyc,
  revokeKyc,
  pauseToken,
  unpauseToken,
  wipeToken,
  deleteToken,
  updateToken,
  transferToken,
  approveTokenAllowance,
  approveHbarAllowance,
  transferHbar,
  getAccountBalance,
  getTokenInfo,
};