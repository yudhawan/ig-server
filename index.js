const express = require('express')
const router = require('./routes/registerRoutes')
const cors = require('cors')
const bodyParser = require('body-parser')
const {Server} = require('socket.io')
const http =require('http')
const app = express()
const port = 5000
const server = http.createServer(app);
require('dotenv').config()
app.use(cors())
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use('/',router)
app.get('/',(req,res)=> res.send('hii'))
// const io = new Server(server,{
//     cors:{
//         origin:process.env.CLIENT_URL,
//         methods:["GET","POST"]
//     }
// })
// io.on('connection', (socket) => {
//     console.log('A user connected');
//     // Additional event handling here...
//   });

app.listen(port,()=>{
    console.log('app listening on port '+port)
})