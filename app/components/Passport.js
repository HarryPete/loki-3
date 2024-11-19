import Image from "next/image"
import personal from '@/assets/personal.png'
import signature from '@/assets/signature.png'
import { Button } from "@/components/ui/button"

const Passport = ({data, setShowPassport}) =>
{
    return(
        <div className="w-fit items-center flex border p-8 rounded-xl gap-6 bg-white text-black">
            <div>
                <Image style={{width: '100px', height: '100px'}} src={personal} alt="data"/>
                <Image className="border rounded p-2" style={{width: '100px', height: '50px'}} src={signature} alt="data"/>
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                    <p className="text-lg font-bold">PASSPORT AUTHORITY</p>
                    <div>
                        <p className="text-xs font-bold">PASSPORT NO</p>
                        <p className="text-sm pt-2">{data.personalDetails.passportDetails.passportNumber}</p>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div>
                        <p className="text-xs font-bold border-b pb-2">FIRSTNAME</p>
                        <p className="text-sm pt-2">{data.personalDetails.firstname}</p>
                    </div>
                    <div>
                        <p className="text-xs font-bold border-b pb-2 text-end">LASTNAME</p>
                        <p className="text-sm pt-2 text-end">{data.personalDetails.lastname}</p>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div>
                        <p className="text-xs font-bold border-b pb-2">DATE OF BIRTH</p>
                        <p className="text-sm pt-2">{new Date(data.personalDetails.dateOfBirth).toLocaleDateString()}</p>
                    </div>
                    <div>
                        <p className="text-xs font-bold border-b pb-2 text-end">COUNTRY</p>
                        <p className="text-sm pt-2 text-end">{data.personalDetails.passportDetails.countryOfIssue}</p>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div>
                        <p className="text-xs font-bold border-b pb-2">DATE OF ISSUE</p>
                        <p className="text-sm pt-2">{new Date(data.personalDetails.passportDetails.dateOfIssue).toLocaleDateString()}</p>
                    </div>
                    <div>
                        <p className="text-xs font-bold border-b pb-2 text-end">DATE OF EXPIRY</p>
                        <p className="text-sm pt-2 text-end">{new Date(data.personalDetails.passportDetails.dateOfExpiry).toLocaleDateString()}</p>
                    </div>
                </div>
                <div>
                    <p>{`P<${data.personalDetails.firstname.toUpperCase()}<${data.personalDetails.lastname.toUpperCase()}<<<<<<<<<<<<<<<<<<<`}</p>
                    <p>{'L898902C36UTO740159<<<<<<<<<<<<<<06'}</p>
                </div>
            </div>
        </div>
    )
}

export default Passport