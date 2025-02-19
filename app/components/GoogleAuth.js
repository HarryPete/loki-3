import Image from 'next/image'
import google from '@/assets/google.png'
import { signIn } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'

const GoogleAuth = () =>
{
    const pathname = usePathname();
    const callbackUrl = pathname || '/dashboard'

    const handleClick = () =>
    {
        signIn('google', { callbackUrl });
    }

    return(
        <div className='flex justify-center gap-4 w-full' onClick={handleClick}> 
            <Button className='min-w-full'><Image className='h-4 w-fit' src={google} alt='google' />Sign in with Google</Button>
        </div>
    )
}

export default GoogleAuth