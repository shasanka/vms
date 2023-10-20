import mongoose, { Schema, models } from 'mongoose';
import { IDistrict } from './district';



export interface IState {
    _id?: string;
    name: string;
    districtID: IDistrict[];
}


const stateSchema = new Schema({
    name: String,
    districtsID: [{ type: mongoose.Schema.Types.ObjectId, ref: 'District' }]
})

const StateModel = models.State || mongoose.model('State', stateSchema)
export default StateModel

