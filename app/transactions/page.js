'use client'

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";

const Transactions = () =>
{
    const [ transactions, setTransactions ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const transactionsPerPage = 10;
    const totalPages = Math.ceil(transactions?.length/transactionsPerPage);
    const [ currentPage, setCurrentPage ] = useState(0);
    const lowerLimit = currentPage*transactionsPerPage;
    const upperLimit = transactionsPerPage + lowerLimit;
    const topTransactions = transactions?.slice(lowerLimit, upperLimit);

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
            const sortedTransactions = response.data.sort((a,b)=> new Date(b.date) - new Date(a.date));
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

    if(loading)
        return

    return(
        <div className="w-full flex flex-col gap-4">
            <table className="w-full">
            <thead className="bg-gray-100 text-black">
                <tr>
                    <th className="p-4 border">Date</th>
                    <th className="p-4 border">Primary Account</th>
                    <th className="p-4 border">Transaction Type</th>
                    <th className="p-4 border">Counter Party</th>
                    <th className="p-4 border">Amount</th>
                    <th className="p-4 border">Description</th>
                </tr>
            </thead>
            <tbody>
            {topTransactions.map((transaction)=>
            (
                <tr className="text-center border" key={transaction._id}>
                    <td className="p-4 border">{new Date(transaction.date).toLocaleDateString()}</td>
                    <td className="p-4 border">{transaction.primaryAccount.accountName}</td>
                    <td className="p-4 border">{transaction.type}</td>
                    <td className="p-4 border">{transaction.counterParty.accountName}</td>
                    <td className="p-4 border text-right">${transaction.amount}</td>
                    <td className="p-4 border">{transaction.description}</td>
                </tr>
            ))}
            </tbody>
        </table>
            <div className="w-full flex justify-end gap-2">
                {currentPage !== 0 && <Button onClick={()=> setCurrentPage((prev)=> prev-1)}>Prev</Button>}
                {currentPage !== totalPages-1 && <Button onClick={()=> setCurrentPage((prev)=> prev+1)}>Next</Button>}
            </div>
        </div>
    )
} 

export default Transactions