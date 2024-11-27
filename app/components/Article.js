import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const ArticleCard = ({article}) =>
{
    const pathname = usePathname();

    return(
        <Link href={`${pathname}/fincle/${article.title}`} className="border p-2 rounded flex gap-4 w-full">
            <div className="h-24 w-fit">
                <Image className="w-48 h-24 object-cover" src={article.coverImage} alt={article.title} width={100} height={100} />
            </div>
            <div className="flex flex-col justify-between w-full">
                <h1 className="font-bold text-md mb-2">{article.title}</h1>
                <p className="text-end text-gray-400 text-sm">{new Date(article.date).toDateString()}</p>
            </div>
        </Link>
    )
}

export default ArticleCard