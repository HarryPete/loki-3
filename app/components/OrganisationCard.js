const OrganisationCard = ({data}) =>
{

    return(
        <div className="w-fit items-center flex flex-col border p-8 rounded-xl gap-6 bg-white text-black">
            <div className="flex flex-col gap-2">
                <p className="text-xl font-semibold">{data.entityDetails.name}</p>
                <p>{data.email}</p>
                <p>{data.contact}</p>
                <p>{data.entityDetails.address.street +', ' +data.entityDetails.address.city +', ' +data.entityDetails.address.state +', ' +data.entityDetails.address.country +' - ' +data.entityDetails.address.zipcode}</p>
            </div>
            <div className="border w-full rounded flex flex-col items-center p-4">
                <p>Risk Score</p>
                <p className="font-bold text-3xl">{Math.ceil((data.entityDetails.industryRating+data.entityDetails.productRating+data.entityDetails.regionRating)/3)}</p>
            </div>
        </div>
    )
}

export default OrganisationCard