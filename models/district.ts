import mongoose, { Schema, models } from "mongoose"

export interface IDistrict {
    id?: string,
    name: string,
    pincodes: number[]
}


const districtSchema = new Schema({
    name: String,
    pincodes: [Number]
})

const DistrictModel = models.District || mongoose.model('District', districtSchema)
export default DistrictModel
