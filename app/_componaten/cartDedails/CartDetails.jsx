"use client"
import { useContext, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import "./card.module.css"
import { CartContext } from "../../_context/CartContext"
export default function CartDetails({openCart}) {
  const {card,setCard}=useContext(CartContext)

  console.log("ddd",card)

  const route =useRouter() 

  function clseCart(){
    route.push("/")
  }
  
  return (
    
    <section className="h-100 h-custom " style={{position:"absolute" ,right:"0%",zIndex:"10"}}>
  <div  className="container  py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col">
        <div className="card">
          <div className="card-body p-4" style={{overflow:"scroll", height:"400px"}}>

            <div className="row">

              <div className="">
                <div className="d-flex justify-content-between align-iyems-center">
                  <h5 className="mb-3 "><a href="#!" className="text-body"><i
                        className="fas fa-long-arrow-alt-left me-2"></i>Cart shopping</a></h5>
                        <div onClick={()=>clseCart(false)} className="btn btn-danger">X</div>
                </div>
                <hr/>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    
                    <p className="mb-0">You have {card.length} items in your cart</p>
                  </div>
                  <div>
                    <p className="mb-0"><span className="text-muted">Sort by:</span> <a href="#!"
                        className="text-body">price <i className="fas fa-angle-down mt-1"></i></a></p>
                  </div>
                </div>
                {
                  card.map((item,index)=>{
                    return(
                      <Link href={`/${item.product.id}`} className="card mb-3  " style={{maxWidth:'300px'}} key={index}>
                        <div className="card-body ">
                          <div className="d-flex justify-content-between">
                            <div className="d-flex flex-row align-items-center">
                              <div>
                                <img
                                  src={`${item.product.attributes.image.data.attributes.url}`}
                                  className=" rounded-3" alt="Shopping item" style={{width:" 90px" }}/>
                              </div>
                              <div className="ms-3">
                                <h5>{item.product.attributes.title}</h5>
                                <p className="small mb-0 " >{item.product.attributes.category}</p>
                              </div>
                            </div>
                            <div className="d-flex flex-row align-items-center">
                              <div style={{width:" 50px"}}>
                                
                              </div>
                              <div style={{width: "80px"}}>
                                <h5 className="mb-0">{item.product.attributes.price}$</h5>
                              </div>
                              
                            </div>
                          </div>
                        </div>
                      </Link>

                    )
                  })
                }
                <div className="text-center">
                  <Link href={`/cartpage`} className="btn btn-success  ">View my Card</Link>
                </div>

              </div>
              

            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    
  )
}
