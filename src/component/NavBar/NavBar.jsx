import React from 'react'
import './NavBar.css';
import Link from "next/link";
import {links} from "./data.js";
import Button from '../elements/Button/Button';
import Logo from '../elements/logo';
import DarkMode from '../DarkModeToggle/DarkMode';

export default function NavBar() {
  return (
    <nav className="containernav">
      <div className="left-side">
        <Logo />
      </div>
      <div className="right-side">
        <div className="links-container">
        <DarkMode />
          {links.map(link=>
             <Link key={link.id} href={link.url} className="links">{link.title}</Link>
          )}
        </div>
        
        <Button />
      </div>
    </nav>
  )
}