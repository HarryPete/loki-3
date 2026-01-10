import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import network from '@/assets/network.png'
import { SocialAnalysis } from "@/app/components/SocialAnalysis"

export const TabSocialAnalysis = ({account}) =>
{
    return(
        <Dialog >
            <DialogTrigger asChild>
                <Card className="flex flex-col items-center justify-center gap-3 p-6 cursor-pointer hover:bg-orange-500 hover:text-white">
                    <Image className="h-8 w-fit" src={network} alt="network icon"/>
                    <p className="text-sm">AI Social analysis</p>
                </Card>
            </DialogTrigger>
        
            <DialogContent className="sm:max-w-[425px] lg:max-w-[1040px]">
                <DialogHeader>
                    <DialogTitle>AI Social analysis</DialogTitle>
                    <DialogDescription>
                        Summarizing publicly available social references identified through screening.
                    </DialogDescription>
                </DialogHeader>
                <SocialAnalysis account={account}/>
            </DialogContent>
        </Dialog>
    )
}