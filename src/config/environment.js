import { SUBGRAPH_API_URLS } from '@/src/config/constants'
import { ChainConfig } from '@/src/config/hardcoded'
import { detectChainId } from '@/utils/dns'

export const getNetworkId = () => {
  const host = window.location.host
  const chainId = detectChainId(host)

  return parseInt(chainId, 10)
}

export const getGraphURL = (networkId) => { return SUBGRAPH_API_URLS[networkId] || null }

export const isFeatureEnabled = (feature) => {
  const bridgeOnly = !ChainConfig[Number(process.env.NEXT_PUBLIC_FALLBACK_NETWORK)]

  const str = bridgeOnly
    ? 'bridge-layerzero'
    : process.env.NEXT_PUBLIC_FEATURES ||
    'policy,liquidity,reporting,claim,bond,staking-pool,pod-staking-pool,vote-escrow,liquidity-gauge-pools,bridge-celer,bridge-layerzero,governance'
  const features = str.split(',').map((x) => { return x.trim() })

  return features.indexOf(feature) > -1
}

export const mainnetChainIds = [1, 10, 56, 137, 42161, 43114]

export const timeouts = {
  waitForTransactionWithTimeout: 30000
}
