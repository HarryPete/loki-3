const RiskScorecard = ({account}) =>
{

    return(
        <div className="w-[35vw] flex flex-col items-center justify-center gap-6 bg-white p-4 rounded dark:text-black">
            <h1 className="text-2xl font-bold text-center mt-4">Risk Score</h1>
            <h1 className="font-bold p-4 px-7 border rounded-full text-4xl">{Math.floor((account.entityDetails.industryRating + account.entityDetails.productRating + account.entityDetails.regionRating)/3)}</h1>
            <div className="flex flex-wrap gap-2">
                <p className="py-1 text-md"><span className="font-bold">Industry:</span> {account.entityDetails.industry}</p>
                <p className="py-1 text-md"><span className="font-bold">Product: </span>{account.entityDetails.product}</p>
                <p className="py-1 text-md"><span className="font-bold">Country: </span>{account.entityDetails.region}</p>
            </div>     
        </div>
      )
    }
    
export default RiskScorecard
