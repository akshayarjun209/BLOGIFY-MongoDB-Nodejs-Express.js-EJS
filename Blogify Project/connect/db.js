import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connect = function (){
   try{
    mongoose.connect(process.env.MONGO_URL)
    console.log('connection is established with database')
   }catch(e){
    console.log('connection not established', e.message)
}
}
export default connect; 