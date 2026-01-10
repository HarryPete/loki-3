import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import crediticon from '@/assets/credit.png'

export const NetworkAnalysis = () =>
{
    return(
        <Dialog >
            <DialogTrigger asChild>
                <p className="underline text-blue-500 cursor-pointer">Check here</p>
            </DialogTrigger>
        
            <DialogContent className="w-[425px]">
                <DialogHeader>
                    <DialogTitle>Network Analysis</DialogTitle>
                    <DialogDescription>
                        Last sync {new Date().toLocaleDateString()}
                    </DialogDescription>
                </DialogHeader>
                <p className="text-sm">No conclusive relationship was established</p>
            </DialogContent>
        </Dialog>
    )
}