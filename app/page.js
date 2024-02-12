import Image from "next/image";
import styles from "./page.module.css";
import Hero from "./_componaten/hero/Hero";
import Products from "./_componaten/products/Products";
import Footer from "./_componaten/footer/Footer";
import Header from "./_componaten/header/Header";

export default function Home({searchParams}) {
  // console.log("hhh",searchParams.toString().includes('sign-in'));
  return (
    <div>
      <Header searchParams={searchParams}/>
      <Hero/>
      <Products/>
      <Footer searchParams={searchParams} />
    </div>
  );
} 
  