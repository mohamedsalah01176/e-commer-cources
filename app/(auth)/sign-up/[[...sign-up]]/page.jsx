import { SignUp } from "@clerk/nextjs";
 
export default function Page() {
  return (
    <div className="w-100 m-auto d-flex justify-content-center align-items-center" style={{height:"100vh"}} >
      <SignUp />
    </div>
  )
}