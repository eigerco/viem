import type { Chain, ChainConfig, ChainFormatters } from '../../types/chain.js'
import type { Assign } from '../../types/utils.js'

export function defineChain<
  const chain extends Chain,
  formatters extends ChainFormatters | undefined = undefined,
>(
  chain: chain,
  config: ChainConfig<formatters> = {},
): Assign<chain, ChainConfig<formatters>> {
  const {
    fees = chain.fees,
    formatters = chain.formatters,
    serializers = chain.serializers,
    custom = chain.custom,
  } = config
  return {
    ...chain,
    fees,
    custom,
    formatters,
    serializers,
  } as unknown as Assign<chain, ChainConfig<formatters>>
}
