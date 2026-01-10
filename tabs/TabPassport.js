import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Passport from "@/app/components/Passport"
import passport from '@/assets/passport.png'

export const TabPassport = ({account}) =>
{
    return(
        <Dialog>
            <DialogTrigger asChild>
                <Card className="flex flex-col items-center justify-center gap-2  p-6 cursor-pointer hover:bg-orange-500 hover:text-white">
                    <Image className="h-8 w-fit" src={passport} alt="passport icon"/>
                    <p className="text-sm">Passport</p>       
                </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[4840px]">
                <DialogHeader>
                    <DialogTitle>
                        Passport
                    </DialogTitle>
                    <DialogDescription>Verified</DialogDescription>
                </DialogHeader>
                <Passport data={account}/>
            </DialogContent>
        </Dialog>
    )
}