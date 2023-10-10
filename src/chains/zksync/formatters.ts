import { type ChainFormatters } from '../../types/chain.js'
import type { Hash } from '../../types/misc.js'
import type { RpcTransaction } from '../../types/rpc.js'
import { hexToBigInt } from '../../utils/encoding/fromHex.js'
import { defineBlock } from '../../utils/formatters/block.js'
import {
  defineTransaction,
  formatTransaction,
} from '../../utils/formatters/transaction.js'
import { defineTransactionReceipt } from '../../utils/formatters/transactionReceipt.js'
import { defineTransactionRequest } from '../../utils/formatters/transactionRequest.js'
import type {
  ZkSyncBlockOverrides,
  ZkSyncRpcBlockOverrides,
  ZkSyncRpcTransaction,
  ZkSyncRpcTransactionReceiptOverrides,
  ZkSyncRpcTransactionRequest,
  ZkSyncTransaction,
  ZkSyncTransactionReceiptOverrides,
  ZkSyncTransactionRequest,
} from './types.js'

export const formattersZkSync = {
  block: /*#__PURE__*/ defineBlock({
    format(
      args: ZkSyncRpcBlockOverrides & {
        transactions: Hash[] | ZkSyncRpcTransaction[]
      },
    ): ZkSyncBlockOverrides & {
      transactions: Hash[] | ZkSyncTransaction[]
    } {
      const transactions = args.transactions?.map((transaction) => {
        if (typeof transaction === 'string') return transaction
        return {
          ...formatTransaction(transaction as RpcTransaction),
          gasPerPubdata: transaction.customData?.gasPerPubdata,
          customSignature: transaction.customData?.customSignature,
          paymaster: transaction.customData?.paymasterParams?.paymaster,
          paymasterInput:
            transaction.customData?.paymasterParams?.paymasterInput,
          factoryDeps: transaction.customData?.factoryDeps,
        } as ZkSyncTransaction
        // TODO: Add support for EIP712 in here due to type?
      }) as Hash[] | ZkSyncTransaction[]
      return {
        l1BatchNumber: args.l1BatchNumber,
        l1BatchTimestamp: args.l1BatchTimestamp,
        transactions,
      }
    },
  }),
  transaction: /*#__PURE__*/ defineTransaction({
    format(args: ZkSyncRpcTransaction): ZkSyncTransaction {
      // TODO: Add support for EIP712 in here due to type?
      return {
        gasPerPubdata: args.customData?.gasPerPubdata,
        customSignature: args.customData?.customSignature,
        paymaster: args.customData?.paymasterParams?.paymaster,
        paymasterInput: args.customData?.paymasterParams?.paymasterInput,
        factoryDeps: args.customData?.factoryDeps,
      } as ZkSyncTransaction
    },
  }),
  // https://era.zksync.io/docs/api/js/types.html#transactionreceipt
  transactionReceipt: /*#__PURE__*/ defineTransactionReceipt({
    format(
      args: ZkSyncRpcTransactionReceiptOverrides,
    ): ZkSyncTransactionReceiptOverrides {
      return {
        l1BatchNumber: args.l1BatchNumber
          ? hexToBigInt(args.l1BatchNumber)
          : null,
        l1BatchTxIndex: args.l1BatchTxIndex
          ? hexToBigInt(args.l1BatchTxIndex)
          : null,
        // We should return logs, the the default TransactionReceipt should also have this,
        // not sure it will give an error. https://era.zksync.io/docs/api/js/types.html#transactionreceipt
        logs: args.logs,
        l2ToL1Logs: args.l2ToL1Logs,
      }
    },
  }),
  transactionRequest: /*#__PURE__*/ defineTransactionRequest({
    exclude: [
      'customSignature',
      'factoryDeps',
      'gasPerPubdata',
      'paymaster',
      'paymasterInput',
    ],
    format(args: ZkSyncTransactionRequest): ZkSyncRpcTransactionRequest {
      const request = {
        customData: {
          gasPerPubdata: args.gasPerPubdata,
          factoryDeps: args.factoryDeps,
          customSignature: args.customSignature,
          paymasterParams: {
            paymaster: args.paymaster,
            paymasterInput: args.paymasterInput,
          },
        },
      } as ZkSyncRpcTransactionRequest
      if (args.type === 'eip712') request.type = '0x71'
      return request
    },
  }),
} as const satisfies ChainFormatters
