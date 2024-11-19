'use client'

import { transactionHistory } from "@/utility/transactionHistory";
import Link from "next/link";
import PieChartComponent from "./components/PieChartComponent";
import { chartData } from "@/utility/chartData";
import BarChartComponent from "./components/BarChartComponent";
import { useEffect, useState } from "react";
import TransactionToolTip from "./components/TransactionToolTip";
import axios from "axios";

export default function Home() 
{

  const [ data, setData ] = useState(null);
  const [ transactions, setTransactions ] = useState(null);
  const [ loading, setLoading ] = useState(true)

	useEffect(()=>
	{
    // getTransactions();
		const pieData = [];
		transactionHistory.forEach((transaction)=>
    	{
        	const type = transaction.type;
        	const existingType = pieData.find((record) => record.Type === type);
        	if(existingType)
           		existingType.Count += 1;
        	else
            	pieData.push({ Type: type, Count: 1})
    	});
		setData(pieData);
	},[])

  const getTransactions = async () =>
  {
    try
    {
      const url = '/api/transactions'
      const response = await axios.get(url);
      console.log(response.data)
      // const sortedTransactions = response.data.sort((a,b)=> new Date(b.date) - new Date(a.date)).slice(0,5);
      setTransactions(sortedTransactions);
      
    }
    catch(error)
    {
      console.log(error)
    }
    finally
    {
      setLoading(false);
    }
  }

  console.log(transactions)


  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/search" className='h-64 cursor-pointer flex items-center justify-center bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-300'>
          <h2 className="text-xl font-medium">Web search</h2>
        </Link>
        <Link href="/accounts" className='h-64 cursor-pointer flex items-center justify-center bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-300'>
          <h2 className="text-xl font-medium">Accounts</h2>
        </Link>
        <Link href="/transactions" className='h-64 cursor-pointer flex items-center justify-center bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-300'>
          <h2 className="text-xl font-medium">Transactions</h2>
        </Link>
        <Link href="/screen" className='h-64 cursor-pointer flex items-center justify-center bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-300'>
          <h2 className="text-xl font-medium">Screen</h2>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {data && <div className="grid gap-4">
          <PieChartComponent data={data} xLabel="Type" yLabel="Count" title="Transaction Type" CustomTooltip={TransactionToolTip}/>
        </div>}

        <div className="grid gap-4 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-300">
          <h2 className="text-xl font-bold text-center">Recent Transactions</h2>
          <div className="grid gap-4">
            {/* {transactions.map((transaction)=>
            (
              <Link href="/transactions" key={transaction.from} className='h-18 flex flex-col gap-1 cursor-pointer'>
                <div className="flex items-center justify-between">
                  
                  <p>${transaction.amount}</p>
                </div>
                <p className="text-gray-400 text-sm">{transaction.description}</p>
              </Link>
            ))} */}
          </div>
        </div>
        
      </div>
      
    </div>
  );
}
