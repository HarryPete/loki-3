import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import visualization from '@/assets/visualization.png'
import { Visualisation } from "@/app/components/Visualisation"

export const TabVisualisation = ({visualisationData, pieData, barData}) =>
{
    return(
        <Dialog >
            <DialogTrigger asChild>
                <Card className="flex flex-col items-center justify-center gap-3 p-6 cursor-pointer hover:bg-orange-500 hover:text-white">
                    <Image className="h-8 w-fit" src={visualization} alt="visualization icon"/>
                    <p className="text-sm">AI Visualization</p>
                </Card>
            </DialogTrigger>
            <DialogContent className="sm:w-[425px] lg:w-[1040px]">
                <DialogHeader>
                    <DialogTitle>Transaction visualisation</DialogTitle>
                    <DialogDescription>
                        Analyse transaction patterns with monthly insights.
                    </DialogDescription>
                </DialogHeader>
                <Visualisation visualisationData={visualisationData} pieData={pieData} barData={barData}/>
            </DialogContent>
        </Dialog>
    )
}