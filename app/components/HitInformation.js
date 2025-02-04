import Link from "next/link"

function HitInformation({account, setActiveAccount}) 
{
    return(
        <div className="space-y-2 text-sm">
            <div>
                {account.type === 'Personal' ? 
                <div className="space-y-2 w-full">
                    <p><span className="font-bold">DOB : </span>{new Date(account.personalDetails.dateOfBirth).toLocaleDateString()}</p>
                    <p><span className="font-bold">Passport Number : </span>{account.personalDetails.passportDetails.passportNumber}</p>
                    <p><span className="font-bold">Country : </span>{account.personalDetails.passportDetails.countryOfIssue}</p>
                </div> :
                <div className="flex flex-col gap-4 w-full">
                    <p><span className="font-bold">Industry : </span>{account.entityDetails.industry}</p>
                    <p><span className="font-bold">Region : </span>{account.entityDetails.region}</p>
                </div>}
                <div>
                <div className="flex flex-col gap-4">
                    {account.articles.map((article)=>
                    (
                      <div key={article._id} className="flex flex-col justify-between gap-1">
                        <Link href={`/web/fincle/${article.title}`} className="underline text-blue-500" key={article._id}>{article.title.slice(0,50) +'...'}</Link>
                        <p><span className="font-bold">Source : </span>OFAC Black List</p>
                      </div>
                    ))}
                  </div>
                </div>
            </div>
        </div>
    )
}

export default HitInformation
