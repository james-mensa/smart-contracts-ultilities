import { NodeAccounts } from "./config/accounts";

require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: "0.8.20",
  NodeAccounts,

  networks: {

    Sepolia: {
      url: "https://ethereum-sepolia-rpc.publicnode.com",
      accounts: [...NodeAccounts]
    },
    Kaia: {
      url: "https://rpc.ankr.com/klaytn_testnet",
      accounts: [...NodeAccounts]
    },
    Hamsan: {
      url: "https://kaia-kairos.blockpi.network/v1/rpc/public",
      accounts: [...NodeAccounts]
    },
   

  },

     defaultNetwork: "Sepolia",

};


