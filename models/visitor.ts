import { IDProofType, IVisitor } from '@/interface/common'
import mongoose, { Schema, models } from 'mongoose'

const visitorSchema = new Schema<IVisitor>({
    phone_no: {
        type: Number
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    email: {
        type: String
    },
    address: {
        type: String
    },
    state: {
        type: String
    },
    district: {
        type: String
    },
    pincode: {
        type: Number
    },
    id_proof_type: {
        type: Number,
        enum: IDProofType,
        default: IDProofType.DRIVING_LICENSE
    },
    id_proof_number: {
        type: String
    },
}
    , {
        timestamps: true // If you set timestamps: true, Mongoose will add createdAt, updatedAt of type Date to your schema:
    })
const Visitor = models.Visitor || mongoose.model('Visitor', visitorSchema)
export default Visitor
