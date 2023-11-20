const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
module.exports = async function getRandomUsers(req,res){
    const users = await prisma.user.findMany({
        take: 5, 
      })
    res.json({users})
}
