const RiskScorecard = ({account}) =>
{

    return(
        <div className="text-sm grid grid-cols-2 gap-4">
            <h1 className="font-bold flex items-center justify-center rounded-lg bg-gray-50 text-4xl">{Math.floor((account.entityDetails.industryRating + account.entityDetails.productRating + account.entityDetails.regionRating)/3)}</h1>
            <div className="space-y-1">
                <p className="py-1 text-md"><span className="font-bold">Industry:</span> {account.entityDetails.industry}</p>
                <p className="py-1 text-md"><span className="font-bold">Product: </span>{account.entityDetails.product}</p>
                <p className="py-1 text-md"><span className="font-bold">Country: </span>{account.entityDetails.region}</p>
            </div>     
        </div>
      )
    }
    
export default RiskScorecard
