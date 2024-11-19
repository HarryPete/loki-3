import mongoose, { Schema } from 'mongoose'

const transactionSchema = new Schema({
    date:
    {
        type: Date,
        required: true
    },
    primaryAccount:
    {
        type: Schema.Types.ObjectId,
        ref: 'Account'
    },
    counterParty:
    {
        type: Schema.Types.ObjectId,
        ref: 'Account'
    },
    nature:
    {
        type: String,
        enum: ['Payee', 'Debit']
    },
    amount:
    {
        type: Number,
        required: true
    },
    type:
    {
        type: String,
        enum: ['Transfer', 'Inward', 'Outward', 'Withdrawal', 'Investment', 'Loan', 'Deposit', 'Sale']
    },
    description: String, 
},{ timeStamps: true })

export const Transaction = mongoose.models?.Transaction || mongoose.model('Transaction', transactionSchema) 