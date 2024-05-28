import React from 'react'
import Header from '../header/Header'

const MainLayout = ({ children }) => {
    return (
        <>
            <Header/>
            {children}
            {/* <Footer/> Todavia no existe */}
        </>
    )
}

export default MainLayout