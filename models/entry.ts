import mongoose, { Schema, models } from 'mongoose';

const entrySchema = new Schema({
    visitor_id: {
        type: mongoose.Schema.Types.ObjectId, // Use mongoose.Schema.Types.ObjectId
        ref: 'Visitor' // Add the reference model name ('Visitor' in this case)
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