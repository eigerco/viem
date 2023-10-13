import { defineChain } from '../../utils/chain.js'
import { formattersZkSync } from '../zksync/formatters.js'
import { serializersZkSync } from '../zksync/serializers.js'

export const zkSyncLocalnet = /*#__PURE__*/ defineChain(
  {
    id: 270,
    name: 'zkSync Era Localnet',
    network: 'zksync-era-localnet',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
      default: {
        http: ['http://127.0.0.1:3050'],
        webSocket: ['ws://127.0.0.1:3051/ws'],
      },
      public: {
        http: ['http://127.0.0.1:3050'],
        webSocket: ['ws://127.0.0.1:3051/ws'],
      },
    },
    contracts: {
      multicall3: {
        address: '0xF9cda624FBC7e059355ce98a31693d299FACd963',
      },
    },
    testnet: true,
  },
  {
    formatters: formattersZkSync,
    serializers: serializersZkSync,
  },
)
