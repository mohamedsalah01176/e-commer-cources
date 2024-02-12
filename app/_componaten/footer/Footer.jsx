"use client"
import React, { useEffect, useState } from 'react'

export default function Footer({searchParams}) {
  // const userin=window.location.href.toString().includes("sign-in")
  // const userup=window.location.href.toString().includes("sign-up")
  // const {user}=useUser()


  const [userlocation,setUserlocation]=useState(false)
  useEffect(()=>{
    setUserlocation(searchParams.toString().includes('sign-in'))
  },[])
  
  if(!userlocation){
    return (
      <div className='text-center py-5' style={{background:"#ccc",marginTop:"20px"}}>
        <div className='container  ' >
            <h3>Made by <span className='text-primary'>Mohamed Salah</span> &copy;<span>2024</span> </h3>
            <h2></h2>
        </div>
      </div>
    )
  }
}
