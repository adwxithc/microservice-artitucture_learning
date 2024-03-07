
import React from 'react'
import CreatePost from './Components/CreatePost'
import PostList from './Components/PostList'
import './App.css'
function App() {
  return (
    <div className='container'>
      <div className='create-area '>
        <h1>Create post</h1>
        <CreatePost />
        <PostList />
      </div>


    </div>
  )
}

export default App
