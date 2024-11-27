const { Schema } = require("mongoose");

const screeningHits = new Schema({
    date:
    {
        type: Date,
        required: true
    },
    hit:
    {
        type: String,
        required: true
    }
})

