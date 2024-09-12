const hre = require("hardhat");
// const fs = require("fs/promises");
const fs = require("fs").promises;
const path = require("path");
const { ethers } = require("hardhat");
const web3 = require("web3");
const BigNumber = require("bignumber.js");

const {
  defaultNetwork,
  networks,
  // HardHatNodeAccounts,
} = require("../hardhat.config");

/// choose a signer (sender address) from 0 to 22
/// create new account run ----> npm run bank createAccount   [signer] eg 0 to 22

async function Transfer(signer: number, value: any) {
  try {
    //  await giveHardHatAccountsSomeBalanceOnBesu(signer);

    const contract = await readDeploymentInfo(signer);
    const Token = contract.token;
    const etherValue = ethers.utils.parseEther(`${value}`);
    await Token.transfer(
      "0x44890dfF07D190415eA508b137e41dc8643CE41E",
      etherValue
    );

    console.log(`${etherValue} transfered to ${"s"}`);
    const balance = await Token.balanceOf(contract.address);
    console.log("token Balance Remaining : " + balance);
    return true;
  } catch (err: any) {
    console.error({
      "ERROR MESSAGE": {
        reason: err.reason,
        status: err.code,
      },
    });
  }
}

async function SendEth(signer: number, value: number, _to?: any) {
  try {
    //  await giveHardHatAccountsSomeBalanceOnBesu(signer);
    const contract = await readDeploymentInfo(signer);
    const Token = contract.token;
    const etherValue = ethers.utils.parseEther(`${value}`);
    await Token.send("0xFABB0ac9d68B0B445fB7357272Ff202C5651694a", {
      value: etherValue,

    });
    console.log(
      `${etherValue} transfered to ${"0xFABB0ac9d68B0B445fB7357272Ff202C5651694a"}`
    );
    //const balance = await Token.balanceOf(contract.address);
    //console.log("token Balance Remaining : " + balance);
    return true;
  } catch (err: any) {
    console.error({
      "ERROR MESSAGE": {
        reason: err,
        status: err.code,
      },
    });
  }
}

async function Approve( value: number, _to?: any) {
  try {
    const contract = await readDeploymentInfo(0);
    const Token = contract.token;
    const etherValue = ethers.utils.parseEther(`${value}`);
    await Token.approve(
      "0x44890dfF07D190415eA508b137e41dc8643CE41E",
      etherValue
    );

    console.log(
      `${etherValue} approved to ${"0x44890dfF07D190415eA508b137e41dc8643CE41E"}`
    );
    return true;
  } catch (err: any) {
    console.error({
      "ERROR MESSAGE": {
        reason: err.reason,
        status: err.code,
      },
    });
  }
}

async function mint(signer: number, to: any, value: any) {
  try {
    //  await giveHardHatAccountsSomeBalanceOnBesu(signer);

    const contract = await readDeploymentInfo(signer);
    const Token = contract.token;
    const etherValue = ethers.utils.parseEther(`${value}`);
    await Token.mint("0x76dDA41f855bF72775A78EA66972F9b58c51d35F", value);

    console.log(`${etherValue} transfered to ${to}`);
    const balance = await Token.balanceOf(contract.address);
    console.log("token Balance Remaining : " + balance);
    return true;
  } catch (err: any) {
    console.error({
      "ERROR MESSAGE": {
        reason: err.reason,
        status: err.code,
      },
    });
  }
}

async function deposit(signer: number, amount: number) {
  try {
    //  await giveHardHatAccountsSomeBalanceOnBesu(signer);

    const contract = await readDeploymentInfo(signer);
    const Token = contract.token;

    await Token.deposit({ value: ethers.utils.parseEther(`${amount}`) });

    const bal = await Token.balanceOf(contract.address);
    console.log(`success : balance now :${bal}`);
    return true;
  } catch (err: any) {
    console.error({
      "ERROR MESSAGE": {
        reason: err.reason,
        status: err.code,
      },
    });
  }
}

//getOwners (pure function) run ----> npm run bank getOwners  [signer] [ID]
async function balance(Signer: number) {
  try {
    const contract = await readDeploymentInfo(Signer);

    const bal = await contract.token.balanceOf(contract.address);
    console.log("token account balance : " + bal);
  } catch (error: any) {
    console.error({
      "ERROR MESSAGE": {
        reason: error.reason,
        status: error.code,
      },
    });
  }
}

async function readDeploymentInfo(signer?: number) {
  let token = null;
  const deploymentPath = path.resolve(__dirname, "../token-deployment.json");

  try {
    const AllSigners = await ethers.getSigners();
    const deploymentData = await fs.readFile(deploymentPath);
    const { address, abi } = JSON.parse(deploymentData).contract;

    // create an instance of our bank smart contract
    const value = ethers.utils.parseEther("2");
    token =
      signer !== undefined
        ? new hre.ethers.Contract(address, abi, AllSigners[signer!], value)
        : new hre.ethers.Contract(address, abi, value);

    return {
      token,
      address,
    };
  } catch (error) {
    console.error(error);
  }

  return {
    token,
  };
}

module.exports = {
  readDeploymentInfo,
  Transfer,
  balance,
  mint,
  deposit,
  SendEth,
  Approve,
};

require("make-runnable");
