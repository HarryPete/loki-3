'use client'

// import EntityDetails from "@/app/components/EntityDetails";
// import PersonalDetails from "@/app/components/PersonalDetails";
import Passport from "@/app/components/Passport";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";
import harispeter from "../../../../assets/harispeter.png"
import signature from "../../../../assets/signature.png"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import InlineLoader from "@/app/components/InlineLoader";

// const Details = ()  =>
// {
//     const params = useSearchParams();
//     const id = params.get('id') || null
//     const type = params.get('type') || null

//     return(
//         <div>
//             {type === 'Personal' ? <PersonalDetails id={id}/> : <EntityDetails id={id}/>}
//         </div>
//     )
// }

const UserAccount = () =>
{
    const params = useSearchParams();
    const id = params.get('id') || null
    const type = params.get('type') || null

    const [ account, setAccount ] = useState()
    const [ uploadID, setUploadID ] = useState(false)
    const [ uploadPhoto, setUploadPhoto ] = useState(false)
    const [ triggerKYC, setTriggerKYC ] = useState(false)
    const [ loading, setLoading ]  = useState(false)
    const [ report, setReport ] = useState(false)
    const [ generate, setGenerate ] = useState(false)

    const getUser = async () =>
    {
        try
        {
            const url = `/api/account/${id}`
            const response = await axios.get(url);
            setAccount(response.data);
        }
        catch(err)
        {
            console.log(err)
            toast.error(err)
        }
    }

    function getUploadIdentity()
    {
        setUploadID(true)
        toast.success("Identity uploaded")
    }

    function getUploadPhoto()
    {
        setUploadPhoto(true)
        toast.success("Photo uploaded")
    }

    function getKYC()
    {
        setLoading(true)
        setTriggerKYC(true)
        setTimeout(()=>
        {
            setLoading(false)
        },3000)
        setReport(false)
        setGenerate(false)
    }

    function getReport() 
    {
        setReport(true);
        setGenerate(true);
    }

    useEffect(() => 
    {
        if (!generate) return;
        const timer = setTimeout(() => {
            setGenerate(false);
    }, 3000);

  return () => clearTimeout(timer);
}, [generate]);

    useEffect(()=>
    {
        if (!id) 
            return;
        getUser()
    },[id])

    return(
        <div>
           {account && 
           <div className="space-y-4">
                <div className="flex justify-between p-6 font-bold bg-orange-500 text-white rounded-lg">
                    <p className="text-xl">{account.personalDetails.firstname +' ' +account.personalDetails.lastname}</p>
                    <p>{type} account</p>
                </div>
                <div className="flex gap-4">
                    <div className="w-[30%] border rounded-lg p-4 space-y-4">
                        <div className="bg-orange-500 font-bold text-lg p-2 text-white rounded-lg text-center mb-6">
                            Customer Onboadring
                        </div>
                        <div>
                            <p>Email</p>
                            <p className="font-bold">{account.email}</p>
                        </div>
                        <div>
                            <p>Contact</p>
                            <p className="font-bold">{account.contact}</p>
                        </div>
                        <div>
                            <p>DOB</p>
                            <p className="font-bold">{new Date(account.personalDetails.dateOfBirth).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <p>Occupation</p>
                            <p className="font-bold">{account.personalDetails.occupation}</p>
                        </div>
                        <div>
                            <p>Annual Income</p>
                            <p className="font-bold">${account.personalDetails.annualIncome}</p>
                        </div>
                    </div>
                    <div className="w-[35%] flex flex-col border rounded-lg p-4 space-y-2">
                        <div className="bg-orange-500 font-bold text-lg p-2 text-white rounded-lg text-center mb-2">
                            Supporting Documents
                        </div>
                        <Passport data={account}/>
                        <Image className="h-48 w-full object-scale-down object-top border rounded-lg" src={account?.userSelfie} width={100} height={100} alt="selfie"/>
                    </div>
                    <div className="w-[35%] border rounded-lg p-4 space-y-8">
                        <div className="bg-orange-500 font-bold text-lg p-2 text-white rounded-lg text-center mb-6">
                            Process KYC
                        </div>
                        <div className="flex gap-8">
                            <p className="text-orange-500 p-4 py-2 rounded-md w-fit text-[48px] font-bold">1</p>
                            <div>
                                <p className="text-lg font-bold mt-2">Identity Proof</p>
                                <p className="mb-4">Upload a valid government-issued ID. Ensure the document is clear, complete, and readable.</p>
                                {uploadID ? 
                                    <div className="flex items-center gap-2 text-green-500">
                                        <Check className="h-4 w-4" />
                                        Uploaded
                                    </div> : 
                                    <Button type="button" onClick={getUploadIdentity}>Upload Identity</Button>}
                            </div>
                        </div>
                        
                        <div className="flex gap-8">
                            <p className="text-orange-500 p-4 py-2 rounded-md w-fit text-[48px] font-bold">2</p>
                            <div>
                                <p className="text-lg font-bold mt-2">User Photo</p>
                                <p className="mb-4">Upload a recent photo of yourself. Make sure your face is clearly visible with good lighting.</p>
                                {uploadPhoto ? 
                                    <div className="flex items-center gap-2 text-green-500">
                                        <Check className="h-4 w-4" />
                                        Uploaded
                                    </div> :
                                    <Button type="button" onClick={getUploadPhoto}>Upload Photo</Button>}
                            </div>
                        </div>

                        <div className="flex gap-8">
                            <p className="text-orange-500 p-4 py-2 rounded-md w-fit text-[48px] font-bold">3</p>
                            <div>
                                <p className="text-lg font-bold mt-2">Initiate Onboarding</p>
                                <p className="mb-4">Click to start KYC onboarding process.</p>
                                {(uploadID && uploadPhoto) ? 
                                    <Dialog open={triggerKYC} onOpenChange={setTriggerKYC}>
                                        <DialogTrigger asChild>
                                            <Button type="button" onClick={getKYC}>Initiate KYC</Button> 
                                        </DialogTrigger>
                                    
                                        <DialogContent className="w-[1080px]">
                                            <DialogHeader>
                                                <DialogTitle>Customer Due Diligence</DialogTitle>
                                                <DialogDescription>
                                                    Summary of identity verification and risk screening results.
                                                </DialogDescription>
                                                <div className="py-10">
                                                    {loading ? <InlineLoader/> : 
                                                    <div>
                                                        <div className="flex gap-8">
                                                            <p className="text-orange-500 p-4 py-2 rounded-md w-fit text-[48px] font-bold">1</p>
                                                            <div>
                                                                <p className="text-md font-bold mt-2">Identity Verification Failed</p>
                                                                <p className="mb-4 text-sm">Potential mismatch detected: Date of birth differs from National Identity Database (15/02/1980 as per passport).</p>
                                                            </div>
                                                        </div>
                        
                                                        <div className="flex gap-8">
                                                            <p className="text-orange-500 p-4 py-2 rounded-md w-fit text-[48px] font-bold">2</p>
                                                            <div>
                                                                <p className="text-md font-bold mt-2">Sanctions Match Detected</p>
                                                                <p className="mb-4 text-sm">Potential match identified against sanctions or regulatory watchlists. Further review required.</p>
                                                                {account.articles.map((article)=>
                                                                (
                                                                    <a href={article.title} key={article._id} className="underline text-blue-500 hover:text-blue-600 text-sm">{article.title}</a>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        <div className="flex justify-center mt-4 text-sm">
                                                            {report ? 
                                                                (generate ? 
                                                                <p className="p-2 font-bold">Generating report...</p>: 
                                                                <div className="border rounded-md w-full p-4 space-y-2">
                                                                    <h1 className="font-bold">AI SAR</h1>
                                                                    <p>{account?.sarReport}</p>
                                                                </div> ) : 
                                                            <Button onClick={getReport}>Generate SAR</Button>}
                                                        </div>
                                                    </div>}
                                                </div>
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog> : 
                                    <p className="flex items-center gap-2 text-red-500">Upload Identity and photo to initiate KYC</p>}
                            </div>
                        </div>
                        
                    </div>
                    
                </div>
            </div>}
        </div>
    )
}

        

const Loader = () =>
{
    return(
        <div>
            <Suspense fallback={<>Loading...</>}>
                {/* <Details/> */}
                <UserAccount/>
            </Suspense>
        </div>
    )
}

export default Loader