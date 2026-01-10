import Image from "next/image"
import kyc from '@/assets/kyc.png'
import passport from '@/assets/passport.png'
import rent from '@/assets/rent.png'
import Passport from "./Passport"
import Rental from "./Rental"
import KYC from "./KYC"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PersonalChat } from "./PersonalChat"

const PersonalCard = ({account}) =>
{
    return(    
        <div className="grid grid-cols-3 gap-4">
            <Dialog>
                <DialogTrigger asChild>
                    <Card className="flex flex-col items-center justify-center gap-3 p-6 cursor-pointer hover:bg-orange-500 hover:text-white">
                        <Image className="h-8 w-fit" src={kyc} alt="kyc icon"/>
                        <p className="text-sm">KYC</p>
                    </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>KYC</DialogTitle>
                        <DialogDescription>Verified</DialogDescription>
                    </DialogHeader>
                    <KYC data={account}/>
                </DialogContent>
            </Dialog>

            <Dialog>
                <DialogTrigger asChild>
                    <Card className="flex flex-col items-center justify-center gap-2  p-6 cursor-pointer hover:bg-orange-500 hover:text-white">
                        <Image className="h-8 w-fit" src={passport} alt="passport icon"/>
                        <p className="text-sm">Passport</p>       
                    </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>
                            <div className="flex justify-between">
                                <h1>Passport Authority</h1>
                                <div className="space-y-1">
                                    <h1 className="text-sm">Passport No</h1>
                                    <p className="font-thin text-sm">{account.personalDetails.passportDetails.passportNumber}</p>
                                </div>
                            </div>
                        </DialogTitle>
                        <DialogDescription>Verified</DialogDescription>
                    </DialogHeader>
                    <Passport data={account}/>
                </DialogContent>
            </Dialog>

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
            <PersonalChat account={account}/>
        </div>          

    )
}

export default PersonalCard
