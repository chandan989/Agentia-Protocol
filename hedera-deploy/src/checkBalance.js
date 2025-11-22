require('dotenv').config();
const { getAccountBalance } = require('./hts');

(async () => {
  try {
    const accountId = process.env.OPERATOR_ID;
    console.log(`Checking balance for ${accountId} on ${process.env.NETWORK || 'testnet'}...`);
    const bal = await getAccountBalance(accountId);
    console.log('Balance (tinybars):', bal.hbar);
    console.log('Token balances:', bal.tokens);
  } catch (err) {
    console.error('Balance check failed:', err.status?.toString?.() || err.message || err);
    process.exit(1);
  }
})();