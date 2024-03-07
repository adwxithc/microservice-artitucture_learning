const express = require('express')
const app = express()
const {randomBytes} = require('crypto')
const bodyParser = require('body-parser')
const cors =require('cors')
const axios = require('axios')
const commentsByPostId={}

app.use(bodyParser.json())
app.use(cors())

app.post('/posts/:id/comments',async(req, res)=>{
    const cId = randomBytes(4).toString('hex')
    const {content} = req.body
    const comments = commentsByPostId[req.params.id] || []
    comments.push({id:cId,content,status:'Pending'})
    commentsByPostId[req.params.id]  = comments
    
    try {
        await axios.post(`http://event-bus-srv:4005/events`,{
            type:'CommentCreated',
            data:{
                id:cId, 
                postId:req.params.id,
                content,
                status:'Pending'
            }
        })
        res.send(comments)
    } catch (error) {
        console.log(error);
    }

})
app.get('/posts/:id/comments',(req, res)=>{

    res.send(commentsByPostId[req.params.id] || []);
})

app.post('/events',async(req, res)=>{
    const {type,data} =req.body
    console.log('event received ',type);
    if(type==='CommentModerated'){
        const {postId,id, status, content} =data
        const comments=commentsByPostId[postId]
        const comment =comments.find(comment=>comment.id==id)
        comment.status=status

        await axios.post(`http://event-bus-srv:4005/events`,{
            type:'CommentUpdated',
            data:{
                postId,
                id,
                status,
                content
            }
        })
    }
    res.send({})
})

app.listen(4001,()=>{
    console.log('listening on 4001');
})