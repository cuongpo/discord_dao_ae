import contract from './environment.js'

const proposalId = 1;
const tx = await contract.checkReward(proposalId)

console.log(tx.decodedResult)