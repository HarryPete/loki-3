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
import MOAForm from "./MOAForm"
import MOA from "./MOA"
import TradeDetails from "./TradeDetails"
import RiskScorecard from "./RiskScorecard"

const ProfileCard = ({account}) =>
{
    const [ showMOA, setShowMOA ] = useState(false);
    const [ showLicence, setShowLicence ] = useState(false);
    const [ showRiskScore, setShowRiskScore ] = useState(false);

    return(
        <div className="w-full flex flex-col lg:flex-row gap-4">
            <div className="flex flex-col gap-4 w-full">
            
            <div className="w-full items-center flex border p-4 rounded gap-6 ">
                <Image style={{width: '100px', height: '100px'}} src={account.type === 'Entity' ? entity : personal} alt="account"/>
                <div className="flex flex-col gap-2">
                    <p className="text-xl font-semibold">{account.entityDetails.name}</p>
                    <p>{maskAccountNumber(account._id.toUpperCase())}</p>
                </div>
            </div>
            
            <div className="w-full flex gap-6">
              <div className="flex flex-col items-center justify-center w-1/2 border p-4 rounded gap-4 lg:w-1/2" onClick={()=> setShowRiskScore(true)}>
                <p className="text-xl font-bold cursor-pointer">Risk Score</p>
              </div>
              <div className="flex flex-col items-center justify-center w-1/2 border p-4 rounded gap-4 lg:w-1/2" onClick={()=> setShowLicence(true)}>
                <p className="text-xl font-bold cursor-pointer">Trade Licence</p>
              </div>
              <div className="flex flex-col items-center justify-center w-1/2 border p-4 rounded gap-4 lg:w-1/2" onClick={()=> setShowMOA(true)}>
                <p className="text-xl font-bold cursor-pointer">MOA</p>
              </div>
            </div>

            {showRiskScore && 
            <div className="h-[100vh] w-full fixed left-0 top-0 flex items-center justify-center" style={{backgroundColor:'rgba(0,0,0,0.7'}} onClick={()=> setShowRiskScore(false)}>
                <RiskScorecard account={account}/>
            </div>}

            {showLicence && 
            <div className="h-[100vh] w-full fixed left-0 top-0 flex items-center justify-center" style={{backgroundColor:'rgba(0,0,0,0.7'}}>
                <TradeDetails account={account} setShowLicence={setShowLicence}/>
            </div>}

            {showMOA && 
            <div className="h-[100vh] w-full fixed left-0 top-0 flex items-center justify-center" style={{backgroundColor:'rgba(0,0,0,0.7'}}  onClick={()=> setShowMOA(false)}>
                <MOA account={account}/>
            </div>}
        </div>
        </div>
    )
}

export default ProfileCard