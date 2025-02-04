'use client'

import Loader from "@/app/components/Loader";
import MOAForm from "@/app/components/MOAForm";
import PersonalCard from "@/app/components/PersonalCard";
import ProfileCrad from "@/app/components/ProfileCard";
import TradeForm from "@/app/components/TradeForm";
import TransactionForm from "@/app/components/TransactionForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
    const [ showReferralInfo, setShowReferralInfo ] = useState(false);
    const [ info, setInfo ] = useState('')

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
            const response = await axios.get(url);
            setAccount(response.data);
            const sortedTransactions = response.data.transactions.sort((a,b)=> new Date(a.date) - new Date(b.date));
            setTransactions(sortedTransactions);
            let credits = 0;
            let debits = 0;

            response.data.transactions.forEach((transaction)=>
            {
                if(transaction.type === 'Deposit')
                    credits += transaction.amount
                else if(id === transaction.primaryAccount._id)
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

    if(loading)
        return <Loader/>

    return(
        <div className="w-full">
            {account && 
            <div className="w-full flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-[50%] space-y-4">
                    {account.type === "Personal" ? <PersonalCard account={account}/> : <ProfileCrad account={account}/>}
                    
                    <div className="grid grid-cols-3 gap-4">
                        <Card className="space-y-2 text-center p-4">
                            <p className="text-muted-foreground">Credit</p>
                            <p className="text-base font-semibold">${credit}</p>
                        </Card>
                        <Card className="space-y-2 text-center p-4">
                            <p className="text-muted-foreground">Debit</p>
                            <p className="text-base font-semibold">${debit}</p>
                        </Card>
                        <Card className="space-y-2 text-center p-4">
                            <p className="text-muted-foreground">Balance</p>
                            <p className="text-base font-semibold">${credit - debit}</p>
                        </Card>
                    </div>

                    {/* {account.type === 'Entity' && <div className="space-x-2">
                    <Dialog>
                    <DialogTrigger asChild>
                    <Button>Update Transactions</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Transact Now</DialogTitle>
                        <DialogDescription>
                            {account.entityDetails.name}
                        </DialogDescription>
                        <TransactionForm id={id} getAccount={getAccount} setShowTransactionForm={setShowTransactionForm}/>
                    </DialogHeader>
                    
                    </DialogContent>
                    </Dialog>

                    <Dialog>
                    <DialogTrigger asChild>
                    <Button>Update Trade Licence</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Trade Licence</DialogTitle>
                        <DialogDescription>
                            {account.entityDetails.name}
                        </DialogDescription>
                    </DialogHeader>
                        <TradeForm id={account.entityDetails._id} setShowTradeForm={setShowTradeForm}/>
                    </DialogContent>
                    </Dialog>

                    <Dialog>
                    <DialogTrigger asChild>
                    <Button>Update MOA</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>MOA</DialogTitle>
                        <DialogDescription>
                            {account.entityDetails.name}
                        </DialogDescription>
                    </DialogHeader>
                    <MOAForm account={account} setShowMOA={setShowMOAForm}/>
                    </DialogContent>
                    </Dialog>
                </div>} */}

                </div>
                {transactions.length>0 ?
                <div className="w-full lg:w-[50%] flex flex-col gap-4">
                    <Button className="text-sm w-fit" onClick={()=> setShowTransactions(!showTransactions)}>{showTransactions ? 'X' : 'View Transactions'}</Button>
                    {showTransactions &&
                    <Card className="flex flex-col gap-2">
                    <table className="text-sm">
                        <thead className="">
                            <tr>
                                <th className="p-6">Date</th>
                                <th className="p-6">Amount</th>
                                <th className="p-6">Type</th>
                                <th className="p-6">Counterparty</th>
                                <th className="p-6">Description</th>
                            </tr>
                        </thead>
                        
                    
                    {transactions.map((transaction, index)=>
                    (
                        <tbody className="p-2" key={transaction._id}>
                            <tr>
                                <td className={` text-center p-3 ${index%2 === 0 && 'bg-gray-100'}`}>{new Date(transaction.date).toLocaleDateString()}</td>
                                <td className={` text-center p-3 ${index%2 === 0 && 'bg-gray-100'}`}>${transaction.amount}</td>
                                <td className={` text-center p-3 ${index%2 === 0 && 'bg-gray-100'}`}>{id === transaction.primaryAccount._id ? (transaction.type === 'Deposit' ? 'Self' : 'Debit') : 'Credit'}</td>
                                
                                <td className={` text-center p-3 ${index%2 === 0 && 'bg-gray-100'}`}>{id === transaction.primaryAccount._id ? (id === transaction.counterParty._id ? '' : transaction.counterParty.accountName) : transaction.primaryAccount.accountName }</td>
                                <td className={` text-center p-3 ${index%2 === 0 && 'bg-gray-100'}`}>{transaction.description +' '} {transaction.referral && <span onClick={()=> { setShowReferralInfo(true); setInfo(transaction.referralInfo)}} className="bg-blue-400 text-xs px-2 py-1 rounded text-white cursor-pointer"> Info</span>}</td>
                            </tr>
                        </tbody>
                    ))}
                    </table>
                </Card>}
                </div>: <p className="w-full lg:w-[50%] text-muted-foreground text-base text-center">No Transactions</p>}

                {showReferralInfo && 
                <div className="h-[100vh] w-full fixed left-0 top-0 flex items-center justify-center" style={{backgroundColor:'rgba(0,0,0,0.7'}} onClick={()=> setShowReferralInfo(false)}>
                    <div className="bg-white p-8 w-[40%] rounded">
                        <h1 className="text-2xl font-bold text-center pb-4 text-red-600">Teller Info</h1>
                        <p>{info}</p>
                    </div>
                </div>}
            
            </div>}
        </div>
    )
}

const Loading = () =>
{
    return(
        <div>
            <Suspense fallback={<>Loading...</>}>
                <Search/>
            </Suspense>
        </div>
    )
}

export default Loading