import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../styles/Events.css'
import { SlCalender } from "react-icons/sl";
import eventImg from '../../assets/event.jpg'
import { CiLocationOn } from "react-icons/ci";
import { IoMdInformationCircleOutline } from "react-icons/io";
import {STATUSES,fetchAllEvents} from '../../store/eventsSlice'
import { ShimmerCategoryItem } from "react-shimmer-effects";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaSearch } from "react-icons/fa";



const Events = () => {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.events);
  const [searchLocation, setSearchLocation] = useState('');
  const [filteredEvents,setfilteredEvents] = useState([]);


  useEffect(() => {
    dispatch(fetchAllEvents());
    console.log(data);
  }, [dispatch]);


  const renderShimmerItems = () => {
    const shimmerItems = [];
    for (let i = 0; i < 5; i++) {
      shimmerItems.push(
        <div key={i} className='shim'>
          <ShimmerCategoryItem
            hasImage
            imageType="thumbnail"
            imageWidth={100}
            imageHeight={100}
            text
          />
        </div>
      );
    }

    return shimmerItems;
  };


  useEffect(() => {
    if (status === STATUSES.IDLE && Array.isArray(data)) {
      const events = data.filter((event) => {
        const matchesLocation =
          !searchLocation || event.location.toLowerCase().includes(searchLocation.toLowerCase());
        return matchesLocation;
      });
      setfilteredEvents(events);
    }
  }, [status, data, searchLocation]);
  
  

  const handleSearchLocationChange = (e) => {
    setSearchLocation(e.target.value);
  };


  return (
    <div className='events-wrapper'>
       <div className='search'>
        <input
          type='text'
          placeholder= "Search by location"
          value={searchLocation}
          onChange={handleSearchLocationChange}
        />
        <FaSearch className='searchIcon' />
      </div>
      <h1 style={{ textAlign: 'center' }}>Events</h1>
            {/* Search Bar */}

     {status === STATUSES.LOADING && <div>
        {renderShimmerItems()}
     </div>
     }
       {status === STATUSES.ERROR && <p>Something went wrong..</p>}
      {status === STATUSES.IDLE && (
         <div className='events-parent'>
           {filteredEvents.length > 0 ? (
            filteredEvents.map((event) =>(
           <div key={event.id} className='event'>
                <img height={120} width={150} src={event.Imagesrc} alt='' />
                 <div>
                 <h2 className='event-title'>{event.eventName}</h2>
                   <div className='event-details'>
                    <SlCalender />
                    <p>{event.date}</p>
                  </div>
              <div className='event-details'>
                    <CiLocationOn />
                  <p>{event.location}</p>
                  </div>
                 </div>
                 <Link className='event-info' to={`/eventDescription/${event._id}`}><IoMdInformationCircleOutline/></Link>
               </div>
            ))
          ) : (
             <p>No events found.</p>
           )}
         </div>
       )}
     </div>
  
  );
};

export default Events;
