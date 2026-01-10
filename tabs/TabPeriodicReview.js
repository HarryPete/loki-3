import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import network from '@/assets/network.png'
import { SocialAnalysis } from "@/app/components/SocialAnalysis"
import { RunReview } from "@/app/components/RunReview"

export const TabPeriodicReview = ({account}) =>
{
    return(
        <Dialog >
            <DialogTrigger asChild>
                <Card className="flex flex-col items-center justify-center gap-3 p-6 cursor-pointer hover:bg-orange-500 hover:text-white">
                    <Image className="h-8 w-fit" src={network} alt="network icon"/>
                    <p className="text-sm">Periodic Review</p>
                </Card>
            </DialogTrigger>
        
            <DialogContent className="sm:max-w-[425px] lg:max-w-[1040px]">
                <DialogHeader>
                    <DialogTitle>Periodic Review</DialogTitle>
                    <DialogDescription>
                        Periodically reviewed by the system to ensure your information remains accurate and compliant with regulatory requirements. Last sync {new Date().toLocaleDateString()}
                    </DialogDescription>
                </DialogHeader>
                <RunReview account={account}/>
                {/* <SocialAnalysis account={account}/> */}
            </DialogContent>
        </Dialog>
    )
}