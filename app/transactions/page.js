'use client'

import { transactionHistory } from "@/utility/transactionHistory"

const Transactions = () =>
{
    return(
        <table className="w-full">
            <thead className="bg-gray-100 text-black">
                <tr>
                    <th className="p-4 border">From</th>
                    <th className="p-4 border">To</th>
                    <th className="p-4 border">Type</th>
                    <th className="p-4 border">Amount</th>
                    <th className="p-4 border">Purpose</th>
                    <th className="p-4 border">Status</th>
                </tr>
            </thead>
            <tbody>
            {transactionHistory.map((transaction, index)=>
            (
                <tr className="text-center border" key={index}>
                    <td className="p-4 border">{transaction.from}</td>
                    <td className="p-4 border">{transaction.to}</td>
                    <td className="p-4 border">{transaction.type}</td>
                    <td className="p-4 border">{transaction.amount}</td>
                    <td className="p-4 border">{transaction.purpose}</td>
                    <td className="p-4 border">{transaction.status}</td>
                </tr>
            ))}
            </tbody>
        </table>
    )
} 

export default Transactions