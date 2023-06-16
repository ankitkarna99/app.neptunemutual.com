import { useTokenSymbol } from '@/src/hooks/useTokenSymbol'
import { renderHookWrapper } from '@/utils/unit-tests/helpers'
import { mockHooksOrMethods } from '@/utils/unit-tests/mock-hooks-and-methods'
import { mockSdk } from '@/utils/unit-tests/mock-sdk'
import { testData } from '@/utils/unit-tests/test-data'

jest.mock('@neptunemutual/sdk')

describe('useTokenSymbol', () => {
  mockHooksOrMethods.utilsWeb3.getProviderOrSigner()
  mockHooksOrMethods.useTxPoster()

  test('while fetching w/o networkId, tokenAddress and account ', async () => {
    mockHooksOrMethods.useWeb3React(() => { return { account: null } })
    mockHooksOrMethods.useNetwork(() => { return { networkId: null } })

    const mockProps = {
      tokenAddress: ''
    }

    const { result } = await renderHookWrapper(useTokenSymbol, [
      mockProps.tokenAddress
    ])

    expect(result).toEqual('')
  })

  test('while fetching w/o instance', async () => {
    mockHooksOrMethods.useWeb3React()
    mockHooksOrMethods.useNetwork()
    mockSdk.registry.IERC20.getInstance(true)

    const mockProps = {
      tokenAddress: ''
    }

    await renderHookWrapper(useTokenSymbol, [mockProps.tokenAddress])
  })

  test('while fetching w/ networkId, tokenAddress and account', async () => {
    mockHooksOrMethods.useWeb3React()
    mockHooksOrMethods.useNetwork()
    mockHooksOrMethods.useTxPoster(() => {
      return {
        ...testData.txPoster,
        writeContract: (arg) => {
          arg?.onTransactionResult?.()
          arg?.onRetryCancel?.()
          arg?.onError?.()

          return ''
        }
      }
    })
    mockSdk.registry.IERC20.getInstance()

    const mockProps = {
      tokenAddress: '0x98e7786ffF366AEff1A55131C92C4Aa7EDd68aD1'
    }

    const { result } = await renderHookWrapper(useTokenSymbol, [
      mockProps.tokenAddress
    ])

    expect(result).toEqual('')
  })
})
