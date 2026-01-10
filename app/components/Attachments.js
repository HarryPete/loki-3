import Image from "next/image"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export const Attachments = ({account}) =>
{
    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Button variant="outline" className='absolute top-4 right-4'>Attachments</Button>
            </DropdownMenuTrigger>
            {account.entityDetails?.attachments && <DropdownMenuContent className="w-56">
            {account.entityDetails?.attachments?.map((attachment, index)=>
            (
            <Dialog >
                <DialogTrigger asChild>
                    <div className="p-2 cursor-pointer" key={index}>{attachment.title}</div>
                </DialogTrigger>
            
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{attachment.title}</DialogTitle>
                        <DialogDescription>
                            {account.entityDetails.name}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="relative w-full h-48">
                        <Image className="w-full h-full object-contain" src={attachment.imageURL} alt={attachment.title} layout="fill"/>
                    </div>
                </DialogContent>
            </Dialog>
            ))}
            </DropdownMenuContent>}
        </DropdownMenu>
    )
}