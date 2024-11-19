import mongoose, { Schema } from "mongoose";

const accountSchema = new Schema({
    type:
    {
        type: String,
        enum: ['Personal', 'Entity'],
        required: true
    },
    accountName: String,
    email:
    {
        type: String,
        required: true
    },
    contact:
    {
        type: String,
        required: true
    },
    transactions:
    [
        {
            type: Schema.Types.ObjectId,
            ref: 'Transaction'
        }
    ],
    personalDetails:
    {
        type: Schema.Types.ObjectId,
        ref: 'Personal'
    },
    entityDetails:
    {
        type: Schema.Types.ObjectId,
        ref: 'Entity'
    }
},{ timestamps: true })

export const Account = mongoose.models?.Account || mongoose.model('Account', accountSchema);