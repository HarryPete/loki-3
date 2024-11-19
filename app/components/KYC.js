import signature from '@/assets/signature.png'
import Image from 'next/image'

const KYC = ({data}) =>
{

    return(
        <div className="w-[40vw] flex flex-col border p-8 rounded-xl gap-6 bg-white text-black">
            
                <div className='w-full flex justify-between border-b-2 pb-4'>
                    <h1 className="text-red-600 font-bold text-2xl">KYC</h1>
                    <h1 className="font-bold text-lg">Verified</h1>
                </div>
                <div className='flex'>
                    <div className='w-[50%]'>
                        <p className="font-semibold">FIRSTNAME</p>
                        <p className="pt-2">{data.personalDetails.firstname}</p>
                    </div>
                    <div>
                        <p className="font-semibold">LASTNAME</p>
                        <p className="pt-2">{data.personalDetails.lastname}</p>
                    </div>
                </div>

                <div className='flex'>
                    <div className='w-[50%]'>
                        <p className="font-semibold">DOB</p>
                        <p className="pt-2">{new Date(data.personalDetails.dateOfBirth).toLocaleDateString()}</p>
                    </div>
                    <div>
                        <p className="font-semibold">GENDER</p>
                        <p className="pt-2">{data.personalDetails.gender[0]}</p>
                    </div>
                </div>
                
                <div className='flex'>
                    <div className='w-[50%]'>
                        <p className="font-semibold">ANNUAL INCOME</p>
                        <p className="pt-2">${data.personalDetails.annualIncome}</p>
                    </div>
                    <div>
                        <p className="font-semibold">OCCUPATION</p>
                        <p className="pt-2">{data.personalDetails.occupation}</p>
                    </div>
                </div>

                <div className='flex'>
                    <div className='w-[50%]'>
                    <p className="font-semibold">ORGANISATION</p>
                    <p className="pt-2">{data.personalDetails?.organisation?.name ?? '-'}</p>
                </div>
                    <div>
                        <p className="font-semibold">CONTACT</p>
                        <p className="pt-2">{data.contact}</p>
                    </div>
                </div>

                <div>
                    <p className="font-semibold">EMAIL</p>
                    <p className="pt-2">{data.email}</p>
                </div>

                <div>
                    <p className="font-semibold">ADDRESS</p>
                    <p className="pt-2">{data.personalDetails.rentalDetails.address.street +', ' +data.personalDetails.rentalDetails.address.city +', ' +data.personalDetails.rentalDetails.address.state +', ' +data.personalDetails.rentalDetails.address.country +' - ' +data.personalDetails.rentalDetails.address.zipcode}</p>
                </div>
                <div>
                    <Image style={{width: '100px', height: '50px'}} src={signature} alt="data"/>
                    <p className="pt-2">{data.personalDetails.firstname +' ' +data.personalDetails.lastname}</p>
                </div>
        </div>
    )
}

export default KYC
