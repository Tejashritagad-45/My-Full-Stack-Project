import mongoose from "mongoose"

const connectDb= async(url)=>{
    try{
        await mongoose.connect(url);
        console.log("mongodb connecting  succesfully");
        
    }catch(error){
        console.log(`Error connecting to  mongodb:${error.message}`);
        
    }
}
export default connectDb