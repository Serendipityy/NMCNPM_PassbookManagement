
import React, {useRef} from 'react'
import logo from '../../assets/images/finance_1992217.png'
import './sidebar.css'
// https://www.npmjs.com/package/reactstrap
// https://remixicon.com/
import { FaHome } from "react-icons/fa";
// import {AiFillHome} from 'react-icons/ai'
import {IoIosCreate} from 'react-icons/io'
import {FaListAlt} from 'react-icons/fa'
import {BiSolidReport, BiSolidNote} from 'react-icons/bi'
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { FaMoneyCheckDollar } from "react-icons/fa6";

import {NavLink, Link} from 'react-router-dom'

const NAV__LINKS = [
    {
        display: 'Home',
        icon:  <FaHome />,
        url: '/home'
    },
    {
        display: 'Create',
        icon:  <IoIosCreate/>,
        url: '/create'
    },
    {
        display: 'Deposit Slip',
        icon:  <FaMoneyBillTransfer />,
        url: '/deposit'
    },
    {
        display: 'Withdrawal Slip',
        icon:  <FaMoneyCheckDollar />,
        url: '/withdraw'
    },
    {
        display: 'Passbook List',
        icon:  <FaListAlt/>,
        url: '/passbook-list'
    },
    {
        display: 'Reports',
        icon:  <BiSolidReport/>,
        url: '/reports',
    },
        {
        display: 'Regulation Changes',
        icon:  <BiSolidNote/>,
        url: '/regulation-changes',
    },
]
const Sidebar = () => {
    const sidebarRef = useRef(null)

    const menuRef = useRef(null)
  
    return (
    <div className='sidebar' ref={sidebarRef}>
        <div className='logo' >
            <img 
                src={logo}
                alt='logo'
            />
            <span>EarnTogether</span>
        </div>


        <div className='nav__menu' ref={menuRef} >
            <ul className='nav__list'>
                {NAV__LINKS.map((item, index) => (
                    <li className='nav__item' key={index}>
                        <NavLink 
                            to={item.url} 
                            className={navClass => 
                                navClass.isActive ? 'active' : ''
                            }
                        >
                            <span className='icon'>
                                {item.icon}
                            </span>
                            <span className='text'>
                                {item.display}
                            </span>
                        </NavLink>
                    </li>
                ))}                   
            </ul>
        </div>

        </div>

  )
}

export default Sidebar