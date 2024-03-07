import React, { useState } from 'react'
import axios from 'axios'
import './CreateComment.css'

function CreateComment({postId}) {
    const [content , setContent] = useState('')
    const handleSubmit =async(e)=>{

        e.preventDefault()
       
        await axios.post(`http://posts.com/posts/${postId}/comments`,{
            content
        })
        setContent('')
    }
   
  return (
    <div>
        <form className='comment' onSubmit={handleSubmit}>
        <input value={content} className='border-0 rounded' type="text" name="" onChange={e=>setContent(e.target.value)} />
        <button type='submit' className=' border-0 ml-2  '>submit</button>
      </form>
    </div>
  )
}

export default CreateComment
