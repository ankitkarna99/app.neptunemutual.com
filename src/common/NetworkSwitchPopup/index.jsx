import React, {
  useEffect,
  useState
} from 'react'

import { ModalCloseButton } from '@/common/Modal/ModalCloseButton'
import TrendUpIcon from '@/icons/TrendUpIcon'
import { ARBITRUM_APP_URL } from '@/src/config/constants'
import { useNetwork } from '@/src/context/Network'
import { useLocalStorage } from '@/src/hooks/useLocalStorage'
import {
  Dialog,
  Transition
} from '@headlessui/react'
import { useValidateNetwork } from '@/src/hooks/useValidateNetwork'

export const NetworkSwitchPopup = () => {
  const [open, setOpen] = useState(false)
  const [count, setCount] = useLocalStorage('network-switch-popup-count', 0)

  const { networkId } = useNetwork()
  const { isEthereum } = useValidateNetwork(networkId)

  useEffect(() => {
    setOpen(true)
  }, [])

  const handleClosePopup = () => {
    setOpen(false)
    setCount(_value => _value + 1)
  }

  if (!isEthereum || count >= 3) return <></>

  return (
    <Transition appear show={open} as={React.Fragment}>
      <Dialog
        as='div'
        className='fixed top-0 bottom-0 left-0 right-0 z-40 overflow-y-auto'
        onClose={() => {}}
        initialFocus={null}
      >
        <div className='flex items-center justify-center w-auto min-h-full px-2'>
          <Transition.Child as={React.Fragment}>
            <Dialog.Overlay
              className='fixed top-0 bottom-0 left-0 right-0 bg-01052D backdrop-blur-md bg-opacity-60'
            />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className='inline-block h-full align-bottom' aria-hidden='true'>
            &#8203;
          </span>
          <Transition.Child as={React.Fragment}>
            <div className='relative p-6 pb-10 md:pt-12 bg-f6f7f9 md:px-14 md:pb-11 rounded-3xl'>
              <ModalCloseButton
                onClick={handleClosePopup}
                className='relative ml-auto md:absolute mb-2.5 md:mb-0 !top-0 !right-0 md:!top-6 md:!right-6'
              />
              <div>
                <div className='text-center'>
                  <p className='leading-4 font-poppins text-h5'>Ethereum gas fees too high?</p>
                  <p className='mt-2 font-semibold font-sora text-h4'>Use Neptune Mutual on Arbitrum</p>
                </div>

                <div className='mt-4'>
                  <img src='/images/arbitrum.svg' className='mx-auto' width={80} height={80} alt='arbitrum logo image' />
                  <a
                    className='flex items-center justify-center w-full p-4 pl-6 mx-auto mt-6 text-white rounded-big bg-4e7dd9 md:w-max'
                    href={ARBITRUM_APP_URL}
                    onClick={handleClosePopup}
                  >
                    <span className='font-semibold leading-5 uppercase font-poppins text-h5'>Switch to arbitrum</span>
                    <TrendUpIcon className='flex-shrink-0' />
                  </a>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
