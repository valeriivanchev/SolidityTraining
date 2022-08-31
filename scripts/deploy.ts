import { ethers } from "hardhat";

const main = async () => {
  const libraryFactory = await ethers.getContractFactory("BookStore");
  const library = await libraryFactory.deploy();

  await library.deployed();

  console.log(`Deployed at ${library.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
