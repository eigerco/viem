import { describe, expectTypeOf, test } from 'vitest'

import { getBlock } from '../../actions/public/getBlock.js'
import { getTransaction } from '../../actions/public/getTransaction.js'
import { getTransactionReceipt } from '../../actions/public/getTransactionReceipt.js'
import { prepareTransactionRequest } from '../../actions/wallet/prepareTransactionRequest.js'
import { signTransaction } from '../../actions/wallet/signTransaction.js'
import { createPublicClient } from '../../clients/createPublicClient.js'
import { createWalletClient } from '../../clients/createWalletClient.js'
import { http } from '../../clients/transports/http.js'
import type { Hash } from '../../types/misc.js'
import type { RpcBlock, RpcTransactionReceipt } from '../../types/rpc.js'
import type { TransactionRequest } from '../../types/transaction.js'
import type { Assign } from '../../types/utils.js'
import { sendTransaction } from '../../wallet/index.js'
import { zkSync } from '../index.js'
import { formattersZkSync } from './formatters.js'
import type {
  RpcLog,
  RpcL2ToL1Log,
  ZkSyncBlockOverrides,
  ZkSyncRpcTransaction,
  ZkSyncTransactionRequest,
  L2ToL1Log,
} from './types.js'

describe('block', () => {
  expectTypeOf(formattersZkSync.block.format).parameter(0).toEqualTypeOf<
    Assign<
      Partial<RpcBlock>,
      ZkSyncBlockOverrides & {
        transactions: `0x${string}`[] | ZkSyncRpcTransaction[]
      }
    >
  >()
  expectTypeOf<
    ReturnType<typeof formattersZkSync.block.format>['l1BatchNumber']
  >().toEqualTypeOf<`0x${string}`>
  expectTypeOf<
    ReturnType<typeof formattersZkSync.block.format>['l1BatchTimestamp']
  >().toEqualTypeOf<`0x${string}` | null>
})

describe('transactionReceipt', () => {
  expectTypeOf(formattersZkSync.transactionReceipt.format)
    .parameter(0)
    .toEqualTypeOf<
      Partial<RpcTransactionReceipt> & {
        l1BatchNumber: `0x${string}` | null
        l1BatchTxIndex: `0x${string}` | null
        logs: RpcLog[]
        // TODO: Not sure how to describe every parameter in here. Maybe in another test?
        l2ToL1Logs: RpcL2ToL1Log[]
      }
    >()

  expectTypeOf<
    ReturnType<
      typeof formattersZkSync.transactionReceipt.format
    >['l1BatchNumber']
  >().toEqualTypeOf<bigint | null>()
  expectTypeOf<
    ReturnType<
      typeof formattersZkSync.transactionReceipt.format
    >['l1BatchTxIndex']
  >().toEqualTypeOf<bigint | null>()
})

describe('transactionRequest', () => {
  expectTypeOf(formattersZkSync.transactionRequest.format)
    .parameter(0)
    .toEqualTypeOf<
      Assign<Partial<TransactionRequest>, ZkSyncTransactionRequest>
    >()
})

describe('smoke', () => {
  test('block', async () => {
    const client = createPublicClient({
      chain: zkSync,
      transport: http(),
    })
    const block = await getBlock(client, {
      blockNumber: 35533n,
    })

    expectTypeOf(block.transactions).toEqualTypeOf<Hash[]>()

    // Returns block not found.
    /*const block_pending = await getBlock(client, {
      blockTag: 'pending',
      includeTransactions: true,
    })

    expectTypeOf(block_pending.hash).toEqualTypeOf<null>()
    expectTypeOf(block_pending.logsBloom).toEqualTypeOf<null>()
    expectTypeOf(block_pending.number).toEqualTypeOf<null>()
    expectTypeOf(block_pending.transactions[0].blockHash).toEqualTypeOf<null>()
    expectTypeOf(
      block_pending.transactions[0].blockNumber,
    ).toEqualTypeOf<null>()
    expectTypeOf(
      block_pending.transactions[0].transactionIndex,
    ).toEqualTypeOf<null>()*/
  })

  test('transaction', async () => {
    const client = createPublicClient({
      chain: zkSync,
      transport: http(),
    })

    const transaction = await getTransaction(client, {
      blockNumber: 16280770n,
      index: 0,
    })

    expectTypeOf(transaction.type).toEqualTypeOf<
      'legacy' | 'eip2930' | 'eip1559' | 'eip712' | 'priority'
    >()
  })

  test('transactionReceipt', async () => {
    const client = createPublicClient({
      chain: zkSync,
      transport: http(),
    })

    const transaction = await getTransactionReceipt(client, {
      hash: '0xe56c11904d690e1bd41a7e901df609c2dc011d1033415379193ebc4197f32fc6',
    })

    expectTypeOf(transaction.l1BatchTxIndex).toEqualTypeOf<bigint | null>()
    expectTypeOf(transaction.l1BatchNumber).toEqualTypeOf<bigint | null>()
    expectTypeOf(transaction.logs[0].l1BatchNumber).toEqualTypeOf<bigint>()
    expectTypeOf(transaction.l2ToL1Logs).toEqualTypeOf<L2ToL1Log[]>()
  })

  test('transactionRequest (prepareTransactionRequest)', async () => {
    const client = createWalletClient({
      account: '0x',
      chain: zkSync,
      transport: http(),
    })

    prepareTransactionRequest(client, {
      gasPerPubdata: '50000',
      paymaster: '0x094499df5ee555ffc33af07862e43c90e6fee501',
      paymasterInput:
        '0x8c5a344500000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000',
      customSignature: '0x',
    })

    // @ts-expect-error `customSignature` not provided
    prepareTransactionRequest(client, {
      paymaster: '0x094499df5ee555ffc33af07862e43c90e6fee501',
      paymasterInput:
        '0x8c5a344500000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000',
      type: 'eip712',
    })
  })

  test('transactionRequest (sendTransaction)', async () => {
    const client = createWalletClient({
      account: '0x094499df5ee555ffc33af07862e43c90e6fee501',
      chain: zkSync,
      transport: http(),
    })

    sendTransaction(client, {
      gasPerPubdata: '50000',
      paymaster: '0x094499df5ee555ffc33af07862e43c90e6fee501',
      paymasterInput:
        '0x8c5a344500000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000',
      customSignature: '0x',
    })

    // @ts-expect-error `customSignature` not provided
    sendTransaction(client, {
      paymaster: '0x094499df5ee555ffc33af07862e43c90e6fee501',
      paymasterInput:
        '0x8c5a344500000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000',
      type: 'eip712',
    })
  })

  test('transactionRequest (signTransaction)', async () => {
    const client = createWalletClient({
      account: '0x094499df5ee555ffc33af07862e43c90e6fee501',
      chain: zkSync,
      transport: http(),
    })

    signTransaction(client, {
      gasPerPubdata: '50000',
      paymaster: '0x094499df5ee555ffc33af07862e43c90e6fee501',
      paymasterInput:
        '0x8c5a344500000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000',
      customSignature: '0x',
    })
  })
})
