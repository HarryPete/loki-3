import Image from "next/image"
import moaicon from '@/assets/moa.png'
import tradelicence from '@/assets/tradelicence.png'
import riskscoreicon from '@/assets/riskscore.png'
import { useState } from "react"
import MOA from "./MOA"
import TradeDetails from "./TradeDetails"
import RiskScorecard from "./RiskScorecard"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const ProfileCard = ({account}) =>
{
    const [ approvals, setShowApprovals ] = useState(true);

    return(
        <div className="grid grid-cols-3 gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Card className="flex flex-col items-center justify-center gap-3 p-6 cursor-pointer hover:bg-orange-500 hover:text-white">
                  <Image className="h-8 w-fit" src={riskscoreicon} alt="visualization icon"/>
                  <p className="text-sm">Risk score</p>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                  <DialogTitle>Risk Score</DialogTitle>
                  <DialogDescription>
                      {account.entityDetails.name}
                  </DialogDescription>
              </DialogHeader>
              <RiskScorecard account={account}/>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Card className="flex flex-col items-center justify-center gap-3 p-6 cursor-pointer hover:bg-orange-500 hover:text-white">
                <Image className="h-8 w-fit" src={tradelicence} alt="visualization icon"/>
                <p className="text-sm">Trade licence</p>
              </Card>
            </DialogTrigger>  
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Trade Licence</DialogTitle>
                <DialogDescription>{account.entityDetails.name}</DialogDescription>
              </DialogHeader>
              <TradeDetails account={account}/>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Card className="flex flex-col items-center justify-center gap-3 p-6 cursor-pointer hover:bg-orange-500 hover:text-white">
                  <Image className="h-8 w-fit" src={moaicon} alt="moa icon"/>
                  <p className="text-sm">MOA</p>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                  <DialogTitle>Memorandum of Association</DialogTitle>
                  <DialogDescription>{account.entityDetails.name}</DialogDescription>
              </DialogHeader>
              <MOA account={account}/>
            </DialogContent>
          </Dialog>
        </div>            
    )
}

export default ProfileCard

{/* {approvals && account.entityDetails?.approvals &&
            <div className="h-[100vh] w-full fixed left-0 top-0 flex items-center justify-center" style={{backgroundColor:'rgba(0,0,0,0.7'}}  onClick={()=> setShowApprovals(false)}>
                <div className="bg-white w-[40vw] flex flex-col items-center rounded p-8 gap-4">
                  <h1 className="text-2xl font-bold">Approvals</h1>
                  <p className="text-green-600 text-lg">{account.entityDetails.approvals}</p>
                </div>
            </div>} */}