import { test } from 'vitest'
import { accounts } from '~test/src/constants.js'
import { privateKeyToAccount } from '../../accounts/privateKeyToAccount.js'
import { signTransaction } from '../../accounts/utils/signTransaction.js'
import { createWalletClient } from '../../clients/createWalletClient.js'
import { http } from '../../clients/transports/http.js'
import { zkSyncTestnet } from '../index.js'
import { serializeTransactionZkSync } from './serializers.js'
import type { TransactionSerializableEIP712 } from './types.js'

const _greeterContractLocalnet = '0x111C3E89Ce80e62EE88318C2804920D4c96f92bb'
const greeterContractTestnet = '0xbe9bcf56654fd81a921b6Bd07965Dd67Afbb0B69'

const _paymasterContractLocalnet = '0x4B5DF730c2e6b28E17013A1485E5d9BC41Efe021'
const paymasterContractTestnet = '0xFD9aE5ebB0F6656f4b77a0E99dCbc5138d54b0BA'

const baseEip712: TransactionSerializableEIP712 = {
  to: greeterContractTestnet,
  from: accounts[0].address,
  chainId: zkSyncTestnet.id,
  nonce: 454,
  gas: 158774n,
  maxFeePerGas: 250000000n,
  maxPriorityFeePerGas: 0n,
  value: 0n,
  gasPerPubdata: 50000n,
  factoryDeps: [],
  data: '0xa4136862000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000017900000000000000000000000000000000000000000000000000000000000000',
  paymaster: paymasterContractTestnet,
  paymasterInput:
    '0x8c5a344500000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000',
  type: 'eip712',
  customSignature: '0x',
}

test('signed', async () => {
  const walletClient = createWalletClient({
    account: privateKeyToAccount(accounts[0].privateKey),
    chain: zkSyncTestnet,
    transport: http(),
  })

  const transactionToSign = {
    txType: 113n,
    from: BigInt(baseEip712.from),
    to: baseEip712.to ? BigInt(baseEip712.to) : 0n,
    gasLimit: baseEip712.gas ?? 0n,
    gasPerPubdataByteLimit: baseEip712.gasPerPubdata ?? 0n,
    maxFeePerGas: baseEip712.maxFeePerGas,
    maxPriorityFeePerGas: 0n,
    paymaster: baseEip712.paymaster ? BigInt(baseEip712.paymaster) : 0n,
    nonce: baseEip712.nonce ? BigInt(baseEip712.nonce) : 0n,
    value: 0n,
    data: baseEip712.data ? baseEip712.data : '0x0',
    factoryDeps: [],
    paymasterInput: baseEip712.paymasterInput
      ? baseEip712.paymasterInput
      : '0x0',
  }

  // This should be added as structure similar to formatters and serializers.
  const customSignature = await walletClient.signTypedData({
    domain: {
      name: 'zkSync',
      version: '2',
      chainId: zkSyncTestnet.id,
    },
    types: {
      Transaction: [
        { name: 'txType', type: 'uint256' },
        { name: 'from', type: 'uint256' },
        { name: 'to', type: 'uint256' },
        { name: 'gasLimit', type: 'uint256' },
        { name: 'gasPerPubdataByteLimit', type: 'uint256' },
        { name: 'maxFeePerGas', type: 'uint256' },
        { name: 'maxPriorityFeePerGas', type: 'uint256' },
        { name: 'paymaster', type: 'uint256' },
        { name: 'nonce', type: 'uint256' },
        { name: 'value', type: 'uint256' },
        { name: 'data', type: 'bytes' },
        { name: 'factoryDeps', type: 'bytes32[]' },
        { name: 'paymasterInput', type: 'bytes' },
      ],
    },
    primaryType: 'Transaction',
    message: transactionToSign,
  })

  const signed = await signTransaction({
    privateKey: accounts[0].privateKey,
    transaction: { ...baseEip712, customSignature },
    serializer: serializeTransactionZkSync,
  })

  console.log(signed)
})
