import Image from "next/image"
import personal from '@/assets/personal.png'
import signature from '@/assets/signature.png'
import { Button } from "@/components/ui/button"

const Passport = ({data, setShowPassport}) =>
{
    return(
        <div className="w-fit items-center flex gap-6">
            <div className="w-[30%] space-y-2">
                <Image style={{width: '100px', height: '100px'}} src={personal} alt="data"/>
                <Image className="border rounded p-2" style={{width: '100px', height: '50px'}} src={signature} alt="data"/>
            </div>
            <div className="w-[70%] flex flex-col gap-4">
                
                <div className="flex justify-between">
                    <div className="space-y-1">
                        <p className="text-xs font-bold">FIRSTNAME</p>
                        <p className="text-sm">{data.personalDetails.firstname}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs font-bold text-end">LASTNAME</p>
                        <p className="text-sm text-end">{data.personalDetails.lastname}</p>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="space-y-1">
                        <p className="text-xs font-bold">DATE OF BIRTH</p>
                        <p className="text-sm">{new Date(data.personalDetails.dateOfBirth).toLocaleDateString()}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs font-bold text-end">COUNTRY</p>
                        <p className="text-sm text-end">{data.personalDetails.passportDetails.countryOfIssue}</p>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="space-y-1">
                        <p className="text-xs font-bold">DATE OF ISSUE</p>
                        <p className="text-sm">{new Date(data.personalDetails.passportDetails.dateOfIssue).toLocaleDateString()}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs font-bold text-end">DATE OF EXPIRY</p>
                        <p className="text-sm text-end">{new Date(data.personalDetails.passportDetails.dateOfExpiry).toLocaleDateString()}</p>
                    </div>
                </div>
                <div className="text-sm">
                    <p>{`P<${data.personalDetails.firstname.toUpperCase()}<${data.personalDetails.lastname.toUpperCase()}<<<<<<<<<<<<<<<<<<<`}</p>
                    <p>{'L898902C36UTO740159<<<<<<<<<<<<<<06'}</p>
                </div>
            </div>
        </div>
    )
}

export default Passport