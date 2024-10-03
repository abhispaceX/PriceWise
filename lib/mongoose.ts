import mongoose from 'mongoose'

let Isconnected=false;

export const ConnectTODB= async ()=>{

    mongoose.set('strictQuery',true)

    if(!process.env.MONGO_URI){
        return console.log('No MongoDB URI')
    }
    if(Isconnected){
        return console.log('Using Existing Database')
    }
    try {
        await mongoose.connect(process.env.MONGO_URI)
        Isconnected=true
        console.log('MongoDB Connected')
    }catch(error){
        console.log(error)

    }
    
}