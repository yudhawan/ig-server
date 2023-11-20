const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const {v2} = require('cloudinary')
const cloudinary = v2
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
module.exports= async function(req,res){
    try {
        const {data} = req.body
        const img = await cloudinary.uploader.upload(data?.images, { folder: 'instagramClone' })
        if(img.url){
            data.images=img.url
            const post = await prisma.post.create({data:data})
            const feeds = await prisma.post.findMany({include:{
                user:true
            },orderBy:{date:'desc'}})
            if(post) return res.status(201).json({feeds,msg:'Success'})
        }
        return res.status(500).end()
    } catch (error) {
        console.log(error)
        return res.status(500).end()
    }
}