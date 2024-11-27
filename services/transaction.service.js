import { Account } from "@/models/account.model";
import { Entity } from "@/models/entity.model";
import { Personal } from "@/models/personal.model";

const { Transaction } = require("@/models/transaction.model");

class transactionService
{
    async createTransaction(details)
    {
        try
        {
            const newTransaction = await Transaction.create(details)
            newTransaction.save();
            return newTransaction
        }   
        catch(error)
        {
            throw error
        }
    }
    
    async getAccountTransactions()
    {
        try
        {
            const transactions = await Transaction.find()
            .populate({path: 'primaryAccount', model: Account})
            .populate({path: 'counterParty', model: Account});
            return transactions
        }   
        catch(error)
        {
            console.log(error)
            throw error
        }
    }

    async getAccountTransactionsById(id)
    {
        try
        {
            const transactions = await Transaction.findById(id)
            .populate({path: 'counterParty', model: Account, populate: [{ path: 'personalDetails', path: Personal }, { path: 'entityDetails', path: Entity }]});
            return transactions
        }   
        catch(error)
        {
            throw error
        }
    }
}

export default transactionService