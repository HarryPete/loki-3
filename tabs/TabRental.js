import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Rental from "@/app/components/Rental"
import rent from '@/assets/rent.png'

export const TabRental = ({account}) =>
{
    return(
        <Dialog>
            <DialogTrigger asChild>
                <Card className="flex flex-col items-center justify-center gap-3 p-6 cursor-pointer hover:bg-orange-500 hover:text-white">
                    <Image className="h-8 w-fit" src={rent} alt="rent icon"/>
                    <p className="text-sm">Rent agreement</p>
                </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Rent Agreement</DialogTitle>
                    <DialogDescription> Verified</DialogDescription>
                </DialogHeader>
                <Rental data={account}/>
            </DialogContent>
        </Dialog>
    )
}