import mongoose from 'mongoose';

const parcelSchema = mongoose.Schema({
    parcelCode: String,
    parcelWeight: String,
    currentLocation: String,
    parcelDestination: String,
    name: String,  //name of the loggedin user
    creator: String,
    description: String,
    parcelStatus: {type: String, default: "pending"},
    createdAt:{
        type:  Date,
        default: new Date()
    }

})

//creating the parcel model
const ParcelOrder = mongoose.model('parcelOrder', parcelSchema);

export default ParcelOrder;