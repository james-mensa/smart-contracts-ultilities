import { voters } from "../scripts/utils";

const {ethers} = require("hardhat");

const Pharse = 'second hurt cage chef betray add ketchup finish myself crunch muffin humble';  // Replace with your actual mnemonic phrase

// Create a wallet from the mnemonic
// const DefaultP = ethers.Wallet.fromMnemonic(Pharse);
// const wallet=new ethers.Wallet("ad74092f0b545b4a91b7974e22b918d72e24827402ff235e287105173a78e3ae")
// const Default= new ethers.Wallet("8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63")
// // Get the address of the wallet
// const address = wallet.address;
// console.log('Wallet Address:',{W:wallet.address,D:Default.address,p:DefaultP.address});





// Define the transaction parameters


// Send the transaction
const Provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
export async function sendTransaction() {
    try {
        const AllSigners = await ethers.getSigners();
      
        const senderWallet = new ethers.Wallet('0xdbda1821b80551c9d65939329250298aa3472ba22feea921c0cf5d620ea67b97', Provider);
       const amountToSend = ethers.utils.parseEther("100");
       
        for (let i=0; i<voters.length; i++) {
       
            const nonce = await Provider.getTransactionCount(senderWallet.address);
            const transaction = {
                to: voters[i],
                value: amountToSend,
            };

            // Sign the transaction
           // const signedTransaction = await senderWallet.signTransaction(transaction);
          
            // Send the signed transaction to the Ethereum network
            const transactionResponse = await senderWallet.sendTransaction(transaction);

            console.log("Transaction sent:", transactionResponse.hash);
       }
   
      
    } catch (error) {
        console.error("Error sending transaction:", error);
    }
}


async function getBalance() {
    try {
        // Get the balance of the sender wallet
        voters.forEach(async(address)=>{

            const balance = await Provider.getBalance(address);

            console.log("Wallet balance:", ethers.utils.formatEther(balance), "ETH");
        })
    
    } catch (error) {
        console.error("Error getting balance:", error);
    }
}

// Call the function to send the transaction
sendTransaction();
//getBalance();