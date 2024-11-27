const { Schema } = require("mongoose");

const transactionHits = new Schema({
    date:
    {
        type: Date,
        required: true
    },
    detectionScenario:
    {
        type: String,
        required: true
    },
    description:
    {
        type: String,
        required: true
    }
})