import { BreadCrumbs } from '@/common/BreadCrumbs/BreadCrumbs'
import { ComingSoon } from '@/common/ComingSoon'
import { Container } from '@/common/Container/Container'
import { Hero } from '@/common/Hero'
import { HeroTitle } from '@/common/HeroTitle'
import { Seo } from '@/common/Seo'
import { isFeatureEnabled } from '@/src/config/environment'
// import { MyStakingTxsTable } from '@/modules/pools/staking/MyStakingTxsTable'
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
        pageAction: 'Pod Staking Transactions on #NETWORK marketplace'
      })
    }
  }
}

export default function MyPodStakingTxs ({ networkId, title }) {
  const disabled = !isFeatureEnabled('pod-staking-pool', networkId)
  if (disabled) {
    return <ComingSoon />
  }

  return (
    <main>
      <Seo title={title} />

      <Hero>
        <Container className='px-2 pt-5 pb-20 md:py-20'>
          <BreadCrumbs
            pages={[
              { name: <Trans>Pool</Trans>, href: Routes.Pools(networkId), current: false },
              {
                name: <Trans>POD Staking</Trans>,
                href: Routes.PodStakingPools(networkId),
                current: false
              },
              {
                name: <Trans>Transaction List</Trans>,
                href: Routes.PodStakingPoolsTransactions(networkId),
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
        {/* <MyStakingTxsTable /> */}
      </Container>
    </main>
  )
}