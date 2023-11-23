import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'

import Home from '../pages/Home'
import Create from '../pages/Create'
import Deposit from '../pages/Deposit'
import Withdraw from '../pages/Withdraw'
import PassbookList from '../pages/PassbookList'
import RegulationChange from '../pages/RegulationChange'

const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/home' />}/>
      <Route path='/home' element={<Home />} />
      <Route path='/create' element={<Create />} />
      <Route path='/deposit' element={<Deposit />} />
      <Route path='/withdraw' element={<Withdraw />} />
      <Route path='/passbook-list' element={<PassbookList />} />
      <Route path='/regulation-change' element={<RegulationChange />} />

    </Routes>
  )
}

export default Routers