import React from "react";
import Image from "next/image";
import logo from "@/assets/logo.png";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutGridDemo } from "./LayoutGridDemo";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const HeroSection = () => {
  const router = useRouter();

  return (
    <div>
      <section className="relative w-full h-[80vh] flex items-center justify-center bg-orange-100 text-stone-900">
        {/* Logo Animation */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="absolute top-8 left-8 flex flex-col items-center cursor-pointer"
        >
          <Link href="/home">
            <Image className="h-8 w-fit" src={logo} alt="FINTS360" width="100" />
          </Link>
        </motion.div>

        {/* Login Button Animation */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute right-8 top-8"
        >
          <Button onClick={() => router.push('/login')}>Login</Button>
        </motion.div>

        {/* Hero Content Animation */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
          className="max-w-4xl text-center space-y-10 pt-[10vh]"
        >
          <div className="space-y-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 1, delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold md:p-0 p-2"
            >
              Experience Financial Crime <span className="text-orange-600">Simulations</span> Like Never Before
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 1, delay: 0.5 }}
              className="text-base md:text-lg md:p-0 p-2"
            >
              🚀 Experience real-world simulations, enhance investigative skills, and stay ahead in financial crime detection.
            </motion.p>
          </div>

          {/* Button Animation */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-6"
          >
            <a
              href="https://www.fintsacademy.com"
              className="px-6 py-3 bg-orange-600 text-white md:text-base text-sm font-medium rounded-lg shadow-md hover:bg-orange-500 transition"
            >
              Explore
            </a>
          </motion.div>
        </motion.div>
      </section>

      <LayoutGridDemo />
    </div>
  );
};

export default HeroSection;
