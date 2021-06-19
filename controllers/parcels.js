import mongoose  from 'mongoose';
import ParcelOrder from '../models/parcel.js'

//get parcels controller
export const getParcels = async(req, res) =>{
    try{
        const parcelOrders = await ParcelOrder.find();

        res.status(200).json(parcelOrders);

    }catch(error){
        res.status(404).json({message: error.message});
        
    }
}

//createparcel controller
export const createParcel = async(req, res) =>{
    
    const parcel = req.body;
    const newParcel = new ParcelOrder({...parcel, creator: req.userId, createdAt: new Date().toISOString()});

    try{
        await newParcel.save();
        res.status(201).json(newParcel);
    }catch(error){
        res.status(409).json({message: error.message});

    }
}

//updateparcel controller
export const updateParcel = async(req, res)=>{

    const {id: _id} = req.params;
    const parcel = rq.body;

    if (!mongoose.Types.objectId.isValid(_id)) res.status(404).send('no parcel with that id');

   const updatedParcel = await  ParcelOrder. findByIdAndUpdate(_id, parcel, {new: true})
   res.json(updatedParcel);


}

//deleteParcel controller
export const deleteParcel = async(req, res)=>{
    const {_id} =req.params;

    if (!mongoose.Types.objectId.isValid(_id)) res.status(404).send('no parcel with that id');

    await ParcelOrder.findByIdAndRemove(id);

    console.log('delete')

    res.json({message: 'parcel deleted successfully'});

}