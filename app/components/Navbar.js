import Image from "next/image"
import logo from '@/assets/logo.png'
import Link from "next/link"

const Navbar = () =>
{

    return(
        <Link href='/home' className="flex items-center justify-between p-4 border-b-2 cursor-pointer">
            <Image  className="h-6 w-fit" src={logo} alt="FINTS360" width="100"/>
        </Link>
    )
}

export default Navbar