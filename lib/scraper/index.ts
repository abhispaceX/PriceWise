
import axios from 'axios'
import * as Cheerio from 'cheerio'
import { extractCurrency, extractDescription, extractPrice } from '../utils/extractPrice'
export async function scrapeAmazonProduct(url:string) {
    
    if(!url){
        return
    }
   
        try{
            
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://price-wise-iuteao0sv-abhis-projects-f0c95cf5.vercel.app/';
            console.log('Base URL:', process.env.NEXT_PUBLIC_BASE_URL);
            console.log(baseUrl)
            const response = await axios.get(`${baseUrl}/api/proxy`, {
              params: { url: url },
            });
             // Log the entire response data for debugging
    
            const $ = Cheerio.load(response.data);
            const title = $('#productTitle').text().trim();
            const currentprice= await extractPrice(
                $('.priceToPay span.a-price-whole'),
                $('a.size.base.a-color-price'),
                $('.a-button-selected .a-color-base'),
                $('a.price.a-text-price'),
            )
            const originalprice= await extractPrice(
            $('#priceblock_ourprice'),
            $('.a-price.a-text-price span.a-offscreen'),
            $('#listPrice'),
            $('#priceblock_dealprice'),
            $('#priceblock_saleprice'),
            $('.a-size-base.a-color-price')
            )
            const  outOfStack=$('#availablity span').text().trim().toLowerCase()==='currently unavailable'


            const currency= await extractCurrency($('.a-price-symbol'))
            const discountRate=$('.savingsPercentage').text().replace(/[-%]/g,'')
            const image=$('#landingImage').attr('data-a-dynamic-image')||$('#imgBlkFront').attr('data-a-dynamic-image')|| '{}'

            const imageUrl=Object.keys(JSON.parse(image))

            const description=extractDescription($)

            const data={
                url,
                image:imageUrl[0],
                title,
                currentPrice: Number(currentprice)|| Number(originalprice),
                originalPrice: Number(originalprice) || Number(currentprice) ,
                isOutOfStock:outOfStack,
                currency:currency|| '₹' ,
                discountRate: Number(discountRate),
                category:'category',
                stars:4.5,
                reviewsCount:100,
                description,
                priceHistory:[],
                lowestPrice:Number(currentprice) || Number(originalprice),
                highestPrice:Number(originalprice) || Number(currentprice),
                averagePrice:Number(currentprice) || Number(originalprice),
                
            }
        
            
            return data
            
        }catch(error:any){
            console.error('Error details:', error.response?.data); // Log error response data
            throw new Error(`failed to scrape the product: ${error.message}`);
        }
}
