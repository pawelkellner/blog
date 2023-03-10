import React, { Children } from 'react'
import Nav from '../Nav/Nav'

const Layout = (props) => {
  return (
        <>
        <Nav />
        {props.children}
        </>
    )
}

export default Layout