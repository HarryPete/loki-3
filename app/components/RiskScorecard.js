const RiskScorecard = ({account}) =>
{

    return(
        <div className="space-y-4 text-sm">
            <h1 className="font-bold flex items-center justify-center rounded-lg bg-orange-500 text-white h-44 text-[64px]">{Math.floor((account.entityDetails.industryRating + account.entityDetails.productRating + account.entityDetails.regionRating)/3)}</h1>
            <div className="space-y-2">
                <p className="py-1 text-md flex flex-col items-center"><span className="font-bold">Industry </span> {account.entityDetails.industry}</p>
                <p className="py-1 text-md flex flex-col items-center"><span className="font-bold">Product </span>{account.entityDetails.product}</p>
                <p className="py-1 text-md flex flex-col items-center"><span className="font-bold">Country </span>{account.entityDetails.region}</p>
            </div>     
        </div>
      )
    }
    
export default RiskScorecard
