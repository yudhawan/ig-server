const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
module.exports= async function(req,res){
    const feeds = await prisma.post.findMany({
        include:{
            user:true
        },
        orderBy:{
            date:'desc'
        }
    })
    res.json({feedsData:feeds})
}