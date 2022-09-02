import "@nomicfoundation/hardhat-toolbox";
import "hardhat-gas-reporter";
import { HardhatUserConfig, subtask, task } from "hardhat/config";

task("deploy-testnets", "Deploys contract on a provided network")
  .setAction(async () => {
    const { deployLibrary } = require('./scripts/deploy');
    await deployLibrary();
  });

subtask("print", "Prints valuble info")
  .addParam("deployerAddress", "The deployer address")
  .addParam("contractAddress", "The contractAddress address")
  .setAction(async ({ deployerAddress, contractAddress }) => {
    console.log(`Deployed contract with the account: ${deployerAddress}`);
    console.log(`Deployed contract at address: ${contractAddress}`)
  });

task("deploy-LimeToken", "Deploys the LimeToken")
  .setAction(async () => {
    const { deployLimeToken } = require('./scripts/deploy');
    await deployLimeToken();
  })


const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  gasReporter: {
    enabled: true,
  }
};

export default config;
