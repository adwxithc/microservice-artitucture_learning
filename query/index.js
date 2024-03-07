const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const axios = require('axios')
const cors =  require('cors')

app.use(cors())
app.use(bodyParser.json())
const posts = {}

const handleEvent=(type, data)=>{
    if(type==='PostCreated'){
        const {id, title} = data
        posts[id] = {id, title, comments:[]}


    }else if(type==='CommentCreated'){
        
        const {id, content, postId, status} = data
        const post = posts[postId.toString(10)]
        post.comments.push({id, content, status})
        
    }else if(type === 'CommentUpdated'){
        console.log('CommentUpdated');
        const {postId,id, status} =data
       const post =posts[postId]
        const comment = post.comments.find(comment=>comment.id==id)
        comment.status=status
    }
}

app.get('/posts',(req, res)=>{ 
    res.send(posts)

})

app.post('/events',(req, res)=>{

    const {type, data} = req.body
    handleEvent(type, data)
    res.send({})
})

app.listen(4002,async()=>{
    console.log('listening at 4002');
    const res = await axios.get(`http://event-bus-srv:4005/events`)
    for(const event of res.data){
        console.log('processing events...',event.type);
        handleEvent(event.type, event.data)
    }
})