import { providers } from "ethers";

require('dotenv').config();

export const deployLibrary = async () => {
  const hre = require('hardhat');
  const ethers = hre.ethers;
  const mumbaiProvider = new providers.JsonRpcProvider(<string>process.env.MUMBAI_RPC_URL);
  await hre.run('compile');

  const deployer = new ethers.Wallet(<string>process.env.PRIVATE_KEY, mumbaiProvider);
  const libraryFactory = await ethers.getContractFactory("BookStore", deployer);
  const library = await libraryFactory.deploy();
  await library.deployed();

  hre.run('print', {
    deployerAddress: deployer.address,
    contractAddress: library.address
  });
}

export const deployLimeToken = async () => {
  const hre = require('hardhat');
  const limeTokenFactory = await hre.ethers.getContractFactory("LimeToken");
  const lime = await limeTokenFactory.deploy();
  await lime.deployed();

  console.log("LimeCoin deployed to:", lime.address);
}