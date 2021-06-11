import mongoose from 'mongoose';

const parcelSchema = mongoose.Schema({
    parcelCode: Number,
    parcelWeight: Number,
    parcelDestination: String,
    creator: String,
    createdAt:{
        type:  Date,
        default: new Date()
    }

})

//creating the parcel model
const ParcelOrder = mongoose.model('parcelOrder', parcelSchema);

export default ParcelOrder;