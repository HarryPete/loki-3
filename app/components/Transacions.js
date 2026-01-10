import { NetworkAnalysis } from "./NetworkAnalysis";

export const Transactions = ({id, transactions}) =>
{
    return(
        <div>
            {transactions.length > 0 ? 
                <div className="flex flex-col gap-2 bg-gray-50 rounded-md">
                <table className="text-sm">
                    <thead className="bg-orange-500 text-white">
                        <tr>
                            <th className="p-6">Date</th>
                            <th className="p-6">Amount</th>
                            <th className="p-6">Type</th>
                            <th className="p-6">Counterparty</th>
                            <th className="p-6">Description</th>
                            <th className="p-6">Network Analysis</th>
                        </tr>
                    </thead>
                    {transactions.map((transaction, index)=>
                    {
                        const isOwnAccount = id === transaction.primaryAccount?._id;

                        const label = isOwnAccount
                        ? ['Withdrawal', 'Outward', 'Investment'].includes(transaction.type)
                            ? 'Debit'
                            : 'Credit'
                        : 'Credit';

                    return(
                        <tbody key={transaction._id}>
                            <tr>
                                <td className={` text-center p-4 ${index%2 === 0 && 'bg-gray-100'}`}>{new Date(transaction.date).toLocaleDateString()}</td>
                                <td className={` text-center p-3 ${index%2 === 0 && 'bg-gray-100'}`}>${transaction.amount}</td>
                                <td className={`text-center p-3 ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>{label}</td>
                                <td className={` text-center p-3 ${index%2 === 0 && 'bg-gray-100'}`}>{id === transaction.primaryAccount._id ? (id === transaction.counterParty._id ? '' : transaction.counterParty.accountName) : transaction.primaryAccount.accountName }</td>
                                <td className={` text-center p-3 ${index%2 === 0 && 'bg-gray-100'}`}>{transaction.description +' '} {transaction.referral && <span onClick={()=> { setShowReferralInfo(true); setInfo(transaction.referralInfo)}} className="bg-blue-400 text-xs px-2 py-1 rounded text-white cursor-pointer"> Info</span>}</td>
                                <td className={` text-center p-3 ${index%2 === 0 && 'bg-gray-100'}`}>{id === transaction.primaryAccount._id ?  '' : <NetworkAnalysis/>}</td>
                            </tr>
                        </tbody>
                    )})}
                </table>
            </div> : <p>No transactions</p>}
        </div>
    )
}