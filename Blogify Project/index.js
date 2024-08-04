import express from 'express';
import dotenv from 'dotenv';
import connect from './connect/db.js'
import path from 'path';
import userRoute from './routes/userRoute.js'
import cookieParser from 'cookie-parser';
import {checkForCookie} from './middleware/auth.js'
import blogRoute from './routes/blogRoute.js'
import blog from './model/blog.js'


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(checkForCookie('token'))
app.use(express.static(path.resolve('./public')))


dotenv.config();
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

connect()

app.use('/user', userRoute)
app.use('/blog', blogRoute)


app.get('/signup', (req, res) => {
    return res.render('signup');
});


app.get('/signin', (req, res) => {
    return res.render('signin');
});


app.get('/', async(req, res) => {
    const allblogs= await blog.find({}) 
    return res.render('home',{
       user: req.user,
       blog: allblogs,
    });
})


app.get('/addblog', (req, res) => {
    return res.render('addblog',{
        user: req.user  
    });
})


app.get('/logout', (req, res) => {
    res.clearCookie('token').redirect('/')
});


const port = process.env.PORT
app.listen(port, ()=>{
    console.log('listening on port');
})