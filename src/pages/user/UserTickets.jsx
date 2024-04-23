import React from 'react'
import Headerr from '../../components/Headerr'
import Footerr from '../../components/Footerr'
import Sidebar from '../../components/Sidebar'

const UserTickets = () => {
  return (
    <div>
    <Headerr/>
    <h1 style={{textAlign:'center'}}>User Tickets</h1>
    <Sidebar role={'user'}/>
     <Footerr/>
  </div>
  )
}

export default UserTickets