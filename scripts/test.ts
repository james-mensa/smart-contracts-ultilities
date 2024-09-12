const { ethers, } = require("hardhat");
//import { JsonRpcProvider } from "ethers";
// console.log("testing")
// const proposalNames = ["Proposal 1", "Proposal 2", "Proposal 3"];

// // Convert proposal names to bytes32 format
// const proposalNamesBytes32 = proposalNames.map(name => ethers.utils.formatBytes32String(name));


// console.log(proposalNamesBytes32);

// const provider = new ethers.providers.JsonRpcProvider("YOUR_JSON_RPC_PROVIDER_URL");

// // Create a signer

// async function testI(){

//     const signer =await ethers.getSigners();


//     console.log(signer[0])
// }
// testI();


// const hexNumbers = proposalNamesBytes32.map(hexString => BigInt(hexString));

// console.log(proposalNamesBytes32)
// Convert bytes32 format back to string format
//const proposalNamesConverted = proposalNamesBytes32.map(bytes32 => ethers.utils.parseBytes32String(bytes32));

//console.log(proposalNamesBytes32);

const Provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

// const Provider =  new JsonRpcProvider("https://services.zkrypto.com/baobab/rpc/");
// console.log({provider:  Provider})


// Provider.getBlockNumber()
//     .then((blockNumber:any) => {
//         console.log(`Connected successfully. Current block number is ${blockNumber}`);
//     })
//     .catch((error:any )=> {
//         console.error('Error connecting to provider:', error);
//     });
// const  getBalance= async ()=>{
//     const AllSigners = await ethers.getSigners();
//     const account:any=[]
//     AllSigners.forEach( async(sign:any) =>{
//         const balance = await Provider.getBalance(sign.address);
   
//         console.log("Address",sign.address,"balance:", ethers.utils.formatEther(await balance), "ETH");
//         console.log({address:sign.address})
//         account.push(sign.address);

//     })
   
//     return account;
// }



// export const getAddress = async () => {
//     const AllSigners = await ethers.getSigners();
//     let accounts = [];

//     for (const sign of AllSigners) {
//         const balance = await sign.provider.getBlockNumber();
//         console.log( sign.address);
//         accounts.push(
//             sign.address,
           
//         );
//     }

//     return accounts;
// }
// getAddress()

