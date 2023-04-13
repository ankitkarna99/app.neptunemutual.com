import { RegularButton } from '@/common/Button/RegularButton'
import { InputWithIcon } from '@/common/InputWithIcon/InputWithIcon'
import LeftArrow from '@/icons/LeftArrow'
import SearchIcon from '@/icons/SearchIcon'
import { PopularTokens } from '@/modules/add-liquidity/TokenSelect/PopularTokens'
import { TokenItem } from '@/modules/add-liquidity/TokenSelect/TokenItem'
import { tokens } from '@/modules/add-liquidity/TokenSelect/tokens'
import { SORT_DATA_TYPES, sorter } from '@/utils/sorting'
import { useEffect, useMemo, useState } from 'react'

export const TokenSelect = ({ show, toggleSelectToken, handleTokenSelect }) => {
  const [searchValue, setSearchValue] = useState('')

  const sortedTokens = useMemo(() => {
    return sorter({
      list: tokens,
      selector: x => x.name,
      datatype: SORT_DATA_TYPES.STRING
    })
  }, [])

  const filteredTokens = useMemo(() => {
    return sortedTokens.filter(token => {
      const _searchValue = searchValue.toLowerCase()
      const _tokenName = token.name.toLowerCase()
      const _tokenSymbol = token.symbol.toLowerCase()
      return _tokenName.includes(_searchValue) || _tokenSymbol.includes(_searchValue)
    })
  }, [sortedTokens, searchValue])

  useEffect(() => {
    setSearchValue('')
  }, [show])

  if (!show) return <></>

  return (
    <div>
      <div className='flex justify-between'>
        <button
          className='flex items-center gap-1 text-xs font-semibold leading-6 rounded-2 tracking-2'
          onClick={toggleSelectToken}
        >
          <LeftArrow />
          Back
        </button>
        <h3 className='text-display-xs'>Tokens</h3>
        <RegularButton className='px-2 py-1 text-xs leading-6'>Manage</RegularButton>
      </div>

      <InputWithIcon
        className='mt-4'
        inputProps={{ type: 'text' }}
        Icon={<SearchIcon className='w-4 h-4' />}
        handleChange={val => setSearchValue(val)}
      />

      <PopularTokens className='mt-4' handleSelect={handleTokenSelect} />

      <hr className='h-1 my-4 text-B0C4DB' />

      <div className='overflow-y-auto h-400'>
        {
          filteredTokens
            .map((token, i) => (
              <TokenItem
                token={token}
                handleSelect={handleTokenSelect}
                key={i}
              />
            ))
        }
      </div>
    </div>
  )
}
