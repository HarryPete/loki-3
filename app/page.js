'use client'

import Image from "next/image"
import homeIcon from '../assets/homeIcon.png'
import logo from '../assets/logo.png'
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"

const Page =  () =>
{
  const router = useRouter();
  const [ isError, setIsError ] = useState(false)
  const [ success, setSuccess ] = useState(false)

  useEffect(()=>
  {
    router.push('/home')
  },[])

  const handleSubmit = () =>
  {

  }

  return(
    <div className="w-full">
      <div className="">
       <Image className='object-cover h-[100%] w-full' src='https://res.cloudinary.com/dzuaagm1a/image/upload/v1738223869/by_2_xvalo4.png' alt='FINTS AML' layout='fill' priority={true} />
      </div>
      
        <Image className="absolute top-10 left-10 z-10 h-6 w-fit" src={homeIcon} alt='logo'/>
        {/* <Button variant='outline' className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]' onClick={()=> router.push('/home')}>Home</Button> */}
            {/* <Card className='absolute z-10 top-[50%] left-[50%] flex flex-col items-center translate-x-[-50%] translate-y-[-50%] bg-white rounded w-96 p-6'> 
                <Image className="h-8 w-fit my-4" src={logo} alt='logo'/>
                <div className='w-full flex flex-col gap-4 items-center'>
                    <form className='flex flex-col w-full gap-4'onSubmit={handleSubmit}>
                        <Input className='h-12' name="email" type="text" placeholder="Email" />
                        <Input className='h-12' name="password" type="text" placeholder="Password" />

                        {isError && 
                        <div className='flex gap-2 items-center text-sm'>
                            <Image className='h-6 w-fit' src={erroricon} alt='error'/>
                            <p className='text-red-600'>{errorMessage}</p>
                        </div>}

                        {success && 
                       <div className='flex gap-2 items-center text-sm'>
                       <Image className='h-6 w-fit' src={successicon} alt='error'/>
                       <p className='text-green-600'>{successMessage}</p>
                   </div>}
                        <Button type='submit'>Login</Button>
                    </form>
                </div>
                <div className='text-center mt-2 text-sm text-gray-400'>
                  Exclusive to Fints users. <a className="text-blue-700 hover:underline" href='https://www.fintsacademy.com' target="_blank">Explore</a>   
                </div>
                <div className='text-center'>
                    <Link href='/reset-password' className='mt-2 text-sm text-blue-900 hover:underline'>Forgot password</Link>
                </div>
            </Card> */}
    </div>
  )
}

export default Page