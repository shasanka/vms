import { IDProofType, IVisitor } from '@/interface/common'
import mongoose, { Schema, models } from 'mongoose'

const visitorSchema = new Schema<IVisitor>({
    phoneNo: {
        type: Number
    },
    firstName: {
        type: String
    },
    lastName: {
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
    idProofType: {
        type: Number,
        enum: IDProofType,
        default: IDProofType.DRIVING_LICENSE
    },
    idProofNumber: {
        type: String
    },
}
    , {
        timestamps: true // If you set timestamps: true, Mongoose will add createdAt, updatedAt of type Date to your schema:
    })
const Visitor = models.Visitor || mongoose.model('Visitor', visitorSchema)
export default Visitor
