import { AeSdk, MemoryAccount, Node, CompilerHttp } from '@aeternity/aepp-sdk'

export async function is_member(private_key) {

const node = new Node('https://testnet.aeternity.io') // ideally host your own node
try  {
  const test = new MemoryAccount(private_key)
} catch (err) {
  return false
}

const account = new MemoryAccount(private_key)

const aeSdk = new AeSdk({
  nodes: [{ name: 'testnet', instance: node }],
  accounts: [account],
  onCompiler: new CompilerHttp('https://v7.compiler.stg.aepps.com'), // ideally host your own compiler
})

const aci = [{"contract":{"functions":[{"arguments":[],"name":"init","payable":false,"returns":"InvestmentDAO.state","stateful":true},{"arguments":[],"name":"joinDAO","payable":false,"returns":{"tuple":[]},"stateful":true},{"arguments":[],"name":"isMember","payable":false,"returns":"bool","stateful":false},{"arguments":[{"name":"description","type":"string"},{"name":"_duration","type":"int"}],"name":"createProposal","payable":false,"returns":{"tuple":[]},"stateful":true},{"arguments":[{"name":"proposalId","type":"int"},{"name":"_vote","type":"bool"}],"name":"vote","payable":true,"returns":{"tuple":[]},"stateful":true},{"arguments":[{"name":"proposalId","type":"int"}],"name":"endProposal","payable":false,"returns":{"tuple":[]},"stateful":true},{"arguments":[{"name":"proposalId","type":"int"}],"name":"withDraw","payable":false,"returns":{"tuple":[]},"stateful":true},{"arguments":[{"name":"proposalId","type":"int"}],"name":"checkReward","payable":false,"returns":"int","stateful":true},{"arguments":[],"name":"checkExp","payable":false,"returns":"int","stateful":true},{"arguments":[{"name":"proposalId","type":"int"}],"name":"checkPropsal","payable":false,"returns":"string","stateful":true},{"arguments":[{"name":"proposalId","type":"int"}],"name":"checkPropsalVoteFor","payable":false,"returns":"int","stateful":true},{"arguments":[{"name":"proposalId","type":"int"}],"name":"checkPropsalVoteAgain","payable":false,"returns":"int","stateful":true}],"kind":"contract_main","name":"InvestmentDAO","payable":true,"state":{"record":[{"name":"members","type":{"map":["address","bool"]}},{"name":"exp","type":{"map":["address","int"]}},{"name":"proposalCount","type":"int"},{"name":"proposals","type":{"map":["int","InvestmentDAO.proposal"]}},{"name":"apy","type":"int"},{"name":"admin","type":"address"}]},"typedefs":[{"name":"proposal","typedef":{"record":[{"name":"id","type":"int"},{"name":"creator","type":"address"},{"name":"description","type":"string"},{"name":"votes","type":{"map":["address","int"]}},{"name":"vote_for","type":"int"},{"name":"vote_again","type":"int"},{"name":"time_begin","type":"int"},{"name":"duration","type":"int"},{"name":"status","type":"int"}]},"vars":[]}]}}]
const address = 'ct_zMjTWkBx7URtjwrXUhMrmffLtNivzGYjhp2bQVfsMEmSErMjt'
const contract = await aeSdk.initializeContract({ aci, address })

try {
  const tx = await contract.isMember()
  return tx.decodedResult 
  console.log('result' + tx.decodedResult)
} catch (err) {
  return false
}


}