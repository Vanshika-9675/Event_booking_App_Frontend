import React from 'react'
import Footerr from '../../components/Footerr';
import OrganizerHeader from '../../components/OrganizerHeader';
import Sidebar from '../../components/Sidebar';
import { useSelector } from 'react-redux';

const OrganizerLanding = () => {
  const isLoggedIn = useSelector(state => state.organizer.isLoggedIn);
  return (
    <div className='wrapperParent'>
        <OrganizerHeader/>
         <h1 style={{textAlign:'center'}}>Organizer Landing Page</h1>
         {isLoggedIn && <Sidebar role={'organizer'}/>}
    </div>
  )
}

export default OrganizerLanding