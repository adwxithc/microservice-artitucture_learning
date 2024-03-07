const express = require('express')
const app = express()
const axios = require('axios')

const bodyParser = require('body-parser')


app.use(bodyParser.json())
const events =[]

app.post('/events',async(req,res)=>{ 

    const event = req.body
    try {
        events.push(event)
       
        await axios.post(`http://posts-clusterip-srv:4000/events`,event)
        await axios.post(`http://comments-srv:4001/events`,event)
        await axios.post(`http://query-srv:4002/events`,event)
        await axios.post(`http://moderation-srv:4003/events`,event)
        
        res.send({})
    } catch (error) {
        console.log(error);
    }

    
})

app.get('/events',async(req,res)=>{
    res.send(events)
})

app.listen(4005,()=>{
    console.log('listening at-> 4005');

    
})