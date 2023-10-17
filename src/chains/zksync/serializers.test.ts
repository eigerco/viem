import { expect, test } from 'vitest'
import { accounts } from '~test/src/constants.js'
import { signTransaction } from '../../accounts/utils/signTransaction.js'
import { serializeTransactionZkSync } from './serializers.js'
import type { TransactionSerializableEIP712 } from './types.js'
/*import type {
  TransactionSerializableEIP1559
} from '../../types/transaction.js'
import { parseGwei } from '../../utils/unit/parseGwei.js'
import { parseEther } from '../../utils/unit/parseEther.js'*/

const baseEip712: TransactionSerializableEIP712 = {
  to: accounts[0].address,
  from: '0xf760bdd822fccf93c44be68d94c45133002b3037',
  chainId: 270,
  nonce: 4,
  gas: 158774n,
  maxFeePerGas: 250000000n,
  maxPriorityFeePerGas: 0n,
  value: 0n,
  gasPerPubdata: 50000n,
  factoryDeps: [],
  data: '0xa4136862000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000094869204461766964340000000000000000000000000000000000000000000000',
  paymaster: '0x094499df5ee555ffc33af07862e43c90e6fee501',
  paymasterInput:
    '0x8c5a344500000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000',
  type: 'eip712',
  customSignature:
    '0x594113d654e8b04f4e6c7754c1100c2baaf579cab402768e236a19d040dd94f87dee6bf48cd6fd5017b7334dabeb9c890e8067a618edbe86141ab393256428e41c',
}

/*describe('eip712', () => {
  test('should be able to serialize a eip712 transaction', () => {
    const transaction: TransactionSerializableEIP712 = {
      ...baseEip712,
    }

    expect(serializeTransactionZkSync(transaction)).toEqual(
      '0x71f901480480840ee6b28083026c3694<b76ed02dea1ba444609602be5d587c4bffd67153>80b864a413686200000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000009486920446176696434000000000000000000000000000000000000000000000082010e808082010e94f760bdd822fccf93c44be68d94c45133002b303782c350c0b841594113d654e8b04f4e6c7754c1100c2baaf579cab402768e236a19d040dd94f87dee6bf48cd6fd5017b7334dabeb9c890e8067a618edbe86141ab393256428e41cf85b94094499df5ee555ffc33af07862e43c90e6fee501b8448c5a344500000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000',
    )
  })
})*/

/*describe('not eip712', () => {
  const transaction: TransactionSerializableEIP1559 = {
    to: accounts[0].address,
    chainId: 1,
    nonce: 0,
    maxFeePerGas: parseGwei('2'),
    maxPriorityFeePerGas: parseGwei('2'),
    value: parseEther('1'),
  }

  test('it calls the standard serializeTransactionSkZync', () => {
    const serialized = serializeTransactionZkSync(transaction)
    expect(serialized).toEqual(
      '0x02ed0180847735940084773594008094f39fd6e51aad88f6f4ce6ab8827279cfffb92266880de0b6b3a764000080c0',
    )
    expect(parseTransaction(serialized)).toEqual({
      to: accounts[0].address,
      chainId: 1,
      maxFeePerGas: parseGwei('2'),
      maxPriorityFeePerGas: parseGwei('2'),
      value: parseEther('1'),
      type: 'eip712',
    })
  })
})*/

test('signed', async () => {
  const my_acc0_demo_private_key =
    '0x7862adf2e0045c1e16c0207b710045cedb2b29fea8db4a5f3d23ca5e2ced5f9b'

  const signed = await signTransaction({
    privateKey: my_acc0_demo_private_key,
    transaction: { ...baseEip712 },
    serializer: serializeTransactionZkSync,
  })

  expect(signed).toEqual(
    '0x71f901480480840ee6b28083026c3694f39fd6e51aad88f6f4ce6ab8827279cfffb9226680b864a413686200000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000009486920446176696434000000000000000000000000000000000000000000000082010e808082010e94f760bdd822fccf93c44be68d94c45133002b303782c350c0b841594113d654e8b04f4e6c7754c1100c2baaf579cab402768e236a19d040dd94f87dee6bf48cd6fd5017b7334dabeb9c890e8067a618edbe86141ab393256428e41cf85b94094499df5ee555ffc33af07862e43c90e6fee501b8448c5a344500000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000',
  )
})
