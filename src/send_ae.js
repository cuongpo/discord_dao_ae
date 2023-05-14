
import {
    AeSdk,
    MemoryAccount,
    Node,
    CompilerHttp,
    AE_AMOUNT_FORMATS,
    generateKeyPair
  } from '@aeternity/aepp-sdk';

const NODE_URL = 'https://testnet.aeternity.io'
const COMPILER_URL = 'https://v7.compiler.stg.aepps.com' // required for contract interactions
// replace <SENDER_SECRET_KEY> with the generated secretKey from step 2
const senderAccount = new MemoryAccount('2d6a3c6ca5be8e263392fa14c254c364d4e8e77d0ea4bd87b6bd1966dfdfc1cc4934b3c479a171ffb6eda2e63c6b72fe0dd769e1496b1b9b7eed7ae29177b57b');

(async function () {
  const node = new Node(NODE_URL)
  const aeSdk = new AeSdk({
    onCompiler: new CompilerHttp(COMPILER_URL),
    nodes: [{ name: 'testnet', instance: node }],
    accounts: [senderAccount],
  })

  // spend one AE
  await aeSdk.spend(3, 'ct_xuAv838b6E39VZ4oVmJBVzZNL3CUNxZuQcJ6hTBYoPZKzY1p7', {
    // replace <RECIPIENT_PUBLIC_KEY>, Ideally you use public key from Superhero Wallet you have created before
    // denomination: AE_AMOUNT_FORMATS.AE
  })
})()