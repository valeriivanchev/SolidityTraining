import { providers } from "ethers";

require('dotenv').config();

export const deployLibrary = async () => {
  const hre = require('hardhat')
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
