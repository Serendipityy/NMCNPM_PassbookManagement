import React from 'react'
import './common.css'


const Common = ({title, desc}) => {
  return (
    <div className='common'>
        <h1>{title}</h1>
        <p>{desc}</p>
    </div>
  )
}

export default Common