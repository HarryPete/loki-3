import Link from "next/link"

export const SocialAnalysis = ({account}) =>
{
    return(
        <>
            {account.articles.length ? account.articles.map((article)=>
            (
                <div key={article._id} className="flex flex-col justify-between gap-2 bg-gray-50 rounded-md p-4">
                    <Link href={`/web/fincle/${article.title}`} className="underline text-blue-500" key={article._id}>{article.title}</Link>
                    <p className="text-sm">FINTS article | {new Date(article.updatedAt).toLocaleDateString()}</p>
                </div>
            )) : <p className="text-center p-4 text-[20px] font-bold text-orange-500">No references found</p>}
        </>
    )
}