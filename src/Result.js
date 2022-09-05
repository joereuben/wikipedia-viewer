import React from 'react'

export default function Result({title, pageid, snippet}) {
  return (
    <article className='item'>
      <div className='heading'>
        <span className="title">{title}</span>
        <span className="link">
            <a href={`https://en.wikipedia.org/?curid=${pageid}`} target="_blank" rel="noopener noreferrer" title='view full'>
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </a> 
        </span>
      </div>
      {/* <p>{snippet}</p> */}
      <div dangerouslySetInnerHTML={{__html: snippet}}>
        </div>
    </article>
  )
}
