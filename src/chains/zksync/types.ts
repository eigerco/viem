import type { Address } from 'abitype'

import type { Block, BlockTag } from '../../types/block.js'
import type { FeeValuesEIP1559 } from '../../types/fee.js'
import type { Log as Log_ } from '../../types/log.js'
import type { Hex } from '../../types/misc.js'
import type {
  Index,
  Quantity,
  RpcBlock,
  RpcLog as RpcLog_,
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

import type { Abi, AbiEvent } from 'abitype'

// Types
// https://era.zksync.io/docs/api/js/types.html

export type Log<
  TQuantity = bigint,
  TIndex = number,
  TPending extends boolean = boolean,
  TAbiEvent extends AbiEvent | undefined = undefined,
  TStrict extends boolean | undefined = undefined,
  TAbi extends Abi | readonly unknown[] | undefined = TAbiEvent extends AbiEvent
    ? [TAbiEvent]
    : undefined,
  TEventName extends string | undefined = TAbiEvent extends AbiEvent
    ? TAbiEvent['name']
    : undefined,
> = Log_<TQuantity, TIndex, TPending, TAbiEvent, TStrict, TAbi, TEventName> & {
  // TODO: Changing this should affect the tests, but it doesn't.
  l1BatchNumber: bigint
}

export type RpcLog = RpcLog_ & {
  // Ignored for now, I can't make type working.
  //l1BatchNumber: Hex
}

export type L2ToL1Log = {
  blockNumber: bigint
  blockHash: string
  l1BatchNumber: bigint
  transactionIndex: bigint
  shardId: bigint
  isService: boolean
  sender: string
  key: string
  value: string
  transactionHash: string
  logIndex: bigint
}

export type RpcL2ToL1Log = {
  blockNumber: Hex
  blockHash: Hex
  l1BatchNumber: Hex
  transactionIndex: Hex
  shardId: Hex
  isService: boolean
  sender: Hex
  key: Hex
  value: Hex
  transactionHash: Hex
  logIndex: Hex
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

// Block
// https://era.zksync.io/docs/api/js/types.html#block

export type ZkSyncBlockOverrides = {
  l1BatchNumber: Hex
  l1BatchTimestamp: Hex | null
}

export type ZkSyncRpcBlockOverrides = {
  l1BatchNumber: Hex
  l1BatchTimestamp: Hex | null
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

// Transaction Request
// https://era.zksync.io/docs/reference/concepts/transactions.html

export type TransactionRequestEIP712 = TransactionRequestBase &
  Partial<FeeValuesEIP1559> & {
    gasPerPubdata?: string
    customSignature: Hex
    paymaster?: Address
    paymasterInput?: Hex
    factoryDeps?: Hex[]
    type?: 'eip712'
  }

type TransactionRequest = TransactionRequest_ & {}

export type ZkSyncTransactionRequest =
  | TransactionRequest
  | TransactionRequestEIP712

type RpcTransactionRequestEIP712 = TransactionRequestBase<Quantity, Index> &
  Partial<FeeValuesEIP1559<Quantity>> & {
    type?: '0x71'
  }

type RpcTransactionRequest = RpcTransactionRequest_ & {
  gasPerPubdata?: Hex
  customSignature?: Hex
  paymaster?: Address
  paymasterInput?: Hex
  factoryDeps?: Hex[]
}

export type ZkSyncRpcTransactionRequest =
  | RpcTransactionRequest
  | RpcTransactionRequestEIP712

export type ZkSyncTransactionType = TransactionType | 'eip712' | 'priority'

// Transaction Receipt
// https://era.zksync.io/docs/api/js/types.html#transactionreceipt

export type ZkSyncRpcTransactionReceiptOverrides = {
  l1BatchNumber: Hex | null
  l1BatchTxIndex: Hex | null
  logs: RpcLog[]
  l2ToL1Logs: RpcL2ToL1Log[]
}
export type ZkSyncRpcTransactionReceipt = RpcTransactionReceipt &
  ZkSyncRpcTransactionReceiptOverrides

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
    customSignature: Hex
    chainId: number
    type?: 'eip712'
  }

export type TransactionSerializedEIP712 = `0x71${string}`
