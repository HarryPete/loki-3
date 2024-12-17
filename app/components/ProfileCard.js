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

const ProfileCard = ({account}) =>
{
    const [ showMOA, setShowMOA ] = useState(false);
    const [ approvals, setShowApprovals ] = useState(false);
    const [ showLicence, setShowLicence ] = useState(false);
    const [ showRiskScore, setShowRiskScore ] = useState(false);
    const [ showRFI, setShowRFI ] = useState(false);
    const [ messages, setMessages ] = useState([{from: 'fp', message: 'Kindly provide our client name'}])
    const [ message, setMessage ] = useState('');

    const handleChat = () =>
    {
      if(!message)
        return

      setMessages((prev)=> [...prev, {from : 'sp', message}]); setMessage('');

      const user = account.entityDetails.clients.find((client)=>
      {
        const fullname = client.firstname +' ' +client.lastname;
        if(message.toLowerCase() === fullname.toLocaleLowerCase())
          return client
      });  

      setTimeout(()=>
      {
        setMessages((prev)=> [...prev, {from : 'fp', message: 'Searching...'}]);
      },1000)
    
      setTimeout(()=>
      {
        if(user)
        {
          setMessages((prev)=> [...prev, {from : 'fp', message: 'Client matched'}]); setMessage('')
          setTimeout(()=>
          {
            setMessages((prev)=> [...prev, {from : 'fp', message: 'Fetching details'}]);
          },1000)
          setTimeout(()=>
          {
            setMessages((prev)=> [...prev, {from : 'fp', message: `DOB: ${new Date(user.dateOfBirth).toLocaleDateString()}, Passport No: ${user?.passportDetails?.passportNumber}`}]);
          },1000)
        }
        else
          setMessages((prev)=> [...prev, {from : 'fp', message: 'Client is reluctant to provide information'}]); setMessage('')
      },2000)
    }

    return(
        <div className="w-full flex flex-col lg:flex-row gap-4">
            <div className="flex flex-col gap-4 w-full">
            
            <div className="w-full items-center flex border p-4 rounded gap-6 ">
                <Image style={{width: '100px', height: '100px'}} src={account.type === 'Entity' ? entity : personal} alt="account"/>
                <div className="flex flex-col gap-2">
                    <p className="text-xl font-semibold">{account.entityDetails.name}</p>
                    <p>{maskAccountNumber(account._id.toUpperCase())}</p>
                </div>
            </div>
            
            <div className="w-full flex gap-6">
              <div className="flex flex-col items-center justify-center w-1/2 border p-4 rounded gap-4 lg:w-1/2" onClick={()=> setShowRiskScore(true)}>
                <p className="text-md font-bold cursor-pointer">Risk Score</p>
              </div>
              <div className="flex flex-col items-center justify-center w-1/2 border p-4 rounded gap-4 lg:w-1/2" onClick={()=> setShowLicence(true)}>
                <p className="text-md font-bold cursor-pointer">Trade Licence</p>
              </div>
              <div className="flex flex-col items-center justify-center w-1/2 border p-4 rounded gap-4 lg:w-1/2" onClick={()=> setShowMOA(true)}>
                <p className="text-md font-bold cursor-pointer">MOA</p>
              </div>
              {account.entityDetails?.approvals && 
              <div className="flex flex-col items-center justify-center w-1/2 border p-4 rounded gap-4 lg:w-1/2" onClick={()=> setShowApprovals(true)}>
                <p className="text-md font-bold cursor-pointer">Approvals</p>
              </div>}
            </div>

            <Image className="fixed bottom-6 right-6 cursor-pointer z-10" style={{width: '30px', height: '30px'}} src={showRFI ? close : chat} alt="account" onClick={()=> setShowRFI(!showRFI)}/>
            {showRFI &&
            <div className="h-[100vh] w-full fixed left-0 top-0 flex items-center justify-center" style={{backgroundColor:'rgba(0,0,0,0.7'}}>
              <div className="fixed bottom-20 right-6 h-[60%] w-96 border bg-white rounded">
                <p className="w-full px-4 p-6 bg-gray-400 font-bold">{account.entityDetails.name}</p>
                <p className="text-center my-4">Today</p>
                <div className="flex flex-col w-full h-[55%] gap-3 p-2 overflow-y-scroll">
                {messages.map((chat, index)=>
                (
                  <span key={index} className={`bg-gray-300 px-2 py-1 rounded w-fit max-w-[70%]`} style={{ alignSelf: `${chat.from === 'fp' ? 'start' : 'end'}`}}>{chat.message}</span>
                ))}
                </div>
                <div className="absolute bottom-0 w-[100%] flex gap-2 p-2">
                  <input className="border w-[100%] p-2 rounded" value={message} placeholder="Chat here" onChange={(e)=> setMessage(e.target.value)}/>
                  <Button className='p-6' onClick={handleChat}>Send</Button>
                </div>
              </div>
            </div>}

            {showRiskScore && 
            <div className="h-[100vh] w-full fixed left-0 top-0 flex items-center justify-center" style={{backgroundColor:'rgba(0,0,0,0.7'}} onClick={()=> setShowRiskScore(false)}>
                <RiskScorecard account={account}/>
            </div>}

            {showLicence && 
            <div className="h-[100vh] w-full fixed left-0 top-0 flex items-center justify-center" style={{backgroundColor:'rgba(0,0,0,0.7'}}>
                <TradeDetails account={account} setShowLicence={setShowLicence}/>
            </div>}

            {showMOA && 
            <div className="h-[100vh] w-full fixed left-0 top-0 flex items-center justify-center" style={{backgroundColor:'rgba(0,0,0,0.7'}}  onClick={()=> setShowMOA(false)}>
                <MOA account={account}/>
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