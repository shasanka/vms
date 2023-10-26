import mongoose, { Schema, models } from 'mongoose';

const entrySchema = new Schema({
    visitor_id: {
        type: String,
        required: true
    },
    registration_timestamp: {
        type: Date,
        default: Date.now,
    },
    checkin_timestamp: {
        type: Date,
    },
    checkout_timestamp: {
        type: Date,
    },
    status: {
        type: String, // Registered, CheckedIn, CheckedOut
    }
})

const Entry = models.Entry || mongoose.model('Entry', entrySchema)
export default Entry