import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Auth.css'
import Headerr from '../../components/Headerr';
import Footerr from '../../components/Footerr';
import { useDispatch ,useSelector } from 'react-redux'; 
import {userLogin , STATUSES} from '../../store/userSlice'; 
import { useNavigate } from 'react-router-dom';
import {Hourglass} from 'react-loader-spinner';

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
      navigation('/dashboard');
    }).catch(()=>{
      console.error('Failed to log in:', error);
      alert('Login failed: ' + error.toString());
    }) 
  };

  return (
    <div className='wrapperParent'>
    <Headerr/>
    {status === STATUSES.LOADING && (
            <div className="loader">
              <Hourglass
                className="hourglass"
                visible={true}
                height="80"
                width="80"
                ariaLabel="hourglass-loading"
                wrapperStyle={{}}
                wrapperClass=""
                colors={["#C30202", "#C30202"]}
              />
            </div>
       )}
          {status === STATUSES.ERROR && <p>Error: {error}</p>}
     <div className={status === STATUSES.LOADING?"invisible":"login-container"}>
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
    </div>
   
  );
}

export default UserLogin;
