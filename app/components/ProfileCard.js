import Image from "next/image"
import personal from '@/assets/personal.png'
import entity from '@/assets/entity.png'
import chat from '@/assets/chat.png'
import close from '@/assets/close.png'
import { maskAccountNumber } from "@/utility/maskAccountNumber"
import { useState } from "react"
import MOA from "./MOA"
import TradeDetails from "./TradeDetails"
import RiskScorecard from "./RiskScorecard"
import { Button } from "@/components/ui/button"
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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const ProfileCard = ({account}) =>
{
    const [ approvals, setShowApprovals ] = useState(false);
    const [ showRFI, setShowRFI ] = useState(false);
    const [ messages, setMessages ] = useState([{from: 'fp', message: 'Hey! How can we help you today?'}])
    const [ message, setMessage ] = useState('');

    const handleChat = () =>
    {
      if(!message)
        return

      setMessages((prev)=> [...prev, {from : 'sp', message}]); setMessage('');

      // const user = account.entityDetails.clients.find((client)=>
      // {
      //   const fullname = client.firstname +' ' +client.lastname;
      //   if(message.toLowerCase() === fullname.toLocaleLowerCase())
      //     return client
      // });  

      const check = account?.chatResponse

      // setTimeout(()=>
      // {
      //   setMessages((prev)=> [...prev, {from : 'fp', message: 'Searching...'}]);
      // },1000)
    
      setTimeout(()=>
      {
        if(check)
        {
          // setMessages((prev)=> [...prev, {from : 'fp', message: 'Client matched'}]); setMessage('')
          setTimeout(()=>
          {
            setMessages((prev)=> [...prev, {from : 'fp', message: account.chatResponse}]);
          },1000)
          // setTimeout(()=>
          // {
          //   setMessages((prev)=> [...prev, {from : 'fp', message: `DOB: ${new Date(user.dateOfBirth).toLocaleDateString()}, Passport No: ${user?.passportDetails?.passportNumber}`}]);
          // },1000)
        }
        else
          setMessages((prev)=> [...prev, {from : 'fp', message: 'Client is reluctant to provide information'}]); setMessage('')
      },2000)
    }

    return(
        <div className="">
            <div className="space-y-4">
            
            <Card className="w-full items-center flex p-4 gap-6 relative">
                <Image className="w-12 h-fit" src={account.type === 'Entity' ? entity : personal} alt="account"/>
                <div className="flex flex-col gap-2">
                    <p className="text-base font-semibold">{account.entityDetails.name}</p>
                    <p className="text-sm text-muted-foreground">{maskAccountNumber(account._id.toUpperCase())}</p>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className='absolute top-4 right-4'>Attachments</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                  {account.entityDetails?.attachments?.map((attachment, index)=>
                  (
                    <Dialog>
                      <DialogTrigger asChild>
                      <div className="" key={index}>
                        {attachment.title}
                      </div>
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
                  </DropdownMenuContent>
                </DropdownMenu>
            </Card>
    
            <div className="grid grid-cols-3 gap-4">
                  <Dialog>
                    <DialogTrigger asChild>
                    <Card className="p-6 text-center">
                      <p className="font-semibold cursor-pointer">Risk Score</p>
                    </Card>
                    </DialogTrigger>
                    
                    <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Risk Score</DialogTitle>
                        <DialogDescription>
                            {account.entityDetails.name}
                        </DialogDescription>
                    </DialogHeader>
                      <RiskScorecard account={account}/>
                    </DialogContent>
                </Dialog>

                <Dialog>
                    <DialogTrigger asChild>
                    <Card className="p-6 text-center">
                      <p className="font-semibold cursor-pointer">Trade Licence</p>
                    </Card>
                    </DialogTrigger>
                    
                    <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Trade Licence</DialogTitle>
                        <DialogDescription>
                            {account.entityDetails.name}
                        </DialogDescription>
                    </DialogHeader>
                    <TradeDetails account={account}/>
                    </DialogContent>
                </Dialog>

                <Dialog>
                    <DialogTrigger asChild>
                    <Card className="p-6 text-center">
                      <p className="font-semibold cursor-pointer">MOA</p>
                    </Card>
                    </DialogTrigger>
                    
                    <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Memorandum of Association</DialogTitle>
                        <DialogDescription>
                          {account.entityDetails.name}
                        </DialogDescription>
                    </DialogHeader>
                    <MOA account={account}/>
                    </DialogContent>
                </Dialog>
             </div>

            <Image className="fixed bottom-6 right-6 cursor-pointer z-10 w-8 h-fit" src={showRFI ? close : chat} alt="account" onClick={()=> setShowRFI(!showRFI)}/>
            {showRFI &&
            <div className="h-[100vh] w-full fixed left-0 top-0 flex items-center justify-center" style={{backgroundColor:'rgba(0,0,0,0.7'}}>
              <Card className="fixed bottom-20 right-6 h-[60%] w-96 border bg-white text-sm">
                <Card className="w-full p-6 px-4 bg-orange-500 text-white font-bold">{account.entityDetails.name}</Card>
                <p className="text-center my-4">Today</p>
                <div className="flex flex-col w-full h-[55%] gap-3 p-2 overflow-y-scroll">
                {messages.map((chat, index)=>
                (
                  <span key={index} className={`${chat.from !== 'fp' && 'bg-orange-500 text-white'} bg-gray-100 px-2 py-1 rounded w-fit max-w-[70%]`} style={{ alignSelf: `${chat.from === 'fp' ? 'start' : 'end'}`}}>{chat.message}</span>
                ))}
                </div>
                <div className="absolute bottom-0 w-[100%] flex gap-2 p-2">
                  <input className="border w-[100%] p-2 rounded" value={message} placeholder="Chat here" onChange={(e)=> setMessage(e.target.value)}/>
                  <Button className='p-4' onClick={handleChat}>Send</Button>
                </div>
              </Card>
            </div>}

            {approvals && account.entityDetails?.approvals &&
            <div className="h-[100vh] w-full fixed left-0 top-0 flex items-center justify-center" style={{backgroundColor:'rgba(0,0,0,0.7'}}  onClick={()=> setShowApprovals(false)}>
                <div className="bg-white w-[40vw] flex flex-col items-center rounded p-8 gap-4">
                  <h1 className="text-2xl font-bold">Approvals</h1>
                  <p className="text-green-600 text-lg">{account.entityDetails.approvals}</p>
                </div>
            </div>}
        </div>
        </div>
    )
}

export default ProfileCard