import mongoose, { Schema, models } from 'mongoose';

const visitorSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    phone_no: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    id_proof_type: {
        type: String,
        required: true
    },
    id_proof_no: {
        type: String,
        required: true
    },
    id_proof_copy: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
    }

})

visitorSchema.pre('save', function (next) {
	let entry = this;

	entry.updated_at = new Date();
	next();
});

const Visitor = models.Visitor || mongoose.model('Visitor', visitorSchema)
export default Visitor