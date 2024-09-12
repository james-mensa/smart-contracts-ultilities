
const hre = require("hardhat");
// const fs = require("fs/promises");
const fs = require("fs").promises;
const path = require("path");
const { ethers } = require("hardhat");

/// UTILS FUNCTIONS
function convertDateToTimestamp(dateTime: Date) {
  const timestampInMillis = dateTime.getTime();
  const timestampInSeconds = Math.floor(timestampInMillis / 1000);
  return timestampInSeconds;
}

const proposalNames = ["NDC", "NPP", "CPP"];
function convertManyToBytes32(Names: string[]) {
  const NamesBytes32 = Names.map((name) =>
    ethers.utils.formatBytes32String(name)
  );
  return NamesBytes32;
}
function convertManyBytes32ToString(Bytes: string[]) {
  const NamesConverted = Bytes.map((bytes32) =>
    ethers.utils.parseBytes32String(bytes32)
  );
  return NamesConverted;
}

function convertBytes32ToString(Bytes32: string) {
  const NameConverted = ethers.utils.parseBytes32String(Bytes32);
  return NameConverted;
}
function convertToBytes32(Name: string) {
  const NameBytes32 = ethers.utils.formatBytes32String(Name);
  return NameBytes32;
}


  
export function convertLargeStringToBytes32(Name: string) {
  const NameBytes= ethers.utils.toUtf8Bytes(Name);
  return NameBytes;
}
export function convertBytesToString(Name: Uint8Array) {
  const NameBytes= ethers.utils.toUtf8String(Name);
  return NameBytes;
}


interface partyProps {
  account: string;
  name: string;
  img_url:string;
}

function getParties(party: partyProps[]): partyProps[] {
  const parties = party.map((target) => {
    return { account: target.account, name: convertToBytes32(target.name), img_url: convertLargeStringToBytes32(target.img_url)};
  });
  return parties;
}

const parties: partyProps[] = [
  {
    account: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    name: "NPP",
    img_url:'npp.png',
  },
  {
    account: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    name: "NDC",
    img_url: "NDC.png"
  },
];

interface candidateProps{
  name: string;
  img_url: string;
}
export const pool_candidates: candidateProps[] = [{
  name:convertToBytes32("James mensah"),
  img_url:convertToBytes32("james.png")
},
{
  name:convertToBytes32("John Addo"),
  img_url:convertToBytes32("addo.png")
},
  
];

/* ********************************************************************************************* */

const addre=[
 "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
 "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
  "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
  "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
  "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
  "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
  "0x976EA74026E726554dB657fA54763abd0C3a0aa9",
  "0x14dC79964da2C08b23698B3D3cc7Ca32193d9955",
 "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f",
  "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720",
  "0xBcd4042DE499D14e55001CcbB24a551F3b954096",
  "0x71bE63f3384f5fb98995898A86B02Fb2426c5788",
  "0xFABB0ac9d68B0B445fB7357272Ff202C5651694a",
  "0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec",
  "0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097",
  "0xcd3B766CCDd6AE721141F452C550Ca635964ce71",
  "0x2546BcD3c84621e976D8185a91A922aE77ECEc30",
  "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E",
  "0xdD2FD4581271e230360230F9337D5c0430Bf44C0",
  "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"
]


async function getTotalEvents() {
  try {
    const contract = await readDeploymentInfo(1);
    const totalevents = await contract.totalElectionEvents();

    console.log({
      "total events": totalevents,
    });
    return totalevents;
  } catch (err: any) {
    console.log({ "ERROR MESSAGE": err });
  }
}



async function createElection(signer: number) {
  try {
    const name = convertLargeStringToBytes32("SRC ELECTION IN G");
    console.log({name})
    const election_parties = getParties(parties);
    const startDate = convertDateToTimestamp(new Date("2024-05-09T18:30:00"));
    const EndDate = convertDateToTimestamp(new Date("2024-05-09T20:30:00"));
    const contract = await readDeploymentInfo(signer);
    const initializeElection = await contract.newElectionEvent(
      name,
      startDate,
      EndDate,
      election_parties,
      name

    );
    await initializeElection.wait();
    console.log({ msg: "election added successfully" });
  } catch (error) {
    console.log(error);
  }
}

interface ElectionDetailProps {
  id: number;
  name: string;
  chairperson: string;
  start: number;
  end: number;
  total_parties: number;
  total_ballots: number;
  pools:poolProps[];
  total_voters:number;
  parties?:partyProps[];
}


async function getElectionDetails(
  signer: number,election_id:number
): Promise<ElectionDetailProps | null> {
  try {
    const contract = await readDeploymentInfo(signer);
    const getDetail = await contract.getElection(election_id);
    let Pool:poolProps[] | undefined=[];
    let parties:partyProps[] | undefined=[];
    for(let i=1; i<=getDetail.total_ballots; i++){
      let data= await getPool(signer,election_id,i);
     data && Pool.push(data);
    } 

    for(let i=0; i<getDetail.total_parties; i++){
      parties.push({account:getDetail.partyAccount[i],name: convertBytes32ToString(getDetail.partyNames[i]),
        img_url: convertBytesToString(getDetail.partyimg_urls[i])})
    } 


    const result: ElectionDetailProps ={
      id: getDetail.id,
      name: convertBytesToString(getDetail.name),
      chairperson: getDetail.chairperson,
      start: getDetail.startdate,
      end: getDetail.enddate,
      total_parties: getDetail.total_parties,
      total_ballots: getDetail.total_ballots,
      pools:Pool,
      total_voters:getDetail.total_voters,
      parties
    };

    console.log({ Election: result });
    return result;
  } catch (error) {
    console.log(error);
  }
  return null;
}

interface candidatePlusVoteProps {
  name: string;
  img_url:string;
  votes: number;
}


function getCandidateplusVote(candidates:any) {
  let getCandidates:candidatePlusVoteProps[]=[];
  for (let i = 0; i < candidates.length; i++) {
    getCandidates.push({
      name:convertBytes32ToString( candidates[i].name),
      img_url:convertBytes32ToString( candidates[i].img_url),
      votes: candidates[i].voteCount,
    });
  }
  return getCandidates;
}




interface poolProps{
id:number;
name:string;
candidates:candidatePlusVoteProps[];
totalVotes:number;
candidateCount:number;
event_id:number
}


async function getPool(signer: number, election_id: number, ballot_id: number) {
  try {
    const contract = await readDeploymentInfo(signer);
    const result = await contract.getBallot(election_id, ballot_id);
     console.log({ ballot: result });
    if(result){

let details:poolProps={

  id:result.id,
  name:convertBytes32ToString(result.name),
  candidates:getCandidateplusVote(result.candidates),
  totalVotes:result.totalVotes,
  candidateCount:result.candidateCount,
  event_id:result.event_id,
}

return details

    }
  } catch (error) {
    console.log(error);
  }
}



async function getTime(signer: number) {
  try {
    const Pool = await readDeploymentInfo(signer);
    const time = await Pool.getTime();
    let unix_timestamp = time < 1713693618;
  
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds
    //var date = new Date(unix_timestamp * 1000);

    console.log({ time: unix_timestamp ,gff:time});
  } catch (error) {}
}

async function addBallotEvent(
  signer: number,
  election_id: number,
  _general: boolean,
  _name: string,
  candidates?: string[]
) {
  try {
    console.log({pool_candidates})
    const candidates = pool_candidates;
    const title = convertToBytes32(_name);
    const contract = await readDeploymentInfo(signer);
    const transaction = await contract.addBallotEvent(
      election_id,
      candidates,
      _general,
      title
    );
    await transaction.wait();
    console.log({
      msg: "Ballot event added successfully",
    });
  } catch (error) {
    console.log(error);
  }
}

async function vote(
  signer: number,
  election_id: number,
  ballot_id: number,
  choice: number,
 
) {
  try {
    const contract = await readDeploymentInfo(signer);
    const transaction = await contract.vote(
      election_id,
      ballot_id,
      choice
    );
    await transaction.wait();
    console.log({
      msg: "Voting Successfull",
    });
  } catch (error) {
    console.log(error);
  }
}

async function addVoterToElectionEvent(signer:number,election_id:number,voter?:string){

  try{
    const contract = await readDeploymentInfo(signer);
    const transaction = await contract.addVoterToElectionEvent(
      election_id,
      voter?? "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"
      
    );
    await transaction.wait();
    console.log({
      msg: " Voter added successfully",
    });
  }catch (error) {
    console.log(error);
  }
}


async function addVotersToElectionEvent(signer:number,election_id:number,voter?:string[]){

  try{
    const contract = await readDeploymentInfo(signer);
    const transaction = await contract.addVotersToElectionEvent(
      election_id,
      voter?? addre
      
    );
    await transaction.wait();
    console.log({
      msg: " Voter added successfully",
    });
  }catch (error) {
    console.log(error);
  }
}



async function getVoteStatus(signer:number,election_id:number){
try{

  const contract = await readDeploymentInfo(signer);
const result= await contract.getVoteStatus(election_id);
console.log(result);
}
catch(error) {
  console.log(error);

}
  
}

 
async function verifyVoter(signer:number,election_id:number,voter?:string,name?:string){
  try{
  
    const contract = await readDeploymentInfo(signer);
  const verify= await contract.verifyVoter(election_id,voter?? addre[0],convertToBytes32(name??  "NPP".trim()));
  await verify.wait();
  }
  catch(error) {
    console.log(error);

  }
    
  }



interface voterHistoryProps{
  voted:boolean;
  delegate:string;
  candidate_choice:number;
  candidateName:string;
  pool_id:number;
  pool_title:string;
}


async function getVoterHistory(signer:number,election_id:number){
  try{
  const contract = await readDeploymentInfo(signer);
  const result= await contract.getVoterHistory(election_id);
  let history:voterHistoryProps[]=[]
  if(result){
    for(let i=0; i<result.length; i++){
history[i]={
  voted:result[i].voted,
  delegate:result[i].delegate,
  candidate_choice:result[i].vote,
  candidateName:convertBytes32ToString(result[i].candidateName),
  pool_id:result[i].pool_id,
  pool_title:convertBytes32ToString(result[i].pool_title)
}

    }
  }
  console.log({history});
return history;
  
  }
  catch(error) {
    console.log(error);
  
  }
  }
  

  
async function readDeploymentInfo(signer?: number) {
  let Pool = null;
  const deploymentPath = path.resolve(__dirname, "../ballot.json");
  try {
    const AllSigners = await ethers.getSigners();
    const deploymentData = await fs.readFile(deploymentPath);
    const { address, abi } = JSON.parse(deploymentData).contract;
    // create an instance of our bank smart contract
    Pool =
      signer !== undefined
        ? new hre.ethers.Contract(address, abi, AllSigners[signer!])
        : new hre.ethers.Contract(address, abi);

    return Pool;
  } catch (error) {
    console.error(error);
  }
  return Pool;
}



module.exports = {
  readDeploymentInfo,
  getTotalEvents,
  createElection,
  getElectionDetails,
  getTime,
  addBallotEvent,
  getPool,
  vote,addVoterToElectionEvent,
  addVotersToElectionEvent
  ,
  getVoterHistory,
  getVoteStatus,
  verifyVoter
};

require("make-runnable");





{/**

npm run election getTotalEvents

npm run election createElection 0

npm run election getElectionDetails 0 1

npm run election addBallotEvent 1  1 true "SRC VICE PRESIDENT"

npm run election getPool 0 1 1

npm run election addVoterToElectionEvent 0 1 

npm run election addVotersToElectionEvent 0 1


npm run election getVoteStatus 0 1 

npm run election verifyVoter 0 1

npm run election vote 0 1 1 1


npm run election getVoterHistory 0 1 

*/}