import Link from 'next/link'
import styles from "./hero.module.scss"
export default function Hero() {
  return (
    <div className={`d-flex flex-column justify-content-center align-items-center ${styles.cont}`} style={{height:"600px"}}>
      <h1 className='fw-700 m-0 text-white'>All Your Digital Products</h1>
      <h2 className='text-success m-0'>Is One Click Away</h2>
      <p className='fw-700 text-white'>Start Exploring State of the Art Assets Now</p>
      <div className="btn  ">
        <Link href={"/"} className='btn btn-success' style={{minWidth:"150px"}}>Get Start</Link>
        <Link href={"/"} className='btn btn-outline-primary ms-2'  style={{minWidth:"150px"}}>Learn More</Link>
      </div>
    </div>
  )
}
