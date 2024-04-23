import React from 'react'
import OrganizerHeader from '../../components/OrganizerHeader'
import Sidebar from '../../components/Sidebar'
import Footerr from '../../components/Footerr'

const OrgAnalytics = () => {
  return (
    <div>
    <OrganizerHeader/>
    <h1 style={{textAlign:'center'}}>Analytics</h1>
    <Sidebar role={'organizer'}/>
     <Footerr/>
  </div>
  )
}

export default OrgAnalytics