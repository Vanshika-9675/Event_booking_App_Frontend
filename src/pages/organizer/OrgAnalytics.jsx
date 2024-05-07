import React from 'react'
import OrganizerHeader from '../../components/OrganizerHeader'
import Sidebar from '../../components/Sidebar'
import Footerr from '../../components/Footerr'

const OrgAnalytics = () => {
  return (
    <div  className='wrapperParent'>
    <OrganizerHeader/>
    <h1 style={{textAlign:'center'}}>Analytics</h1>
    <Sidebar role={'organizer'}/>
  </div>
  )
}

export default OrgAnalytics