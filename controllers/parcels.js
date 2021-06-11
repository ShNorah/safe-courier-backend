import ParcelOrder from '../models/parcel.js'

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
    const newParcel = new ParcelOrder(parcel);

    try{
        await newParcel.save();
        res.status(201).json(newParcel);
    }catch(error){
        res.status(409).json({message: error.message});

    }
}
