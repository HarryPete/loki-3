import { Account } from "@/models/account.model";
import { Entity } from "@/models/entity.model";
import { Passport } from "@/models/passport.model";
import { Personal } from "@/models/personal.model";
import { Rental } from "@/models/rental.model";
import { Transaction } from "@/models/transaction.model";

class accountService
{
    async createAccount(type, email, contact)
    {
        try
        {
            const newAccount = await Account.create({type, email, contact});
            await newAccount.save();
            return newAccount
        }
        catch(error)
        {
            console.log(error);
            throw error
        }
    }

    async getAccounts()
    {
        try
        {
            const accounts = await Account.find()
            .populate({ path: 'entityDetails', model: Entity, populate: { path: 'accountDetails', model: Account }})
            .populate({ path: 'personalDetails', model: Personal, populate: { path: 'accountDetails', model: Account}});
            ;
            return accounts
        }
        catch(error)
        {
            throw error
        }
    }

    async getAccountById(id)
    {
        try
        {
            const account = await Account.findById(id)
            .populate({ path: 'transactions', model: Transaction, populate: [{ path: 'primaryAccount', model: Account, populate: [{ path: 'personalDetails', model: Personal },{ path: 'entityDetails', model: Entity }] }, { path: 'counterParty', model: Account, populate: [{ path: 'personalDetails', model: Personal },{ path: 'entityDetails', model: Entity }] }] })
            .populate({ path: 'entityDetails', model: Entity, populate: [{ path: 'buyers', model: Entity },{ path: 'sellers', model: Entity }, { path: 'partners.profile', model: Personal, populate: [{ path: 'passportDetails', model: Passport },{ path: 'rentalDetails', model: Rental },{ path: 'organisation', model: Entity}] }]})
            .populate({ path: 'personalDetails', model: Personal, populate: [{ path: 'passportDetails', model: Passport },{ path: 'rentalDetails', model: Rental },{ path: 'organisation', model: Entity, populate: { path: 'accountDetails', model: Account, populate: { path: 'entityDetails', model: Entity}}}] });
            return account
        }
        catch(error)
        {
            throw error
        }
    }

    async updateEntity(accountId, entityId)
    {
        try
        {
            await Account.findByIdAndUpdate(accountId, { $set: { entityDetails : entityId }})
            return
        }
        catch(error)
        {
            throw error
        }
    }

    async updatePersonal(accountId, personalId)
    {
        try
        {
            await Account.findByIdAndUpdate(accountId, { $set: { personalDetails : personalId }})
            return
        }
        catch(error)
        {
            throw error
        }
    }

    async updateAccountName(accountId, accountName)
    {
        try
        {
            await Account.findByIdAndUpdate(accountId, { $set: { accountName }})
            return
        }
        catch(error)
        {
            throw error
        }
    }


    async updateAccountTransaction(accountId, transactionId)
    {
        try
        {
            await Account.findByIdAndUpdate(accountId, { $push: { transactions : transactionId }})
            return
        }
        catch(error)
        {
            throw error
        }
    }

    async deleteAccount(id)
    {
        try
        {
            await Account.findByIdAndDelete(id);
            return
        }
        catch(error)
        {
            throw error
        }
    }
}

export default accountService