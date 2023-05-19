import {
  useEffect,
  useMemo
} from 'react'

import CheckCircleFilledIcon from '@/icons/CheckCircleFilledIcon'
import ChevronDownIcon from '@/icons/ChevronDownIcon'
import { classNames } from '@/utils/classnames'
import { Menu } from '@headlessui/react'

const NetworkSelect = ({
  label,
  selected = null,
  defaultChain = null,
  options = [],
  onChange,
  className = '',
  disabled = false
}) => {
  const handleChange = (chainId) => {
    const _selected = options.find(network => network.chainId === chainId)
    onChange(_selected)
  }

  const activeNetwork = useMemo(() => {
    if (defaultChain) {
      const _network = options.find(n => n.chainId === defaultChain)
      if (_network) {
        return _network
      }
    }

    if (!selected) {
      return options[0]
    }

    return selected
    // eslint-disable-next-line
  }, [selected, options])

  useEffect(() => {
    if (selected !== activeNetwork) {
      onChange(activeNetwork)
    }
  }, [activeNetwork, onChange, selected])

  return (
    <div className={classNames(
      'block w-full p-2.5 rounded-big bg-F6F7F9 focus-within:ring-4E7DD9 focus-within:ring focus-within:ring-offset-0 focus-within:ring-opacity-30',
      className
    )}
    >
      <p className='text-sm text-left'>{label}</p>

      <Menu as='div' className='relative'>
        <Menu.Button className='flex items-center justify-between w-full gap-1 mt-2 outline-none' disabled={disabled}>
          <div className='flex items-center gap-1'>
            <div className='w-5 h-5 overflow-hidden rounded-full'>
              {activeNetwork && <activeNetwork.Logo className='w-5 h-5' />}
            </div>
            {activeNetwork && <span className='text-xl'>{activeNetwork.name}</span>}
          </div>

          {
            !disabled && <ChevronDownIcon className='w-4 h-4' />
          }
        </Menu.Button>

        <Menu.Items
          className='absolute -left-2.5 z-10 mt-4 overflow-y-auto bg-white border shadow-lg w-full-plus-20 border-D6D6D6 rounded-2 h-60'
        >
          {
            options.map(({ name, Logo, chainId }, idx) => (
              <Menu.Item
                key={idx}
                as='button'
                className={({ active }) => classNames(
                  'w-full py-2.5 px-4 m-0 focus-visible:bg-EEEEEE hover:bg-EEEEEE',
                  active && 'bg-EEEEEE'
                )}
                onClick={() => handleChange(chainId)}
              >
                <div className='flex items-center gap-1'>
                  <div className='w-5 h-5 overflow-hidden rounded-full'>
                    <Logo className='w-5 h-5' />
                  </div>
                  <span className='text-sm'>{name}</span>

                  {(activeNetwork.name === name) && <CheckCircleFilledIcon className='ml-auto' />}
                </div>
              </Menu.Item>

            ))
          }
        </Menu.Items>
      </Menu>
    </div>
  )
}

export { NetworkSelect }
