import Image from "next/image"
import personal from '@/assets/personal.png'
import entity from '@/assets/entity.png'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { maskAccountNumber } from "@/utility/maskAccountNumber"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Passport from "./Passport"
import Rental from "./Rental"
import { usePathname } from "next/navigation"
import Link from "next/link"
import OrganisationCard from "./OrganisationCard"
import KYC from "./KYC"

const PersonalCard = ({account}) =>
{
    const [ showPassport, setShowPassport ] = useState(false);
    const [ showRental, setShowRental ] = useState(false);
    const [ showOrg, setShowOrg ] = useState(false);
    const [ showKYC, setShowKYC ] = useState(false);
    const pathname = usePathname();

    return(
        <div className="w-full flex flex-col lg:flex-row gap-4">
            <div className="w-full flex flex-col gap-4">
            
            <div className="w-full items-center flex border p-4 rounded gap-6 ">
                <Image style={{width: '100px', height: '100px'}} src={account.type === 'Entity' ? entity : personal} alt="account"/>
                <div className="flex flex-col gap-2">
                    <p className="text-xl font-semibold">{account.personalDetails.firstname +' ' +account.personalDetails.lastname}</p>
                    <p>{maskAccountNumber(account._id.toUpperCase())}</p>
                </div>
            </div>
            {/* <div className="w-full flex flex-col border p-4 rounded-xl gap-4 ">
                <div className=" flex justify-between items-center">
                    <p>{showAccount ? account._id.toUpperCase() : maskAccountNumber(account._id.toUpperCase())}</p>
                    <Button onClick={()=> setShowAccount(!showAccount)}>{showAccount ? 'Hide' : 'Show'}</Button>
                </div>
                <div className=" flex justify-between items-center">
                    <p>Created on</p>
                    <p>{new Date(account.createdAt).toDateString()}</p>
                </div>
            </div> */}
            
            <div className="w-full flex gap-4">
                <div className="flex flex-col items-center justify-center w-1/2 border p-8 rounded gap-4 lg:w-1/2 cursor-pointer" onClick={()=> setShowKYC(true)}>
                    <p className="text-lg font-bold">KYC</p>
                </div>
                <div className="flex flex-col items-center justify-center w-1/2 border p-8 rounded gap-4 lg:w-1/2 cursor-pointer" onClick={()=> setShowPassport(true)}>
                    <p className="text-lg font-bold">Passport</p>       
                </div>
                <div className="flex flex-col items-center justify-center w-1/2 border p-8 rounded gap-4 lg:w-1/2 cursor-pointer" onClick={()=> setShowRental(true)}>
                    <p className="text-lg font-bold">Rent agreement</p>
                </div>
            </div>            

            {showKYC && 
            <div className="h-[100vh] w-full fixed left-0 top-0 flex items-center justify-center" style={{backgroundColor:'rgba(0,0,0,0.7'}} onClick={()=> setShowKYC(false)}>
                <KYC data={account} setShowKYC={setShowKYC}/>
            </div>}

            {showPassport && 
            <div className="h-[100vh] w-full fixed left-0 top-0 flex items-center justify-center" style={{backgroundColor:'rgba(0,0,0,0.7'}} onClick={()=> setShowPassport(false)}>
                <Passport data={account} setShowPassport={setShowPassport}/>
            </div>}

            {showRental && 
            <div className="h-[100vh] w-full fixed left-0 top-0 flex items-center justify-center" style={{backgroundColor:'rgba(0,0,0,0.7'}} onClick={()=> setShowRental(false)}>
                <Rental data={account} setShowPassport={setShowPassport}/>
            </div>}

            {showOrg && 
            <div className="h-[100vh] w-full fixed left-0 top-0 flex items-center justify-center" style={{backgroundColor:'rgba(0,0,0,0.7'}} onClick={()=> setShowOrg(false)}>
                <OrganisationCard data={account.personalDetails.organisation.accountDetails} setShowOrg={setShowOrg}/>
            </div>}
        </div>
        </div>
    )
}

export default PersonalCard
