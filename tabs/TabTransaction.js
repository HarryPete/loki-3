import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import crediticon from '@/assets/credit.png'
import TransactionForm from "@/app/components/TransactionForm"

export const TabTransaction = ({id, getAccount, setShowTransactionForm}) =>
{
    return(
        <Dialog >
            <DialogTrigger asChild>
                <Card className="flex flex-col items-center justify-center gap-3 p-6 cursor-pointer hover:bg-orange-500 hover:text-white">
                    <Image className="h-8 w-fit" src={crediticon} alt="credit icon"/>
                    <p className="text-sm">New Transaction</p>
                </Card>
            </DialogTrigger>
        
            <DialogContent className="w-[425px]">
                <DialogHeader>
                    <DialogTitle>New Transaction</DialogTitle>
                    <DialogDescription>
                        Last sync {new Date().toLocaleDateString()}
                    </DialogDescription>
                </DialogHeader>
                <TransactionForm id={id} getAccount={getAccount} setShowTransactionForm={setShowTransactionForm}/>
            </DialogContent>
        </Dialog>
    )
}