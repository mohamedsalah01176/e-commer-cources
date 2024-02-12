import { Breadcrumbs, Typography } from "@mui/material";
import CardDetails from "../_componaten/detailscard/CardDetails";
import Link from "next/link";
import SamalierPro from "../_componaten/detailscard/SamalierPro";
import Footer from "../_componaten/footer/Footer";
import Header from "../_componaten/header/Header";

export default  function ProdectDetails({params,searchParams}) {
//    console.log(params)
  return (
    <>

    <Header searchParams={searchParams}/>
    <div className="my-3 container " >
        <Breadcrumbs aria-label="breadcrumb" className="mb-2">
            <Link underline="hover" color="inherit" href="/">
                Home
            </Link>
            <Link
                underline="hover"
                color="inherit"
                href={`/${params.detailsProduct}`}
            >
                Product
            </Link>
            
            </Breadcrumbs>


        <CardDetails id={params.detailsProduct}/>

    </div>


    <Footer searchParams={searchParams}/>
    </>
  )
}
