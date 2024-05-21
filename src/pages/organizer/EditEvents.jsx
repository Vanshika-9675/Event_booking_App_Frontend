import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { STATUSES } from "../../store/eventsSlice";
import Sidebar from "../../components/Sidebar";
import { Hourglass } from "react-loader-spinner";
import { toast } from "react-toastify";
import OrganizerHeader from "../../components/OrganizerHeader";
import { useState } from "react";
import { editEvent } from "../../store/eventsSlice";

const EditEvents = () => {
  const { value } = useParams();
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.events);
  const isLoggedIn = useSelector((state) => state.organizer.isLoggedIn);
  const navigation = useNavigate();

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

  useEffect(() => {
    toast.info("Enter the fields you want to enter and click on update button!");
  }, []);
  const handleTickets = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddTicket = (e) => {
    e.preventDefault();
    const newTicket = {
      TicketType: TicketType,
      ticketNum: ticketNum,
      price: price,
    };

    setTickets([...tickets, newTicket]);
    setTicketType("");
    setticketNum(0);
    setPrice(0);
    setIsModalOpen(false);
  };

  const filterNonEmptyFields = (obj) => {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, value]) => value !== "")
    );
  };

  const handleUpdateEvent = (e) => {
    e.preventDefault();

    const newEvent = {
      eventName,
      category,
      description,
      time,
      date,
      location,
      tickets,
      Imagesrc,
    };

    const filteredEvent = filterNonEmptyFields(newEvent);

    dispatch(editEvent({ eventId: value, newEvent: filteredEvent }))
      .unwrap()
      .then(() => {
        toast.success("Event updated successfully!");
      })
      .catch((error) => {
        toast.error(error.message || "Failed to update event");
        console.log(error);
      });

    setEventName("");
    setCategory("");
    setDescription("");
    setTime("");
    setDate("");
    setLocation("");
    setTickets([]);
    setImagesrc("");
  };

  return (
    <div>
      <OrganizerHeader />
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
              <Sidebar role="organizer" />
            </div>
          )}
          <div>
            {status === STATUSES.IDLE && data && (
              <div>
                <div className="wrapperParentAddEvent">
                  <div className="addEvent">
                    <h2>Update Event Data</h2>
                    <form onSubmit={handleUpdateEvent}>
                      <div className="formGroup">
                        <label htmlFor="eventName">Event Name:</label>
                        <input
                          type="text"
                          id="eventName"
                          value={eventName}
                          onChange={(e) => setEventName(e.target.value)}
                        />
                      </div>
                      <div className="formGroup">
                        <label htmlFor="category">Category:</label>
                        <input
                          type="text"
                          id="category"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        />
                      </div>
                      <div className="formGroup">
                        <label htmlFor="description">Description:</label>
                        <textarea
                          id="description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="formGroup pointer">
                        <label htmlFor="date">Date:</label>
                        <input
                          type="date"
                          id="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                        />
                      </div>
                      <div className="formGroup">
                        <label htmlFor="time">Time:</label>
                        <input
                          type="time"
                          id="time"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                        />
                      </div>
                      <div className="formGroup">
                        <label htmlFor="location">Location:</label>
                        <input
                          type="text"
                          id="location"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                        />
                      </div>
                      <div className="formGroup">
                        <label htmlFor="Imagesrc">Image Source URL:</label>
                        <input
                          type="text"
                          id="Imagesrc"
                          value={Imagesrc}
                          onChange={(e) => setImagesrc(e.target.value)}
                        />
                      </div>
                      <div className="formGroup">
                        <button
                          type="button"
                          onClick={handleTickets}
                          className="addTicketsButton"
                        >
                          Add Tickets({tickets && tickets.length})
                        </button>
                      </div>
                      <button type="submit" className="submitButton">
                        Update Event
                      </button>
                    </form>
                  </div>
                  {isModalOpen && (
                    <div className="modal">
                      <div className="modalContent">
                        <span
                          className="closeButton"
                          onClick={handleCloseModal}
                        >
                          &times;
                        </span>
                        <h2>Add Tickets</h2>
                        <form>
                          <div className="formGroup">
                            <label htmlFor="ticketType">Ticket Type:</label>
                            <input
                              type="text"
                              id="ticketType"
                              value={TicketType}
                              onChange={(e) => setTicketType(e.target.value)}
                              required
                            />
                          </div>
                          <div className="formGroup">
                            <label htmlFor="ticketPrice">Price:</label>
                            <input
                              type="number"
                              id="ticketPrice"
                              value={price}
                              onChange={(e) => setPrice(e.target.value)}
                              required
                            />
                          </div>
                          <div className="formGroup">
                            <label htmlFor="ticketQuantity">Quantity:</label>
                            <input
                              type="number"
                              id="ticketQuantity"
                              value={ticketNum}
                              onChange={(e) => setticketNum(e.target.value)}
                              required
                            />
                          </div>
                          <button
                            type="submit"
                            onClick={handleAddTicket}
                            className="submitButton"
                          >
                            Update Ticket
                          </button>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEvents;
