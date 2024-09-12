const fs = require("fs/promises");
import { ethers } from "hardhat";

async function main() {  
  const AllSigners = await ethers.getSigners();
  const BankAccount = await ethers.getContractFactory("BankAccount",AllSigners[0]);
  const bankAccount = await BankAccount.deploy();
  await bankAccount.deployed();
  
  const Token = await ethers.getContractFactory("JMCoin", AllSigners[0]);
  const initialSupply = ethers.utils.parseEther("1000000000");
  const token = await Token.deploy(initialSupply);
  await token.deployed();
  
  writeDeploymentInfo(bankAccount);
  writeDeploymentInfoToken(token);
}

async function writeDeploymentInfo(contract:any) {
  const data = {
    contract: {
      address: contract.address,
      signerAddress: contract.signer.address,
      abi: contract.interface.format(),
    },
  };
  const content = JSON.stringify(data, null, 2);
  await fs.writeFile("deployment.json", content, { encoding: "utf-8" });
}

async function writeDeploymentInfoToken(contract:any) {  
  const data = {
    contract: {
      address: contract.address,
      signerAddress: contract.signer.address,
      abi: contract.interface.format(),
    },
  };
  const content = JSON.stringify(data, null, 2);
  await fs.writeFile("token-deployment.json", content, { encoding: "utf-8" });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});