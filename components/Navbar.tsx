import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
    const navIcons=[
        {src:'/assets/icons/search.svg',alt:'search'}
        ,{src:'/assets/icons/black-heart.svg',alt:'heart'}
        ,{src:'/assets/icons/user.svg',alt:'user'}
    ]
        
    
  return (
    <header className='w-full' >
        <nav className='nav' >
        <Link href='/' className='flex items-center gap-1' >
            <Image
            src='/assets/icons/logo.svg'
            alt='image'
            width={30}
            height={30}
            /> 
            <p className=' nav-logo' >
                Price<span className=' text-primary' >Wise</span>
            </p>
            </Link>
            <div className='flex items-center gap-4' >
            {navIcons.map((icons,index)=>(
                <Image key={index}
                src={icons.src} 
                alt={icons.alt} 
                width={28} 
                height={28}
                className=' object-contain'
                />
))}
            </div>
        
        </nav>
    </header>
  )
}

export default Navbar
