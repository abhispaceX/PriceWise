import React from 'react'
import  Link  from 'next/link'
import {Product} from '@/types'
import Image from 'next/image'

interface Props{
    product:Product
}

const ProductCard = ({product}:Props) => {
   
  return (
    <div>
        <Link href={`/products/${product._id}`} className='product-card' >
        <div className="product-card_img-container">
            <Image
                src={product.image}
                alt={product.title}
                width={250}
                height={250}
                className='product-card-img'

            />
            </div>
            <div className=' flex flex-col gap-4' >

            <h3 className='product-title' >{product.title}</h3>
            <div className='flex justify-between' >
                <p className='text-black opacity-50 text-lg capitalize' >
                    {product.category}
                </p>
                <p className='text-black text-lg font-semibold' >
                    <span>{product.currency}</span>
                    <span>{product.lowestPrice}</span>
                </p>

            </div>

            </div>
        </Link>
      
    </div>
  )
}

export default ProductCard
