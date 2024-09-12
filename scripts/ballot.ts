const fs = require("fs/promises");
import { ethers } from "hardhat";
//import { sendTransaction } from "../wallet/wallet";

async function main() {  
 // await sendTransaction()
  const AllSigners = await ethers.getSigners();
  console.log("deploying all signers")
  const Ballot = await ethers.getContractFactory("Ballot", AllSigners[0]);
  const election = await Ballot.deploy(
    // [
    //   "0x4e44430000000000000000000000000000000000000000000000000000000000",
    //   "0x4e50500000000000000000000000000000000000000000000000000000000000",
    //   "0x4350500000000000000000000000000000000000000000000000000000000000"
    // ],
    // [
    //     '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
    //     , '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'
    // ]
  );
  await election.deployed();
  writeDeploymentInfo(election);

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
  console.log({"writing deployment info":content })
  await fs.writeFile("ballot.json", content, { encoding: "utf-8" });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});