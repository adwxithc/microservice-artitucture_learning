const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const axios = require('axios')

app.use(bodyParser.json())

app.post('/events',async(req, res)=>{
    const {type, data} = req.body
    if(type === 'CommentCreated'){
        
        const {content,id, postId} = data
        const status = content.includes('orange')?'Rejected':'Approved'

        await axios.post(`http://event-bus-srv:4005/events`,{
            type:'CommentModerated',
            data:{
                id, 
                postId,
                content,
                status
            }
        })
        
    }
    res.send({})
})

app.listen(4003,()=>{
    console.log('listening at port 4003');
})