import React from 'react'
import OrganizerHeader from '../../components/OrganizerHeader'
import Sidebar from '../../components/Sidebar'
import Footerr from '../../components/Footerr'

const OrgDashboard = () => {
    return (
        <div>
        <OrganizerHeader/>
        <h1 style={{textAlign:'center'}}>Organizer Dashboard</h1>
        <Sidebar role={'organizer'}/>
         <Footerr/>
      </div>
      )
}

export default OrgDashboard