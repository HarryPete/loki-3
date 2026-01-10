import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import draft from '@/assets/draft.png'

export const TabDraft = () =>
{
    return(
        <Dialog >
            <DialogTrigger asChild>
                <Card className="flex flex-col items-center justify-center gap-3 p-6 cursor-pointer hover:bg-orange-500 hover:text-white">
                    <Image className="h-8 w-fit" src={draft} alt="draft icon"/>
                    <p className="text-sm">AI SAR Draft</p>
                </Card>
            </DialogTrigger>
            <DialogContent className="w-[425px]">
                <DialogHeader>
                    <DialogTitle>AI SAR Draft</DialogTitle>
                    <DialogDescription>
                        Last sync {new Date().toLocaleDateString()}
                    </DialogDescription>
                </DialogHeader>
                <p className="text-[40px] font-semibold text-center bg-slate-100 p-8 rounded-xl text-orange-500">Draft here</p>
            </DialogContent>
        </Dialog>
    )
}