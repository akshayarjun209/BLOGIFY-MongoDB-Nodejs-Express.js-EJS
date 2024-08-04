import express from 'express';
import blog from '../model/blog.js';
import multer from 'multer';
import path from 'path'
import comment from '../model/comment.js';

const router= express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve('./public/uploads'))
    },

    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`
      cb(null, fileName)
    }
  })
  
  const upload = multer({ storage: storage })


router.post('/addblog', upload.single('coverImage') , async(req, res)=>{
  const {title, body} = req.body;
  const blogs= await blog.create({title ,body, coverImageUrl:`/uploads/${req.file.filename}`, createdByUser:req.user.id})

   return res. redirect(`/blog/${blogs._id}`)
})

router.get('/:id', async(req, res)=>{
     const blogDetail= await blog.findById(req.params.id).populate('createdByUser');
     const comments = await comment.find({targetedBlogId:req.params.id}).populate('createdByUser');
    //  console.log(comments)
     return res.render('blog',{ 
        user: req.user,
        comment:comments,
        blog : blogDetail});
})

router.post('/comment/:id', async(req, res) => {
  
    await comment.create({
        content:req.body.content,
        createdByUser: req.user.id,
        targetedBlogId:req.params.id})

        return res.redirect(`/blog/${req.params.id}`)
})






export default router;