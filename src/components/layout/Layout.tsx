import React, { ReactNode } from 'react' 
import Footer from '../organisms/Footer' 
import { Navbar } from '../organisms/Navbar'

export const Layout = ({children}:{children: ReactNode}) => {
  return (
    <div>
      <Navbar />
      <div className='mt-20'/>
      {children}
      <Footer/>
    </div>
  )
}
 