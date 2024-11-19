import mongoose, { Schema } from "mongoose"

const passportSchema = new Schema({
  
    passportNumber:
    {
        type: String,
        required: true
    },
    countryOfIssue:
    {
        type: String,
        required: true
    },
    dateOfIssue:
    {
        type: Date,
        required: true
    },
    dateOfExpiry:
    {
        type: Date,
        required: true
    }
},{
    timestamps: true
})


export const Passport = mongoose.models?.Passport || mongoose.model('Passport', passportSchema)