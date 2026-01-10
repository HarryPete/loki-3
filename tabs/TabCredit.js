import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import crediticon from '@/assets/credit.png'

export const TabCredit = ({credit}) =>
{
    return(
        <Dialog >
            <DialogTrigger asChild>
                <Card className="flex flex-col items-center justify-center gap-3 p-6 cursor-pointer hover:bg-orange-500 hover:text-white">
                    <Image className="h-8 w-fit" src={crediticon} alt="credit icon"/>
                    <p className="text-sm">Credit</p>
                </Card>
            </DialogTrigger>
        
            <DialogContent className="w-[425px]">
                <DialogHeader>
                    <DialogTitle>Credit</DialogTitle>
                    <DialogDescription>
                        Last sync {new Date().toLocaleDateString()}
                    </DialogDescription>
                </DialogHeader>
                <p className="text-[40px] font-semibold text-center bg-slate-100 p-8 rounded-xl text-orange-500">{ credit ? `$${credit}` : "Restricted"}</p>
            </DialogContent>
        </Dialog>
    )
}