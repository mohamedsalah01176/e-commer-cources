"use client"
import axios from "axios"
import Image from "next/image"
import {  useEffect, useState } from "react"
import CategoryIcon from '@mui/icons-material/Category';
import Link from "next/link";
import styles from "./product.module.scss"



export default   function Products() {
  const  [products, setProducts] = useState([])



  // Fetching data from the API
    const apiKey=process.env.NEXT_PUBLIC_REST_API_KEY
    
    
    
      async function getproduct  (){
        await axios.create({baseURL:`http://localhost:1337/api`,headers:{Authorization:`Bearer ${apiKey}`}})
        .get('/products?populate=*')
        .then(res=>setProducts(res.data.data))  
        
      }
      useEffect( ()=>{
        getproduct();
    },[])
    // console.log(products)

  return (
    <div className="container  mt-4  ">
      <h2 className="fw-bold">Brand New</h2>
      <div className="row justify-content-center gap-3 ">
        {products.map((item,index)=>{
          return(
            <Link href={`/${item.id}`} key={index} className={`${styles.card} col-5 col-md-3 col-lg-3  g-2 border rounded `}>
              <Image   width={200} height={200} className="w-100"  alt="image" loading="eager" src={item.attributes.image.data.attributes.url}/>
              <div className="text p-2 d-flex justify-content-between align-items-center">
                <div className="box ">
                  <div>{item.attributes.title}</div>
                  <div className="categore d-flex align-items-center">
                    <p style={{fontSize:"11px" ,color:"#bbb",margin:"0"}}>{item.attributes.category}</p>
                    <CategoryIcon/>
                  </div>
                </div>
                  <div className="text-danger d-flex align-items-center">{item.attributes.price}<span className="fs-5 fw-700">US</span></div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
