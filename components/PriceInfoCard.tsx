import React from 'react'
import Image from 'next/image'

type Props={
    title:string,
    iconSrc:string,
    value:string,
    borderColour:string
}

const PriceInfoCard = ({title,iconSrc,value,borderColour}:Props) => {
  return (
    <div className={`price-info_card border-1-${borderColour}`} >
      <p className='text-base text-black' >{title}</p>
      <div className='flex gap-1' >
        <Image 
         src={iconSrc}
         width={20}
         height={20}
         alt={title}
        />
        <p className='text-2xl font-bold text-secondary' >{value}</p>
      </div>
    </div>
  )
}

export default PriceInfoCard
