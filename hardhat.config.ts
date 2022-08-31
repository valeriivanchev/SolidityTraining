import "@nomicfoundation/hardhat-toolbox";
import "hardhat-gas-reporter";
import { HardhatUserConfig, task } from "hardhat/config";

task("deploy-testnets", "Deploys contract on a provided network")
  .setAction(async () => {
    const { deployLibrary } = require('./scripts/deploy');
    await deployLibrary();
  });

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
