import React, { ReactChild } from 'react'
import Navbar from './Navbar'

interface IProps {
    children: ReactChild
}

const Layout = ({ children }: IProps) => {
    return (
        <div className="relative">
            <Navbar />
            <div>
                {children}
            </div>
        </div>
    )
}

export default Layout