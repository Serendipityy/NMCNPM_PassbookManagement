import React from 'react'
import { Col } from 'reactstrap'
import Sidebar from '../sidebar/Sidebar'
import Routers from '../../router/Routers'

import './layout.css'

const Layout = () => {
  return (
    <>
        <div className='layout__container d-flex'>
            <Col lg='3' className='sidebarCol'>
                <Sidebar />
            </Col>

            <Col lg='9'>
                <Routers />
            </Col>
        </div>
    </>
  )
}

export default Layout