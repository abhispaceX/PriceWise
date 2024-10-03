import { getProductById, getSimilarProducts } from '@/lib/actions'
import { redirect } from 'next/navigation'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types'
import { formatNumber } from '@/lib/utils/extractPrice'
import PriceInfoCard from '@/components/PriceInfoCard'
import ProductCard from '@/components/ProductCard'
import Modal from '@/components/Modal'

type Props = {
   params:{id:string}
}

const productDetails = async({params:{id}}:Props) => {
    const product:Product= await getProductById(id)
    if (!product) redirect('/')
    
     const SimilarProducts=await getSimilarProducts(id)   
  return (
    <div className='flex flex-col gap-16 flex-wrap px-6 md:px-20 py-24' >
        <div className='flex gap-28 xl:flex-row flex-col' >
            <div className='flex-grow xl:max-w-[50%] max-w-full py-16 border border-[#CDDBFF] rounded-[17px];' >
                <Image
                src={product.image}
                alt={product.title}
                width={500}
                height={500} 
                className='mx-auto'
                />
            </div>
            <div className='flex flex-col flex-1 ' >
                <div className='flex justify-between items-start gap-5 flex-wrap'>
                    <div className='flex flex-col gap-3' >
                        <p className='text-[28px] text-secondary font-semibold' >{product.title}</p>
                        <Link href={product.url} target='_blank' className='text-base text-black opacity-50' >
                           Visit Website
                        </Link>
                    
                    </div>
                    <div className='flex items-center gap-3' >
                        <div className='product-hearts' >
                            <Image
                              src='/assets/icons/red-heart.svg'
                              alt='heart'
                              width={20}
                              height={20}
                            />
                            <p className='text-base font-semibold text-[#D46F77]' >
                                {product.reviewsCount}
                            </p>
                        </div>
                        <div className='p-2 bg-white-200 rounded-10' >
                            <Image
                                src='/assets/icons/bookmark.svg'
                                alt='bookmark'
                                width={20}
                                height={20}
                            />
                        </div>
                        <div className='p-2 bg-white-200 rounded-10' >
                            <Image
                                src='/assets/icons/share.svg'
                                alt='bookmark'
                                width={20}
                                height={20}
                            />
                        </div>
                    </div>
                </div>
             <div className='product-info' >
                <div  className='flex flex-col gap-2' >
                    <p className='text-[34px] text-secondary font-bold ' >
                        {product.currency}{formatNumber(product.currentPrice)}
                    </p>
                    <p className='text-[22px] text-secondary opacity-50 line-through' >
                        {product.currency}{formatNumber(product.originalPrice)}
                    </p>
                </div>
                <div className=' flex flex-col gap-4' >
                    <div className='flex gap-3' >
                        <div className='product-stars' >
                        <Image
                                src='/assets/icons/star.svg'
                                alt='bookmark'
                                width={16}
                                height={16}
                            />
                            <p className='text-sm font-semibold text-primary-orange' >{product.stars}</p>
                        </div>
                        <div className='product-reviews' >
                        <Image
                                src='/assets/icons/comment.svg'
                                alt='comment'
                                width={16}
                                height={16}
                            />
                            <p className='text-sm text-secondary font-semibold' >{product.reviewsCount}</p>
                        </div>

                    </div>
                    <p className='text-sm text-black  opacity-45' >
                        <span className='text-primary-green font-bold' >93%</span> of buyers Recommended this product
                    </p>

                </div>
             </div> 
             <div className='my-7 flex flex-col gap-5' >
                <div className='flex flex-wrap gap-5' >
                  <PriceInfoCard
                    title='Current Price'
                    value={`${product.currency}${formatNumber(product?.currentPrice)}`}
                    iconSrc='/assets/icons/price-tag.svg'
                    borderColour="#b6dbff"
                  />  
                <PriceInfoCard
                    title='Average Price'
                    value={`${product.currency}${formatNumber(product?.averagePrice)}`}
                    iconSrc='/assets/icons/chart.svg'
                    borderColour="#b6dbff"
                  />
                  <PriceInfoCard
                    title='highest Price'
                    value={`${product.currency}${formatNumber(product?.highestPrice)}`}
                    iconSrc='/assets/icons/arrow-up.svg'
                    borderColour="#b6dbff"
                  /> 
                  <PriceInfoCard
                    title='lowest Price'
                    value={`${product.currency}${formatNumber(product?.lowestPrice)}`}
                    iconSrc='/assets/icons/arrow-down.svg'
                    borderColour="#BEEFC5"
                  />   

                </div>
             </div>
             <Modal productId={id} />
            </div>
        </div>
        <div className='flex flex-col gap-16 border-2 ' >
            <div className='flex flex-col gap-5' >
                <h3 className='text-2xl font-bold text-secondary' >Product Description</h3>

                <div className='flex-col flex gap-4' >
                    <p className='text-sm text-black  opacity-45' >{product?.description?.split('/n')}</p>
                </div>
            </div>
            <button className='btn w-fit mx-auto flex justify-center items-center gap-3 min-w-[200px]' >
                <Image
                    src='/assets/icons/bag.svg'
                    alt='bag'
                    width={20}
                    height={20}
                />
                <Link href='/' className='text-base text-white' >
                   Buy Now
                </Link>
            </button>

        </div>
        {SimilarProducts && SimilarProducts.length >0 && (
            <div className='py-14 flex flex-col gap-2 w-full ' >
                <h3 className='text-2xl font-bold text-secondary' >Similar Products</h3>
                <div className='flex flex-col gap-5' >
                    {SimilarProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            </div>
        )}
    </div>
  )
}

export default productDetails;
