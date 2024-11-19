import { transactionHistory } from "./transactionHistory";

export const chartData = () =>
{
    const pieData = [];
    transactionHistory.forEach((transaction)=>
    {
        const type = transaction.type;
        const existingType = pieData.find((record) => record.Type === type);
        if(existingType)
            existingType.Count += 1;
        else
            pieData.push({ Type: type, Count: 1})
    })

    return pieData;
}