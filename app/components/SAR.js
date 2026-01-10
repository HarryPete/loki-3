import { useEffect, useState } from "react"
import InlineLoader from "./InlineLoader"

export const SAR = ({account}) =>
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
            <div className="border rounded-md w-full p-4 space-y-2">
                <p className="text-sm">{account?.sarReport || "SAR generation restrited for this account"}</p>
            </div> }
        </div>
    )
}