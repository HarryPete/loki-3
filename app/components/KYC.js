import signature from '@/assets/signature.png'
import Image from 'next/image'

const KYC = ({data}) =>
{

    return(
        <div className="text-sm space-y-4">
                <div className='flex'>
                    <div className='w-[50%] space-y-1'>
                        <p className="font-semibold">First Name</p>
                        <p className="">{data.personalDetails.firstname}</p>
                    </div>
                    <div className='space-y-1'>
                        <p className="font-semibold">Last Name</p>
                        <p className="">{data.personalDetails.lastname}</p>
                    </div>
                </div>

                <div className='flex'>
                    <div className='w-[50%] space-y-1'>
                        <p className="font-semibold">DOB</p>
                        <p className="">{new Date(data.personalDetails.dateOfBirth).toLocaleDateString()}</p>
                    </div>
                    <div className='space-y-1'>
                        <p className="font-semibold">Gender</p>
                        <p className="">{data.personalDetails.gender[0]}</p>
                    </div>
                </div>
                
                <div className='flex'>
                    <div className='w-[50%] space-y-1'>
                        <p className="font-semibold">Annual Income</p>
                        <p className="">${data.personalDetails.annualIncome}</p>
                    </div>
                    <div className='space-y-1'>
                        <p className="font-semibold">Occupation</p>
                        <p className="">{data.personalDetails.occupation}</p>
                    </div>
                </div>

                <div className='flex'>
                    <div className='w-[50%] space-y-1'>
                    <p className="font-semibold">Organisation</p>
                    <p className="">{data.personalDetails?.organisation?.name ?? '-'}</p>
                </div>
                    <div className='space-y-1'>
                        <p className="font-semibold">Contact</p>
                        <p className="">{data.contact}</p>
                    </div>
                </div>

                <div>
                    <p className="font-semibold">Email</p>
                    <p className="">{data.email}</p>
                </div>

                {data.personalDetails.holdings?.length > 0 &&
                <div>
                    <p className="font-semibold">Holdings</p>
                    <div className='flex flex-col gap-2 '>
                    {data.personalDetails.holdings.map((holding)=>
                        <p>{holding.description === "Trustee" ? ' Trustee, ' : holding.equity +'%, '}<span className='font-bold'>{holding.entity.name}</span></p>
                    )}
                    </div>
                </div>}

                <div>
                    <p className="font-semibold">Address</p>
                    <p className="">{data.personalDetails.rentalDetails.address.street +', ' +data.personalDetails.rentalDetails.address.city +', ' +data.personalDetails.rentalDetails.address.state +', ' +data.personalDetails.rentalDetails.address.country +' - ' +data.personalDetails.rentalDetails.address.zipcode}</p>
                </div>
                <div className='pt-8'>
                    <Image className='h-10 w-fit' src={signature} alt="data"/>
                    <p className="">{data.personalDetails.firstname +' ' +data.personalDetails.lastname}</p>
                </div>
        </div>
    )
}

export default KYC
