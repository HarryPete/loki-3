import { useState } from "react"

const TradeDetails = ({account}) =>
{

    console.log(account)
    const [ active, setActive ] = useState(false);

    return(
        <div className="w-[35vw] flex flex-col gap-6 bg-white p-4 rounded dark:text-black">
          <h1 className="text-2xl font-bold text-center mt-4">Trade Licence</h1>
          <div className="flex flex-col gap-2">
          {account.entityDetails.partners.map((partner, index) =>
          (
            <div>
                <div className="w-full flex justify-between">
                    <div>
                        <p className="font-semibold">{partner.profile.firstname +' ' +partner.profile.lastname}</p>
                        <p>Equity: {partner.equity}%</p>
                    </div>
                    <button className="border text-xs p-1 rounded bg-gray-300 h-fit" onClick={()=> setActive((prev)=> prev === index ? null : index)}>More Info</button>
                </div>
                {active === index && 
                <div className="flex flex-col gap-2 rounded bg-gray-300 p-2 mt-2 text-sm">
                    <p>{partner.profile.occupation +', ' +account.entityDetails.name}</p>
                    <p>Passport No: {partner.profile.passportDetails.passportNumber}</p>
                </div>}
            </div>
          ))}
          </div>
        </div>
      )
    }
    
    export default TradeDetails