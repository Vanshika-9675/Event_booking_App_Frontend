import React, { useEffect } from "react";
import OrganizerHeader from "../../components/OrganizerHeader";
import Sidebar from "../../components/Sidebar";
import "../styles/AddEvents.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addEvent } from "../../store/eventsSlice";
import {toast} from 'react-toastify'


const AddEvents = () => {
  const dispatch = useDispatch();

  const [eventName, setEventName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [Imagesrc, setImagesrc] = useState("");
  const [tickets, setTickets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [TicketType, setTicketType] = useState("");
  const [ticketNum, setticketNum] = useState(0); 
  const [price, setPrice] = useState(0);

    const handleTickets = () => {
      console.log(isModalOpen);
      setIsModalOpen(true);
    };

    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
  
    const handleAddTicket= (e)=>{
      e.preventDefault();
      const newTicket = {
        TicketType: TicketType,
        ticketNum: ticketNum,
        price: price
      };
  
      setTickets([...tickets, newTicket]);
      setTicketType(""); 
      setticketNum(0);
      setPrice(0);
      setIsModalOpen(false); 
    }

    const handleAddEvent = (e)=>{
     e.preventDefault();
      const newEvent = {
          eventName,
          category,
          description,
          time,
          date,
          location,
          tickets,
          Imagesrc
      }
        
    dispatch(addEvent(newEvent))
    .unwrap()
    .then(() => {
      toast.success("Event added successfully!");
    })
    .catch((error) => {
      toast.error(error.message || 'Failed to add event');
    });

      setEventName("");
      setCategory("");
      setDescription("");
      setTime("");
      setDate("");
      setDate("");
      setLocation("");
      setTickets([]);
      setImagesrc("");
      
    }


  return (
    <div className="wrapperParentAddEvent">
      <OrganizerHeader />
      <Sidebar role={"organizer"} />

      <div className="addEvent">
        <h2>Add Event</h2>
        <form onSubmit={handleAddEvent}>
          <div className="formGroup">
            <label htmlFor="eventName">Event Name:</label>
            <input
              type="text"
              id="eventName"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
            />
          </div>
          <div className="formGroup">
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div className="formGroup">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="formGroup pointer">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="formGroup">
            <label htmlFor="time">Time:</label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
          <div className="formGroup">
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div className="formGroup">
            <label htmlFor="Imagesrc">Image Source URL:</label>
            <input
              type="text"
              id="Imagesrc"
              value={Imagesrc}
              onChange={(e) => setImagesrc(e.target.value)}
              required
            />
          </div>
          <div className="formGroup" >
             <button type="button" onClick={handleTickets} className="addTicketsButton">Add Tickets ({tickets && tickets.length})</button>
          </div>
          <button type="submit"  className="submitButton">
            Add Event
          </button>
        </form>
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modalContent">
            <span className="closeButton" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Add Tickets</h2>
            <form>
              <div className="formGroup">
                <label htmlFor="ticketType">Ticket Type:</label>
                <input type="text" id="ticketType" value={TicketType}  onChange={(e) => setTicketType(e.target.value)} required />
              </div>
              <div className="formGroup">
                <label htmlFor="ticketPrice">Price:</label>
                <input type="number" id="ticketPrice" value={price} onChange={(e) => setPrice(e.target.value)}  required />
              </div>
              <div className="formGroup">
                <label htmlFor="ticketQuantity">Quantity:</label>
                <input type="number" id="ticketQuantity" value={ticketNum} onChange={(e) => setticketNum(e.target.value)} required />
              </div>
              <button type="submit"  onClick={handleAddTicket} className="submitButton">
                Add Ticket
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddEvents;
