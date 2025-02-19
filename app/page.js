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
import HeroSection from "./components/HeroSection"
import Footer from "./components/Footer"

const Page =  () =>
{
  const router = useRouter();
  const [ isError, setIsError ] = useState(false)
  const [ success, setSuccess ] = useState(false)

  // useEffect(()=>
  // {
  //   router.push('/home')
  // },[])

  const handleSubmit = () =>
  {

  }

  return(
    <div className="w-full absolute top-0 left-0">
      <HeroSection/>
      <Footer/>
    </div>
  )
}

export default Page