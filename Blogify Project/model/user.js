import { createHmac, randomBytes } from 'crypto';
import mongoose from 'mongoose';
import { createToken } from '../services/authentification.js';

const userSchema= new mongoose.Schema({ 
    
    name:{
        type: String,
        required: true
    },

    email:{
        type:String,
        unique: true,
        required: true
    },

    password:{
        type:String,
        required:true
    },

    salt:{
        type: String
    },

    profileImageUrl: {
        type:String,
        default:'/images/profile.jpg',
    },

    role: {
        type:String,
        enum:['USER', 'ADMIN'],
        default: 'USER'
    }

},{timestamps:true})


userSchema.pre('save', function(next){
    const user= this;
    if(!user.isModified('password')) return;

    const salt= randomBytes(16).toString();
    const hashedPassword= createHmac('sha256',salt).update(user.password).digest('hex');

    this.salt= salt;
    this.password= hashedPassword;
    next();
})

userSchema.static('matchPasswordAndGenerateToken', async function(email, password){

    const user= await this.findOne({email})
    if(!user) throw new Error("user not found")
   
    const salt= user.salt;
    const hashedPassword= user.password;
    const userProvidedHash= createHmac('sha256', salt).update(password).digest('hex')
   
    if (userProvidedHash !== hashedPassword)
    throw new Error ("Invalid Password");
   
    const token= createToken(user);
    return token;
})



export default mongoose.model('user', userSchema)