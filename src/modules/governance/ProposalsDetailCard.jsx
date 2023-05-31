import { InfoTooltip } from '@/common/Cover/InfoTooltip'
import CheckCircleIcon from '@/icons/CheckCircleIcon'
import InfoCircleIcon from '@/icons/InfoCircleIcon'
import GovernanceCard from '@/modules/governance/GovernanceCard'
import {
  convertTimestamp,
  fromNow
} from '@/utils/formatter/relative-time'
import { Trans } from '@lingui/macro'

const ProposalsDetailCard = ({ title, snapshot, ipfs, startDate, endDate, state }) => {
  return (
    <GovernanceCard className='flex flex-col gap-6 p-5 md:p-8'>
      <h1 className='text-xl font-semibold'><Trans>{title}</Trans></h1>

      <div className='flex flex-row gap-2'>
        <div className={`flex flex-row gap-1 ${state !== 'active' ? 'bg-[#EFF8FF] text-[#175CD3]' : 'bg-[#D92D20] text-white'} py-0.5 px-2 text-xs rounded-full font-medium items-center justify-center`}>
          {state !== 'active' && <CheckCircleIcon height={12} width={12} />}
          <Trans>{state !== 'active' ? 'Complete' : 'Live'}</Trans>
        </div>
        <div className='bg-[#ECFDF3] text-[#027A48] py-0.5 px-2 text-xs rounded-full font-medium items-center justify-center'>
          <Trans>GC Emission</Trans>
        </div>
      </div>

      <div className='flex flex-row items-end justify-between p-6 bg-F3F5F7 rounded-2'>
        <div className='flex flex-row gap-8'>
          <div className='flex flex-col gap-1'>
            <h4 className='text-sm font-semibold text-999BAB'>
              <Trans>Proposal</Trans>
            </h4>
            <div className='flex flex-row gap-4'>
              <a
                className='underline text-4E7DD9 hover:no-underline'
                href={`https://goerli.basescan.org//block/${snapshot}`}
                target='_blank'
                rel='noreferrer noopener nofollow'
              >
                <Trans>Snapshot</Trans>
              </a>
              <a
                className='underline text-4E7DD9 hover:no-underline'
                href={`https://snapshot.mypinata.cloud/ipfs/${ipfs}`}
                target='_blank'
                rel='noreferrer noopener nofollow'
              >
                <Trans>IPFS</Trans>
              </a>
            </div>
          </div>

          <div className='flex flex-col gap-1'>
            <h4 className='text-sm font-semibold text-999BAB'>
              <Trans>Start</Trans>
            </h4>
            <InfoTooltip infoComponent={convertTimestamp(startDate)} className='text-[11px] px-2 py-1.5 bg-opacity-100 max-w-none' positionOffset={0}>
              <p>{fromNow(startDate)}</p>
            </InfoTooltip>
          </div>

          <div className='flex flex-col gap-1'>
            <h4 className='text-sm font-semibold text-999BAB'>
              <Trans>End</Trans>
            </h4>
            <InfoTooltip infoComponent={convertTimestamp(endDate)} className='text-[11px] px-2 py-1.5 bg-opacity-100 max-w-none' positionOffset={0}>
              <p>{fromNow(endDate)}</p>
            </InfoTooltip>
          </div>
        </div>

        <div className='flex flex-row items-center gap-1'>
          <a
            className='font-semibold text-4E7DD9'
            href={`https://goerli.basescan.org//block/${snapshot}`}
            target='_blank'
            rel='noreferrer noopener nofollow'
          >
            #{snapshot}
          </a>
          <InfoTooltip infoComponent='Your info goes here' className='text-[11px] px-2 py-1.5 bg-opacity-100 max-w-none'>
            <button type='button' className='cursor-default'><InfoCircleIcon className='w-4 h-4' /></button>
          </InfoTooltip>
        </div>
      </div>
    </GovernanceCard>
  )
}

export default ProposalsDetailCard
