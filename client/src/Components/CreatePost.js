import React, { useState } from 'react'
import axios from 'axios'
import './CreatePost.css'
function CreatePost() {
    const [title,setTitle] = useState('')
    const handleSubmit = async(e)=>{
        e.preventDefault()
        await axios.post('http://posts.com/posts/create',{
            title
        })
        
        setTitle('')
    }
  return (
    <div>
      <form className='form-group' onSubmit={handleSubmit}>
        <input placeholder='post title..' value={title} className=' p-3  border-0' type="text" name="" onChange={e=>setTitle(e.target.value)} />
        <button type='submit' className='px-5 py-3 ml-2  border-0'>submit</button>
      </form>
    </div>
  )
}

export default CreatePost
