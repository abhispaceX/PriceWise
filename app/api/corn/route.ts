
import Product from "@/lib/models/product.model";
import { generateEmailBody, sendEmail } from "@/lib/nodemailer";
import { scrapeAmazonProduct } from '@/lib/scraper';
import { getAveragePrice, getEmailNotifType, getHighestPrice, getLowestPrice } from "@/lib/utils/extractPrice";
import { NextResponse } from "next/server";

import { ConnectTODB } from "@/lib/mongoose";

export const maxDuration = 60; // This function can run for a maximum of 300 seconds
export const dynamic = "force-dynamic";
export const revalidate = 0;


export async function GET(request: Request) {

    try{
      ConnectTODB();
    const products= await Product.find({})
    if (!products) throw new Error('no product found')

    const updateProducts= await Promise.all(
        products.map(async(currentProduct)=>{
            const scrapedProduct= await scrapeAmazonProduct(currentProduct.url)

            if (!scrapedProduct) throw new Error('no Scrapedproduct found')
                
                const updatedPriceHistory:any=[
                    ...currentProduct.priceHistory,
                    {
                      price:scrapedProduct.currentPrice,
                      
                    }
                  ]
                  const product={
                    ...scrapedProduct,
                    priceHistory:updatedPriceHistory,
                    lowestPrice:getLowestPrice(updatedPriceHistory),
                    highestPrice:getHighestPrice(updatedPriceHistory),
                    averagePrice:getAveragePrice(updatedPriceHistory),
                      
                    

                  }
                
        
                const updatedProduct = await Product.findOneAndUpdate({
                  url: scrapedProduct.url},
                    product
                
                );
                const emailNotifyType=getEmailNotifType(scrapedProduct,currentProduct)

                if (emailNotifyType && updatedProduct.users.length >0) {
                    const productInfo = {
                        title: updatedProduct.title,
                        url: updatedProduct.url,
                      };
                      const emailContent = await generateEmailBody(productInfo, emailNotifyType);
                      // Get array of user emails
                      const userEmails = updatedProduct.users.map((user: any) => user.email);
                      // Send email notification
                      await sendEmail(emailContent, userEmails);
                }

                return updatedProduct
        })
    )
    return NextResponse.json({
       message:'Ok', data:updateProducts
    })
}
 catch (error){
    console.log(error)

}
}

function connectToDB() {
  throw new Error("Function not implemented.");
}
