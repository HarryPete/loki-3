import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import chat from '@/assets/chat.png'
import close from '@/assets/close.png'
import { useState } from "react";

export const PersonalChat = ({account}) =>
{
    const [ showRFI, setShowRFI ] = useState(false);
    const [ messages, setMessages ] = useState([])
    const [ message, setMessage ] = useState('');
    const [ isTyping, setIsTyping ] = useState(false);

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
        <div>
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
                        <input className="border w-[100%] p-2 rounded bg-white" value={message} placeholder="Chat here" onChange={(e)=> setMessage(e.target.value)}/>
                        <Button className='p-4' onClick={handleChat}>Send</Button>
                    </div>
                </Card>
            </div>}
        </div>
    )
}