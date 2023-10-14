import { describe, expect, test } from 'vitest'

import { getBlock } from '../../actions/public/getBlock.js'
import { getTransaction } from '../../actions/public/getTransaction.js'
import { getTransactionReceipt } from '../../actions/public/getTransactionReceipt.js'
import { createPublicClient } from '../../clients/createPublicClient.js'
import { http } from '../../clients/transports/http.js'
import { zkSync } from '../index.js'

describe('block', () => {
  test('formatter', async () => {
    const { block } = zkSync.formatters!

    expect(
      block.format({
        baseFeePerGas: '0x0',
        difficulty: '0x0',
        extraData: '0x',
        gasLimit: '0xffffffff',
        gasUsed: '0xa55c0',
        hash: '0xe04cda3bc5633f0e1bff94fc84310da2a0c608192aae0fa0e412c2350c135f75',
        l1BatchNumber: '0x1',
        l1BatchTimestamp: null,
        logsBloom:
          '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
        miner: '0x0000000000000000000000000000000000000000',
        mixHash:
          '0x0000000000000000000000000000000000000000000000000000000000000000',
        nonce: '0x0000000000000000',
        number: '0x1',
        parentHash:
          '0x0000000000000000000000000000000000000000000000000000000000000000',
        receiptsRoot:
          '0x0000000000000000000000000000000000000000000000000000000000000000',
        sealFields: [],
        sha3Uncles:
          '0x0000000000000000000000000000000000000000000000000000000000000000',
        size: '0x0',
        stateRoot:
          '0x0000000000000000000000000000000000000000000000000000000000000000',
        timestamp: '0x3e9',
        totalDifficulty: '0x0',
        transactions: [
          '0xf24f67fb9f8fb300164045fe6ba409acb03904e680ec7df41ed2d331dc38f545',
        ],
        transactionsRoot:
          '0x0000000000000000000000000000000000000000000000000000000000000000',
        uncles: [],
      }),
    ).toMatchInlineSnapshot(`
    {
      "baseFeePerGas": 0n,
      "difficulty": 0n,
      "extraData": "0x",
      "gasLimit": 4294967295n,
      "gasUsed": 677312n,
      "hash": "0xe04cda3bc5633f0e1bff94fc84310da2a0c608192aae0fa0e412c2350c135f75",
      "l1BatchNumber": "0x1",
      "l1BatchTimestamp": null,
      "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      "miner": "0x0000000000000000000000000000000000000000",
      "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "nonce": "0x0000000000000000",
      "number": 1n,
      "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "receiptsRoot": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "sealFields": [],
      "sha3Uncles": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "size": 0n,
      "stateRoot": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "timestamp": 1001n,
      "totalDifficulty": 0n,
      "transactions": [
        "0xf24f67fb9f8fb300164045fe6ba409acb03904e680ec7df41ed2d331dc38f545",
      ],
      "transactionsRoot": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "uncles": [],
    }
    `)

    expect(
      block.format({
        hash: '0xfd73aaef0e91fcd6c171056b235a2b0f17650dcbe17038d17f76bbf3980c4da2',
        parentHash:
          '0x4adced86c99c6a0db3288bcb1c99ab984f2c51ecf5b9efa243ca029b86ce1476',
        sha3Uncles:
          '0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347',
        miner: '0x0000000000000000000000000000000000000000',
        stateRoot:
          '0x0000000000000000000000000000000000000000000000000000000000000000',
        transactionsRoot:
          '0x0000000000000000000000000000000000000000000000000000000000000000',
        receiptsRoot:
          '0x0000000000000000000000000000000000000000000000000000000000000000',
        number: '0x8acd',
        l1BatchNumber: '0x239',
        gasUsed: '0x318fd7',
        gasLimit: '0xffffffff',
        baseFeePerGas: '0xee6b280',
        extraData: '0x',
        logsBloom:
          '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
        timestamp: '0x641e1763',
        l1BatchTimestamp: '0x641e16e8',
        difficulty: '0x0',
        totalDifficulty: '0x0',
        sealFields: [],
        uncles: [],
        transactions: [
          {
            hash: '0xe56c11904d690e1bd41a7e901df609c2dc011d1033415379193ebc4197f32fc6',
            nonce: '0xf',
            blockHash:
              '0xfd73aaef0e91fcd6c171056b235a2b0f17650dcbe17038d17f76bbf3980c4da2',
            blockNumber: '0x8acd',
            transactionIndex: '0x0',
            from: '0xef9e8e39782b1b544a6eb6db6aa85207bacb4c20',
            to: '0x8b791913eb07c32779a16750e3868aa8495f5964',
            value: '0x0',
            gasPrice: '0xee6b280',
            gas: '0x86084b',
            input:
              '0x0fc87d250000000000000000000000003355df6d4c9c3035724fd0e3914de96a5a83aaf40000000000000000000000003f81edcbd9bc84271fb8fdf270257a18f4d47e9b0000000000000000000000000000000000000000000002b94cc7d236b39b0bff00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ef9e8e39782b1b544a6eb6db6aa85207bacb4c2000000000000000000000000000000000000000000000000000000000641e1c0b0000000000000000000000000000000000000000000000000000000000000000',
            v: '0x0',
            r: '0xfdea6b4ea965cb184257159dfdcbbe6045bf264c0de4d1b76c06821e4c33284',
            s: '0x39d0abb813b58d4ebd9c085cc31df866df218803e6a7808f21c3c651e4609981',
            type: '0x71',
            maxFeePerGas: '0xee6b280',
            maxPriorityFeePerGas: '0xee6b280',
            chainId: 324,
            l1BatchNumber: '0x239',
            l1BatchTxIndex: '0x154',
          },
        ],
        size: '0x0',
        mixHash:
          '0x0000000000000000000000000000000000000000000000000000000000000000',
        nonce: '0x0000000000000000',
      }),
    ).toMatchInlineSnapshot(`
    {
      "baseFeePerGas": 0n,
      "difficulty": 0n,
      "extraData": "0x",
      "gasLimit": 4294967295n,
      "gasUsed": 677312n,
      "hash": "0xe04cda3bc5633f0e1bff94fc84310da2a0c608192aae0fa0e412c2350c135f75",
      "l1BatchNumber": "0x1",
      "l1BatchTimestamp": null,
      "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      "miner": "0x0000000000000000000000000000000000000000",
      "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "nonce": "0x0000000000000000",
      "number": 1n,
      "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "receiptsRoot": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "sealFields": [],
      "sha3Uncles": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "size": 0n,
      "stateRoot": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "timestamp": 1001n,
      "totalDifficulty": 0n,
      "transactions": [
        {
          "blockHash": "0xf24f67fb9f8fb300164045fe6ba409acb03904e680ec7df41ed2d331dc38f545",
          "blockNumber": 1n,
          "chainId": 260,
          "customSignature": undefined,
          "factoryDeps": undefined,
          "from": "0x36615cf349d7f6344891b1e7ca7c72883f5dc049",
          "gas": 0n,
          "gasPerPubdata": undefined,
          "gasPrice": 0n,
          "hash": "0xf24f67fb9f8fb300164045fe6ba409acb03904e680ec7df41ed2d331dc38f545",
          "input": "0x02f87582010480840ee6b280840ee6b2808312b84b94a61464658afeaf65cccaafd3a512b69a83b77618880de0b6b3a764000080c080a08ab03d8a1aa4ab231867d9b12a1d7ebacaec3395cf9c4940674f83d79e342e4ca0475dda75d501e72fd816a9699f02af05ef7305668ee4acd0e25561d4628758a3",
          "l1BatchNumber": "0x1",
          "maxFeePerGas": 250000000n,
          "maxPriorityFeePerGas": 250000000n,
          "nonce": 0,
          "paymaster": undefined,
          "paymasterInput": undefined,
          "r": "0x0",
          "s": "0x0",
          "to": "0xa61464658afeaf65cccaafd3a512b69a83b77618",
          "transactionIndex": 1,
          "type": "eip1559",
          "typeHex": "0x2",
          "v": 260n,
          "value": 1000000000000000000n,
        },
      ],
      "transactionsRoot": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "uncles": [],
    }
    `)
  })

  test('action', async () => {
    const client = createPublicClient({
      chain: zkSync,
      transport: http(),
    })

    const block = await getBlock(client, {
      blockNumber: 1n,
      includeTransactions: true,
    })

    const { extraData: _extraData, transactions, ...rest } = block
    expect(transactions[0]).toMatchInlineSnapshot(`
    {
      "blockHash": "0x51f81bcdfc324a0dff2b5bec9d92e21cbebc4d5e29d3a3d30de3e03fbeab8d7f",
      "blockNumber": 1n,
      "chainId": 324,
      "customSignature": undefined,
      "factoryDeps": undefined,
      "from": "0x29df43f75149d0552475a6f9b2ac96e28796ed0b",
      "gas": 72000000n,
      "gasPerPubdata": undefined,
      "gasPrice": 0n,
      "hash": "0xe9a1a8601bc9199c80c97169fdc9e1fc7c307185a0c9fa2cfab04098a7840645",
      "input": "0x3cda33510000000000000000000000000000000000000000000000000000000000000000010000553109a66f1432eb2286c54694784d1b6993bc24a168be0a49b4d0fd4500000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000000",
      "l1BatchNumber": "0x1",
      "l1BatchTxIndex": "0x0",
      "maxFeePerGas": 0n,
      "maxPriorityFeePerGas": 0n,
      "nonce": 0,
      "paymaster": undefined,
      "paymasterInput": undefined,
      "to": "0x0000000000000000000000000000000000008006",
      "transactionIndex": 0,
      "type": undefined,
      "typeHex": "0xff",
      "v": undefined,
      "value": 0n,
    }
  `)
    expect(rest).toMatchInlineSnapshot(`
    {
        "baseFeePerGas": 500000000n,
        "difficulty": 0n,
        "gasLimit": 4294967295n,
        "gasUsed": 432000000n,
        "hash": "0x51f81bcdfc324a0dff2b5bec9d92e21cbebc4d5e29d3a3d30de3e03fbeab8d7f",
        "l1BatchNumber": "0x1",
        "l1BatchTimestamp": "0x63eb991e",
        "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        "miner": "0x0000000000000000000000000000000000000000",
        "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "nonce": "0x0000000000000000",
        "number": 1n,
        "parentHash": "0xe8e77626586f73b955364c7b4bbf0bb7f7685ebd40e852b164633a4acbd3244c",
        "receiptsRoot": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "sealFields": [],
        "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
        "size": 0n,
        "stateRoot": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "timestamp": 1676384542n,
        "totalDifficulty": 0n,
        "transactionsRoot": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "uncles": [],
      }
    `)
  })
})

describe('transaction', () => {
  test('formatter', () => {
    const { transaction } = zkSync.formatters!

    expect(
      transaction.format({
        blockHash:
          '0xf24f67fb9f8fb300164045fe6ba409acb03904e680ec7df41ed2d331dc38f545',
        blockNumber: '0x1',
        chainId: '0x104',
        from: '0x36615cf349d7f6344891b1e7ca7c72883f5dc049',
        gas: '0x0',
        gasPrice: '0x0',
        hash: '0xf24f67fb9f8fb300164045fe6ba409acb03904e680ec7df41ed2d331dc38f545',
        input:
          '0x02f87582010480840ee6b280840ee6b2808312b84b94a61464658afeaf65cccaafd3a512b69a83b77618880de0b6b3a764000080c080a08ab03d8a1aa4ab231867d9b12a1d7ebacaec3395cf9c4940674f83d79e342e4ca0475dda75d501e72fd816a9699f02af05ef7305668ee4acd0e25561d4628758a3',
        l1BatchNumber: '0x1',
        maxFeePerGas: '0xee6b280',
        maxPriorityFeePerGas: '0xee6b280',
        nonce: '0x0',
        r: '0x0',
        s: '0x0',
        to: '0xa61464658afeaf65cccaafd3a512b69a83b77618',
        transactionIndex: '0x1',
        type: '0x2',
        v: '0x104',
        value: '0xde0b6b3a7640000',
      }),
    ).toMatchInlineSnapshot(`
      {
        "blockHash": "0xf24f67fb9f8fb300164045fe6ba409acb03904e680ec7df41ed2d331dc38f545",
        "blockNumber": 1n,
        "chainId": 260,
        "customSignature": undefined,
        "factoryDeps": undefined,
        "from": "0x36615cf349d7f6344891b1e7ca7c72883f5dc049",
        "gas": 0n,
        "gasPerPubdata": undefined,
        "gasPrice": 0n,
        "hash": "0xf24f67fb9f8fb300164045fe6ba409acb03904e680ec7df41ed2d331dc38f545",
        "input": "0x02f87582010480840ee6b280840ee6b2808312b84b94a61464658afeaf65cccaafd3a512b69a83b77618880de0b6b3a764000080c080a08ab03d8a1aa4ab231867d9b12a1d7ebacaec3395cf9c4940674f83d79e342e4ca0475dda75d501e72fd816a9699f02af05ef7305668ee4acd0e25561d4628758a3",
        "l1BatchNumber": "0x1",
        "maxFeePerGas": 250000000n,
        "maxPriorityFeePerGas": 250000000n,
        "nonce": 0,
        "paymaster": undefined,
        "paymasterInput": undefined,
        "r": "0x0",
        "s": "0x0",
        "to": "0xa61464658afeaf65cccaafd3a512b69a83b77618",
        "transactionIndex": 1,
        "type": "eip1559",
        "typeHex": "0x2",
        "v": 260n,
        "value": 1000000000000000000n,
      }
    `)
  })

  test('action', async () => {
    const client = createPublicClient({
      chain: zkSync,
      transport: http(),
    })

    // TODO: Implement for the following transactions
    // 0xff (1)
    // 0x0 [legacy] 150
    // 0x2 [eip1559] 35530
    // 0x71 [eip712] 35533

    const transaction = await getTransaction(client, {
      blockNumber: 1n,
      index: 0,
    })

    expect(transaction).toMatchInlineSnapshot(`
      {
        "blockHash": "0x51f81bcdfc324a0dff2b5bec9d92e21cbebc4d5e29d3a3d30de3e03fbeab8d7f",
        "blockNumber": 1n,
        "chainId": 324,
        "customSignature": undefined,
        "factoryDeps": undefined,
        "from": "0x29df43f75149d0552475a6f9b2ac96e28796ed0b",
        "gas": 72000000n,
        "gasPerPubdata": undefined,
        "gasPrice": 0n,
        "hash": "0xe9a1a8601bc9199c80c97169fdc9e1fc7c307185a0c9fa2cfab04098a7840645",
        "input": "0x3cda33510000000000000000000000000000000000000000000000000000000000000000010000553109a66f1432eb2286c54694784d1b6993bc24a168be0a49b4d0fd4500000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000000",
        "l1BatchNumber": "0x1",
        "l1BatchTxIndex": "0x0",
        "maxFeePerGas": 0n,
        "maxPriorityFeePerGas": 0n,
        "nonce": 0,
        "paymaster": undefined,
        "paymasterInput": undefined,
        "to": "0x0000000000000000000000000000000000008006",
        "transactionIndex": 0,
        "type": undefined,
        "typeHex": "0xff",
        "v": undefined,
        "value": 0n,
      }
      `)
  })
})

describe('transaction receipt', () => {
  test('formatter', () => {
    const { transactionReceipt } = zkSync.formatters!

    expect(
      transactionReceipt.format({
        blockHash:
          '0xe04cda3bc5633f0e1bff94fc84310da2a0c608192aae0fa0e412c2350c135f75',
        blockNumber: '0x1',
        contractAddress: null,
        cumulativeGasUsed: '0x0',
        effectiveGasPrice: '0xee6b280',
        from: '0x36615cf349d7f6344891b1e7ca7c72883f5dc049',
        gasUsed: '0xd46e0',
        l1BatchNumber: '0x1',
        l1BatchTxIndex: null,
        l2ToL1Logs: [],
        logs: [
          {
            address: '0x000000000000000000000000000000000000800a',
            blockHash:
              '0xe04cda3bc5633f0e1bff94fc84310da2a0c608192aae0fa0e412c2350c135f75',
            blockNumber: '0x1',
            data: '0x000000000000000000000000000000000000000000000000000116f2bae24b80',
            l1BatchNumber: '0x1',
            logIndex: '0x0',
            logType: null,
            removed: null,
            topics: [
              '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
              '0x00000000000000000000000036615cf349d7f6344891b1e7ca7c72883f5dc049',
              '0x0000000000000000000000000000000000000000000000000000000000008001',
            ],
            transactionHash:
              '0xf24f67fb9f8fb300164045fe6ba409acb03904e680ec7df41ed2d331dc38f545',
            transactionIndex: '0x0',
            transactionLogIndex: '0x0',
          },
          {
            address: '0x000000000000000000000000000000000000800a',
            blockHash:
              '0xe04cda3bc5633f0e1bff94fc84310da2a0c608192aae0fa0e412c2350c135f75',
            blockNumber: '0x1',
            data: '0x0000000000000000000000000000000000000000000000000de0b6b3a7640000',
            l1BatchNumber: '0x1',
            logIndex: '0x1',
            logType: null,
            removed: null,
            topics: [
              '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
              '0x00000000000000000000000036615cf349d7f6344891b1e7ca7c72883f5dc049',
              '0x000000000000000000000000a61464658afeaf65cccaafd3a512b69a83b77618',
            ],
            transactionHash:
              '0xf24f67fb9f8fb300164045fe6ba409acb03904e680ec7df41ed2d331dc38f545',
            transactionIndex: '0x0',
            transactionLogIndex: '0x1',
          },
          {
            address: '0x000000000000000000000000000000000000800a',
            blockHash:
              '0xe04cda3bc5633f0e1bff94fc84310da2a0c608192aae0fa0e412c2350c135f75',
            blockNumber: '0x1',
            data: '0x0000000000000000000000000000000000000000000000000000511b8bb71b80',
            l1BatchNumber: '0x1',
            logIndex: '0x2',
            logType: null,
            removed: null,
            topics: [
              '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
              '0x0000000000000000000000000000000000000000000000000000000000008001',
              '0x00000000000000000000000036615cf349d7f6344891b1e7ca7c72883f5dc049',
            ],
            transactionHash:
              '0xf24f67fb9f8fb300164045fe6ba409acb03904e680ec7df41ed2d331dc38f545',
            transactionIndex: '0x0',
            transactionLogIndex: '0x2',
          },
        ],
        logsBloom:
          '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
        root: null,
        status: '0x1',
        to: '0xa61464658afeaf65cccaafd3a512b69a83b77618',
        transactionHash:
          '0xf24f67fb9f8fb300164045fe6ba409acb03904e680ec7df41ed2d331dc38f545',
        transactionIndex: '0x0',
      }),
    ).toMatchInlineSnapshot(`
      {
        "blockHash": "0xe04cda3bc5633f0e1bff94fc84310da2a0c608192aae0fa0e412c2350c135f75",
        "blockNumber": 1n,
        "contractAddress": null,
        "cumulativeGasUsed": 0n,
        "effectiveGasPrice": 250000000n,
        "from": "0x36615cf349d7f6344891b1e7ca7c72883f5dc049",
        "gasUsed": 870112n,
        "l1BatchNumber": 1n,
        "l1BatchTxIndex": null,
        "l2ToL1Logs": [],
        "logs": [
          {
            "address": "0x000000000000000000000000000000000000800a",
            "blockHash": "0xe04cda3bc5633f0e1bff94fc84310da2a0c608192aae0fa0e412c2350c135f75",
            "blockNumber": "0x1",
            "data": "0x000000000000000000000000000000000000000000000000000116f2bae24b80",
            "l1BatchNumber": "0x1",
            "logIndex": "0x0",
            "logType": null,
            "removed": null,
            "topics": [
              "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
              "0x00000000000000000000000036615cf349d7f6344891b1e7ca7c72883f5dc049",
              "0x0000000000000000000000000000000000000000000000000000000000008001",
            ],
            "transactionHash": "0xf24f67fb9f8fb300164045fe6ba409acb03904e680ec7df41ed2d331dc38f545",
            "transactionIndex": "0x0",
            "transactionLogIndex": "0x0",
          },
          {
            "address": "0x000000000000000000000000000000000000800a",
            "blockHash": "0xe04cda3bc5633f0e1bff94fc84310da2a0c608192aae0fa0e412c2350c135f75",
            "blockNumber": "0x1",
            "data": "0x0000000000000000000000000000000000000000000000000de0b6b3a7640000",
            "l1BatchNumber": "0x1",
            "logIndex": "0x1",
            "logType": null,
            "removed": null,
            "topics": [
              "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
              "0x00000000000000000000000036615cf349d7f6344891b1e7ca7c72883f5dc049",
              "0x000000000000000000000000a61464658afeaf65cccaafd3a512b69a83b77618",
            ],
            "transactionHash": "0xf24f67fb9f8fb300164045fe6ba409acb03904e680ec7df41ed2d331dc38f545",
            "transactionIndex": "0x0",
            "transactionLogIndex": "0x1",
          },
          {
            "address": "0x000000000000000000000000000000000000800a",
            "blockHash": "0xe04cda3bc5633f0e1bff94fc84310da2a0c608192aae0fa0e412c2350c135f75",
            "blockNumber": "0x1",
            "data": "0x0000000000000000000000000000000000000000000000000000511b8bb71b80",
            "l1BatchNumber": "0x1",
            "logIndex": "0x2",
            "logType": null,
            "removed": null,
            "topics": [
              "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
              "0x0000000000000000000000000000000000000000000000000000000000008001",
              "0x00000000000000000000000036615cf349d7f6344891b1e7ca7c72883f5dc049",
            ],
            "transactionHash": "0xf24f67fb9f8fb300164045fe6ba409acb03904e680ec7df41ed2d331dc38f545",
            "transactionIndex": "0x0",
            "transactionLogIndex": "0x2",
          },
        ],
        "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        "root": null,
        "status": "success",
        "to": "0xa61464658afeaf65cccaafd3a512b69a83b77618",
        "transactionHash": "0xf24f67fb9f8fb300164045fe6ba409acb03904e680ec7df41ed2d331dc38f545",
        "transactionIndex": 0,
        "type": null,
      }
    `)
  })

  test('action', async () => {
    const client = createPublicClient({
      chain: zkSync,
      transport: http(),
    })

    const transaction = await getTransactionReceipt(client, {
      hash: '0xc7241ceeb87d95216b09d2b788fe59801109aa24ccf18696c0c0ff30ca8f135f',
    })

    expect(transaction).toMatchInlineSnapshot(`
      {
        "blockHash": "0x8b3aa00de843530834543e47b9194b1a109391df5df076aad364e84719d83176",
        "blockNumber": 16038545n,
        "contractAddress": null,
        "cumulativeGasUsed": 0n,
        "effectiveGasPrice": 250000000n,
        "from": "0x5fb5c854f3691ed11504dedcb702caf826251101",
        "gasUsed": 748441n,
        "l1BatchNumber": 261390n,
        "l1BatchTxIndex": 65n,
        "l2ToL1Logs": [],
        "logs": [
          {
            "address": "0x000000000000000000000000000000000000800a",
            "blockHash": "0x8b3aa00de843530834543e47b9194b1a109391df5df076aad364e84719d83176",
            "blockNumber": "0xf4ba91",
            "data": "0x00000000000000000000000000000000000000000000000000016e6574615a00",
            "l1BatchNumber": "0x3fd0e",
            "logIndex": "0x181",
            "logType": null,
            "removed": false,
            "topics": [
              "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
              "0x0000000000000000000000005fb5c854f3691ed11504dedcb702caf826251101",
              "0x0000000000000000000000000000000000000000000000000000000000008001",
            ],
            "transactionHash": "0xc7241ceeb87d95216b09d2b788fe59801109aa24ccf18696c0c0ff30ca8f135f",
            "transactionIndex": "0x40",
            "transactionLogIndex": "0x181",
          },
          {
            "address": "0x3355df6d4c9c3035724fd0e3914de96a5a83aaf4",
            "blockHash": "0x8b3aa00de843530834543e47b9194b1a109391df5df076aad364e84719d83176",
            "blockNumber": "0xf4ba91",
            "data": "0x0000000000000000000000000000000000000000000000000000000000000000",
            "l1BatchNumber": "0x3fd0e",
            "logIndex": "0x182",
            "logType": null,
            "removed": false,
            "topics": [
              "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925",
              "0x0000000000000000000000005fb5c854f3691ed11504dedcb702caf826251101",
              "0x0000000000000000000000004d88434edc8b7ffe215ec598c2290cdc6f58d12d",
            ],
            "transactionHash": "0xc7241ceeb87d95216b09d2b788fe59801109aa24ccf18696c0c0ff30ca8f135f",
            "transactionIndex": "0x40",
            "transactionLogIndex": "0x182",
          },
          {
            "address": "0x3355df6d4c9c3035724fd0e3914de96a5a83aaf4",
            "blockHash": "0x8b3aa00de843530834543e47b9194b1a109391df5df076aad364e84719d83176",
            "blockNumber": "0xf4ba91",
            "data": "0x0000000000000000000000000000000000000000000000000000000000edbe38",
            "l1BatchNumber": "0x3fd0e",
            "logIndex": "0x183",
            "logType": null,
            "removed": false,
            "topics": [
              "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
              "0x0000000000000000000000005fb5c854f3691ed11504dedcb702caf826251101",
              "0x000000000000000000000000b51e60f61c48d8329843f86d861abf50e4dc918d",
            ],
            "transactionHash": "0xc7241ceeb87d95216b09d2b788fe59801109aa24ccf18696c0c0ff30ca8f135f",
            "transactionIndex": "0x40",
            "transactionLogIndex": "0x183",
          },
          {
            "address": "0x5aea5775959fbc2557cc8789bc1bf90a239d9a91",
            "blockHash": "0x8b3aa00de843530834543e47b9194b1a109391df5df076aad364e84719d83176",
            "blockNumber": "0xf4ba91",
            "data": "0x0000000000000000000000000000000000000000000000000022bac2f130cfb0",
            "l1BatchNumber": "0x3fd0e",
            "logIndex": "0x184",
            "logType": null,
            "removed": false,
            "topics": [
              "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
              "0x000000000000000000000000b51e60f61c48d8329843f86d861abf50e4dc918d",
              "0x0000000000000000000000004d88434edc8b7ffe215ec598c2290cdc6f58d12d",
            ],
            "transactionHash": "0xc7241ceeb87d95216b09d2b788fe59801109aa24ccf18696c0c0ff30ca8f135f",
            "transactionIndex": "0x40",
            "transactionLogIndex": "0x184",
          },
          {
            "address": "0x3355df6d4c9c3035724fd0e3914de96a5a83aaf4",
            "blockHash": "0x8b3aa00de843530834543e47b9194b1a109391df5df076aad364e84719d83176",
            "blockNumber": "0xf4ba91",
            "data": "0x000000000000000000000000000000000000000000000000000000000000f372",
            "l1BatchNumber": "0x3fd0e",
            "logIndex": "0x185",
            "logType": null,
            "removed": false,
            "topics": [
              "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
              "0x000000000000000000000000b51e60f61c48d8329843f86d861abf50e4dc918d",
              "0x0000000000000000000000002da6dd9133ff4a9397b6618cb6bdba589da8ab07",
            ],
            "transactionHash": "0xc7241ceeb87d95216b09d2b788fe59801109aa24ccf18696c0c0ff30ca8f135f",
            "transactionIndex": "0x40",
            "transactionLogIndex": "0x185",
          },
          {
            "address": "0x3355df6d4c9c3035724fd0e3914de96a5a83aaf4",
            "blockHash": "0x8b3aa00de843530834543e47b9194b1a109391df5df076aad364e84719d83176",
            "blockNumber": "0xf4ba91",
            "data": "0x000000000000000000000000000000000000000000000000000000000000f373",
            "l1BatchNumber": "0x3fd0e",
            "logIndex": "0x186",
            "logType": null,
            "removed": false,
            "topics": [
              "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
              "0x000000000000000000000000b51e60f61c48d8329843f86d861abf50e4dc918d",
              "0x0000000000000000000000008180c52509db6cc864c649afb66472bf8ab87cbe",
            ],
            "transactionHash": "0xc7241ceeb87d95216b09d2b788fe59801109aa24ccf18696c0c0ff30ca8f135f",
            "transactionIndex": "0x40",
            "transactionLogIndex": "0x186",
          },
          {
            "address": "0xb51e60f61c48d8329843f86d861abf50e4dc918d",
            "blockHash": "0x8b3aa00de843530834543e47b9194b1a109391df5df076aad364e84719d83176",
            "blockNumber": "0xf4ba91",
            "data": "0x000000000000000000000000000000000000000000000000000000000000f3720000000000000000000000000000000000000000000000000000000000000000",
            "l1BatchNumber": "0x3fd0e",
            "logIndex": "0x187",
            "logType": null,
            "removed": false,
            "topics": [
              "0xfd26d3e0e8324438b2b556a62f87e2e5864535089e691e5119466433de1ebc61",
              "0x0000000000000000000000004d88434edc8b7ffe215ec598c2290cdc6f58d12d",
            ],
            "transactionHash": "0xc7241ceeb87d95216b09d2b788fe59801109aa24ccf18696c0c0ff30ca8f135f",
            "transactionIndex": "0x40",
            "transactionLogIndex": "0x187",
          },
          {
            "address": "0xb51e60f61c48d8329843f86d861abf50e4dc918d",
            "blockHash": "0x8b3aa00de843530834543e47b9194b1a109391df5df076aad364e84719d83176",
            "blockNumber": "0xf4ba91",
            "data": "0x000000000000000000000000000000000000000000000000000000000000f3730000000000000000000000000000000000000000000000000000000000000000",
            "l1BatchNumber": "0x3fd0e",
            "logIndex": "0x188",
            "logType": null,
            "removed": false,
            "topics": [
              "0x112c256902bf554b6ed882d2936687aaeb4225e8cd5b51303c90ca6cf43a8602",
              "0x0000000000000000000000004d88434edc8b7ffe215ec598c2290cdc6f58d12d",
            ],
            "transactionHash": "0xc7241ceeb87d95216b09d2b788fe59801109aa24ccf18696c0c0ff30ca8f135f",
            "transactionIndex": "0x40",
            "transactionLogIndex": "0x188",
          },
          {
            "address": "0xb51e60f61c48d8329843f86d861abf50e4dc918d",
            "blockHash": "0x8b3aa00de843530834543e47b9194b1a109391df5df076aad364e84719d83176",
            "blockNumber": "0xf4ba91",
            "data": "0x00000000000000000000000000000000000000000000000000000009e6cda7c000000000000000000000000000000000000000000000000175228995e1e78d01",
            "l1BatchNumber": "0x3fd0e",
            "logIndex": "0x189",
            "logType": null,
            "removed": false,
            "topics": [
              "0xcf2aa50876cdfbb541206f89af0ee78d44a2abf8d328e37fa4917f982149848a",
            ],
            "transactionHash": "0xc7241ceeb87d95216b09d2b788fe59801109aa24ccf18696c0c0ff30ca8f135f",
            "transactionIndex": "0x40",
            "transactionLogIndex": "0x189",
          },
          {
            "address": "0xb51e60f61c48d8329843f86d861abf50e4dc918d",
            "blockHash": "0x8b3aa00de843530834543e47b9194b1a109391df5df076aad364e84719d83176",
            "blockNumber": "0xf4ba91",
            "data": "0x0000000000000000000000000000000000000000000000000000000000edbe38000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000022bac2f130cfb0",
            "l1BatchNumber": "0x3fd0e",
            "logIndex": "0x18a",
            "logType": null,
            "removed": false,
            "topics": [
              "0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822",
              "0x0000000000000000000000004d88434edc8b7ffe215ec598c2290cdc6f58d12d",
              "0x0000000000000000000000004d88434edc8b7ffe215ec598c2290cdc6f58d12d",
            ],
            "transactionHash": "0xc7241ceeb87d95216b09d2b788fe59801109aa24ccf18696c0c0ff30ca8f135f",
            "transactionIndex": "0x40",
            "transactionLogIndex": "0x18a",
          },
          {
            "address": "0x5aea5775959fbc2557cc8789bc1bf90a239d9a91",
            "blockHash": "0x8b3aa00de843530834543e47b9194b1a109391df5df076aad364e84719d83176",
            "blockNumber": "0xf4ba91",
            "data": "0x0000000000000000000000000000000000000000000000000022bac2f130cfb0",
            "l1BatchNumber": "0x3fd0e",
            "logIndex": "0x18b",
            "logType": null,
            "removed": false,
            "topics": [
              "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
              "0x0000000000000000000000004d88434edc8b7ffe215ec598c2290cdc6f58d12d",
              "0x0000000000000000000000000000000000000000000000000000000000000000",
            ],
            "transactionHash": "0xc7241ceeb87d95216b09d2b788fe59801109aa24ccf18696c0c0ff30ca8f135f",
            "transactionIndex": "0x40",
            "transactionLogIndex": "0x18b",
          },
          {
            "address": "0x000000000000000000000000000000000000800a",
            "blockHash": "0x8b3aa00de843530834543e47b9194b1a109391df5df076aad364e84719d83176",
            "blockNumber": "0xf4ba91",
            "data": "0x0000000000000000000000000000000000000000000000000022bac2f130cfb0",
            "l1BatchNumber": "0x3fd0e",
            "logIndex": "0x18c",
            "logType": null,
            "removed": false,
            "topics": [
              "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
              "0x0000000000000000000000005aea5775959fbc2557cc8789bc1bf90a239d9a91",
              "0x0000000000000000000000004d88434edc8b7ffe215ec598c2290cdc6f58d12d",
            ],
            "transactionHash": "0xc7241ceeb87d95216b09d2b788fe59801109aa24ccf18696c0c0ff30ca8f135f",
            "transactionIndex": "0x40",
            "transactionLogIndex": "0x18c",
          },
          {
            "address": "0x000000000000000000000000000000000000800a",
            "blockHash": "0x8b3aa00de843530834543e47b9194b1a109391df5df076aad364e84719d83176",
            "blockNumber": "0xf4ba91",
            "data": "0x0000000000000000000000000000000000000000000000000022bac2f130cfb0",
            "l1BatchNumber": "0x3fd0e",
            "logIndex": "0x18d",
            "logType": null,
            "removed": false,
            "topics": [
              "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
              "0x0000000000000000000000004d88434edc8b7ffe215ec598c2290cdc6f58d12d",
              "0x0000000000000000000000005fb5c854f3691ed11504dedcb702caf826251101",
            ],
            "transactionHash": "0xc7241ceeb87d95216b09d2b788fe59801109aa24ccf18696c0c0ff30ca8f135f",
            "transactionIndex": "0x40",
            "transactionLogIndex": "0x18d",
          },
          {
            "address": "0x000000000000000000000000000000000000800a",
            "blockHash": "0x8b3aa00de843530834543e47b9194b1a109391df5df076aad364e84719d83176",
            "blockNumber": "0xf4ba91",
            "data": "0x0000000000000000000000000000000000000000000000000000c43874652b80",
            "l1BatchNumber": "0x3fd0e",
            "logIndex": "0x18e",
            "logType": null,
            "removed": false,
            "topics": [
              "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
              "0x0000000000000000000000000000000000000000000000000000000000008001",
              "0x0000000000000000000000005fb5c854f3691ed11504dedcb702caf826251101",
            ],
            "transactionHash": "0xc7241ceeb87d95216b09d2b788fe59801109aa24ccf18696c0c0ff30ca8f135f",
            "transactionIndex": "0x40",
            "transactionLogIndex": "0x18e",
          },
        ],
        "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        "root": "0x8b3aa00de843530834543e47b9194b1a109391df5df076aad364e84719d83176",
        "status": "success",
        "to": "0x4d88434edc8b7ffe215ec598c2290cdc6f58d12d",
        "transactionHash": "0xc7241ceeb87d95216b09d2b788fe59801109aa24ccf18696c0c0ff30ca8f135f",
        "transactionIndex": 64,
        "type": "eip1559",
      }
      `)
  })
})

describe('transactionRequest', () => {
  test('formatter', () => {
    const { transactionRequest } = zkSync.formatters!

    expect(
      transactionRequest.format({
        // TODO: Support BigNumberish?
        // https://docs.ethers.org/v5/api/utils/bignumber/#BigNumberish
        gasPerPubdata: '50000',
        customSignature: '0x123456',
        paymaster: '0x8e1DC7E4Bb15927E76a854a92Bf8053761501fdC',
        paymasterInput: '0x8c5a3445',
        factoryDeps: ['0xcde12'],
        from: '0x0f16e9b0d03470827a95cdfd0cb8a8a3b46969b9',
        gas: 1n,
        maxFeePerGas: 2n,
        maxPriorityFeePerGas: 1n,
        nonce: 1,
        value: 1n,
      }),
    ).toMatchInlineSnapshot(`
      {
        "customData": {
          "customSignature": "0x123456",
          "factoryDeps": [
            "0xcde12",
          ],
          "gasPerPubdata": "50000",
          "paymasterParams": {
            "paymaster": "0x8e1DC7E4Bb15927E76a854a92Bf8053761501fdC",
            "paymasterInput": "0x8c5a3445",
          },
        },
        "from": "0x0f16e9b0d03470827a95cdfd0cb8a8a3b46969b9",
        "gas": "0x1",
        "gasPrice": undefined,
        "maxFeePerGas": "0x2",
        "maxPriorityFeePerGas": "0x1",
        "nonce": "0x1",
        "type": undefined,
        "value": "0x1",
      }
    `)

    // Override to deploy a contract with bytecode 0xcde...12 and enforce that the
    // operator will not charge more than 100 L2 gas per published bytes on Layer 1:
    /*expect(
      transactionRequest.format({
        factoryDeps: ['0xcde12'],
        from: '0x0f16e9b0d03470827a95cdfd0cb8a8a3b46969b9',
        gas: 1n,
        gasPerPubdata: '100',
        maxFeePerGas: 2n,
        maxPriorityFeePerGas: 1n,
        nonce: 1,
        value: 1n,
      }),
    ).toMatchInlineSnapshot(`
      {
        "feeCurrency": "0x0f16e9b0d03470827a95cdfd0cb8a8a3b46969b9",
        "from": "0x0f16e9b0d03470827a95cdfd0cb8a8a3b46969b9",
        "gas": "0x1",
        "gasPrice": undefined,
        "gatewayFee": undefined,
        "gatewayFeeRecipient": "0x0f16e9b0d03470827a95cdfd0cb8a8a3b46969b9",
        "maxFeePerGas": "0x2",
        "maxPriorityFeePerGas": "0x1",
        "nonce": "0x1",
        "type": undefined,
        "value": "0x1",
      }
    `)*/

    /*expect(
      transactionRequest.format({
        customSignature: "0x123456",
        // TODO: Add intermediary?
        paymaster: '0x8e1DC7E4Bb15927E76a854a92Bf8053761501fdC',
        paymasterInput: '0x8c5a3445',
        from: '0x0f16e9b0d03470827a95cdfd0cb8a8a3b46969b9',
        gas: 1n,
        maxFeePerGas: 2n,
        maxPriorityFeePerGas: 1n,
        nonce: 1,
        type: 'eip712',
        value: 1n,
      }),
    ).toMatchInlineSnapshot(`
      {
        "feeCurrency": "0x0f16e9b0d03470827a95cdfd0cb8a8a3b46969b9",
        "from": "0x0f16e9b0d03470827a95cdfd0cb8a8a3b46969b9",
        "gas": "0x1",
        "gasPrice": undefined,
        "gatewayFee": "0x4",
        "gatewayFeeRecipient": "0x0f16e9b0d03470827a95cdfd0cb8a8a3b46969b9",
        "maxFeePerGas": "0x2",
        "maxPriorityFeePerGas": "0x1",
        "nonce": "0x1",
        "type": "0x7c",
        "value": "0x1",
      }
    `)*/
  })
})
