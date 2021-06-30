import mongoose  from 'mongoose';
import ParcelOrder from '../models/parcel.js';
import User from '../models/users.js';

//get parcels controller
export const getParcels = async(req, res) =>{
    try{
       // console.log({user: req.userId});
        const parcelOrders = await ParcelOrder.find();

        res.status(200).json(parcelOrders);

    }catch(error){
        res.status(404).json({message: error.message});
        
    }
}

//createparcel controller
export const createParcel = async(req, res) =>{
    
    const parcel = req.body;
   // console.log(req.userId.id);
    const newParcel = new ParcelOrder({...parcel, createdAt: new Date().toISOString()});

    try{
        await newParcel.save();
        res.status(201).json(newParcel);
    }catch(error){
        res.status(409).json({message: error.message});

    }
}

//updateparcel controller
export const updateParcel = async(req, res)=>{

    const {id} = req.params;
    const parcel = req.body;
    console.log(id);
  //  if (!mongoose.Types.objectId.isValid(id)) res.status(404).send('no parcel with that id');
    
    const user = await User.findById(req.userId.id);
    console.log(user);

   const updatedParcel = await  ParcelOrder. findByIdAndUpdate(id, parcel, {new: true});
   res.json(updatedParcel);


}

//deleteParcel controller
export const deleteParcel = async(req, res)=>{
    const {id} =req.params;

  // if (!mongoose.Types.objectId.isValid(_id)) res.status(404).send('no parcel with that id');

    await ParcelOrder.findByIdAndRemove(id);

    console.log('parcel deleted')

    res.json({message: 'parcel deleted successfully'});

}