import Image from "next/image"
import { ModeToggle } from "./ModeToggle"
import logo from '@/assets/logo.png'
import Link from "next/link"

const Navbar = () =>
{

    return(
        <Link href='/' className="flex justify-between p-4 border-b-2 cursor-pointerr">
            <Image src={logo} alt="FINTS360" width="100"/>
            <ModeToggle/>
        </Link>
    )
}

export default Navbar