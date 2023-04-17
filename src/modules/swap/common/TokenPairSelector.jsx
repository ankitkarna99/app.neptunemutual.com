import ArrowDown from '@/icons/ArrowDown'
import ChevronDownIcon from '@/icons/ChevronDownIcon'
import WalletIcon from '@/icons/WalletIcon'

const TokenSelector = () => {
  return (
    <div className='p-2.5 rounded-tooltip bg-f6f7f9 mb-3'>
      <div className='flex justify-between items-center mb-2.5'>
        <input className='bg-transparent text-xl' placeholder='Enter Amount' />
        <div className='flex items-center font-semibold text-sm gap-1 p-2 bg-EEEEEE rounded-2 text-01052D cursor-pointer'>Select Token <ChevronDownIcon height={16} width={16} /></div>
      </div>
      <div className='flex justify-between'>
        <div className='text-sm text-404040'>$0.00</div>
        <div className='flex items-center gap-1'>
          <WalletIcon />
          <div className='text-sm font-semibold text-4e7dd9'>0.00</div>
        </div>
      </div>
    </div>
  )
}

const TokenPairSelector = () => {
  return (
    <div className='relative'>
      <TokenSelector />
      <div className='absolute top-[50%] left-[50%] translate-[-50%_-50%]'>
        <ArrowDown />
      </div>
      <TokenSelector />
    </div>
  )
}

export default TokenPairSelector
