export {
  sendTransaction as sendEip712Transaction,
  type SendTransactionParameters as SendEip712TransactionParameters,
  type SendTransactionErrorType as SendEip712TransactionErrorType,
  type SendTransactionReturnType as SendEip712TransactionReturnType,
} from './actions/sendTransaction.js'

export {
  signEip712Transaction,
  type SignEip712TransactionParameters,
  type SignEip712TransactionReturnType,
  type SignEip712TransactionErrorType,
} from './actions/signTransaction.js'

export {
  writeContract as writeEip712Contract,
  type WriteContractParameters as WriteEip712ContractParameters,
  type WriteContractErrorType as WriteEip712ContractErrorType,
  type WriteContractReturnType as WriteEip712ContractReturnType,
} from './actions/writeContract.js'

export {
  prepareTransactionRequest as prepareEip712TransactionRequest,
  type PrepareTransactionRequestParameters as PrepareEip712TransactionRequestParameters,
  type PrepareTransactionRequestErrorType as PrepareEip712TransactionRequestErrorType,
  type PrepareTransactionRequestReturnType as PrepareEip712TransactionRequestReturnType,
} from './actions/prepareTransactionRequest.js'

export { defineChain } from './utils/defineChain.js'

export { type TransactionRequestEIP712 } from './types/transaction.js'

export {
  zkSync,
  zkSyncTestnet,
} from './chains.js'

export { eip712Actions, type Eip712Actions } from './decorators/eip712.js'
