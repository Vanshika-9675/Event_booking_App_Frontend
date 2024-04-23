import React from 'react'
import Headerr from '../../components/Headerr'
import Footerr from '../../components/Footerr'
import Sidebar from '../../components/Sidebar'
import { useSelector } from 'react-redux'

const Events = () => {

  return (
    <div>
      <Headerr/>
      <h1 style={{textAlign:'center'}}>Events</h1>
      <Sidebar role={'user'}/>
       <Footerr/>
    </div>
  )
}

export default Events