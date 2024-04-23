import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Headerr from '../../components/Headerr';
import '../styles/Auth.css'
import Footerr from '../../components/Footerr';
import { userSignup, STATUSES} from '../../store/userSlice'; 
import { useNavigate } from 'react-router-dom';
import { useDispatch ,useSelector } from 'react-redux'; 

function UserSignup() {
  const [userName, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { status } = useSelector((state) => state.user);
  const dispatch = useDispatch(); 

  const navigation = useNavigate();

  const handleSignup = (event) => {
    event.preventDefault();
    dispatch(userSignup({ userName, email, password }))
        .unwrap()
        .then(() => {
            navigation('/user');
        })
        .catch((error) => {
            console.error('Failed to sign up:', error);
            alert('Failed to sign up'+ error.toString());
        });

};

  if (status === STATUSES.LOADING){
    return <h2>LOADING.....</h2>;
   }

  // if (status === STATUSES.ERROR){
  //     return <h2>Something went wrong...</h2>;
  // }


  return (
    <>
    <Headerr/>
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
          Already have an account? <Link to="/userLogin">Log in</Link>
        </p>
      </form>
    </div>
    <Footerr/>
    </>
    
  );
}

export default UserSignup;
