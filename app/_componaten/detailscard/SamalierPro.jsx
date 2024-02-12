"use client"
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import CategoryIcon from '@mui/icons-material/Category';

import styles from "./samalerPro.module.scss"

export default function SamalierPro({category}) {
    const apiKey=process.env.NEXT_PUBLIC_REST_API_KEY
    const [pro,setPro]=useState([])


    async function getCategoryPro(){
        await axios.create({baseURL:"http://localhost:1337/api",headers:{Authorization:`Bearer  ${apiKey}`}}).get(`/products?filters[category][$eq]=${category}&populate=*`)
        .then(res=>setPro(res.data.data))
    }
    
    useEffect(()=>{
        getCategoryPro()
    },[category])
    console.log(pro)
  return (<>
    <div className="container  mt-4  ">
      <h2 className="fw-bold">Samaler Brand</h2>
      <div className="row justify-content-center gap-3 ">
        {pro.map((item,index)=>{
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
  </>
  )
}
