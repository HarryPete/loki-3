import signature from '@/assets/signature.png'
import Image from 'next/image'

const Rental = ({data}) =>
{

    return(
        <div className="w-[90vw] lg:w-[40vw] flex flex-col gap-8 border p-8 rounded bg-white text-black">

            <p className="text-lg font-bold">RENT AGREEMENT</p>
            <p>{`This Rental Agreement is entered into between the landlord, 
                and ${data.personalDetails.firstname +' ' +data.personalDetails.lastname}, the tenant, for the property located at ${data.personalDetails.rentalDetails.address.street +', ' +data.personalDetails.rentalDetails.address.city +', ' +data.personalDetails.rentalDetails.address.state +', ' +data.personalDetails.rentalDetails.address.country +' - ' +data.personalDetails.rentalDetails.address.zipcode}. 
                The rental term will begin on ${new Date(data.personalDetails.rentalDetails.startDate).toLocaleDateString()} 
                and end on ${new Date(data.personalDetails.rentalDetails.endDate).toLocaleDateString()}. `}</p>
            
            <p>{`The tenant agrees to pay a monthly rent of $${data.personalDetails.rentalDetails.monthlyRent}, 
                due on the 1st of each month. 
                The tenant is responsible for maintaining the property in good condition throughout the rental period 
                and adhering to the terms set by the landlord. Any damages or 
                necessary repairs should be promptly reported to the landlord.`}</p>

            <p>Additionally, the tenant agrees to comply with all applicable laws and regulations concerning the 
                property. The landlord reserves the right to inspect the premises with prior notice to ensure that 
                the terms of the agreement are being followed. In the event of non-payment or breach of terms, 
                the landlord may terminate the agreement as specified by local laws.</p>
                
            <div>
                <Image style={{width: '100px', height: '50px'}} src={signature} alt="data"/>
                <p className='mt-2'>{data.personalDetails.firstname +' ' +data.personalDetails.lastname}</p>
            </div>
        </div>
    )
}

export default Rental