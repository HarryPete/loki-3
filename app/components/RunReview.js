import { useEffect, useState } from "react"
import InlineLoader from "./InlineLoader"

export const RunReview = ({account}) =>
{
    const [ loading, setLoading ] = useState(false)

    useEffect(()=>
    {
        setLoading(true)
        setTimeout(()=>
        {
            setLoading(false)
        }, 5000)

    },[])

    return(
        <div>
            {loading ? <InlineLoader/>:
            (account.type === "Entity" ? 
            <div>
                <div className="flex gap-8">
                    <p className="text-orange-500 p-4 py-2 rounded-md w-fit text-[48px] font-bold">1</p>
                    <div>
                        <p className="text-md font-bold mt-2">MOA</p>
                        <p className="mb-4 text-sm">Memorandum of Association details remain consistent with official records. No discrepancies identified.</p>
                    </div>
                </div>

                <div className="flex gap-8">
                    <p className="text-orange-500 p-4 py-2 rounded-md w-fit text-[48px] font-bold">2</p>
                    <div>
                        <p className="text-md font-bold mt-2">Trade Licence</p>
                        <p className="mb-4 text-sm">Trade licence details are consistent with regulatory records. No discrepancies identified.</p>
                    </div>
                </div>

                <div className="flex gap-8">
                    <p className="text-orange-500 p-4 py-2 rounded-md w-fit text-[48px] font-bold">3</p>
                    <div>
                        <p className="text-md font-bold mt-2">Risk score</p>
                        <p className="mb-4 text-sm">Entity risk score has been updated based on the latest assessment and transaction activity. New risk score is 6</p>
                    </div>
                </div>
            </div>:
            <div>
                <div className="flex gap-8">
                    <p className="text-orange-500 p-4 py-2 rounded-md w-fit text-[48px] font-bold">1</p>
                    <div>
                        <p className="text-md font-bold mt-2">KYC</p>
                        <p className="mb-4 text-sm">All customer identity documents, personal details, and account information were verified and found consistent with official records. No discrepancies or alerts were identified.</p>
                    </div>
                </div>

                <div className="flex gap-8">
                    <p className="text-orange-500 p-4 py-2 rounded-md w-fit text-[48px] font-bold">2</p>
                    <div>
                        <p className="text-md font-bold mt-2">Screening</p>
                        {account.personalDetails?.isPEP === "Yes" ? 
                        <p className="mb-4 text-sm">Customer details were checked against sanctions and regulatory watchlists. A potential match was identified, requiring further review.</p> :
                        <p className="mb-4 text-sm">Customer details were checked against sanctions and regulatory watchlists, with no matches or alerts identified.</p>}
                    </div>
                </div>

            </div> )}
        </div>
    )
}