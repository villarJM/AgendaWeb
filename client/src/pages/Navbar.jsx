import React, { useState } from 'react'
import '../Navbar.css'
import {Link, Outlet, useLocation, useNavigate} from 'react-router-dom'

const Navbar = () => {
  const hoverSelect = () => {
    const table = document.querySelector(`[href='/Appoinment']`)
    table.classList.toggle('hover-active');
  }
  const changetheme = () => {
    const theme = document.querySelector('.icon');
    const navegation = document.querySelector('.Navigation')
    const card = document.querySelectorAll('.card')

    document.body.classList.toggle('themedark');
    navegation.classList.toggle('themedark')
    card.forEach(element => {
      element.classList.toggle('themedark')
    })
  }
  const navbar = () => {
    const navegation = document.querySelector('.Navigation')
    const toggle = document.querySelector('.toggle')
    navegation.classList.toggle('active');
    
    const option = document.querySelector('.option1')
    if (option !== null) {
      option.classList.toggle('active');
    }
    const hour = document.querySelectorAll('.hour')
    if (hour !== null) {
      hour.forEach(element => {
        element.classList.toggle('active');
      })
    }
    const home = document.querySelector('.dashboardCard')
    console.log(home);
    home.classList.toggle('activehome');
    
  }
  const Logout = () => {
    const logout = sessionStorage.clear();
  }
  return (
    <>
      <header>
            <nav className='Navigation'>
      <ul>
        <li>
          <Link to="/Home">
            <span className='icon'><ion-icon name="home-outline"></ion-icon></span>
            <span className='title'>Home</span>
          </Link>
        </li>
        <li>
          <Link to='/Appoinment' onClick={hoverSelect}>
            <span className='icon'><ion-icon name="add-circle-outline"></ion-icon></span>
            <span className='title'>Appointments</span>
          </Link>
        </li>
        <li>
          <Link to='/Diary'>
            <span className='icon'><ion-icon name="calendar-outline"></ion-icon></span>
            <span className='title'>Agenda</span>
          </Link>
        </li>
        <li>
          <Link to='/Patient'>
            <span className='icon'><ion-icon name="people-outline"></ion-icon></span>
            <span className='title'>Login</span>
          </Link>
        </li>
        <li>
          <Link to='/Users'>
            <span className='icon'><ion-icon name="person-add-outline"></ion-icon></span>
            <span className='title'>Users</span>
          </Link>
        </li>
        <hr className="mode-line"></hr>
        <li>
          <a href="Logout" onClick={Logout}>
            <span class="icon"><ion-icon name="log-in-outline"></ion-icon></span>
            <span class="title">Logout</span>
          </a>
        </li>
        <li>
          <a href="#" onClick={changetheme} >
            <span class="icon"><ion-icon name="moon-outline"></ion-icon></span>
            <span class="title">Dark Mode</span>
          </a>
        </li>
      </ul>
      <div className='toggle' onClick={navbar}></div>
    </nav>
    </header>
    <Outlet/>
    </>
  )
}

export default Navbar