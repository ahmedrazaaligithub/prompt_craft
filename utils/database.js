import mongoose from "mongoose";
let isConnected = false;

export const connectToDB = async ()=>{
    mongoose.set("strictQuery", true);

    if (isConnected){
        console.log("mopngoDB is already conected");
        return;
    }
    try{
mongoose.connect(process.env.MONGODB_URI,{
    dbName:"share_prompts",
    useNewUrlParser:true,
    useUnifiedTopology:true,    
})
isConnected = true
console.log("mongodb has been connected");
    }
    catch(error){
console.log(error);
    }
}