import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './PostList.css'
import CreateComment from './CreateComment'
import ListComments from './ListComments'
function PostList() {
    const [posts, setPosts] = useState({})
    const fetchPostList= async()=>{
        const res = await axios.get('http://posts.com/posts')
        setPosts(res.data)
        console.log(res.data);
    }
    useEffect(()=>{
        fetchPostList()
    },[])
    const fetchedList = Object.values(posts).map(post=>{
        return (
        <div className='card p-3 m-1 rounded ' key={post.id}>
            <div className='cardBody'>
                <h3>{post.title}</h3>
            </div>
            <div>
                <ListComments comments={post.comments} />
            </div>
            <div>
                <CreateComment postId={post.id} />
            </div>
        
        </div>)
    })
  return (
    <div className='d-flex flex-row flex-wrap '>
      {fetchedList}
    </div>
  )
}

export default PostList
