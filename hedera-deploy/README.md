# Hedera Contract Deployment

This subproject compiles a Solidity contract and deploys it to Hedera using the JavaScript SDK.

## Prerequisites
- Node.js 18+
- Hedera operator credentials:
  - `OPERATOR_ID` (e.g., `0.0.12345`)
  - `OPERATOR_KEY` (private key in DER format string)
- Network: `testnet` (default), `previewnet`, or `mainnet`

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and fill your values:
   ```bash
   cp .env.example .env
   ```
   Update:
   ```env
   OPERATOR_ID=0.0.xxxxx
   OPERATOR_KEY=302e020100300506032b657004220420...
   NETWORK=testnet
   ```

## Deploy
Run:
```bash
npm run deploy
```
If successful, it prints a `Contract deployed: <contractId>`.

## Contract
- `contracts/AgentRegistry.sol`: registry with `register`, `update`, and `get`.
- Adds ERC20 helpers:
  - `balanceOfToken(address token, address owner)` — returns ERC20 balance.
  - `transferTokenFrom(address token, address to, uint256 amount)` — spends caller’s ERC20 allowance to transfer.

### Using Allowances (Hedera)
- Approve this contract as a spender from your wallet for a given ERC20 token.
- Call `transferTokenFrom(token, to, amount)`; it will check `allowance(msg.sender, this)` and perform `transferFrom`.
- Works with ERC20-compatible tokens on Hedera (e.g., HTS tokens with ERC20 interface).

## Hedera Services Helpers
This project includes Node.js helpers for Hedera services (HTS, HCS, HFS) under `src/`.

### HTS (Token Service) — `src/hts.js`
- createFungibleToken({ name, symbol, decimals, initialSupply, treasuryAccountId })
- mintToken(tokenId, amount)
- burnToken(tokenId, amount)
- associateToken(accountId, tokenId)
- dissociateToken(accountId, tokenId)
- freezeToken(tokenId, accountId)
- unfreezeToken(tokenId, accountId)
- grantKyc(tokenId, accountId)
- revokeKyc(tokenId, accountId)
- pauseToken(tokenId)
- unpauseToken(tokenId)
- wipeToken(tokenId, accountId, amount)
- deleteToken(tokenId)
- updateToken(tokenId, { name, symbol, treasuryAccountId })
- transferToken(tokenId, fromAccountId, toAccountId, amount)
- approveTokenAllowance(tokenId, ownerAccountId, spenderAccountId, amount)
- approveHbarAllowance(ownerAccountId, spenderAccountId, amountTinybars)
- transferHbar(toAccountId, amountHbar)
- getAccountBalance(accountId)
- getTokenInfo(tokenId)

Example:
```js
const hts = require('./src/hts');
(async () => {
  const tokenId = await hts.createFungibleToken({
    name: 'Agentia Token',
    symbol: 'AGT',
    decimals: 6,
    initialSupply: 1000000,
  });
  await hts.mintToken(tokenId, 5000);
  await hts.associateToken(process.env.OPERATOR_ID, tokenId);
  await hts.transferToken(tokenId, process.env.OPERATOR_ID, '0.0.xxxx', 100);
})();
```

### HCS (Consensus Service) — `src/hcs.js`
- topicCreate({ memo, adminKey, submitKey })
- topicUpdate(topicId, { memo, adminKey, submitKey })
- topicDelete(topicId)
- topicMessageSubmit(topicId, message)
- mirrorUrls(topicId, { startTime, endTime, network }) — helper to construct REST and WebSocket Mirror Node URLs

Example:
```js
const hcs = require('./src/hcs');
(async () => {
  const topicId = await hcs.topicCreate({ memo: 'Agentia Topic' });
  await hcs.topicMessageSubmit(topicId, 'hello from agent');
  const { restUrl, wsUrl } = hcs.mirrorUrls(topicId, {});
  console.log('REST:', restUrl);
  console.log('WS:', wsUrl);
})();
```

### HFS (File Service) — `src/hfs.js`
- fileCreate({ contents, keys })
- fileAppend(fileId, contents)
- fileUpdate(fileId, contents)
- fileDelete(fileId)
- fileRead(fileId)

Example:
```js
const hfs = require('./src/hfs');
(async () => {
  const fileId = await hfs.fileCreate({ contents: 'initial contents' });
  await hfs.fileAppend(fileId, 'more contents');
  await hfs.fileUpdate(fileId, 'replaced contents');
  const contents = await hfs.fileRead(fileId);
  console.log(contents);
  await hfs.fileDelete(fileId);
})();
```

Notes:
- Some HTS admin actions require the respective keys (admin, kyc, freeze, pause, wipe, supply) to be set on token creation and the executing operator must hold the matching key.
- HCS subscription is performed via Mirror Node REST/WebSocket. The `mirrorUrls` helper constructs endpoints; use your preferred HTTP/WebSocket client to consume.
- HTS/ERC-20 allowances: Use `approveTokenAllowance` or `approveHbarAllowance` to enable allowance-based transfers from agents.

## Notes
- The script compiles Solidity via `solc` and deploys with `ContractCreateFlow`.
- Ensure your operator account has sufficient HBAR balance on the target network.
- Some operations (associate, allowances, mint/burn) require specific keys/roles; for demos, using the operator as treasury/supply/admin is simplest.
- HCS message retrieval uses mirror node APIs (not included); examples show creation and submit.
- For mainnet, double-check keys and consider gas limits and fees.