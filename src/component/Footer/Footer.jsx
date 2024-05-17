import Image from 'next/image'
import React from 'react'
import './Footer.css';
import { social_media } from './data';
export default function Footer() {
  return (
    <div className="flex it">
      <div>copyright&copy; reserved by onlineshop team</div>
      <div className='social'>
      
       {social_media.map(media=>
        <Image key={media.id} src={`/assets/${media.name}.png`}
        width={25}
        height={25}
        alt={`onlineshop ${media.name}`}/>
       )}
     
      
      </div>
    </div>
  )
}

