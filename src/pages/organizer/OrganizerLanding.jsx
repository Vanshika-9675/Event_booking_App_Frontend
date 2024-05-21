import React from 'react'
import Footerr from '../../components/Footerr';
import OrganizerHeader from '../../components/OrganizerHeader';
import Sidebar from '../../components/Sidebar';
import { useSelector } from 'react-redux';
import event from '../../assets/19594.jpg'
import '../styles/OrgLanding.css'
import { FaLongArrowAltRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


const OrganizerLanding = () => {
  const navigation = useNavigate();

  const handleGetStarted =()=>{
     navigation('/orgLogin')
  }

  return (
    <div className='wrapperParent'>
        <OrganizerHeader/>
        <div className='orgHero'>
        <div className='organizerText'>
           <p>Create unforgettable experiences with Book & Bash</p>
            <h1>Let us bring your vision to life!</h1>
            <button onClick={handleGetStarted}>Get Started <FaLongArrowAltRight />
           </button>
        </div>
        <div className='organizeImg'>
          < img src={event} alt=""/>
        </div>
        </div>
       
    </div>
  )
}

export default OrganizerLanding