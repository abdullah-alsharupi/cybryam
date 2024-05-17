'use client';
import "./Button.css";

export default function Button(){
    return (
        <button className='logout' onClick={()=>{console.log('logout')}}>logout</button>
    );
}