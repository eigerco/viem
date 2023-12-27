import type { Address } from 'abitype'
import type { Account } from '../../../accounts/types.js'
import { parseAccount } from '../../../accounts/utils/parseAccount.js'
import { estimateGas } from '../../../actions/public/estimateGas.js'
import { getTransactionCount } from '../../../actions/public/getTransactionCount.js'
import type { Client } from '../../../clients/createClient.js'
import type { Transport } from '../../../clients/transports/createTransport.js'

import type {
  PrepareTransactionRequestParameterType,
  PrepareTransactionRequestReturnType,
} from '../../../index.js'
import type { GetAccountParameter } from '../../../types/account.js'
import type { Chain, DeriveChain } from '../../../types/chain.js'
import type { GetChainParameter } from '../../../types/chain.js'
import type { UnionOmit } from '../../../types/utils.js'
import type { FormattedTransactionRequest } from '../../../utils/formatters/transactionRequest.js'
import { getAction } from '../../../utils/getAction.js'
import { type ChainEIP712, isEip712Transaction } from '../types.js'

import { getChainId } from '~viem/actions/index.js'
import { prepareTransactionRequest as originalPrepareTransactionRequest } from '../../../actions/wallet/prepareTransactionRequest.js'

type Eip712PrepareTransactionRequestParameterType =
  | PrepareTransactionRequestParameterType
  | 'customSignature'
  | 'paymaster'
  | 'paymasterInput'
  | 'gasPerPubdata'
  | 'factoryDeps'

export type PrepareTransactionRequestParameters<
  TChain extends Chain | undefined = Chain | undefined,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
  TAccountOverride extends Account | Address | undefined =
    | Account
    | Address
    | undefined,
  TParameterType extends
    Eip712PrepareTransactionRequestParameterType = Eip712PrepareTransactionRequestParameterType,
  ///
  derivedChain extends Chain | undefined = DeriveChain<TChain, TChainOverride>,
> = UnionOmit<FormattedTransactionRequest<derivedChain>, 'from'> &
  GetAccountParameter<TAccount, TAccountOverride, false> &
  GetChainParameter<TChain, TChainOverride> & {
    parameters?: TParameterType[]
  }

export async function prepareTransactionRequest<
  TChain extends ChainEIP712 | undefined,
  TAccount extends Account | undefined,
  TParameterType extends PrepareTransactionRequestParameterType,
  TAccountOverride extends Account | Address | undefined,
  TChainOverride extends Chain | undefined = ChainEIP712 | undefined,
>(
  client: Client<Transport, TChain, TAccount>,
  args: PrepareTransactionRequestParameters<
    TChain,
    TAccount,
    TChainOverride,
    TAccountOverride,
    TParameterType
  >,
): Promise<
  PrepareTransactionRequestReturnType<
    TChain,
    TAccount,
    TChainOverride,
    TAccountOverride,
    TParameterType
  >
> {
  const {
    account: account_ = client.account,
    nonce,
    parameters = [
      'fees',
      'gas',
      'nonce',
      'type',
      'customSignature',
      'paymaster',
      'paymasterInput',
      'gasPerPubdata',
      'factoryDeps',
    ],
  } = args
  const account = account_ ? parseAccount(account_) : undefined

  let chainId = 0
  if (args.chain?.id) {
    chainId = args.chain.id
  } else {
    chainId = await getAction(client, getChainId, 'getChainId')({})
  }

  const request = {
    ...args,
    chainId,
    ...(account ? { from: account?.address } : {}),
  }

  if (parameters.includes('nonce') && nonce === undefined && account)
    request.nonce = await getAction(
      client,
      getTransactionCount,
      'getTransactionCount',
    )({
      address: account.address,
      blockTag: 'pending',
    })

  if (isEip712Transaction({ ...request })) {
    request.type = 'eip712'

    if (request.gas === undefined) {
      request.gas = await getAction(
        client,
        estimateGas<TChain, TAccount>,
        'estimateGas',
      )({
        ...request,
        account: account
          ? { address: account.address, type: 'json-rpc' }
          : undefined,
      } as any)
    }

    return request as unknown as PrepareTransactionRequestReturnType<
      TChain,
      TAccount,
      TChainOverride,
      TAccountOverride,
      TParameterType
    >
  }

  return (await originalPrepareTransactionRequest(
    client,
    args,
  )) as unknown as PrepareTransactionRequestReturnType<
    TChain,
    TAccount,
    TChainOverride,
    TAccountOverride,
    TParameterType
  >
}
