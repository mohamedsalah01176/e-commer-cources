"use client"

import React, { useContext } from 'react'
import Header from '../_componaten/header/Header'
import Footer from '../_componaten/footer/Footer'
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios'
import Link from 'next/link'
import { CartContext } from '../_context/CartContext';
import { useUser } from '@clerk/nextjs';

CartContext

export default function CartPage({searchParams}) {

    const  apiKey=process.env.NEXT_PUBLIC_REST_API_KEY
    

    const {card,setCard}=useContext(CartContext)

    function getTotal(){
        let total=0;
        card.map((item)=>total=total + Number(item.product.attributes.price))
        return total;
    }

    async function deleteItem(id){
        console.log(id)
        await axios.create({baseURL:"http://localhost:1337/api",headers:{Authorization:`Bearer ${apiKey}`}}).delete(`/cards/${id}`)
        .then(res=>{
            setCard((oldCart)=>oldCart.filter((item)=>item.id !== res.data.data.id))
        })
    }

  return (
    <div>
        <Header searchParams={searchParams}/>
        <section className="h-100" style={{backgroundColor: "#eee"}}>
            
  
  <div className="row d-flex justify-content-center align-items-center h-100">
  <div className="col-10">

      <div className="d-flex justify-content-between align-items-center mb-4">
      <h3 className="fw-normal mb-0 text-black">Shopping Cart</h3>
      <div>
          <p className="mb-0"><span className="text-muted">Sort by:</span> <a href="#!" className="text-body">price <i
              className="fas fa-angle-down mt-1"></i></a></p>
      </div>
      </div>
      {
          card.map((item,index)=>{
              return(
                  <div key={index} className="card rounded-3 mb-4">
                  <div className="card-body p-4">
                      <div className="row d-flex justify-content-between align-items-center">
                      <div className="col-md-2 col-lg-2 col-xl-2">
                          <img
                          src={`${item.product.attributes.image.data.attributes.url}`}
                          className="img-fluid rounded-3" alt="Cotton T-shirt"/>
                      </div>
                      <div className="col-md-5 col-lg-4 col-xl-4">
                          <p className="lead fw-normal mb-2">{item.product.attributes.title}</p>
                          <p><span className="text-muted">description: </span> <span className="text-muted w-100">{item.product.attributes.description}</span></p>
                      </div>
                      <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                          

                      </div>
                      <div className="col-md-2 col-lg-2 col-xl-2 offset-lg-1 d-flex gap-3">
                          <h5 className="mb-0">{item.product.attributes.price}$</h5>
                          <div onClick={()=>deleteItem(item.id)} className='text-danger'><DeleteIcon/></div>
                      </div>
                      
                      </div>
                  </div>
                  </div>
              )
          })
      }

    <div className='d-flex flex-wrap justify-content-between align-items-start px-3'>
        <h2>Total</h2>
        <h3>{getTotal()}$</h3>
    </div>
      <div className='w-100 text-end'>
            <Link href={`/cheakOut?amount=${getTotal()}`} className='btn btn-success '>Check out</Link>
      </div>

      <h5 style={{color:"#aaa"}}>Note:All items will be sent via Email</h5>

      
  </div>
</div>
</section>

<Footer searchParams={searchParams}/>   

    </div>
  )
}
