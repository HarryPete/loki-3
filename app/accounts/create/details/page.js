'use client'

import EntityDetails from "@/app/components/EntityDetails";
import PersonalDetails from "@/app/components/PersonalDetails";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const Details = ()  =>
{
    const params = useSearchParams();
    const id = params.get('id') || null
    const type = params.get('type') || null

    return(
        <div>
            {type === 'Personal' ? <PersonalDetails id={id}/> : <EntityDetails id={id}/>}
        </div>
    )
}

const Loader = () =>
{
    return(
        <div>
            <Suspense fallback={<>Loading...</>}>
                <Details/>
            </Suspense>
        </div>
    )
}

export default Loader