import { BreadCrumbs } from '@/common/BreadCrumbs/BreadCrumbs'
import { ComingSoon } from '@/common/ComingSoon'
import { Container } from '@/common/Container/Container'
import { Hero } from '@/common/Hero'
import { HeroTitle } from '@/common/HeroTitle'
import { Seo } from '@/common/Seo'
import {
  LiquidityGaugeTxsTable
} from '@/modules/pools/liquidity-gauge-pools/LiquidityGaugeTxsTable'
import { isFeatureEnabled } from '@/src/config/environment'
import { slugToNetworkId } from '@/src/config/networks'
import { Routes } from '@/src/config/routes'
import { getTitle } from '@/src/ssg/seo'
import { getNetworks } from '@/src/ssg/static-paths'
import { Trans } from '@lingui/macro'

export const getStaticPaths = async () => {
  return {
    paths: getNetworks(),
    fallback: false
  }
}

export const getStaticProps = async ({ params }) => {
  return {
    props: {
      networkId: slugToNetworkId[params.network],
      title: getTitle({
        networkId: slugToNetworkId[params.network],
        pageAction: 'Liquidity Gauge Pools Transactions'
      })
    }
  }
}

export default function MyLiquidityGaugePoolsTxs ({ networkId, title }) {
  const disabled = !isFeatureEnabled('liquidity-gauge-pools', networkId)
  if (disabled) {
    return <ComingSoon />
  }

  return (
    <main>
      <Seo title={title} />

      <Hero>
        <Container className='px-2 py-20'>
          <BreadCrumbs
            pages={[
              { name: <Trans>Pool</Trans>, href: Routes.Pools(networkId), current: false },
              {
                name: <Trans>Liquidity Gauge Pools</Trans>,
                href: Routes.LiquidityGaugePools(networkId),
                current: false
              },
              {
                name: <Trans>Transaction List</Trans>,
                href: Routes.LiquidityGaugePoolsTransactions(networkId),
                current: true
              }
            ]}
          />
          <HeroTitle>
            <Trans>Transaction List</Trans>
          </HeroTitle>
        </Container>
        <hr className='border-B0C4DB' />
      </Hero>

      <Container className='pt-14 pb-28'>
        <LiquidityGaugeTxsTable />
      </Container>
    </main>
  )
}
