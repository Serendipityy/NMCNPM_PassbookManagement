import React from 'react'
import List from '../components/table/Table'
import Common from '../shared/Common'
import { Col } from 'reactstrap'
import '../styles/passbook-list.css'


const PassbookList = () => {
  return (
    <div className='passbook__container'>
      <Common title={"List of passbook"} />
      <div className='passbook__list'>
        <List />
      </div>
    </div>
  )
}

export default PassbookList