import React from 'react'


function ListComments({comments}) {
   


    const renderedData = comments.map(comment=>{
      let content =''
      if(comment.status=='Approved'){
        content=comment.content
      }else if(comment.status=='Rejected'){
        content ='comment is rejected'
      }else{
        content='comment is waiting for moderation...'
      }
      return(
      
        <li key={comment.id}>{content}</li>
    )})
  return (
    
        <ul>
        {renderedData}
        </ul>
      
    
  )
}

export default ListComments
