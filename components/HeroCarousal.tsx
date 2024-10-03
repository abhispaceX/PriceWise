'use client'
import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import Image from 'next/image';
const HeroCarousal = () => {
    const heroImages=[
        {src:'/assets/images/hero-1.svg',alt:'smartWatch1'},
        {src:'/assets/images/hero-2.svg',alt:'smartWatch2'},
        {src:'/assets/images/hero-3.svg',alt:'smartWatch3'},
        {src:'/assets/images/hero-4.svg',alt:'smartWatch4'},
        {src:'/assets/images/hero-5.svg',alt:'smartWatch5'},
    ]
  return (
    <div className='hero-carousel' >
      <Carousel autoPlay={true}
       infiniteLoop
        showThumbs={false} 
        showStatus={false} 
        interval={2000}
         showArrows={false} >
             {heroImages.map((image,index)=>(
                <Image
                key={index}
                src={image.src} 
                alt={image.alt} 
                width={484}
                height={484}
                className=' object-contain'

                
                />
             ))}
        </Carousel>
    </div>
  )
}

export default HeroCarousal
