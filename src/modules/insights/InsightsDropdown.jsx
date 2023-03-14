import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import CheckBlue from '@/icons/CheckBlue'
import { classNames } from '@/utils/classnames'
import SearchIcon from '@/icons/SearchIcon'

export const InsightsDropdown = ({
  options,
  icon,
  loading = false,
  selected,
  setSelected
}) => {
  const [search, setSearch] = useState('')

  const filteredOptions = search ? options.filter((option) => option.type !== 'label' && option.label.toLowerCase().includes(search.toLowerCase())) : options

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div
        className='relative w-full md:w-max'
      >
        <Listbox.Button
          className={classNames(
            'flex items-center gap-2 w-full md:w-max py-2 px-4 bg-f6f7f9 rounded-lg cursor-pointer focus:outline-none focus-visible:border-4e7dd9 justify-between',
            loading && 'cursor-not-allowed'
          )}
          data-testid='select-button'
        >
          <span className='block text-xs font-normal text-left truncate lg:text-center text-000000'>
            {selected?.label}
          </span>
          <span className='flex items-center text-xs pointer-events-none text-000000'>
            {icon}
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Listbox.Options
            className={classNames(
              'absolute z-30 w-full min-w-205 lg:min-w-max mt-2 overflow-auto text-base bg-white border shadow-lightCard md:w-auto border-B0C4DB focus:outline-none focus-visible:border-4e7dd9 p-4 rounded-2xl left-0',
              loading && 'hidden'
            )}
            data-testid='options-container'
          >
            <div className='relative'>
              <input
                value={search} onChange={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setSearch(e.target.value)
                }} placeholder='Search' className='px-4 py-2 border-1 w-full rounded-2 leading-5 border-B0C4DB mb-2' type='text'
              />
              <div className='absolute top-2.5 right-4'>
                <SearchIcon className='h-4 w-4' />
              </div>
            </div>

            <div className='h-306 overflow-auto -mr-4 pr-4'>
              {filteredOptions.map((option, optionIdx) => (
                <Fragment key={optionIdx}>
                  {option.type === 'label'
                    ? <> <hr className='h-px border-0 bg-B0C4DB dark:bg-B0C4DB' /> <Listbox.Label className='block pt-4 pb-2 pl-2 text-sm font-semibold leading-5 font-poppins text-000000'>{option.label}</Listbox.Label></>
                    : <ListChoice optionIdx={optionIdx} option={option} selected={selected} />}
                </Fragment>
              ))}
            </div>

          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}

const ListChoice = ({ optionIdx, option, selected }) => {
  return (
    <Listbox.Option
      data-testid={`option-${optionIdx + 1}`}
      className={({ active }) =>
        classNames(
          'cursor-default select-none relative p-0 pb-2 w-full overflow-hidden',
          active ? 'text-4e7dd9' : 'text-black'
        )}
      value={option}
    >
      {({ active }) => {
        return (
          <span
            className={classNames(
              'flex truncate gap-2 p-2 capitalize rounded items-center justify-between leading-5 font-normal font-poppins text-sm text-000000 lg:w-56',
              active ? 'bg-EEEEEE rounded-lg' : ''
            )}
          >
            <span className='truncate whitespace-normal max-h-10'>{option.label}</span>
            {selected.value === option.value && <CheckBlue className='w-4 h-4 shrink-0 text-4e7dd9' />}
          </span>
        )
      }}
    </Listbox.Option>
  )
}
