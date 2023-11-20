const bcrypt = require('bcrypt')
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken');
module.exports = async function login(req,res) {
    const {data} = req.body
    const check = await prisma.user.findUnique({where:{username:data.username}})
    const hashedPassword = await bcrypt.hash(data.password, 10)
    const token = jwt.sign({ username:data.username }, process.env.PRIVATE_KEY,{expiresIn:'6h'})

    if(check){
        const checkPass = await bcrypt.compare(data.password, check.password)
        const {name,id,username,picture} = check
        if(checkPass) {
            return res.json({token,username,id,name,picture})
        }
        return res.json({error:'Wrong Password'})
    }
    
    data.password=hashedPassword
    const result = await prisma.user.create({data:data})
    const {name,id,username,picture} = result
    return res.json({token,username,id,name,picture})
}