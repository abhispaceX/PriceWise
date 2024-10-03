import Image from "next/image";
import SearchBar from "../components/SearchBar";
import HeroCarousal from "../components/HeroCarousal";
import Product from "../components/ProductCard";
import { getAllProducts } from "@/lib/actions";

export default  async function Home () {
   const products = await getAllProducts();

  return (
   <>
   <section className="px-6 border-2 md:px-20 py-24" >

   <div className=" flex max-xl:flex-col gap-16" >

   <div className="flex  flex-col justify-center" >
    <p className="small-text">
      Smart shopping starts here:
      <Image src='/assets/icons/arrow-right.svg' width={16} height={16}  alt="arrow"/>
    </p>
   <h1 className="head-text" >
    Unleash the Power of
    <span className=" text-primary" > PriceWise</span>

   </h1>
   <p className="mt-5">
    Powerfull,self-serve product and growth
    anlaytics to help you convert,engage and retain more
   </p>
   <SearchBar/>
   </div>
   <HeroCarousal/>
   </div>

   </section>
   <section className="trending-section" >
    <h2 className="section-text" >Trending</h2>
    <div className=" flex flex-wrap gap-x-8 gap-y-18 " >
      {products?.map((product)=>(
        <Product key={product._id} product={product} />
      ))}

    </div>
   </section>
    
    </>
  );
}
