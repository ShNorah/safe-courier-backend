import jwt from 'jsonwebtoken';

//if user wants to create a parcel
//click create button => auth middleware(next)=> create controller...

//next do something and move to the next thing
const auth = async(req,res, next)=>{
    try { //token is in the first position of the array

        const token = req.headers.Authorization.split("")[1];
        const isCustomAuth = token.length < 500;


        let decodedData; //data that you want to get from the token itself

        if(token && isCustomAuth){
            decodedData = jwt.verify(token, 'test'); //test is the secret key
            req.userId = decodedData?.id; //to know wc user is doing wc action

        }else{ //if user used google auth
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }
        next();

    }catch(error){
        console.log(error)
    }
}

export default auth;