import React from 'react'

const options = [
  {
    label: 'Swap',
    value: 'swap'
  },
  {
    label: 'Pool',
    value: 'pool'
  }
]

const SwapTabSwitcher = ({ value }) => {
  return (
    <div className='inline-flex p-2 bg-E6EAEF rounded-2 gap-1 mb-1.5'>
      {options.map(option => (
        <div
          key={option.value}
          className={`rounded-2 py-1 px-2.5 cursor-pointer text-sm ${option.value === value ? ' bg-white' : ''}`}
        >
          {option.label}
        </div>
      ))}
    </div>
  )
}

export default SwapTabSwitcher
