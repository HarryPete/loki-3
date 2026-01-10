import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import KYC from "@/app/components/KYC"
import kyc from '@/assets/kyc.png'

export const TabKYC = ({account}) =>
{
    return(
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
    )
}