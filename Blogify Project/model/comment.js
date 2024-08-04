import mongoose, { Schema } from "mongoose";
import user from './user.js';
import blog from './blog.js';

const commentSchema= new mongoose.Schema({

    content:{
        type:String,
        required:true,
    },

    createdByUser:{
        type:Schema.Types.ObjectId,
        ref:user,

    },

    targetedBlogId:{
        type:Schema.Types.ObjectId,
        ref:blog
    }


},{timestamps:true})

export default mongoose.model('comment', commentSchema);
