import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import OrganizerHeader from '../../components/OrganizerHeader';
import Footerr from '../../components/Footerr';
import Sidebar from '../../components/Sidebar';
import { editOrganizerProfile, deleteOrganizerProfile } from '../../store/organizerSlice';

const OrgProfile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const dispatch = useDispatch();
    const navigate = useNavigate();  
  
    const handleNameChange = (e) => setName(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
  
    const updateName = async () => {
      try {
        await dispatch(editOrganizerProfile({ userName: name })).unwrap();
        alert(`Name updated to: ${name}`);
        setName("");
      } catch (error) {
        alert(`Failed to update name: ${error.message || error.toString()}`);
        setName("");
      }
    };
  
    const updateEmail = async () => {
      try {
        await dispatch(editOrganizerProfile({ email })).unwrap();
        alert(`Email updated to: ${email}`);
        setEmail("");
      } catch (error) {
        alert(`Failed to update email: ${error.message || error.toString()}`);
        setEmail("");
      }
    };
  
    const updatePassword = async () => {
      try {
        await dispatch(editOrganizerProfile({ password })).unwrap();
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
          await dispatch(deleteOrganizerProfile()).unwrap();
          alert('Profile deleted successfully!');
          navigate('/'); 
        } catch (error) {
          alert(`Failed to delete profile: ${error.message || error.toString()}`);
        }
      }
    };

  return (
    <div className='wrapperParent'>
    <OrganizerHeader/>
    <h1 style={{textAlign:'center'}}>Manage Profile</h1>
    <Sidebar role={'organizer'}/>
    <div className="main-content">
      <div className="profile-section">
        <label>
          <input type="text" value={name} onChange={handleNameChange} placeholder='Enter updated Organizer name..' />
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
  )
}

export default OrgProfile