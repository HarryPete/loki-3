import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Transactions } from "@/app/components/Transacions"
import transactionicon from '@/assets/transaction.png'

import debiticon from '@/assets/debit.png'
import crediticon from '@/assets/credit.png'
import balance from '@/assets/balance.png'
import visualization from '@/assets/visualization.png'
import ai from '@/assets/ai.png'
import network from '@/assets/network.png'

export const TabTransactions = ({id, transactions}) =>
{
    return(
        <Dialog >
            <DialogTrigger asChild>
                <Card className="flex flex-col items-center justify-center gap-3 p-6 cursor-pointer hover:bg-orange-500 hover:text-white">
                    <Image className="h-8 w-fit" src={transactionicon} alt="transaction icon"/>
                    <p className="text-sm">Transactions</p>
                </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] lg:max-w-[1040px]">
                <DialogHeader>
                    <DialogTitle>Transactions</DialogTitle>
                    <DialogDescription>
                        Overview of financial transactions connected to the profile.
                    </DialogDescription>
                </DialogHeader>
                <Transactions id={id} transactions={transactions}/>
            </DialogContent>
        </Dialog>
    )
}