const express = require('express')
const app = express()
const {randomBytes} = require('crypto')
const bodyParser = require('body-parser')
const axios = require('axios')
const cors =  require('cors')

const posts={}

app.use(bodyParser.json())
app.use(cors())

app.get('/posts',(req, res)=>{
    res.send(posts)
})

app.post('/posts/create',async(req, res)=>{ 
    const id= randomBytes(4).toString('hex')
    const {title} = req.body

    posts[id] = {
        id, 
        title
    }
    try {
        await axios.post(`http://event-bus-srv:4005/events`,{
            type:'PostCreated',
            data:{
                id,  
                title
            }
        })
        
        res.status(201).send(posts[id])
    } catch (error) {
        console.log(error);
    }

    
})
app.post('/events',async(req, res)=>{
    console.log('event received ',req.body.type);
    res.send({})
})

app.listen(4000,()=>{
    console.log('version 59 latest version')
    console.log('listening at port 4000');
})