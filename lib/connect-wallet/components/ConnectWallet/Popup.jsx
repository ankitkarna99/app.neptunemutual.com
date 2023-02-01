import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { useWeb3React } from '@web3-react/core'
import { Trans } from '@lingui/macro'
import useAuth from '../../hooks/useAuth'
import { wallets } from '../../config/wallets'
import { Modal } from '../Modal/Modal'
import { Disclaimer } from '../ConnectWallet/Disclaimer'
import { WalletList } from '../ConnectWallet/WalletList'
import { Loader } from '../Loader/Loader'
import CloseIcon from '../icons/CloseIcon'
import { ModalWrapper } from '@/common/Modal/ModalWrapper'

export const Popup = ({ isOpen, onClose, networkId, notifier }) => {
  const [isConnecting, setIsConnecting] = useState(false)
  const { active } = useWeb3React()

  const { login } = useAuth(networkId, notifier)

  useEffect(() => {
    if (!isOpen) setIsConnecting(false)

    if (active) {
      setIsConnecting(false)
      onClose()
    }
  }, [isOpen, active, onClose])

  const onConnect = (id) => {
    setIsConnecting(true)
    const wallet = wallets.find((x) => x.id === id)
    const connectorName = wallet.connectorName
    login(connectorName)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalWrapper className='max-w-md transition-all bg-f6f7f9'>
        <Dialog.Title
          className='font-bold leading-9 text-black font-sora text-h2'
        >
          <Trans>Connect wallet</Trans>
        </Dialog.Title>

        <button
          onClick={onClose}
          className='absolute flex items-center justify-center text-black rounded-md top-5 md:top-7 right-8 md:right-12 hover:text-4e7dd9 focus:text-4e7dd9 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-transparent'
          title='Close'
        >
          <span className='sr-only'>Close</span>
          <CloseIcon width={24} height={24} />
        </button>

        {!isConnecting && (
          <>
            <Disclaimer />
            <WalletList wallets={wallets} onConnect={onConnect} />
          </>
        )}

        {isConnecting && (
          <>
            <div className='flex items-center mt-8 justify-left'>
              <Loader />
              <p className=''>Connecting</p>
            </div>
          </>
        )}
      </ModalWrapper>
    </Modal>
  )
}
