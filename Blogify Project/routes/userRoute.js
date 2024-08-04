import express from 'express';
import user from '../model/user.js'

const router = express.Router();

router.post('/signup', async(req, res)=>{
    const {name, email, password} = req.body;
    await user.create({name, email, password});
    return res.redirect('/signin');
})

router.post('/signin', async(req, res)=>{
    const { email, password} = req.body;
    
    try{
    const token= await user.matchPasswordAndGenerateToken(email, password)

    console.log(token)
    return res.cookie('token',token).redirect('/');

    }catch(error){
        return res.render('signin' ,{error: 'invalid password and email'});
    }
})

export default router;