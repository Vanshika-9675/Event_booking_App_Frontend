import React from 'react'
import OrganizerHeader from '../../components/OrganizerHeader'
import Sidebar from '../../components/Sidebar'
import Footerr from '../../components/Footerr'

const AddEvents = () => {
  return (
    <div>
    <OrganizerHeader/>
    <h1 style={{textAlign:'center'}}>Add new Events</h1>
    <Sidebar role={'organizer'}/>
     <Footerr/>
  </div>
  )
}

export default AddEvents;