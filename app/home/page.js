'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import web from '../../assets/web.png'
import personal from '../../assets/personal.png'
import transactionIcon from '../../assets/transactions.png'
import screening from '../../assets/screening.png'
import { toast } from "sonner";
import PieChartComponent from "../components/PieChartComponent";
import TransactionToolTip from "../components/TransactionToolTip";

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
      console.log(response)
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
      toast.error(error)
    }
    finally
    {
      setLoading(false);
    }
  }


  if(loading)
    return <Loader/>

  return (
    <div className="flex flex-col lg:gap-6 gap-4 text-sm">
      <div className="grid grid-cols-2 lg:grid-cols-4 lg:gap-6 gap-4">
        <Link href="/web">
          <Card className='lg:h-64 h-40 flex flex-col items-center justify-center lg:gap-4 gap-2'>
            <Image className="h-12 w-fit" src={web} alt='icon'/>
            <h2 className="text-base">Web search</h2>
          </Card>
        </Link>
        <Link href="/accounts">
          <Card className='lg:h-64 h-40 flex flex-col items-center justify-center lg:gap-4 gap-2'>
            <Image className="h-12 w-fit" src={personal} alt='icon'/>
            <h2 className="text-base">Accounts</h2>
          </Card>
        </Link>
        <Link href="">
          <Card className='lg:h-64 h-40 flex flex-col items-center justify-center lg:gap-4 gap-2' onClick={()=> toast.error('Access denied')}>
            <Image className="h-12 w-fit" src={transactionIcon} alt='icon'/>
            <h2 className="text-base">Transactions</h2>
          </Card>
        </Link>
        <Link href="/screen">
          <Card className='lg:h-64 h-40 flex flex-col items-center justify-center lg:gap-4 gap-2'>
            <Image className="h-12 w-fit" src={screening} alt='icon'/>
            <h2 className="text-base">Screen</h2>
          </Card>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {data && <div className="grid gap-4">
          <PieChartComponent data={data} xLabel="Type" yLabel="Count" title="Transaction Type" CustomTooltip={TransactionToolTip}/>
        </div>}

        <Card className="grid gap-4 p-6">
          <h2 className="text-lg font-bold text-center">Recent Transactions</h2>
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
        </Card>
        
      </div>
      
    </div>
  );
}
