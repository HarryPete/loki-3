import mongoose, { Schema } from "mongoose"

const rentalSchema = new Schema({
    address:
    {
        street: String,
        city: String,
        state: String,
        country: String,
        zipcode: Number
    },
    startDate:
    {
        type: Date,
        required: true
    },
    endDate:
    {
        type: Date,
        required: true
    },
    monthlyRent:
    {
        type: Number,
        required: true
    }
},{
    timestamps: true
})

export const Rental = mongoose.models?.Rental || mongoose.model('Rental', rentalSchema)