import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutOrganizer } from '../store/organizerSlice';

const OrganizerHeader = () => {
  
    const isLoggedIn = useSelector(state => state.organizer.isLoggedIn);
    const dispatch = useDispatch();
  
      const navigation = useNavigate();
   
      const handleLogout = ()=>{
           dispatch(logoutOrganizer());
           navigation('/');
      }
  
    return (
      <div className="header">
        <Link className='logo' to="/organizer">BookN'Bash</Link>
        <div>
          {isLoggedIn ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <Link to="/orgLogin"><button>Login</button></Link>
              <Link to="/orgSignup"><button>Signup</button></Link>
            </>
          )}
        </div>
      </div>
    );
}

export default OrganizerHeader