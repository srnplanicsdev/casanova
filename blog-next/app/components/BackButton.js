"use client"
import { useRouter } from "next/navigation"

export default   function BackButton(){
    const router = useRouter()
     const redirect = ()=>{
        router.back()
     }
    return(<>
    <button onClick={redirect} className="text-2xl font-bold">
        Back
        </button> </>)
}