import { tokens } from '@/modules/add-liquidity/TokenSelect/tokens'
import { classNames } from '@/utils/classnames'
import { useMemo } from 'react'

const { TokenAvatar } = require('@/modules/add-liquidity/TokenAvatar')

const PopularTokens = ({ className = '', handleSelect }) => {
  const popularTokens = useMemo(() => {
    const symbols = ['WETH', 'SUSHI', 'BTC', 'USDC', 'USDT']
    return tokens.filter(token => symbols.includes(token.symbol))
  }, [])
  return (
    tokens.length
      ? (
        <div className={classNames('p-2.5 flex items-center gap-x-2 gap-y-2.5 flex-wrap', className)}>
          {
            popularTokens.map((token, idx) => (
              <button
                className='flex items-center gap-1 p-2 text-sm font-semibold bg-EEEEEE rounded-2'
                key={idx}
                onClick={() => handleSelect(token)}
              >
                <TokenAvatar src={token.logoSrc} />
                <span>{token.symbol}</span>
              </button>
            ))
          }
        </div>
        )
      : <></>
  )
}

export { PopularTokens }
