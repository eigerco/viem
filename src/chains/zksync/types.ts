import type { Address } from 'abitype'

import type { Block, BlockTag } from '../../types/block.js'
import type { FeeValuesEIP1559 } from '../../types/fee.js'
import type { Log as Log_ } from '../../types/log.js'
// TODO: Not sure if fee is needed, need to generate different transactions types.
import type { Hex } from '../../types/misc.js'

import type {
  Index,
  Quantity,
  RpcBlock,
  RpcTransaction as RpcTransaction_,
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

type Eip712Meta = {
  gasPerPubdata?: string
  customSignature?: Hex
  paymasterParams?: {
    paymaster?: Hex
    paymasterInput?: Hex
  }
  factoryDeps?: Hex[]
}

// Block

// TODO: Overrides in other chains doesn't have `null`, why compiler complains in the tests?
export type ZkSyncBlockOverrides = {
  // TODO: Do we need `stateRoot`
  l1BatchNumber: Hex | null
  l1BatchTimestamp: Hex | null
}

export type ZkSyncRpcBlockOverrides = {
  l1BatchNumber: Hex | null
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

// Celo chain uses NeverBy while Optimism doesn't. Not sure yet about the logic.
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

type Transaction<TPending extends boolean = boolean> = Transaction_<
  bigint,
  number,
  TPending
> & {
  gasPerPubdata?: string
  customSignature?: Hex
  paymaster?: Hex
  paymasterInput?: Hex
  factoryDeps?: Hex[]
}

// https://era.zksync.io/docs/reference/concepts/transactions.html#priority-0xff
type TransactionPriority<TPending extends boolean = boolean> = TransactionBase<
  bigint,
  number,
  TPending
> &
  FeeValuesEIP1559 & {
    type: '0xff'
  }

type TransactionEIP712<TPending extends boolean = boolean> = TransactionBase<
  bigint,
  number,
  TPending
> &
  FeeValuesEIP1559 & {
    type: '0x71'
  }

export type ZkSyncTransaction<TPending extends boolean = boolean> =
  | Transaction<TPending>
  | TransactionPriority<TPending>
  | TransactionEIP712<TPending>

export type ZkSyncRpcTransaction<TPending extends boolean = boolean> =
  RpcTransaction<TPending>

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

export type RpcTransaction<TPending extends boolean = boolean> =
  RpcTransaction_<TPending> & {
    customData: Eip712Meta
  }

/*type RpcTransactionRequest = RpcTransactionRequest_ & {
  // When sending to RPC we need to add into this field.
  customData?: Eip712Meta
  // To ensure the server recognizes EIP-712 transactions, the transaction_type 
  // field is equal to 113. The number 712 cannot be used as it has to be one byte long.
  //transaction_type: 113
}*/

// TODO: Does it need to use transaction request base?
// https://era.zksync.io/docs/reference/concepts/transactions.html#eip-712-0x71
type RpcTransactionRequestEIP712 = TransactionRequestBase<Quantity, Index> &
  Partial<FeeValuesEIP1559<Quantity>> & {
    customData: Eip712Meta
    type?: '0x71'
  }

export type ZkSyncRpcTransactionRequest =
  | RpcTransactionRequest_
  | RpcTransactionRequestEIP712

export type ZkSyncTransactionType = TransactionType | 'eip712'

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
  // TODO: Add fields from providers.TransactionReceipt? Or are they in Transaction Receipt?
  l1BatchNumber: bigint | null
  l1BatchTxIndex: bigint | null
  logs: Log[]
  l2ToL1Logs: L2ToL1Log[]
}
export type ZkSyncTransactionReceipt = TransactionReceipt &
  ZkSyncTransactionReceiptOverrides
