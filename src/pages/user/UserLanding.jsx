import React, { useEffect, useState } from 'react'
import Footerr from '../../components/Footerr';
import Headerr from '../../components/Headerr';
import Sidebar from '../../components/Sidebar';
import { useSelector } from 'react-redux';
import Events from './Events';

const UserLanding = () => {
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  return (
    <div className='landing-wrapper'>
    <Headerr />
    <section style={{ display: 'flex'}}>
      {isLoggedIn && (
        <div style={{flexBasis:'10%'}}>
          <Sidebar role="user" />
        </div>
      )}
      <div style={{flex:'1',flexShrink:'1', padding: '20px' }}>
        <Events />
      </div>
    </section>
    <Footerr />
  </div>

  )
}

export default UserLanding