export const OptionActionCard = ({ title, description, imgSrc }) => {
  return (
    <>
      <div className='flex items-center justify-center mx-auto rounded-full bg-DEEAF6 lg:bg-white group-hover:bg-DEEAF6 group-focus:bg-DEEAF6 w-18 h-18 md:w-32 md:h-32 lg:w-40 lg:h-40'>
        <img src={imgSrc} alt={title} />
      </div>
      <h4 className='mt-4 font-semibold text-center text-h7 md:text-h4 lg:text-h3 lg:px-2 font-sora md:mt-6 lg:mt-14'>
        {title}
      </h4>
      <p className='px-4 mt-1 text-center text-7398C0 text-h7 md:text-h5 md:px-16 lg:px-11'>
        {description}
      </p>
    </>
  )
}
