const { Schema, default: mongoose } = require("mongoose");

const articleSchema = new Schema({
    title:
    {
        type: String,
        required: true
    },
    coverImage:
    {
        type: String,
        required: true
    },
    introduction:
    {
        type: String,
        required: true
    },
    body:
    {
        type: String,
        required: true
    },
    footer:
    {
        type: String,
        required: true
    },
    date:
    {
        type: Date,
        required: true
    },
    keywords: String,
    associations:
    [   
        {
            type: Schema.Types.ObjectId,
            ref: 'Account'
        }
    ]
},{ timestamps: true})

export const Article = mongoose.models?.Article || mongoose.model('Article', articleSchema)