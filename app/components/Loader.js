import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react"

const Loader = () =>
{
    const [ progress, setProgress ] = useState(13);

    useEffect(()=>
    {
        const timer = setTimeout(()=>
        setProgress(66),500)

        return()=> clearTimeout(timer)
    },[])

    return(
        <div className="h-[100vh] w-full fixed left-0 top-0 flex items-center justify-center" style={{backgroundColor:'rgba(0,0,0,0.7'}}>
            <Progress value={progress} className="w-[60%] z-10 text-white" />
        </div>
    )
}

export default Loader