'use client'
import { useContext, useState } from 'react';
import './DarkMode.css';
import { ThemeContext } from './ThemeContext';
export default function DarkMode(){
    const {toggle,mode}=useContext(ThemeContext)
    return (
        <div className="container" onClick={toggle}>
            <div className="icon">🌙</div>
            <div className="icon">🌚</div>
            <div className="switcher" style={mode==="dark"? {right:"2px"}:{left:"2px"}}/>

        </div>

    );
}