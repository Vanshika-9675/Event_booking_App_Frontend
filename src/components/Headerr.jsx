import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../store/userSlice';


function Headerr() {

  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const dispatch = useDispatch();

    const navigation = useNavigate();
 
    const handleLogout = ()=>{
         dispatch(logoutUser());
         navigation('/');
    }

  return (
    <div className="header">
      <Link className='logo' to="/user">BookN'Bash</Link>
      <div>
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/userLogin"><button>Login</button></Link>
            <Link to="/userSignUp"><button>Signup</button></Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Headerr;