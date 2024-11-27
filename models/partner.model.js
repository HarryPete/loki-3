import mongoose, { Schema } from "mongoose"

const partnerSchema = new Schema({
    profile:
    {
        type: Schema.Types.ObjectId,
        ref: 'Personal'
    },
    entity:
    {
        type: Schema.Types.ObjectId,
        ref: 'Entity'
    },
    equity:
    {
        type: String,
        required: true
    },
    description: String
})

export const Partner = mongoose.models?.Partner || mongoose.model('Partner', partnerSchema)