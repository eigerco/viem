import { describe, expect, test } from 'vitest'
import { accounts } from '~test/src/constants.js'
import { privateKeyToAccount } from '../../accounts/privateKeyToAccount.js'
import { estimateGas } from '../../actions/public/estimateGas.js'
import { prepareTransactionRequest } from '../../actions/wallet/prepareTransactionRequest.js'
import { signTransaction } from '../../actions/wallet/signTransaction.js'
import { createWalletClient } from '../../clients/createWalletClient.js'
import { http } from '../../clients/transports/http.js'
import { zkSyncLocalnet } from '../index.js'

// Test against local chain (https://era.zksync.io/docs/tools/testing/dockerized-testing.html)
// This shouldn't be commited to the Viem official repository, but used to validate the
// interface from the developers with the ZkSync chain:
// - prepareTransactionRequest
// - estimateGas
// - signTransaction
//
// `sendTransaction` and `writeContract` will not work until EIP 712 Meta signning is implemented.

describe('Integration Tests', () => {
  test('transactionRequest (prepareTransactionRequest)', async () => {
    const client = createWalletClient({
      account: privateKeyToAccount(accounts[0].privateKey),
      chain: zkSyncLocalnet,
      transport: http(),
    })

    const preparedTransaction = await prepareTransactionRequest(client, {
      to: '0x111C3E89Ce80e62EE88318C2804920D4c96f92bb',
      data: '0xa4136862000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000094869204461766964340000000000000000000000000000000000000000000000',
      gasPerPubdata: 50000n,
      paymaster: '0x4B5DF730c2e6b28E17013A1485E5d9BC41Efe021',
      paymasterInput:
        '0x8c5a344500000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000',
    })

    expect(preparedTransaction.nonce).equals(0)
    expect(preparedTransaction.gas).equals(160972n)
    // TODO: check for type to be 'eip712'
  })

  test('transactionRequest (estimateGas)', async () => {
    const client = createWalletClient({
      account: '0x094499df5ee555ffc33af07862e43c90e6fee501',
      // TODO: Replace with testnet.
      chain: zkSyncLocalnet,
      transport: http(),
    })

    await estimateGas(client, {
      to: '0x111C3E89Ce80e62EE88318C2804920D4c96f92bb',
      // TODO: Where this data comes from?
      data: '0xa4136862000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000094869204461766964340000000000000000000000000000000000000000000000',
      gasPerPubdata: 50000n,
      paymaster: '0x4B5DF730c2e6b28E17013A1485E5d9BC41Efe021',
      paymasterInput:
        '0x8c5a344500000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000',
      customSignature: '0x',
    })
  })

  // This uses the serializers, return the bytes to send in sendRawTransaction
  // Completed
  test('transactionRequest (signTransaction)', async () => {
    const client = createWalletClient({
      account: privateKeyToAccount(accounts[0].privateKey),
      chain: zkSyncLocalnet,
      transport: http(),
    })

    const signTransactionResult = await signTransaction(client, {
      gasPerPubdata: 50000n,
      maxFeePerGas: 250000000n,
      maxPriorityFeePerGas: 0n,
      to: '0x111C3E89Ce80e62EE88318C2804920D4c96f92bb',
      data: '0xa4136862000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000094869204461766964340000000000000000000000000000000000000000000000',
      paymaster: '0x4B5DF730c2e6b28E17013A1485E5d9BC41Efe021',
      paymasterInput:
        '0x8c5a344500000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000',
      customSignature: '0x1',
    })

    expect(signTransactionResult.startsWith('0x71')).toBeTruthy()
  })

  test('transactionRequest (wallet signTransaction)', async () => {
    const client = createWalletClient({
      //account: privateKeyToAccount(accounts[0].privateKey),
      account: accounts[0].address,
      chain: zkSyncLocalnet,
      transport: http(),
    })

    const signTransactionResult = await client.signTransaction({
      gasPerPubdata: 50000n,
      maxFeePerGas: 250000000n,
      maxPriorityFeePerGas: 0n,
      to: '0x111C3E89Ce80e62EE88318C2804920D4c96f92bb',
      data: '0xa4136862000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000094869204461766964340000000000000000000000000000000000000000000000',
      paymaster: '0x4B5DF730c2e6b28E17013A1485E5d9BC41Efe021',
      paymasterInput:
        '0x8c5a344500000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000',
      customSignature: '0x1',
    })

    expect(signTransactionResult.startsWith('0x71')).toBeTruthy()
  })
})
