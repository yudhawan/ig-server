const {PrismaClient} = require('@prisma/client')
const {v2} = require('cloudinary')
const prisma = new PrismaClient()
const cloudinary = v2
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
module.exports= async function(req,res){
    try {
        const {data} = req.body
        const id = data.id
        delete data.id
        const img = data.picture?await cloudinary.uploader.upload(data?.picture, { folder: 'instagramClone' }):''
        if(img.url){
            data.picture=img.url
            const post = await prisma.user.update({data:data,where:{id:id}})
            if(post) return res.status(201).json(post)
        }
        const post = await prisma.user.update({data:data,where:{id:id}})
        if(post) return res.status(201).json(post)
        
    } catch (error) {
        console.log('error loh:')
    }
}