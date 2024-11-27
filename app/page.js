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
  const [ loading, setLoading ] = useState(true);

	useEffect(()=>
	{
    getTransactions();
		
	},[])

  const getTransactions = async () =>
  {
    try
    {
      const url = '/api/transactions'
      const response = await axios.get(url);
      const sortedTransactions = response.data.sort((a,b)=> new Date(b.date) - new Date(a.date)).slice(0,4);
      setTransactions(sortedTransactions);

      const pieData = [];
		  response.data.forEach((transaction)=>
    	{
        	const type = transaction.type;
        	const existingType = pieData.find((record) => record.Type === type);
        	if(existingType)
           		existingType.Count += 1;
        	else
            	pieData.push({ Type: type, Count: 1})
    	});
		  setData(pieData);
      
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

  if(loading)
    return

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/web" className='h-64 cursor-pointer flex items-center justify-center bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-300'>
          <h2 className="text-xl font-medium">Web search</h2>
        </Link>
        <Link href="/accounts" className='h-64 cursor-pointer flex items-center justify-center bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-300'>
          <h2 className="text-xl font-medium">Accounts</h2>
        </Link>
        {/* <Link href="/transactions" className='h-64 cursor-pointer flex items-center justify-center bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-300'>
          <h2 className="text-xl font-medium">Transactions</h2>
        </Link> */}
        <Link href="" className='h-64 cursor-pointer flex items-center justify-center bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-300'>
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
            {transactions.map((transaction)=>
            (
              <Link href="/transactions" key={transaction._id} className='h-18 flex justify-between gap-1 cursor-pointer'>
                <div className="flex flex-col ">
                  <p>{transaction.primaryAccount.accountName}</p>
                  <p className="text-gray-400 text-sm">{transaction.description}</p>
                </div>
                <div>
                    <p className="text-end">${transaction.amount}</p>
                    <p className="text-gray-400 text-sm text-end">{transaction.type}</p>
                  </div>
              </Link>
            ))}
          </div>
        </div>
        
      </div>
      
    </div>
  );
}
