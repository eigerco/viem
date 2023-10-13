import type { Address } from 'abitype'

import type { Block, BlockTag } from '../../types/block.js'
import type { FeeValuesEIP1559 } from '../../types/fee.js'
import type { Log as Log_ } from '../../types/log.js'
import type { Hex } from '../../types/misc.js'

import type {
  Index,
  Quantity,
  RpcBlock,
  RpcTransaction,
  RpcTransactionReceipt,
  RpcTransactionRequest as RpcTransactionRequest_,
  TransactionType,
} from '../../types/rpc.js'
import type {
  Transaction as Transaction_,
  TransactionBase,
  TransactionReceipt,
  TransactionRequest as TransactionRequest_,
  TransactionRequestBase,
  TransactionSerializable,
  TransactionSerializableBase,
  TransactionSerialized,
} from '../../types/transaction.js'

// Types
// https://era.zksync.io/docs/api/js/types.html

type Log = Log_ & {
  // TOOD: Changing this should affect the tests, but it doesn't.
  l1BatchNumber: number
}

type L2ToL1Log = {
  blockNumber: number
  blockHash: string
  l1BatchNumber: number
  transactionIndex: number
  shardId: number
  isService: boolean
  sender: string
  key: string
  value: string
  transactionHash: string
  logIndex: number
}

// TODO: We might not need this.
export type Eip712Meta = {
  gasPerPubdata?: string
  customSignature?: Hex
  paymasterParams?: {
    paymaster?: Hex
    paymasterInput?: Hex
  }
  factoryDeps?: Hex[]
}

//
// Block
//

// https://era.zksync.io/docs/api/js/types.html#block
export type ZkSyncBlockOverrides = {
  l1BatchNumber: Hex
  l1BatchTimestamp: Hex
}

export type ZkSyncRpcBlockOverrides = {
  l1BatchNumber: Hex
  l1BatchTimestamp: Hex
}
export type ZkSyncRpcBlock<
  TBlockTag extends BlockTag = BlockTag,
  TIncludeTransactions extends boolean = boolean,
> = RpcBlock<
  TBlockTag,
  TIncludeTransactions,
  ZkSyncRpcTransaction<TBlockTag extends 'pending' ? true : false>
> &
  ZkSyncRpcBlockOverrides

export type ZkSyncBlock<
  TIncludeTransactions extends boolean = boolean,
  TBlockTag extends BlockTag = BlockTag,
> = Block<
  bigint,
  TIncludeTransactions,
  TBlockTag,
  ZkSyncTransaction<TBlockTag extends 'pending' ? true : false>
> &
  ZkSyncBlockOverrides

//
// Transaction
//

// https://era.zksync.io/docs/reference/concepts/transactions.html#priority-0xff
type TransactionPriority<TPending extends boolean = boolean> = TransactionBase<
  bigint,
  number,
  TPending
> &
  FeeValuesEIP1559 & {
    type: 'priority'
  }

type TransactionEIP712<TPending extends boolean = boolean> = TransactionBase<
  bigint,
  number,
  TPending
> &
  FeeValuesEIP1559 & {
    type: 'eip712'
  }

type Transaction<TPending extends boolean = boolean> = Transaction_<
  bigint,
  number,
  TPending
>

export type ZkSyncTransaction<TPending extends boolean = boolean> =
  | Transaction<TPending>
  | TransactionPriority<TPending>
  | TransactionEIP712<TPending>

// RPC
export type RpcTransactionPriority<TPending extends boolean = boolean> =
  TransactionBase<Quantity, Index, TPending> &
    FeeValuesEIP1559<Quantity> & {
      type: '0xff'
    }

export type RpcTransactionEIP712<TPending extends boolean = boolean> =
  TransactionBase<Quantity, Index, TPending> &
    FeeValuesEIP1559<Quantity> & {
      type: '0x71'
    }

export type ZkSyncRpcTransaction<TPending extends boolean = boolean> =
  | RpcTransaction<TPending>
  | RpcTransactionPriority<TPending>
  | RpcTransactionEIP712<TPending>

//
// Transaction Request
//

type TransactionRequest = TransactionRequest_ & {
  gasPerPubdata?: string
  customSignature?: Hex
  paymaster?: Hex
  paymasterInput?: Hex
  factoryDeps?: Hex[]
}

type TransactionRequestEIP712 = TransactionRequestBase &
  Partial<FeeValuesEIP1559> & {
    gasPerPubdata?: string
    customSignature?: Hex
    paymaster?: Address
    paymasterInput?: Hex
    factoryDeps?: Hex[]
    type?: 'eip712'
  }

export type ZkSyncTransactionRequest =
  | TransactionRequest
  | TransactionRequestEIP712

// https://era.zksync.io/docs/reference/concepts/transactions.html#eip-712-0x71
type RpcTransactionRequestEIP712 = TransactionRequestBase<Quantity, Index> &
  Partial<FeeValuesEIP1559<Quantity>> & {
    type?: '0x71'
  }

export type ZkSyncRpcTransactionRequest =
  | RpcTransactionRequest_
  | RpcTransactionRequestEIP712

export type ZkSyncTransactionType = TransactionType | 'eip712' | 'priority'

//
// Transaction Receipt
//

// https://era.zksync.io/docs/api/js/types.html#transactionreceipt
export type ZkSyncRpcTransactionReceiptOverrides = {
  l1BatchNumber: Hex | null
  l1BatchTxIndex: Hex | null
  logs: Log[]
  l2ToL1Logs: L2ToL1Log[]
}
export type ZkSyncRpcTransactionReceipt = RpcTransactionReceipt &
  ZkSyncRpcTransactionReceiptOverrides

// https://era.zksync.io/docs/api/js/types.html#transactionreceipt
export type ZkSyncTransactionReceiptOverrides = {
  l1BatchNumber: bigint | null
  l1BatchTxIndex: bigint | null
  logs: Log[]
  l2ToL1Logs: L2ToL1Log[]
}
export type ZkSyncTransactionReceipt = TransactionReceipt &
  ZkSyncTransactionReceiptOverrides

//
// Serializers
//

export type ZkSyncTransactionSerializable =
  | TransactionSerializable
  | TransactionSerializableEIP712

export type ZkSyncTransactionSerialized<
  TType extends ZkSyncTransactionType = 'eip1559',
> = TransactionSerialized<TType> | TransactionSerializedEIP712

export type TransactionSerializableEIP712<
  TQuantity = bigint,
  TIndex = number,
> = TransactionSerializableBase<TQuantity, TIndex> &
  FeeValuesEIP1559<TQuantity> & {
    from: Hex
    maxFeePerGas?: TQuantity
    maxPriorityFeePerGas?: TQuantity
    gasPerPubdata?: bigint
    paymaster?: Address
    factoryDeps?: Hex[]
    paymasterInput?: Hex
    customSignature?: Hex
    chainId: number
    // Should `gasLimit` be already be available? I can only see in block info
    // but we need this for EIP712 serialization. Maybe it is gas?
    // gasLimit: string
    type?: 'eip712'
  }

export type TransactionSerializedEIP712 = `0x71${string}`
