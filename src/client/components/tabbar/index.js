import React from 'react';
import { Router, Link } from "@reach/router"
import './style.css'

const TabBar = () => {
  return ( 
    <nav className='__tabbar'>
      <Link to='/'>Home</Link>
      <Link to='dashboard'>Dashboard</Link>
      <Link to='profile'>Profile</Link>
    </nav>
   );
}
 
export default TabBar;