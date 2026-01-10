import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import balance from '@/assets/balance.png'

export const TabBalance = ({credit, debit}) =>
{
    return(
        <Dialog >
            <DialogTrigger asChild>
                <Card className="flex flex-col items-center justify-center gap-3 p-6 cursor-pointer hover:bg-orange-500 hover:text-white">
                    <Image className="h-8 w-fit" src={balance} alt="balance icon"/>
                    <p className="text-sm">Balance</p>
                </Card>
            </DialogTrigger>
            <DialogContent className="w-[425px]">
                <DialogHeader>
                    <DialogTitle>Balance</DialogTitle>
                    <DialogDescription>
                        Last sync {new Date().toLocaleDateString()}
                    </DialogDescription>
                </DialogHeader>
                <p className="text-[40px] font-semibold text-center bg-slate-100 p-8 rounded-xl text-orange-500">{ credit-debit ? `$${credit - debit}` : "Restricted"}</p>
            </DialogContent>
        </Dialog>
    )
}