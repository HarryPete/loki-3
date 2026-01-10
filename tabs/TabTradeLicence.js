import Image from "next/image"
import tradelicence from '@/assets/tradelicence.png'
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import TradeDetails from "@/app/components/TradeDetails"

export const TabTradeLicence = ({account}) =>
{
    return(
        <Dialog>
            <DialogTrigger asChild>
              <Card className="flex flex-col items-center justify-center gap-3 p-6 cursor-pointer hover:bg-orange-500 hover:text-white">
                <Image className="h-8 w-fit" src={tradelicence} alt="visualization icon"/>
                <p className="text-md">Trade licence</p>
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
    )
}