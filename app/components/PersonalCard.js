import Image from "next/image"
import personal from '@/assets/personal.png'
import entity from '@/assets/entity.png'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { maskAccountNumber } from "@/utility/maskAccountNumber"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Passport from "./Passport"
import Rental from "./Rental"
import { usePathname } from "next/navigation"
import Link from "next/link"
import OrganisationCard from "./OrganisationCard"
import KYC from "./KYC"
import chat from '@/assets/chat.png'
import close from '@/assets/close.png'
import { Card } from "@/components/ui/card"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const PersonalCard = ({account}) =>
{
    const [ showPassport, setShowPassport ] = useState(false);
    const [ showRental, setShowRental ] = useState(false);
    const [ showOrg, setShowOrg ] = useState(false);
    const [ showKYC, setShowKYC ] = useState(false);
    const [ showRFI, setShowRFI ] = useState(false);
    const [ messages, setMessages ] = useState([])
    const [ message, setMessage ] = useState('');
    const [ isTyping, setIsTyping ] = useState(false);
    const pathname = usePathname();

    const handleChat = () =>
    {
        if(!message)
        return

        setMessages((prev)=> [...prev, {from : 'sp', message}]); setMessage('');
  
        setIsTyping(true);
            
        setTimeout(()=>
        {
            const check = account?.chatResponse
            if(check)
            {
                setTimeout(()=>
                {
                    setIsTyping(false)
                    setMessages((prev)=> [...prev, {from : 'fp', message: account.chatResponse}]);
                },1000)
            }
            else
            {
                setTimeout(()=>
                {
                    setIsTyping(false)
                    setMessages((prev)=> [...prev, {from : 'fp', message: 'I cannot provide you that information'}]); setMessage('')
                })
            }
        },2000)
    }

    return(
        <div className="flex flex-col lg:flex-row gap-4">
            <div className="w-full flex flex-col gap-4">
            
            <Card className="w-full items-start flex p-4 gap-6">
                <Image className="w-fit h-16" src={account.type === 'Entity' ? entity : personal} alt="account"/>
                <div className="space-y-2">
                    <p className="text-base font-semibold">{account.personalDetails.firstname +' ' +account.personalDetails.lastname}</p>
                    <p>{maskAccountNumber(account._id.toUpperCase())}</p>
                    <p><span className="font-bold">Opening Date </span> {new Date(account?.accountOpenDate).toLocaleDateString()}</p>
                </div>
            </Card>
            
            <div className="grid grid-cols-3 gap-4">
                <Dialog>
                    <DialogTrigger asChild>
                    <Card className="text-center p-6 cursor-pointer">
                        <p className="font-semibold">KYC</p>
                    </Card>
                    </DialogTrigger>
                    
                    <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>KYC</DialogTitle>
                        <DialogDescription>
                            Verified
                        </DialogDescription>
                    </DialogHeader>
                    <KYC data={account} setShowKYC={setShowKYC}/>
                    </DialogContent>
                </Dialog>

                <Dialog>
                    <DialogTrigger asChild>
                    <Card className="text-center p-6 cursor-pointer">
                        <p className="font-semibold">Passport</p>       
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
                        <DialogDescription>
                            
                        </DialogDescription>
                    </DialogHeader>
                        <Passport data={account} setShowPassport={setShowPassport}/>
                    </DialogContent>
                </Dialog>

                <Dialog>
                    <DialogTrigger asChild>
                    <Card className="text-center p-6 cursor-pointer">
                        <p className="font-semibold">Rent agreement</p>
                    </Card>
                    </DialogTrigger>
                    
                    <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Rent Agreement</DialogTitle>
                        <DialogDescription>
                            Verified
                        </DialogDescription>
                    </DialogHeader>
                        <Rental data={account} setShowPassport={setShowPassport}/>
                    </DialogContent>
                </Dialog>
            </div>          
            
                <Image className="fixed bottom-6 right-6 cursor-pointer z-10 w-8 h-fit" src={showRFI ? close : chat} alt="account" onClick={()=> setShowRFI(!showRFI)}/>
                {showRFI &&
                <div className="h-[100vh] w-full fixed left-0 top-0 flex items-center justify-center" style={{backgroundColor:'rgba(0,0,0,0.7'}}>
                    <Card className="fixed bottom-20 right-6 h-[60%] w-96 border bg-white text-sm">
                        <Card className="w-full px-4 p-6 bg-orange-500 text-white font-bold">{account.accountName}</Card>
                        <p className="text-center my-4">Today</p>
                        <div className="flex flex-col w-full h-[55%] gap-3 p-2 overflow-y-scroll">
                        {messages.map((chat, index)=>
                        (
                            <span key={index} className={`${chat.from !== 'fp' && 'bg-orange-500 text-white'} bg-gray-100 px-2 py-1 rounded w-fit max-w-[70%]`} style={{ alignSelf: `${chat.from === 'fp' ? 'start' : 'end'}`}}>{chat.message}</span>
                        ))}
                        </div>
                        
                        {isTyping && <p className="italic text-center">Typing...</p>}
                        <div className="absolute bottom-0 w-[100%] flex gap-2 p-2">
                            <input className="border w-[100%] p-2 rounded" value={message} placeholder="Chat here" onChange={(e)=> setMessage(e.target.value)}/>
                            <Button className='p-4' onClick={handleChat}>Send</Button>
                        </div>
                    </Card>
                </div>}


                {showOrg && 
                <div className="h-[100vh] w-full fixed left-0 top-0 flex items-center justify-center" style={{backgroundColor:'rgba(0,0,0,0.7'}} onClick={()=> setShowOrg(false)}>
                    <OrganisationCard data={account.personalDetails.organisation.accountDetails} setShowOrg={setShowOrg}/>
                </div>}
            </div>
        </div>
    )
}

export default PersonalCard
