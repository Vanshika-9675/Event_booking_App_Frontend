import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Headerr from '../../components/Headerr';
import Footerr from '../../components/Footerr';
import Sidebar from '../../components/Sidebar';
import { editProfile, deleteProfile } from '../../store/userSlice';

const UserProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();  

 
  const user = useSelector(state => state.user.data); 

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const updateName = async () => {
    try {
      await dispatch(editProfile({ userName: name })).unwrap();
      alert(`Name updated to: ${name}`);
      setName("");
    } catch (error) {
      alert(`Failed to update name: ${error.message || error.toString()}`);
      setName("");
    }
  };

  const updateEmail = async () => {
    try {
      await dispatch(editProfile({ email })).unwrap();
      alert(`Email updated to: ${email}`);
      setEmail("");
    } catch (error) {
      alert(`Failed to update email: ${error.message || error.toString()}`);
      setEmail("");
    }
  };

  const updatePassword = async () => {
    try {
      await dispatch(editProfile({ password })).unwrap();
      alert('Password updated.');
      setPassword("");
    } catch (error) {
      alert(`Failed to update password: ${error.message || error.toString()}`);
      setPassword("");
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        await dispatch(deleteProfile()).unwrap();
        alert('Profile deleted successfully!');
        navigate('/'); 
      } catch (error) {
        alert(`Failed to delete profile: ${error.message || error.toString()}`);
      }
    }
  };

  return (
    <div className='wrapperParent'>
      <Headerr/>
      
      <Sidebar  style={{ flex: '0 0 15%'}} role={'user'}/>
      <div  style={{ flex: 1}} className="main-content">
      <h1 style={{textAlign:'center'}}>Manage Profile</h1>
        <div className="profile-section">
          <label>
            <input type="text" value={name} onChange={handleNameChange} placeholder='Updated UserName..' />
            <button className='btn' onClick={updateName}>Update</button>
          </label>
        </div>
        <div className="profile-section">
          <label>
            <input type="email" value={email} onChange={handleEmailChange} placeholder='Updated Email..' />
            <button className='btn' onClick={updateEmail}>Update</button>
          </label>
        </div>
        <div className="profile-section">
          <label>
            <input type="password" value={password} onChange={handlePasswordChange} placeholder='Updated Password..'/>
            <button className='btn' onClick={updatePassword}>Update</button>
          </label>
        </div>
        <div className="delete">
          <button className='btn' onClick={handleDeleteAccount}>DELETE ACCOUNT</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
