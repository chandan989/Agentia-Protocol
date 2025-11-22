const fs = require('fs');
const path = require('path');
const solc = require('solc');

function compileAbi(contractPath) {
  const source = fs.readFileSync(contractPath, 'utf8');
  const input = {
    language: 'Solidity',
    sources: { [path.basename(contractPath)]: { content: source } },
    settings: {
      optimizer: { enabled: true, runs: 200 },
      outputSelection: { '*': { '*': ['abi'] } }
    }
  };
  const output = JSON.parse(solc.compile(JSON.stringify(input)));
  const file = Object.keys(output.contracts)[0];
  const contractName = Object.keys(output.contracts[file])[0];
  const artifact = output.contracts[file][contractName];
  if (!artifact?.abi) throw new Error('Compilation failed or ABI missing');
  return { abi: artifact.abi, contractName };
}

(function main() {
  const contractPath = path.resolve(__dirname, '../contracts/AgentRegistry.sol');
  console.log(`Compiling ABI: ${contractPath}`);
  const { abi, contractName } = compileAbi(contractPath);
  const outDirDeploy = path.resolve(__dirname, '../artifacts');
  const outDirWeb = path.resolve(__dirname, '../../agentia-web/src/data');
  fs.mkdirSync(outDirDeploy, { recursive: true });
  fs.mkdirSync(outDirWeb, { recursive: true });
  const abiJson = JSON.stringify({ contractName, abi }, null, 2);
  const deployOut = path.join(outDirDeploy, `${contractName}.json`);
  const webOut = path.join(outDirWeb, `${contractName}.json`);
  fs.writeFileSync(deployOut, abiJson);
  fs.writeFileSync(webOut, abiJson);
  console.log('ABI written to:');
  console.log(' -', deployOut);
  console.log(' -', webOut);
})();