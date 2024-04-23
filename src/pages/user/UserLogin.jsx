import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Auth.css'
import Headerr from '../../components/Headerr';
import Footerr from '../../components/Footerr';
import { useDispatch ,useSelector } from 'react-redux'; 
import {userLogin , STATUSES} from '../../store/userSlice'; 
import { useNavigate } from 'react-router-dom';

function UserLogin() {
  
  const { status } = useSelector((state) => state.user);
  const dispatch = useDispatch(); 

  const navigation = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(userLogin({ email, password })).unwrap()
    .then(()=>{
      navigation('/user');
    }).catch(()=>{
      console.error('Failed to log in:', error);
      alert('Login failed: ' + error.toString());
    }) 
  };
  
  if (status === STATUSES.LOADING){
    return <h2>LOADING.....</h2>;
  }

  if (status === STATUSES.ERROR){
      return <h2>Something went wrong...</h2>;
  }


  return (
    <>
    <Headerr/>
     <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button className='btn' type="submit">Log In</button>
        <p>
          Don't have an account? <Link to="/userSignup">Sign up</Link>
        </p>
      </form>
    </div>
    <Footerr/>
    </>
   
  );
}

export default UserLogin;
