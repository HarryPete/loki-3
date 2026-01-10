import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import debiticon from '@/assets/debit.png'

import visualization from '@/assets/visualization.png'
import ai from '@/assets/ai.png'
import network from '@/assets/network.png'

export const TabDebit = ({debit}) =>
{
    return(
        <Dialog >
            <DialogTrigger asChild>
                <Card className="flex flex-col items-center justify-center gap-3 p-6 cursor-pointer hover:bg-orange-500 hover:text-white">
                    <Image className="h-8 w-fit" src={debiticon} alt="credit icon"/>
                    <p className="text-sm">Debit</p>
                </Card>
            </DialogTrigger>
        
            <DialogContent className="w-[425px]">
                <DialogHeader>
                    <DialogTitle>Debit</DialogTitle>
                    <DialogDescription>
                        Last sync {new Date().toLocaleDateString()}
                    </DialogDescription>
                </DialogHeader>
                <p className="text-[40px] font-semibold text-center bg-slate-100 p-8 rounded-xl text-orange-500">{ debit ? `$${debit}` : "Restricted"}</p>
            </DialogContent>
        </Dialog>
    )
}