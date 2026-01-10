import Image from "next/image"
import moaicon from '@/assets/moa.png'
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import MOA from "@/app/components/MOA"

export const TabMOA = ({account}) =>
{
    return(
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
    )
}