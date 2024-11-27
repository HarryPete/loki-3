import Link from "next/link"

function HitInformation({account, setActiveAccount}) 
{
    console.log(account);

    return(
        <div className="w-[40vw] bg-white p-8 rounded relative">
            <h1 className="text-xl font-bold text-red-600 mb-3">Hit Information</h1>
            <div className="flex flex-col gap-4">
                {account.type === 'Personal' ? 
                <div className="flex flex-col gap-4 w-full">
                    <p><span className="font-bold">DOB : </span>{new Date(account.personalDetails.dateOfBirth).toLocaleDateString()}</p>
                    <p><span className="font-bold">Passport Number : </span>{account.personalDetails.passportDetails.passportNumber}</p>
                    <p><span className="font-bold">Country : </span>{account.personalDetails.passportDetails.countryOfIssue}</p>
                    {account.personalDetails.isPEP === "No" && <p className="text-center italic font-bold bg-green-500 w-full p-2 rounded text-white"><span>No Hit Found </span></p>}
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
                  
                <button className="absolute top-6 right-6 text-black text-2xl font-bold" onClick={()=> setActiveAccount(null)}>X</button>
                </div>
            </div>
        </div>
    )
}

export default HitInformation
