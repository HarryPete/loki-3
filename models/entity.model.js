import mongoose, { Schema } from "mongoose";

const entitySchema = new Schema({
    accountDetails:
    {
        type: Schema.Types.ObjectId,
        ref: 'Account'
    },
    name:
    {
        type: String,
        required: true
    },
    incorporationDate:
    {
        type: Date,
        required: true
    },
    industry:
    {
        type: String,
        required: true
    },
    industryRating:
    {
        type: Number,
        default: 0
    },
    product:
    {
        type: String,
        required: true
    },
    productRating:
    {
        type: Number,
        default: 0
    },
    region:
    {
        type: String,
        required: true
    },
    regionRating:
    {
        type: Number,
        default: 0  
    },
    address:
    {
        street: String,
        city: String,
        state: String,
        country: String,
        zipcode: Number
    },
    buyers:
    [{
        entity:
        { 
            type: Schema.Types.ObjectId,
            ref: 'Entity'
        },
        verifiedDate: Date
    }],
    sellers:
    [{
        entity:
        { 
            type: Schema.Types.ObjectId,
            ref: 'Entity'
        },
        verifiedDate: Date
    }],
    partners:
    [{
        type: Schema.Types.ObjectId,
        ref: 'Partner'    
    }],
    clients:
    [{
        type: Schema.Types.ObjectId,
        ref: 'Personal'    
    }]
})

export const Entity = mongoose.models?.Entity || mongoose.model('Entity', entitySchema);