'use server'

import { ConnectTODB } from "../mongoose";
import { scrapeAmazonProduct } from "../scraper";
import  Product  from "../models/product.model";
import { getLowestPrice,getHighestPrice,getAveragePrice } from "../utils/extractPrice";
import { revalidatePath } from "next/cache";
import { User } from "@/types";
import { generateEmailBody, sendEmail } from "../nodemailer";


export async function scrapeAndStoreProduct(productUrl: string) {
    
  if (!productUrl) {
    throw new Error('Product URL is required');
  }

  try {
    ConnectTODB();
  
    const scrapedProduct = await scrapeAmazonProduct(productUrl);

          if (!scrapedProduct) return
   
        let product=scrapedProduct
       
        const existingProduct = await Product.findOne({url:scrapedProduct.url});

        if (existingProduct) {
          const updatedPriceHistory:any=[
            ...existingProduct.priceHistory,
            {
              price:scrapedProduct.currentPrice,
              
            }
          ]
          product={
            ...scrapedProduct,
            priceHistory:updatedPriceHistory,
            lowestPrice:getLowestPrice(updatedPriceHistory),
            highestPrice:getHighestPrice(updatedPriceHistory),
            averagePrice:getAveragePrice(updatedPriceHistory),
          }
        }

        const newProduct = await Product.findOneAndUpdate({
          url: scrapedProduct.url},
            product,
            { upsert:true,new:true}
        );
        revalidatePath(`/products/${newProduct._id}`)
    
  } catch (error: any) {
    console.error('Error in scrapeAndStoreProduct:', error);
    throw new Error(`Failed to scrape product: ${error.message}`);
  }
}

export async function getProductById(productId:string) {
    try{
        ConnectTODB()
        const product=await Product.findOne({_id:productId})

        if(!product){
            throw new Error('Product not found')
        }

        return product
    }catch(error){
        console.log(error)
    }
}
export async function getAllProducts() {
    try{
        ConnectTODB()
        const products=await Product.find()
        return products
    }catch(error){
        console.log(error)
    }
}
export async function getSimilarProducts(productId:string) {
  try{
      ConnectTODB()
      const currentProduct=await Product.findById(productId);
      if (!currentProduct) return null;

      const similarProducts = await Product.find({
        _id: { $ne: productId },
       }).limit(3) 

      return similarProducts

  }catch(error){
      console.log(error)
  }
}

export async function addEmailAdress(productId: string, userEmail: string) {
  try {
      const product = await Product.findById(productId);
      if (!product) {
          throw new Error('Product not found');
      }
      const userExists = product.users.some((user: User) => user.email === userEmail);
      if (!userExists) {
          product.users.push({ email: userEmail });
          await product.save();
          const emailContent = await generateEmailBody(product, 'WELCOME');
          await sendEmail(emailContent, [userEmail]);
      }
  } catch (error) {
      console.error('Error in addEmailAdress:', error);
  }
}
