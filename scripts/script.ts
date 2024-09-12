import { getAddress } from "./test";

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

async function createAccount(signer: number) {
  try {
    //  await giveHardHatAccountsSomeBalanceOnBesu(signer);

    const bank = await readDeploymentInfo(signer);
    await bank.createAccount([]);

    console.log("Account created");
    getAccounts(signer);
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

/// Get account (pure function) run ----> npm run bank getAccounts   [signer] eg 0 to 22
async function getAccounts(signer: number) {
  try {
    const bank = await readDeploymentInfo(signer);
    console.log("My account : " + (await bank.getAccounts()));
  } catch (error: any) {
    console.error({
      "ERROR MESSAGE": {
        reason: error.reason,
        status: error.code,
      },
    });
  }
}

//getOwners (pure function) run ----> npm run bank getOwners  [signer] [ID]
async function getOwners(signer: number, idx: number) {
  try {
    const bank = await readDeploymentInfo(signer);
    const owners = await bank.getOwners(idx);
    console.log("account owners : " + owners);
  } catch (error: any) {
    console.error({
      "ERROR MESSAGE": {
        reason: error.reason,
        status: error.code,
      },
    });
  }
}

// getApprovals (pure function) run ----> npm run bank getApprovals  [signer] [ID] widx
async function getApprovals(signer: number, idx: number, widx: number) {
  try {
    const bank = await readDeploymentInfo(signer);
    const approvals = await bank.getApprovals(idx, widx);
    console.log("account withdrawal approvals : " + approvals);
  } catch (error: any) {
    console.error({
      "ERROR MESSAGE": {
        reason: error.reason,
        status: error.code,
      },
    });
  }
}

/// Deposit run ----> npm run bank DepositAmount   [signer]   [accountId]  [amount]    eg npm run bank DepositAmount   0   0 1
async function DepositAmount(
  signer: number,
  accountId: number,
  amount: number
) {
  try {
    const amountInWei = ethers.utils.parseEther(amount.toString());

    const bank = await readDeploymentInfo(signer);

    const transaction = await bank.deposit(accountId, {
      value: amountInWei,
    });

    // Wait for the transaction to be mined
    await transaction.wait();

    console.log("My account Balance : " + (await bank.getBalance(accountId)));
  } catch (error: any) {
    console.error({
      "ERROR MESSAGE": {
        reason: error.reason,
        status: error.code,
      },
    });
  }
}

/// getBalance run ----> npm run bank getBalance   [signer]   [accountId]      eg npm run bank getBalance   0   0
async function getBalance(signer: number, accountId: number) {
  try {
    const resultHex =
      "0x00000000000000000000000000000000000000000000000029a2241af62c0000";
    const resultDecimal = new BigNumber(resultHex).toString();
    console.log({ resultDecimal });

    const AllSigners = await ethers.getSigners();
    const bank = await readDeploymentInfo(signer);
    const balance = await bank.getBalance(accountId);
    const details = {
      AccountAddress: AllSigners[signer].address,
      AccountId: accountId,
      Balance: balance,
    };

    return details;
  } catch (error: any) {
    console.error({
      "ERROR MESSAGE": {
        reason: error.reason,
        status: error.code,
      },
    });
  }
}

/// getBalance  without signer run ----> npm run bank getBalance     [accountId]   [signer]    eg npm run bank getBalance   0
async function getBalanceWithSignerAsOptional(
  accountId: number,
  signer?: number
) {
  try {
    const AllSigners = await ethers.getSigners();
    const bank = await readDeploymentInfo(signer);
    const balance = await bank.getBalance(accountId);
    const details = {
      AccountAddress: signer ? AllSigners[signer].address : null,
      AccountId: accountId,
      Balance: balance,
    };

    return details;
  } catch (error: any) {
    console.error({
      "ERROR MESSAGE": {
        reason: error.reason,
        status: error.code,
        error,
      },
    });
  }
}

/// get Balance in eth the address hold run ----> npm run bank getWalletBalance   [signer]     eg npm run bank getBalance   0
async function getWalletBalance(signer: number) {
  try {
    const AllSigners = await ethers.getSigners();
    const bank = await readDeploymentInfo(signer);
    const balance = await bank.getwalletBalance(AllSigners[signer].address);
    const details = {
      AccountAddress: AllSigners[signer].address,
      Balance: balance + " eth",
    };
    return details;
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
  let bankAccount = null;
  const deploymentPath = path.resolve(__dirname, "../deployment.json");
  try {
    const AllSigners = await ethers.getSigners();
    const deploymentData = await fs.readFile(deploymentPath);

    const { address, abi } = JSON.parse(deploymentData).contract;
    // create an instance of our bank smart contract
    bankAccount =
      signer !== undefined
        ? new hre.ethers.Contract(address, abi, AllSigners[signer!])
        : new hre.ethers.Contract(address, abi);

    return bankAccount;
  } catch (error) {
    console.error(error);
  }
  return bankAccount;
}

async function sendEth(signer: number, _to?: any) {
  try {
    //  await giveHardHatAccountsSomeBalanceOnBesu(signer);
    const bank = await readDeploymentInfo(signer);
    await accountBalance();
    const etherValue = ethers.utils.parseEther("0.1");
  const transaction=  await bank.sendEther("0x76dDA41f855bF72775A78EA66972F9b58c51d35F", {
      value: etherValue,
    });
await transaction.wait();

    console.log(
      `${etherValue} transfered to ${"0x76dDA41f855bF72775A78EA66972F9b58c51d35F"}`
    );
    await accountBalance();
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

async function sendMoney(signer: number, _to?: any) {
  try {
    //  await giveHardHatAccountsSomeBalanceOnBesu(signer);
    const bank = await readDeploymentInfo(signer);
    await accountBalance();
    const etherValue = ethers.utils.parseEther("50");
const accounts=await getAddress()
// for(const account of accounts){
  const transaction= await bank.sendMoney(
    "0x76dDA41f855bF72775A78EA66972F9b58c51d35F",
    etherValue
  );
await transaction.wait();

  console.log(
    `${etherValue} transfered to 0x76dDA41f855bF72775A78EA66972F9b58c51d35F`
  );
  await accountBalance();
//}
console.log({accounts})
 
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

async function accountBalance() {
  try {
    //  await giveHardHatAccountsSomeBalanceOnBesu(signer);
    const bank = await readDeploymentInfo(1);
    const bal = await bank.getBal();

    console.log(`Balance :${bal}`);

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

async function depositEth(signer: number) {
  try {
    //  await giveHardHatAccountsSomeBalanceOnBesu(signer);
    const bank = await readDeploymentInfo(signer);
    await accountBalance();
    const etherValue = ethers.utils.parseEther("50");
    const transaction = await bank.depositEth({ value: etherValue });
    await transaction.wait();
    console.log(`${etherValue} Deposited `);
   // await accountBalance();
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
module.exports = {
  readDeploymentInfo,
  createAccount,
  getAccounts,
  DepositAmount,
  getBalance,
  getOwners,
  getApprovals,
  getWalletBalance,
  getBalanceWithSignerAsOptional,
  sendEth,
  depositEth,
  accountBalance,
  sendMoney,
};

require("make-runnable");
