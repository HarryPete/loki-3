'use client'

import Loader from "@/app/components/Loader";
import MOAForm from "@/app/components/MOAForm";
import PersonalCard from "@/app/components/PersonalCard";
import ProfileCrad from "@/app/components/ProfileCard";
import TradeForm from "@/app/components/TradeForm";
import TransactionForm from "@/app/components/TransactionForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import debiticon from '@/assets/debit.png'
import crediticon from '@/assets/credit.png'
import balance from '@/assets/balance.png'
import transactionicon from '@/assets/transaction.png'
import visualization from '@/assets/visualization.png'
import ai from '@/assets/ai.png'
import network from '@/assets/network.png'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";
import { LineChart, Line, PieChart, Pie,  BarChart, Bar, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Link from "next/link";
import Image from "next/image";
import { maskAccountNumber } from "@/utility/maskAccountNumber"
import { AccountHeader } from "@/app/components/AccountHeader";
import { Attachments } from "@/app/components/Attachments";
import { Visualisation } from "@/app/components/Visualisation";
import { SocialAnalysis } from "@/app/components/SocialAnalysis";
import { Transactions } from "@/app/components/Transacions";
import { TabTransactions } from "@/tabs/TabTransactions";
import { TabCredit } from "@/tabs/TabCredit";
import { TabDebit } from "@/tabs/TabDebit";
import { TabBalance } from "@/tabs/TabBalance";
import { TabVisualisation } from "@/tabs/TabVisualisation";
import { TabOverview } from "@/tabs/TabOverview";
import { TabSocialAnalysis } from "@/tabs/TabSocialAnalysis";
import { TabRiskScore } from "@/tabs/TabRiskScore";
import { TabTradeLicence } from "@/tabs/TabTradeLicence";
import { TabMOA } from "@/tabs/TabMOA";
import { TabKYC } from "@/tabs/TabKYC";
import { TabPassport } from "@/tabs/TabPassport";
import { TabRental } from "@/tabs/TabRental";
import { PersonalChat } from "@/app/components/PersonalChat";
import { ProfileChat } from "@/app/components/ProfileChat";
import { TabDraft } from "@/tabs/TabDraft";
import { TabRFI } from "@/tabs/TabRFI";
import { TabTransaction } from "@/tabs/TabTransaction";
import { TabPeriodicReview } from "@/tabs/TabPeriodicReview";

const Search = ()  =>
{
    const params = useSearchParams();
    const [ showVisualisation, setShowVisualisation ] = useState(false);
    const [ showScreening, setShowScreening ] = useState(false);
    const [ showOverview, setShowOverview ] = useState(false)
    const [ loading, setLoading ] = useState(true)
    const id = params.get('accNo') || null
    const [ account, setAccount ] = useState(null);
    const [ transactions, setTransactions ] = useState(null);
    const [ visualisationData, setVisualisationData ] = useState(null);
    const [ pieData, setPieData ] = useState(null)
    const [ barData, setBarData ] = useState(null)
    const [ debit, setDebit ] = useState(0);
    const [ credit, setCredit ] = useState(0);
    const [ showMOAForm, setShowMOAForm ] = useState(false); 
    const [ showTradeForm, setShowTradeForm ] = useState(false); 
    const [ showTransactions, setShowTransactions ] = useState(false)
    const [ showReferralInfo, setShowReferralInfo ] = useState(false);
    const [ showTransactionForm, setShowTransactionForm ] = useState(false)
    const [ info, setInfo ] = useState('')
    const COLORS = ["#f97316", "#94a3b8", "#2196F3"];

    useEffect(()=>
    {
        if(id)
            getAccount();
    },[])

    console.log(account)

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

            response.data.transactions.forEach((transaction) => {
            const isOwnAccount = transaction.primaryAccount?._id === id;

            if (transaction.type === 'Deposit' || transaction.type === 'Inward') {
                credits += transaction.amount;
            } 
            else if (transaction.type === 'Withdrawal' || transaction.type === 'Outward' || transaction.type === 'Investment') 
            {
                if (isOwnAccount) 
                {
                debits += transaction.amount;
                } else {
                credits += transaction.amount;
                }
            }
            });

            setDebit(debits);
            setCredit(credits)

            const monthlyTotals = response.data.transactions.reduce((acc, tx) => {
                if (!tx?.date || !tx?.amount) return acc;

                const month = new Date(tx.date).toISOString().slice(0, 7);

                if (!acc[month]) acc[month] = { Deposit: 0, Withdrawal: 0 };

                if (tx.type === "Deposit" || tx.type === "Inward") {
                    acc[month].Deposit += Number(tx.amount);
                } 
                else 
                {
                    acc[month].Withdrawal += Number(tx.amount);
                }

                return acc;
            }, {});

            const visualisationData = Object.entries(monthlyTotals).map(([month, data]) => ({
                month,
                ...data,
            }));

            const typeTotals = response.data.transactions.reduce(
                (acc, tx) => {
                    if (tx.type === "Deposit" || tx.type === "Inward") {
                        acc.Credit += Number(tx.amount);
                    } else {
                        acc.Debit += Number(tx.amount);
                    }
                    return acc;
                },
                { Credit: 0, Debit: 0 }
            );

            const pieChartData = [
                { name: "Credit", value: typeTotals.Credit },
                { name: "Debit", value: typeTotals.Debit },
            ];


            const counterpartyTotals = response.data.transactions.reduce((acc, tx) => {
                const name = tx.counterParty?.accountName || "Unknown";

                if (!acc[name]) acc[name] = { name, Deposit: 0, Withdrawal: 0 };

                if (tx.type === "Deposit") acc[name].Deposit += tx.amount;
                else acc[name].Withdrawal += tx.amount;

                return acc;
            }, {});

            const barData = Object.values(counterpartyTotals).sort(
                (a, b) => (b.Deposit + b.Withdrawal) - (a.Deposit + a.Withdrawal)
            );

            setBarData(barData)
            setPieData(pieChartData)
            setVisualisationData(visualisationData)
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
        <div className="w-full space-y-4">
            <Card className="p-6 rounded-xl flex justify-between items-center bg-orange-500 font-bold text-white">
                <h1 className="text-[28px]">Fints Banking Co.</h1>
                <h1 className="text-[16px]">{account.type} Account</h1>
            </Card>

            <div className="space-y-4">
                <AccountHeader account={account}/>
            
                {account && 
                <div className="grid grid-cols-4 gap-3">
                    {account.type === "Personal" ? <TabKYC account={account}/> : <TabRiskScore account={account}/>}
                    {account.type === "Personal" ? <TabPassport account={account}/> : <TabTradeLicence account={account}/>}
                    {account.type === "Personal" ? <TabRental account={account}/> : <TabMOA account={account}/>}
                    
                    
                    <TabOverview account={account}/>
                    <TabPeriodicReview account={account}/>

                    <TabCredit credit={credit}/>
                    <TabDebit debit={debit}/>
                    <TabBalance credit={credit} debit={debit}/>
                    {/* <TabTransaction id={id} getAccount={getAccount} setShowTransactionForm={setShowTransactionForm}/> */}

                    
                    {/* <TabVisualisation visualisationData={visualisationData} pieData={pieData} barData={barData}/>
                    <TabTransactions id={id} transactions={transactions}/>   */}
                    {/* <TabDraft/>
                    <TabRFI/> */}
                    
                    {account.type === "Personal" ? <PersonalChat account={account}/> : <ProfileChat account={account}/>}              
                </div>}
                {account.transactions.length>0 &&
                <div className="space-y-4">
                    <h1 className="text-[42px] text-orange-500 font-bold text-center pt-4">Visualisation</h1>
                    <Visualisation visualisationData={visualisationData} pieData={pieData} barData={barData}/>
                    <h1 className="text-[42px] text-orange-500 font-bold text-center pt-4">Transactions</h1>
                    <Transactions id={id} transactions={transactions}/>
                </div>}
            </div>
            
            
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

// {showReferralInfo && 
//     <div className="h-[100vh] w-full fixed left-0 top-0 flex items-center justify-center" style={{backgroundColor:'rgba(0,0,0,0.7'}} onClick={()=> setShowReferralInfo(false)}>
//         <div className="bg-white p-8 w-[40%] rounded">
//             <h1 className="text-2xl font-bold text-center pb-4 text-red-600">Teller Info</h1>
//             <p>{info}</p>
//         </div>
//     </div>}