'use client'

import MOAForm from "@/app/components/MOAForm";
import PersonalCard from "@/app/components/PersonalCard";
import ProfileCrad from "@/app/components/ProfileCard";
import TradeForm from "@/app/components/TradeForm";
import TransactionForm from "@/app/components/TransactionForm";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";

const Search = ()  =>
{
    const params = useSearchParams();
    const [ showTransactionForm, setShowTransactionForm ] = useState(false);
    const [ loading, setLoading ] = useState(true)
    const id = params.get('accNo') || null
    const [ account, setAccount ] = useState(null);
    const [ transactions, setTransactions ] = useState(null);
    const [ debit, setDebit ] = useState(0);
    const [ credit, setCredit ] = useState(0);
    const [ showMOAForm, setShowMOAForm ] = useState(false); 
    const [ showTradeForm, setShowTradeForm ] = useState(false); 
    const [ showTransactions, setShowTransactions ] = useState(false)

    useEffect(()=>
    {
        if(id)
            getAccount();
    },[])

    async function getAccount()
    {
        try
        {
            const url = `/api/account/${id}`
            const response = await axios.get(url, 
                {
                    headers: 
                    {
                        'Cache-Control': 'no-cache'
                    }
                }
            );
            setAccount(response.data);
            const sortedTransactions = response.data.transactions.sort((a,b)=> new Date(a.date) - new Date(b.date));
            setTransactions(sortedTransactions);
            let credits = 0;
            let debits = 0;
            response.data.transactions.forEach((transaction)=>
            {
                if(id === transaction.primaryAccount && transaction.type !== 'Deposit')
                    debits += transaction.amount
                else
                    credits += transaction.amount
            })

            setDebit(debits);
            setCredit(credits)
        }
        catch(error)
        {
            toast(error);
        }
        finally
        {
            setLoading(false);
        }
    }

    console.log(account)


    if(loading)
        return

    return(
        <div className="w-full">
            {account && 
            <div className="w-full flex gap-8">
                <div className="w-full lg:w-[50%]">
                    {account.type === "Personal" ? <PersonalCard account={account}/> : <ProfileCrad account={account}/>}
                    
                    <div className="w-full mt-4 flex gap-6">
                        <div className="w-1/3 flex flex-col items-center border rounded p-3">
                            <p className="text-md font-medium">Credit</p>
                            <p className="text-xl mt-2 font-bold">${credit}</p>
                        </div>
                        <div className="w-1/3 flex flex-col items-center border rounded p-3">
                            <p className="text-md font-medium">Debit</p>
                            <p className="text-xl mt-2 font-bold">${debit}</p>
                        </div>
                        <div className="w-1/3 flex flex-col items-center border rounded p-3">
                            <p className="text-md font-medium">Balance</p>
                            <p className="text-xl mt-2 font-bold">${credit - debit}</p>
                        </div>
                    </div>

                    {/* <Button className="mt-4 p-6 text-md w-full" onClick={()=> setShowMOAForm(true)}>Edit MOA</Button>
                    <Button className="mt-4 p-6 text-md w-full" onClick={()=> setShowTradeForm(true)}>Edit Trade Licence</Button>
                    <Button className="mt-4 p-6 text-md w-full" onClick={()=> setShowTransactionForm(true)}>+ New Transaction</Button> */}
                </div>
                {transactions.length>0 ?
                <div className="w-full lg:w-[50%] flex flex-col gap-4">
                    <Button className="p-6 text-md w-full" onClick={()=> setShowTransactions(!showTransactions)}>{showTransactions ? 'Hide' : 'View Transactions'}</Button>
                    {showTransactions &&
                    <div className="flex flex-col gap-2">
                    <table className="rounded border">
                        <thead className="border">
                            <tr>
                                <th className="border p-6">Date</th>
                                <th className="border p-6">Amount</th>
                                <th className="border p-6">Type</th>
                                <th className="border p-6">Counterparty</th>
                                <th className="border p-6">Description</th>
                            </tr>
                        </thead>
                        
                    
                    {transactions.map((transaction, index)=>
                    (
                        <tbody className="p-2" key={transaction._id}>
                            <tr>
                                <td className={`border text-center p-3 ${index%2 === 0 && 'bg-gray-100 dark:text-black'}`}>{new Date(transaction.date).toLocaleDateString()}</td>
                                <td className={`border text-center p-3 ${index%2 === 0 && 'bg-gray-100 dark:text-black'}`}>${transaction.amount}</td>
                                <td className={`border text-center p-3 ${index%2 === 0 && 'bg-gray-100 dark:text-black'}`}>{id === transaction.primaryAccount._id ? (transaction.type === 'Deposit' ? 'Self' : 'Debit') : 'Payee'}</td>
                                
                                <td className={`border text-center p-3 ${index%2 === 0 && 'bg-gray-100 dark:text-black'}`}>{id === transaction.primaryAccount._id ? (id === transaction.counterParty._id ? '' : transaction.counterParty.accountName) : transaction.primaryAccount.accountName }</td>
                                <td className={`border text-center p-3 ${index%2 === 0 && 'bg-gray-100 dark:text-black'}`}>{transaction.description}</td>
                            </tr>
                        </tbody>
                    ))}
                    </table>
                </div>}
                </div>: <p className="w-full lg:w-[50%] text-gray-400 italic text-2xl text-center">No Transactions</p>}

                {showMOAForm && 
                <div className="h-[100vh] w-full fixed left-0 top-0 flex items-center justify-center" style={{backgroundColor:'rgba(0,0,0,0.7'}}>
                    <MOAForm account={account} setShowMOA={setShowMOAForm}/>
                </div>}

                {showTradeForm && 
                <div className="h-[100vh] w-full fixed left-0 top-0 flex items-center justify-center" style={{backgroundColor:'rgba(0,0,0,0.7'}}>
                    <TradeForm id={account.entityDetails._id} setShowTradeForm={setShowTradeForm}/>
                </div>}
                
                {showTransactionForm && 
                <div className="h-[100vh] w-full fixed left-0 top-0 flex items-center justify-center" style={{backgroundColor:'rgba(0,0,0,0.7'}}>
                    <TransactionForm id={id} getAccount={getAccount} setShowTransactionForm={setShowTransactionForm}/>
                </div>}
            </div>}
        </div>
    )
}

const Loader = () =>
{
    return(
        <div>
            <Suspense fallback={<>Loading...</>}>
                <Search/>
            </Suspense>
        </div>
    )
}

export default Loader