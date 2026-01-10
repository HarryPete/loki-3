import Image from "next/image"
import riskscoreicon from '@/assets/riskscore.png'
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import RiskScorecard from "@/app/components/RiskScorecard"

export const TabRiskScore = ({account}) =>
{
    return(
        <Dialog>
            <DialogTrigger asChild>
              <Card className="flex flex-col items-center justify-center gap-3 p-6 cursor-pointer hover:bg-orange-500 hover:text-white">
                  <Image className="h-8 w-fit" src={riskscoreicon} alt="visualization icon"/>
                  <p className="text-md">Risk score</p>
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
    )
}