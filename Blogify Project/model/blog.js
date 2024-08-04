import mongoose, { Schema } from 'mongoose';
import user from './user.js';

const blogSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
    },
    coverImageUrl:{
        type:String,
        required:false,
    },
    createdByUser:{
        type:Schema.Types.ObjectId,
        ref:user,
    }

},{timestamps:true});

export default mongoose.model('blogs', blogSchema)
