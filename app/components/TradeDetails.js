import { useState } from "react"

const TradeDetails = ({account, setShowLicence}) =>
{

    const [ active, setActive ] = useState(false);
    
    return(
        <div className="space-y-2 text-sm">
          
          {account.entityDetails.partners.length>0 ? <div className="flex flex-col gap-2">
          {account.entityDetails.partners.map((partner, index) =>
          (
            <div>
                <div className="w-full flex justify-between">
                    <div>
                        <p className="font-semibold">{partner.profile.firstname +' ' +partner.profile.lastname}</p>
                        {partner?.description === "Trustee" ? <span className="font-bold italic">Trustee</span> : <p>Equity: {partner.equity}%</p>}
                    </div>
                    <button className="border text-xs p-1 rounded bg-orange-500 text-white h-fit" onClick={()=> setActive((prev)=> prev === index ? null : index)}>{active === index ? 'Less info' :'More info'}</button>
                </div>
                {active === index && 
                <div className="flex flex-col gap-2 rounded bg-gray-200 p-2 mt-2 text-sm">
                    {/* <p>{partner.profile.occupation +', ' +account.entityDetails.name}</p> */}
                    <p>Passport No: {partner.profile.passportDetails.passportNumber}</p>
                </div>}
            </div>
          ))}
          
          <h1 className="text-center text-green-600 font-bold italic">{account.entityDetails.licenceUpdate}</h1>
          </div>: <p className="text-muted-foreground text-sm text-center">No Associates</p>}
         </div>
      )
    }
    
    export default TradeDetails