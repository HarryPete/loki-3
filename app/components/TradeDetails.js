import { useState } from "react"

const TradeDetails = ({account, setShowLicence}) =>
{

    const [ active, setActive ] = useState(false);
    
    console.log(account);

    return(
        <div className="w-[35vw] flex flex-col gap-6 bg-white p-6 rounded dark:text-black relative">
          <h1 className="text-2xl font-bold text-center mt-4">Trade Licence</h1>
          {account.entityDetails.partners.length>0 ? <div className="flex flex-col gap-2">
          {account.entityDetails.partners.map((partner, index) =>
          (
            <div>
                <div className="w-full flex justify-between">
                    <div>
                        <p className="font-semibold">{partner.profile.firstname +' ' +partner.profile.lastname}</p>
                        {partner?.description === "Trustee" ? <span className="font-bold italic">Trustee</span> : <p>Equity: {partner.equity}%</p>}
                    </div>
                    <button className="border text-xs p-1 rounded bg-gray-300 h-fit" onClick={()=> setActive((prev)=> prev === index ? null : index)}>{active === index ? 'Less info' :'More info'}</button>
                </div>
                {active === index && 
                <div className="flex flex-col gap-2 rounded bg-gray-300 p-2 mt-2 text-sm">
                    {/* <p>{partner.profile.occupation +', ' +account.entityDetails.name}</p> */}
                    <p>Passport No: {partner.profile.passportDetails.passportNumber}</p>
                </div>}
            </div>
          ))}
          
          <h1 className="text-center text-green-600 font-bold italic">{account.entityDetails.licenceUpdate}</h1>
          </div>: <p className="text-gray-400 italic text-lg text-center">No Associates</p>}
          <button onClick={()=> setShowLicence(false)} className="font-bold text-xl absolute top-4 right-4">X</button>
        </div>
      )
    }
    
    export default TradeDetails