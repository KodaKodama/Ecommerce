import React from 'react'
import { IoMdMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
        <div className='menu'>
            <IoMdMenu size={30} />
        </div>

        <div className="logo">
            <h1>
                <Link to='/'>My shop</Link>
            </h1>
        </div>

        <ul>
            <li><Link to='/'>Products</Link></li>
            <li><Link to='/login'>Login or Register</Link></li>

            <li>
                <IoMdClose size={30} className='menu' />
            </li>
        </ul>

        <div className='cart-icon'>
            <span>0</span>
            <Link><IoCartOutline size={30} /></Link>
        </div>
    </header>
  )
}

export default Header