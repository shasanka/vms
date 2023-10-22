import mongoose, { Schema, models } from "mongoose"



const districtSchema = new Schema({
    name: String,
    pincodes: [Number]
})

const DistrictModel = models.District || mongoose.model('District', districtSchema)
export default DistrictModel
