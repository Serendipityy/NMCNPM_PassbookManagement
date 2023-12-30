
import React, { useRef, useState } from 'react'
import logo from '../../assets/images/finance_1992217.png'
import './sidebar.css'
// https://www.npmjs.com/package/reactstrap
// https://remixicon.com/
import { FaHome } from "react-icons/fa";
// import {AiFillHome} from 'react-icons/ai'
import { IoIosCreate } from 'react-icons/io'
import { FaListAlt } from 'react-icons/fa'
import { BiSolidReport, BiSolidNote } from 'react-icons/bi'
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { NavLink, Link } from 'react-router-dom'

const NAV__LINKS = [
    {
        display: 'Home',
        icon: <FaHome />,
        url: '/home'
    },
    {
        display: 'Create',
        icon: <IoIosCreate />,
        url: '/create'
    },
    {
        display: 'Deposit Slip',
        icon: <FaMoneyBillTransfer />,
        url: '/deposit'
    },
    {
        display: 'Withdrawal Slip',
        icon: <FaMoneyCheckDollar />,
        url: '/withdraw'
    },
    {
        display: 'Passbook List',
        icon: <FaListAlt />,
        url: '/passbook-list'
    },
    {
        display: 'Reports',
        icon: <BiSolidReport />,
        url: '/reports',
        submenus: [
            {
                display: 'Daily Turnover',
                icon: <IoIosArrowForward />,
                url: '/reports/daily-turnover',
            },
            {
                display: 'Monthly Close/Open',
                icon: <IoIosArrowForward />,
                url: '/reports/monthly-reports',
            },
        ],
    },
    {
        display: 'Regulation Changes',
        icon: <BiSolidNote />,
        url: '/regulation-changes',
    },
]

const Sidebar = () => {
    const sidebarRef = useRef(null);
    const menuRef = useRef(null);
    const [activeMenu, setActiveMenu] = useState(null);

    // const toggleSubMenu = (index) => {
    //     setActiveMenu((prevActiveMenu) => (prevActiveMenu === index ? null : index));
    // };

    const toggleSubMenu = (index) => {
        setActiveMenu((prevActiveMenu) => {
            // Check if the clicked item is a submenu
            if (NAV__LINKS[index].submenus) {
                return prevActiveMenu === index ? null : index;
            } else {
                // If it's not a submenu, set activeMenu to null
                return null;
            }
        });
    };

    
    return (
        <div className='sidebar' ref={sidebarRef}>
            <div className='logo' >                 
                <img
                    src={logo}
                    alt='logo'
                />
                <span>EarnTogether</span>
            </div>

            <div className='nav__menu' ref={menuRef}>
                <ul className='nav__list'>
                    {NAV__LINKS.map((item, index) => (
                        <React.Fragment key={index}>
                            <li className='nav__item' onClick={() => toggleSubMenu(index)}>
                                {item.submenus ? (
                                    <Link to="#" onClick={(e) => e.preventDefault()} className={(navClass) => (navClass.isActive && activeMenu === null ? 'active' : '')}>
                                        <span className='icon'>{item.icon}</span>
                                        <span className='text'>{item.display}</span>
                                    </Link>
                                ) : (
                                    <NavLink to={item.url} className={(navClass) => (navClass.isActive && (!item.submenus || activeMenu === null) ? 'active' : '')}>
                                        <span className='icon'>{item.icon}</span>
                                        <span className='text'>{item.display}</span>
                                    </NavLink>
                                )}
                            </li>
                            {activeMenu === index && item.submenus && (
                                <ul className='submenu'>
                                    {item.submenus.map((submenuItem, subIndex) => (
                                        <li className='nav__item' key={subIndex}>
                                            <NavLink to={submenuItem.url}>
                                                <span className='icon'>{submenuItem.icon}</span>
                                                <span className='text'>{submenuItem.display}</span>
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </React.Fragment>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar


