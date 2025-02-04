import { Card } from "@/components/ui/card";
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const ArticleCard = ({article}) =>
{
    const pathname = usePathname();

    return(
        <Link href={`${pathname}/fincle/${article.title}`}>
            <Card className='p-4 text-sm space-y-2 flex gap-6'>
            <div className="h-24 w-fit">
                <Image className="w-48 h-24 object-cover  rounded-lg" src={article.coverImage} alt={article.title} width={100} height={100} />
            </div>
            <div className="flex flex-col justify-between w-full">
                <h1 className="font-bold text-md mb-2">{article.title}</h1>
                <p className="text-end text-gray-400 text-sm">{new Date(article.date).toDateString()}</p>
            </div>
            </Card>
        </Link>
    )
}

export default ArticleCard