import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { Routes } from '@/src/config/routes'

import { slugToNetworkId } from '@/src/config/networks'
import { getNetworks } from '@/src/ssg/static-paths'
import { useNetwork } from '@/src/context/Network'

export const getStaticPaths = async () => {
  return {
    paths: getNetworks(),
    fallback: false
  }
}

export const getStaticProps = async ({ params }) => {
  return {
    props: {
      networkId: slugToNetworkId[params.network]
    }
  }
}

// Redirect
export default function Reports () {
  const router = useRouter()
  const { networkId } = useNetwork()

  useEffect(() => {
    router.replace(Routes.ActiveReports(networkId))
  }, [networkId, router])

  return null
}