import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import ai from '@/assets/ai.png'
import { SAR } from "@/app/components/SAR"

export const TabOverview = ({account}) =>
{
    return(
        <Dialog >
            <DialogTrigger asChild>
                <Card className="flex flex-col items-center justify-center gap-3 p-6 cursor-pointer hover:bg-orange-500 hover:text-white">
                    <Image className="h-8 w-fit" src={ai} alt="ai icon"/>
                    <p className="text-sm">AI SAR</p>
                </Card>
            </DialogTrigger>
        
            <DialogContent className="sm:max-w-[425px] lg:max-w-[1040px]">
                <DialogHeader>
                    <DialogTitle>AI SAR</DialogTitle>
                    <DialogDescription>
                        Smart analysis of trends and anomalies
                    </DialogDescription>
                </DialogHeader>
                <SAR account={account}/>
            </DialogContent>
        </Dialog>
    )
}