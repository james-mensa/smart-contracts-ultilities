import {ethers} from "ethers"
import fs=require('fs');

// Create a wallet using the private key
const ids=[12,232]
ids.forEach((id)=>{

    const wallet = ethers.Wallet.createRandom();

const mnemonic = wallet.mnemonic;
const walletData = {
    privateKey: wallet.privateKey,
    mnemonic: mnemonic.phrase,
    address: wallet.address,
    stu_id:id
};

let existingData= readJSONFile('walletData.json');

let Data={}
if(existingData){
    existingData.push(walletData)
Data=existingData
}
else{
    Data=walletData
}

// Convert the object to JSON
const jsonData = JSON.stringify(Data, null, 2);


// Write the JSON data to a file
fs.writeFileSync('walletData.json', jsonData);
console.log('Wallet data saved to walletData.json:');



})


// Read existing JSON data from file
function readJSONFile(filename: string) {
    try {
        const data = fs.readFileSync(filename, 'utf8');
        return [JSON.parse(data)];
    } catch (err) {
        return [];
    }
}
