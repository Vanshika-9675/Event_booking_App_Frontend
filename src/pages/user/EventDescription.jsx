import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchSingleEvent } from '../../store/eventsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { STATUSES } from '../../store/eventsSlice';
import Headerr from '../../components/Headerr';
import Footerr from '../../components/Footerr';
import '../styles/EventDetails.css'
import eventImg from '../../assets/event.jpg'
import { SlCalender } from "react-icons/sl";
import { CiLocationOn } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
import Sidebar from '../../components/Sidebar';
import {Hourglass} from 'react-loader-spinner';

const EventDescription = () => {
    const { value } = useParams();
    const dispatch = useDispatch();
    const { data, status, error } = useSelector((state) => state.events);
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const navigation = useNavigate();

    useEffect(() => {
        dispatch(fetchSingleEvent(value));
    }, [dispatch, value]);

    const handleGetTicket = ()=>{
           if(isLoggedIn){
            alert('Request for the ticket has been submitted!')
           }
           else{
            alert('Firstly you have to login!');
             navigation('/userLogin');
          }
    }

    return (
        <div>
            <Headerr />
            <div style={{ display: 'flex' }}>
      {isLoggedIn && (
        <div style={{ flex: '0 0 15%'}}>
          <Sidebar role="user"/>
        </div>
      )}
      <div style={{flex:1}} className='eventDetails-wrapper'>
        {status === STATUSES.LOADING && <div className='loader'>
       <Hourglass
       className='hourglass'
    visible={true}
    height="80"
    width="80"
    ariaLabel="hourglass-loading"
    wrapperStyle={{}}
    wrapperClass=""
    colors={['#C30202', '#C30202']} 
    />
    </div>}
        {status === STATUSES.ERROR && <p>Error: {error}</p>}
        {status === STATUSES.IDLE && data && (
          <div>
            <img className='event-details-image' src={eventImg} alt="Event" />
            <h3 className='event-description'>{data.description}</h3>
            <div className='event-details'>
              <SlCalender />
              <p>{data.date}</p>
            </div>
            <div className='event-details'>
              <CiLocationOn />
              <p>{data.location}</p>
            </div>
            <div className='event-details'>
              <IoMdTime />
              <p>{data.time}</p>
            </div>
            <div className='tickets-list'>
              <h2 className='ticket-heading'>Tickets Available</h2>
              {data.tickets && data.tickets.length > 0 ? (
                data.tickets.map((ticket, index) => (
                  <div key={index} className='tickets'>
                    <div className='borderTop'></div>
                    <div className='ticket-deets'>
                      <h3>{ticket.TicketType}</h3>
                      <h5>INR {ticket.price}</h5>
                      <button onClick={handleGetTicket}>GET TICKET</button>
                    </div>
                    <div className='borderBottom'></div>
                  </div>
                ))
              ) : (
                <p>No tickets found for this event</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
        </div>
    );
};

export default EventDescription;
