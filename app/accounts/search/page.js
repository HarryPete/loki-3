'use client'

import PersonalCard from "@/app/components/PersonalCard";
import ProfileCrad from "@/app/components/ProfileCard";
import TransactionCard from "@/app/components/transactionCard";
import TransactionForm from "@/app/components/TransactionForm";
import { Button } from "@/components/ui/button";
import { maskAccountNumber } from "@/utility/maskAccountNumber";
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
    const [ credit, setCredit ] = useState(0) 

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

    console.log(transactions)


    if(loading)
        return

    return(
        <div className="w-full">
            {account && 
            <div className="w-full flex gap-8">
                <div className="w-full lg:w-[50%]">
                    {account.type === "Personal" ? <PersonalCard account={account}/> : <ProfileCrad account={account}/>}
                    
                    <div className="w-full mt-4 flex gap-6">
                        <div className="w-1/3 flex flex-col items-center border rounded p-4">
                            <p className="text-md font-medium">Credit</p>
                            <p className="text-xl mt-2 font-bold">${credit}</p>
                        </div>
                        <div className="w-1/3 flex flex-col items-center border rounded p-4">
                            <p className="text-md font-medium">Debit</p>
                            <p className="text-xl mt-2 font-bold">${debit}</p>
                        </div>
                        <div className="w-1/3 flex flex-col items-center border rounded p-4">
                            <p className="text-md font-medium">Balance</p>
                            <p className="text-xl mt-2 font-bold">${credit - debit}</p>
                        </div>
                    </div>

                    <Button className="mt-4 p-6 text-md w-full" onClick={()=> setShowTransactionForm(true)}>+ New Transaction</Button>
                </div>
                {transactions && 
                <div className="w-full lg:w-[50%] flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                    <table className="rounded border">
                        <thead className="border">
                            <tr>
                                <th className="border p-4">Date</th>
                                <th className="border p-4">Amount</th>
                                <th className="border p-4">Nature</th>
                                <th className="border p-4">Counter Party</th>
                                <th className="border p-4">Description</th>
                            </tr>
                        </thead>
                        
                    
                    {transactions.map((transaction)=>
                    (
                        <tbody className="p-2" key={transaction._id}>
                            <tr>
                                <td className="border text-center p-4">{new Date(transaction.date).toLocaleDateString()}</td>
                                <td className="border text-left p-4">${transaction.amount}</td>
                                <td className="border text-center p-4">{id === transaction.primaryAccount._id ? (transaction.type === 'Deposit' ? 'Self' : 'Payee') : 'Debit'}</td>
                                {transaction.primaryAccount._id !== transaction.counterParty._id ?
                                <td className="border text-center p-4">{id === transaction.primaryAccount._id ? transaction.counterParty.type === 'Personal' ? transaction.counterParty.personalDetails.firstname +' ' +transaction.counterParty.personalDetails.lastname : transaction.counterParty.entityDetails.name 
                                    : transaction.counterParty.type === 'Personal' ? transaction.counterParty.personalDetails.firstname +' ' +transaction.counterParty.personalDetails.lastname : transaction.counterParty.entityDetails.name }</td> : <td className="border text-center p-4"></td>}
                                <td className="border text-center p-4">{transaction.description}</td>
                            </tr>
                        </tbody>
                    ))}
                    </table>
                    </div>
                    
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