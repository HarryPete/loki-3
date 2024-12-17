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
            const check = account?.chatKeys.find((key)=> message.toLowerCase().includes(key.toLowerCase()))
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
        <div className="w-full flex flex-col lg:flex-row gap-4">
            <div className="w-full flex flex-col gap-4">
            
            <div className="w-full items-center flex border p-4 rounded gap-6 ">
                <Image style={{width: '100px', height: '100px'}} src={account.type === 'Entity' ? entity : personal} alt="account"/>
                <div className="flex flex-col gap-2">
                    <p className="text-xl font-semibold">{account.personalDetails.firstname +' ' +account.personalDetails.lastname}</p>
                    <p>{maskAccountNumber(account._id.toUpperCase())}</p>
                    <p><span className="font-bold">A/C Open Date :</span> {new Date(account?.accountOpenDate).toLocaleDateString()}</p>
                </div>
            </div>
            {/* <div className="w-full flex flex-col border p-4 rounded-xl gap-4 ">
                <div className=" flex justify-between items-center">
                    <p>{showAccount ? account._id.toUpperCase() : maskAccountNumber(account._id.toUpperCase())}</p>
                    <Button onClick={()=> setShowAccount(!showAccount)}>{showAccount ? 'Hide' : 'Show'}</Button>
                </div>
                <div className=" flex justify-between items-center">
                    <p>Created on</p>
                    <p>{new Date(account.createdAt).toDateString()}</p>
                </div>
            </div> */}
            
            <div className="w-full flex gap-4">
                <div className="flex flex-col items-center justify-center w-1/2 border p-8 rounded gap-4 lg:w-1/2 cursor-pointer" onClick={()=> setShowKYC(true)}>
                    <p className="text-lg font-bold">KYC</p>
                </div>
                <div className="flex flex-col items-center justify-center w-1/2 border p-8 rounded gap-4 lg:w-1/2 cursor-pointer" onClick={()=> setShowPassport(true)}>
                    <p className="text-lg font-bold">Passport</p>       
                </div>
                <div className="flex flex-col items-center justify-center w-1/2 border p-8 rounded gap-4 lg:w-1/2 cursor-pointer" onClick={()=> setShowRental(true)}>
                    <p className="text-lg font-bold">Rent agreement</p>
                </div>
            </div>          
            
            <Image className="fixed bottom-6 right-6 cursor-pointer z-10" style={{width: '30px', height: '30px'}} src={showRFI ? close : chat} alt="account" onClick={()=> setShowRFI(!showRFI)}/>
                        {showRFI &&
                        <div className="h-[100vh] w-full fixed left-0 top-0 flex items-center justify-center" style={{backgroundColor:'rgba(0,0,0,0.7'}}>
                          <div className="fixed bottom-20 right-6 h-[60%] w-96 border bg-white rounded">
                            <p className="w-full px-4 p-6 bg-gray-400 font-bold">{account.accountName}</p>
                            <p className="text-center my-4">Today</p>
                            <div className="flex flex-col w-full h-[55%] gap-3 p-2 overflow-y-scroll">
                            {messages.map((chat, index)=>
                            (
                              <span key={index} className={`bg-gray-300 px-2 py-1 rounded w-fit max-w-[70%]`} style={{ alignSelf: `${chat.from === 'fp' ? 'start' : 'end'}`}}>{chat.message}</span>
                            ))}
                            </div>
                            {isTyping && <p className="italic text-center">Typing...</p>}
                            <div className="absolute bottom-0 w-[100%] flex gap-2 p-2">
                              <input className="border w-[100%] p-2 rounded" value={message} placeholder="Chat here" onChange={(e)=> setMessage(e.target.value)}/>
                              <Button className='p-6' onClick={handleChat}>Send</Button>
                            </div>
                          </div>
                        </div>}

            {showKYC && 
            <div className="h-[100vh] w-full fixed left-0 top-0 flex items-center justify-center" style={{backgroundColor:'rgba(0,0,0,0.7'}} onClick={()=> setShowKYC(false)}>
                <KYC data={account} setShowKYC={setShowKYC}/>
            </div>}

            {showPassport && 
            <div className="h-[100vh] w-full fixed left-0 top-0 flex items-center justify-center" style={{backgroundColor:'rgba(0,0,0,0.7'}} onClick={()=> setShowPassport(false)}>
                <Passport data={account} setShowPassport={setShowPassport}/>
            </div>}

            {showRental && 
            <div className="h-[100vh] w-full fixed left-0 top-0 flex items-center justify-center" style={{backgroundColor:'rgba(0,0,0,0.7'}} onClick={()=> setShowRental(false)}>
                <Rental data={account} setShowPassport={setShowPassport}/>
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
