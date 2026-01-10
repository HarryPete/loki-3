import { Button } from "@/components/ui/button";
import { useState } from "react"

const TradeDetails = ({account, setShowLicence}) =>
{

    const [ active, setActive ] = useState(false);
    
    return(
        <div className="space-y-2 text-sm">
          
          {account.entityDetails.partners.length>0 ? <div className="flex flex-col gap-3">
          {account.entityDetails.partners.map((partner, index) =>
          (
            <div className="bg-gray-100 p-3 rounded-md space-y-2">
                <div className="w-full flex justify-between">
                    <div className="flex justify-between items-start w-full">
                        <div className="space-y-2">
                            <p className="font-semibold text-[14px]">{partner.profile.firstname +' ' +partner.profile.lastname}</p>
                            <p><span>{partner.profile.occupation}</span></p>
                        </div>
                        <p className="font-bold italic text-orange-500 text-xs">
                        {partner?.description === "Trustee" ? 
                        'Trustee' : 
                        `Equity | ${partner.equity}%`}
                        </p>
                    </div>
                    
                </div>
                {active === index && 
                <div className="flex flex-col gap-2 mt-2 text-sm">
                    <p>DOB. {new Date(partner.profile.dateOfBirth).toLocaleDateString()}</p>
                    <p>Passport No. {partner.profile.passportDetails.passportNumber}</p>
                </div>}
                <Button className="border text-xs p-2 rounded bg-orange-500 text-white h-fit" onClick={()=> setActive((prev)=> prev === index ? null : index)}>{active === index ? 'See less' :'See more'}</Button>
            </div>
          ))}
          
          <h1 className="text-center text-green-600 font-bold italic">{account.entityDetails.licenceUpdate}</h1>
          </div>: <p className="text-muted-foreground text-sm text-center">No Associates</p>}
         </div>
      )
    }
    
    export default TradeDetails