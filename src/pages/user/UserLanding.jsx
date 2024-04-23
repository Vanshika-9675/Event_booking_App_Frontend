import React, { useEffect, useState } from 'react'
import Footerr from '../../components/Footerr';
import Headerr from '../../components/Headerr';
import Sidebar from '../../components/Sidebar';
import { useSelector } from 'react-redux';

const UserLanding = () => {
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  return (
    <div>
        <Headerr/>
         <h1 style={{textAlign:'center'}}>User Landing Page</h1>
         {isLoggedIn && <Sidebar role={'user'}/>}
         <Footerr/>
    </div>
  )
}

export default UserLanding