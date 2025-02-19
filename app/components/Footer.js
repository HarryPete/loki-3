import fints from '@/assets/fints.png'
import logo from '@/assets/logo.png'
import fintsaml from '@/assets/fintsaml.png'
import email from '@/assets/email.png'
import linkedin from '@/assets/linkedin.png'
import instagram from '@/assets/instagram.png'
import youtube from '@/assets/youtube.png'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const fadeInVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { triggerOnce: true, threshold: 0.2 });

  return (
    <div className='p-4 mt-12'>
      <motion.div
        ref={ref}
        initial='hidden'
        animate={isInView ? 'visible' : 'hidden'}
        variants={fadeInVariant}
        className='px-[10vw] space-y-12 rounded-xl justify-center py-20 md:text-sm text-xs bg-orange-300 text-black'
        
      >
        <div className='grid lg:grid-cols-2 grid-cols-1 gap-6'>
          <motion.div variants={fadeInVariant} className='space-y-8'>
            <div className='flex flex-col sm:flex-row items-center gap-6 text-base'>
              <a href='mailto:contact@yoursaas.ai' className='hover:text-blue-400  transition-colors'>
                admin@fintsacademy.com
              </a>
              <span className='hidden sm:inline'>•</span>
              <div className='flex gap-4 items-center'>
                <a href='https://www.linkedin.com/in/lokesh-naik-amltrustedsource/' target='_blank'>
                  <Image className='h-8 w-8' src={linkedin} alt='linkedin' />
                </a>
                <a href='https://www.youtube.com/@FinTS_lokesh' target='_blank'>
                  <Image className='h-8 w-8' src={youtube} alt='youtube' />
                </a>
                <a href='https://www.instagram.com/fints.aml/' target='_blank'>
                  <Image className='h-8 w-8' src={instagram} alt='instagram' />
                </a>
              </div>
            </div>
          </motion.div>
          <div>
          <div className='flex md:justify-end items-center justify-center gap-6'>
            <Image className='h-7 w-fit' src={fints} alt='instagram' />
            <Image className='h-7 w-fit' src={logo} alt='instagram' />
            <Image className='h-7 w-fit' src={fintsaml} alt='instagram' />
          </div>
          </div>
        </div>
        <motion.div variants={fadeInVariant} className='flex flex-col justify-center items-center gap-4 py-8'>
          {/* <h1 className='md:text-5xl text-3xl lg:text-7xl font-bold text-center relative z-20'>
            Fints 360
          </h1> */}
          <p className='text-center leading-loose  text-base'>
            © 2024 FinCrime Compliance Education & Consultancy. All rights reserved.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Footer;