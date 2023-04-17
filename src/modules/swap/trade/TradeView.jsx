import { RegularButton } from '@/common/Button/RegularButton'
import SettingsIcon from '@/icons/SettingsIcon'
import SwapTrendupIcon from '@/icons/SwapTrendupIcon'
import ConnectWallet from '@/lib/connect-wallet/components/ConnectWallet/ConnectWallet'
import SwapContentCard from '@/modules/swap/common/SwapContentCard'
import SwapTabSwitcher from '@/modules/swap/common/SwapTabSwitcher'
import TokenPairSelector from '@/modules/swap/common/TokenPairSelector'
import { useNetwork } from '@/src/context/Network'
import { useWeb3React } from '@web3-react/core'

const TradeView = () => {
  const { active } = useWeb3React()
  const { networkId } = useNetwork()
  return (
    <div className='p-6'>
      <SwapTabSwitcher value='swap' />
      <SwapContentCard>
        <div className='flex justify-between items-center'>
          <h3 className='font-semibold text-display-xs'>Trade</h3>
          <SettingsIcon />
        </div>
        {active && (
          <div className='flex gap-1 items-center mt-1'>
            <SwapTrendupIcon />
            <div className='text-xs'><span className='font-semibold'>1 SUSHI</span> ($1.13294) = <span className='font-semibold'>0.0006054 ETH</span> ($1871.53)</div>
          </div>
        )}
        <div className='mt-6 mb-4'>
          <TokenPairSelector />
        </div>
        <ConnectWallet networkId={networkId} notifier={console.log}>
          {({ onOpen }) => {
            return (
              <RegularButton
                onClick={() => {
                  if (!active) {
                    onOpen()
                  }
                }} className='w-full py-4'
              >
                {active ? 'Swap' : 'Connect Wallet'}
              </RegularButton>
            )
          }}
        </ConnectWallet>
        {active && (
          <div className='flex flex-col gap-4 mt-4 bg-F3F5F7 rounded-tooltip p-4'>
            <div className='flex justify-between'>
              <div className='text-sm'>Price Impact</div>
              <div className='text-sm font-semibold'>-0.3%</div>
            </div>
            <div className='flex justify-between'>
              <div className='text-sm'>Est. received</div>
              <div className='text-sm font-semibold'>31.1128 SUSHI</div>
            </div>
            <div className='flex justify-between'>
              <div className='text-sm'>Min. received</div>
              <div className='text-sm font-semibold'>31.1128 SUSHI</div>
            </div>
            <div className='flex justify-between'>
              <div className='text-sm'>Network fee</div>
              <div className='text-sm font-semibold'>~$6.76</div>
            </div>
            <div className='flex justify-between'>
              <div className='text-sm'>Route</div>
              <div className='text-sm font-semibold cursor-pointer text-4e7dd9'>View</div>
            </div>
            <hr className='border-none h-[1px] bg-B0C4DB' />
            <div className='flex justify-between'>
              <div className='text-sm'>Recipient</div>
              <div className='text-sm font-semibold'>OxEC7D…0901</div>
            </div>
          </div>
        )}
      </SwapContentCard>
    </div>
  )
}

export default TradeView
