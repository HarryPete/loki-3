import mongoose, { Schema } from "mongoose"

const personalSchema = new Schema({
    accountDetails:
    {
        type: Schema.Types.ObjectId,
        ref: 'Account'
    },
    firstname:
    {
        type: String,
        required: true
    },
    lastname:
    {
        type: String,
        required: true
    },
    gender:
    {
        type: String,
        enum: ['Male', 'Female', 'Others'],
        required: true
    },
    dateOfBirth:
    {
        type: Date,
        required: true
    },
    occupation:
    {
        type: String,
        required: true
    },
    organisation:
    {
        type: Schema.Types.ObjectId,
        ref: 'Entity'
    },
    passportDetails:
    {
        type: Schema.Types.ObjectId,
        ref: 'Passport'
    },
    rentalDetails:
    {
        type: Schema.Types.ObjectId,
        ref: 'Rental'
    },
    annualIncome:
    {
        type: Number,
        required: true
    },
    isPEP:
    {
        type: String,
        enum: ['Yes', 'No'],
        required: true
    }
})

export const Personal = mongoose.models?.Personal || mongoose.model('Personal', personalSchema)