import React from 'react'
import { NavLink } from 'react-router-dom'
import "./NavBar.css"
export default function NavBar() {
  return (
    <>
      <ul className="navbarList">
        <li><NavLink to={"/contact"}>Contacts</NavLink></li>
        <li><NavLink to={"/addcontact"}>Add contact</NavLink></li>
      </ul>
    </>
  )
}
