import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Auth.css'
import Footerr from '../../components/Footerr';
import { organizerRegister , STATUSES} from '../../store/organizerSlice'; 
import { useNavigate } from 'react-router-dom';
import { useDispatch ,useSelector } from 'react-redux'; 
import OrganizerHeader from '../../components/OrganizerHeader';
import {Hourglass} from 'react-loader-spinner';

const OrgSignup = () => {
  const [userName, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { status } = useSelector((state) => state.organizer);
  const dispatch = useDispatch(); 

  const navigation = useNavigate();

  const handleSignup = (event) => {
    event.preventDefault();
    dispatch(organizerRegister({ userName, email, password }))
        .unwrap()
        .then(() => {
            navigation('/organizer');
        })
        .catch((error) => {
            console.error('Failed to sign up:', error);
            alert('Signup failed: ' + error.toString());
        });

};

  if (status === STATUSES.LOADING){
    return <div className='loader'>
    <Hourglass
    className='hourglass'
 visible={true}
 height="80"
 width="80"
 ariaLabel="hourglass-loading"
 wrapperStyle={{}}
 wrapperClass=""
 colors={['#C30202', '#C30202']} 
 />
 </div>;
   }

  // if (status === STATUSES.ERROR){
  //     return <h2>Something went wrong...</h2>;
  // }


  return (
    <div className='wrapperParent'>
    <OrganizerHeader/>
    <div className="signup-container">
      <form onSubmit={handleSignup}>
        <h2>Sign Up</h2>
        <div>
          <label>Name</label>
          <input type="text" value={userName} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button className='btn' type="submit">Sign Up</button>
        <p>
          Already have an account? <Link to="/orgLogin">Log in</Link>
        </p>
      </form>
    </div>
    </div>
    
  );
}

export default OrgSignup