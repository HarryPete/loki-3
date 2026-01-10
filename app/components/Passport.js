import Image from "next/image"
import personal from '@/assets/personal.png'
import signature from '@/assets/signature.png'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const Passport = ({data}) =>
{
    return(
        <Card className="space-y-4 p-4">
            <div className="flex justify-between">
                <p className="font-bold">PASSPORT AUTHORITY</p>
                <div className="text-sm text-right">
                    <p className="font-bold">Passport No</p>
                    <p>{data.personalDetails.passportDetails.passportNumber}</p>
                </div>
            </div>
            <div className="flex justify-between gap-6">
                <div className="space-y-2">
                    <Image src={data?.userDisplay ?? personal} width={100} height={100} alt="data"/>
                    <Image className="border rounded p-2" style={{width: '100px', height: '50px'}} src={signature} alt="data"/>
                </div>
                <div className="flex flex-col gap-4"> 
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
        </Card>
    )
}

export default Passport