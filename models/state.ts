import mongoose, { Schema, models } from 'mongoose';




const stateSchema = new Schema({
    name: String,
    districtsID: [{ type: mongoose.Schema.Types.ObjectId, ref: 'District' }]
})

const StateModel = models.State || mongoose.model('State', stateSchema)
export default StateModel

