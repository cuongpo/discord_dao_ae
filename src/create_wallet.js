import {
    AeSdk,
    MemoryAccount,
    Node,
    CompilerHttp,
    AE_AMOUNT_FORMATS,
    generateKeyPair
  } from '@aeternity/aepp-sdk';

const keypair = generateKeyPair()
console.log(`Secret key: ${keypair.secretKey}`)
console.log(`Public key: ${keypair.publicKey}`)


