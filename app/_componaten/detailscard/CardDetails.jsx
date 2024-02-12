"use client"
import axios from "axios"
import Image from "next/image"
import { useContext, useEffect, useState } from "react"
import SamalierPro from "./SamalierPro"
import Loading from "../pageLoaging/Loading"
import Link from "next/link"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { CartContext } from "../../_context/CartContext"

export default  function CardDetails({id}) {

    const {card,setCard}=useContext(CartContext)

    
    const apiKey=process.env.NEXT_PUBLIC_REST_API_KEY

    const  [product, setProduct] = useState({})
    
    // Fetching data from the API
    //   console.log("ss",product)
      async function getproduct(){
          await axios.create({baseURL:`http://localhost:1337/api`,headers:{Authorization:`Bearer ${apiKey}`}})
          .get(`/products/${id}?populate=*`)
          .then(res=>setProduct(res.data.data))  

         }
         useEffect( ()=>{
           getproduct();
       },[id])
    //    console.log(products)

       const {user} =useUser()
       const route =useRouter()


    async function handelClick(){
        if(!user){
            route.push(`/sign-in`)
        }else{
            const data={
                data:{
                    userName:user.fullName,
                    email:user.primaryEmailAddress.emailAddress,
                    products:[product.id]
                }
            }
            // console.log("card",data)
            await axios.create({baseURL:"http://localhost:1337/api",headers:{Authorization:`Bearer ${apiKey}`}}).post(`/cards`,data)
            .then(res=>{console.log(res.data)
            setCard(oldData=>[
                ...oldData,
                {
                    id:res.data.data.id,
                    product
                }
            ])})
           
        }   

    }
        
        if(product.attributes ){
            return (
                <>
                
            <div className={`container my-5 w-100`} >
                <div className="card mb-3  border rounded shadow-lg  m-auto "  >
                    <div className="row g-0  h-100" >
                        <div className="col-md-5 " style={{height:"300px"}}>
                            <Image width={400} height={150} src={product.attributes.image.data.attributes.url} className="w-100 h-100 rounded-start" alt="..."/>
                        </div>
                        <div className="col-md-7">
                        <div className="card-body w-100 ">
                            <h5 className="card-title fs-3">{product.attributes.title}</h5>
                            <p className="card-text m-0">{product.attributes.category}</p>
                            <p className="card-text"><small className="text-muted">{product.attributes.description}</small></p>
                            <div className="d-flex justify-content-between align-items-center ">
                            {product.attributes.instantDelivery ?<span className="bg-success p-1 rounded fs-6 text-white fw-700">Eligible For Instant</span>
                            :
                            <span className="bg-danger p-1 rounded fs-6 text-white fw-700">Eligible For Instant</span>
                            }
                            <h3 className="m-0 text-danger">{product.attributes.price}US</h3>
                            </div>
                            <button onClick={()=>handelClick()} className="btn btn-primary d-flex justify-content-center w-75 m-auto mt-2"> Add Cart</button>
                            
                        </div>
                    </div>
                </div>
            </div>


            
        </div>
        <SamalierPro category={product.attributes.category}/>
    </>
      )

        }else{
            return(<Loading />);
        }
}
