import React from 'react'
import News from '../images/image.png'
export default function Header() {
  return (
    <div className='flex items-center justify-around gap-20 mt-3 shadow'>
        <div>
          <a href="#">
          <img width={70} height={70} src={News} alt="News Logo" />
          </a>
        </div>
        <div>
          <h2 className='text-blue-600 text-3xl font-[Parkinsans]'>Welcome to Our Website</h2>
        </div>
    </div>
  )
}
