import React, { useState } from 'react'
import Headerr from '../../components/Headerr'
import '../styles/Auth.css'
import { useLocation ,useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Bookticket} from '../../store/BookingSlice'
import Sidebar from '../../components/Sidebar'
import { toast } from 'react-toastify';

const PersonalInfo = () => {
    const [email,setEmail] = useState('');
    const [userName,setName] = useState('');
    const location = useLocation();
    const cartTickets = location.state.data;
    const dispatch = useDispatch();
    const { eventId } = useParams();

    const handleBookTickets = async(e)=>{
        e.preventDefault();
           cartTickets.map((ticketId) => {
              const payload = {
                ticketId,
                eventId,
                userName,
                email
              };
            dispatch(Bookticket(payload)) .unwrap()
                .then(() => {
                   toast.success("Booking Successful!!");  
                   setEmail("");
                   setName("");                
                })
                .catch((err) => {
                   toast.error(`Error booking ticket ${ticketId}:`, err);
                });
            });
        }

  return (
    <div>
        <Headerr/>     
        <div className='personal-info-container'>
        <Sidebar/>
        <div className="personal-container">
      <form onSubmit={handleBookTickets}>
        <h2>Personal Information</h2>
        <div>
          <label>Name</label>
          <input type="text" value={userName} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <button className='btn' type="submit">Book Tickets</button>
      </form>
       </div>
        </div>
    </div>
  )
}

export default PersonalInfo