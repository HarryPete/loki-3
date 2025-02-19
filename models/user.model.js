import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: 
    {
        type: String,
        required: true
    },
    email: 
    {
        type: String,
        required: true
    },
    password: 
    {
        type: String
    },
    enrollments: 
    [{
        type: Schema.Types.ObjectId,
        ref: 'Enrollment'
    }],
    chat:
    [{
        type: Schema.Types.ObjectId,
        ref: 'Chat'    
    }],
    role:
    {
        type: String,
        enum: ['visitor', 'user', 'mentor', 'admin'],
        default: 'visitor'
    },
    isProfileComplete:
    {
        type: Boolean,
        default: false
    },
    googleId: String,
    otp: Number,
    contact: String,
    domain: String,
    experience: String,
    linkedIn: String,
    organisation: String,
    country: String,
    imageURL: String,
},
{
    timestamps: true
})

export const User = mongoose.models?.User || mongoose.model('User', userSchema);