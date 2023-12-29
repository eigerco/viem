import { describe, expect, test } from 'vitest'
import { accounts } from '~test/src/constants.js'

import { greeterContract } from '~test/src/abis.js'
import { baseZkSyncTestClient } from '~test/src/zksync.js'
import { privateKeyToAccount } from '~viem/accounts/privateKeyToAccount.js'
import { simulateContract } from '~viem/actions/index.js'
import { publicActions, walletActions } from '~viem/index.js'
import { eip712Actions } from './eip712.js'

const zkSyncClient = baseZkSyncTestClient
  .extend(publicActions)
  .extend(walletActions)
  .extend(eip712Actions)

test('default', async () => {
  expect(eip712Actions(baseZkSyncTestClient)).toMatchInlineSnapshot(`
    {
      "prepareTransactionRequest": [Function],
      "sendTransaction": [Function],
      "signTransaction": [Function],
      "writeContract": [Function],
    }
  `)
})

describe('Action tests', () => {
  // TODO:
  // 1. Deploy the paymaster contracts on this local chain.
  // 2. we need to mock the eth_sendRawTransaction and assert that we got the expected payload.

  test('prepareTransactionRequest', async () => {
    const request = await zkSyncClient.prepareTransactionRequest({
      account: privateKeyToAccount(accounts[0].privateKey),
      to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
      maxFeePerGas: 10000000000n,
      maxPriorityFeePerGas: 10000000000n,
      gas: 158774n,
      value: 10000000000n,
      data: '0x01',
      paymaster: '0xFD9aE5ebB0F6656f4b77a0E99dCbc5138d54b0BA',
      paymasterInput:
        '0x8c5a344500000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000',
      type: 'eip712',
      gasPerPubdata: 50000n,
    })
    expect(request).toBeDefined()
  })

  test.skip('sendTransaction', async () => {
    const request = await zkSyncClient.sendTransaction({
      account: privateKeyToAccount(accounts[0].privateKey),
      to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
      maxFeePerGas: 10000000000n,
      maxPriorityFeePerGas: 10000000000n,
      gas: 158774n,
      value: 10000000000n,
      data: '0x01',
      paymaster: '0xFD9aE5ebB0F6656f4b77a0E99dCbc5138d54b0BA',
      paymasterInput:
        '0x8c5a344500000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000',
      type: 'eip712',
      gasPerPubdata: 50000n,
    })
    expect(request).toBeDefined()
  })

  test('signTransaction', async () => {
    const signature = await zkSyncClient.signTransaction({
      account: privateKeyToAccount(accounts[0].privateKey),
      to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
      maxFeePerGas: 10000000000n,
      maxPriorityFeePerGas: 10000000000n,
      gas: 158774n,
      value: 10000000000n,
      data: '0x01',
      paymaster: '0xFD9aE5ebB0F6656f4b77a0E99dCbc5138d54b0BA',
      paymasterInput:
        '0x8c5a344500000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000',
      type: 'eip712',
      gasPerPubdata: 50000n,
    })
    expect(signature).toBeDefined()
  })

  test.skip('writeContract', async () => {
    const { request } = await simulateContract(zkSyncClient, {
      ...greeterContract,
      account: privateKeyToAccount(accounts[0].privateKey),
      functionName: 'setGreeting',
      args: ['Viem ZkSync works!'],
      maxFeePerGas: 250000000n,
      maxPriorityFeePerGas: 0n,
      paymaster: '0xFD9aE5ebB0F6656f4b77a0E99dCbc5138d54b0BA',
      paymasterInput:
        '0x8c5a344500000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000',
      type: 'eip712',
      gasPerPubdata: 50000n,
    })
    const tx = await zkSyncClient.writeContract(request)
    expect(tx).toBeDefined()
  })
})
