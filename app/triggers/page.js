'use client'

import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const Triggers = () =>
{

    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/triggers/transaction-monitoring" className='h-64 cursor-pointer flex items-center justify-center bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-300'>
          <h2 className="text-xl font-medium">Transaction Monitoring</h2>
        </Link>
        <Link href="/accounts/kyc" className='h-64 cursor-pointer flex items-center justify-center bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-300'>
          <h2 className="text-xl font-medium">KYC</h2>
        </Link>
        <Link href="/triggers/screening" className='h-64 cursor-pointer flex items-center justify-center bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-300'>
          <h2 className="text-xl font-medium">Sanction Screening</h2>
        </Link>
      </div>
    )
} 

export default Triggers