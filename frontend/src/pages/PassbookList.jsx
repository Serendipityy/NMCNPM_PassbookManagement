import React from 'react'
import List from '../components/table/Table'
import Common from '../shared/Common'
import { Col } from 'reactstrap'
import '../styles/passbook-list.css'


const PassbookList = () => {
  return (
    <div className='passbook__container'>
      <Common 
        title={"List of passbook"} 
        desc={"Explore comprehensive passbook list information for customers in the system"}
      />
      <div className='passbook__list'>
        <List />
      </div>
    </div>
  )
}

export default PassbookList