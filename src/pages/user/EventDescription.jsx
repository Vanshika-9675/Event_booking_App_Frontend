import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSingleEvent } from "../../store/eventsSlice";
import { useDispatch, useSelector } from "react-redux";
import { STATUSES } from "../../store/eventsSlice";
import Headerr from "../../components/Headerr";
import Footerr from "../../components/Footerr";
import "../styles/EventDetails.css";
import eventImg from "../../assets/event.jpg";
import { SlCalender } from "react-icons/sl";
import { CiLocationOn } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
import Sidebar from "../../components/Sidebar";
import { Hourglass } from "react-loader-spinner";
import {toast} from 'react-toastify'

const EventDescription = () => {
  const { value } = useParams();
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.events);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const navigation = useNavigate();

  const handlegetTicket = ()=>{
     if(isLoggedIn){
      navigation(`/ticketSelection/${value}`)
     }
     else{
       toast.warn("You need to login first!");
       navigation('/userLogin');
     }
  }

  useEffect(() => {
    dispatch(fetchSingleEvent(value));
  }, [dispatch, value]);

  return (
    <div>
      <Headerr />
      {status === STATUSES.LOADING && (
            <div className="loader">
              <Hourglass
                className="hourglass"
                visible={true}
                height="80"
                width="80"
                ariaLabel="hourglass-loading"
                wrapperStyle={{}}
                wrapperClass=""
                colors={["#C30202", "#C30202"]}
              />
            </div>
       )}
          {status === STATUSES.ERROR && <p>Error: {error}</p>}
      <div className="eventDeetsParent">
      <div>
        {isLoggedIn && (
          <div>
            <Sidebar role="user" />
          </div>
        )}
        <div className="eventDetails-wrapper">
          {status === STATUSES.IDLE && data && (
            <div>
              <img className="event-details-image" src={data.Imagesrc} alt="Event" />
              <h3 className="event-description">{data.description}</h3>
              <div className="event-details">
                <SlCalender />
                <p>{data.date}</p>
              </div>
              <div className="event-details">
                <CiLocationOn />
                <p>{data.location}</p>
              </div>
              <div className="event-details">
                <IoMdTime />
                <p>{data.time}</p>
              </div>
              <button onClick={handlegetTicket} className="getTicket">Get Ticket</button>
            </div>
          )}
        </div>
      </div>
      </div>
    
    </div>
  );
};

export default EventDescription;
