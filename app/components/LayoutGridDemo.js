"use client";

import accounts from '@/assets/accounts.png'
import screen from '@/assets/screen.png'
import websearch from '@/assets/websearch.png'
import transactions from '@/assets/account-transactions.png'
import rfi from '@/assets/rfi.png'
import hits from '@/assets/hits.png'
import { LayoutGrid } from "@/components/ui/layout-grid";
import React from "react";

export function LayoutGridDemo() {
  return (
    (<div className="h-screen py-12 w-full">
      <h1 className='md:px-[10vw] px-[5vw] py-6 lg:text-3xl md:text-xl text-lg text-center font-semibold'>Key Features of Our FinCrime Simulation Tool</h1>
      <LayoutGrid cards={cards} />
    </div>)
  );
}

const SkeletonOne = () => {
  return (
    (<div>
      <p className="font-bold md:text-4xl text-xl text-white">
        User Account
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        View transactions, complete KYC with document uploads, and respond to RFIs.
      </p>
    </div>)
  );
};

const SkeletonTwo = () => {
  return (
    (<div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Screening Tool 
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
       Perform advanced checks for risk assessment.
      </p>
    </div>)
  );
};
const SkeletonThree = () => {
  return (
    (<div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Web Search
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Investigate entities with real-time data.
      </p>
    </div>)
  );
};
const SkeletonFour = () => {
  return (
    (<div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Transaction Activities
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Analyze all financial movements seamlessly.
      </p>
    </div>)
  );
};
const SkeletonFive = () => {
  return (
    (<div>
      <p className="font-bold md:text-4xl text-xl text-white">
      Hits List
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Quickly review flagged entities, transactions, or accounts based on screening results.
      </p>
    </div>)
  );
};
const SkeletonSix = () => {
  return (
    (<div>
      <p className="font-bold md:text-4xl text-xl text-white">
      RFI Management
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Easily send and track RFIs to gather additional details from users, ensuring compliance and thorough risk assessment.      </p>
    </div>)
  );
};

const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: "md:col-span-2",
    thumbnail: accounts
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail: screen
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail: websearch
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2",
    thumbnail:
    transactions
  },
  {
    id: 5,
    content: <SkeletonFive />,
    className: "md:col-span-2",
    thumbnail:
    hits
  },
  {
    id: 6,
    content: <SkeletonSix />,
    className: "md:col-span-1",
    thumbnail:
    rfi
  },
];
