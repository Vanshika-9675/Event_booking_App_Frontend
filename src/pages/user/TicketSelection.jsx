import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Headerr from "../../components/Headerr";
import { fetchSingleEvent } from "../../store/eventsSlice";
import Sidebar from "../../components/Sidebar";
import {toast} from "react-toastify"

const TicketSelection = () => {
  const { value } = useParams();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const { data, status, error } = useSelector((state) => state.events);
  const [cartTickets, setCartTickets] = useState([]);
  const navigation = useNavigate();

  useEffect(() => {
    dispatch(fetchSingleEvent(value));
  }, [dispatch, value]);

  const handleBuyTicket = (id) => {
    if (cartTickets.includes(id)) {
      setCartTickets((prev) => prev.filter((ticketId) => ticketId !== id));
    } else {
      setCartTickets((prev) => [...prev, id]);
    }
  };

  const handleProceed = () => {
    if (cartTickets.length === 0) {
      toast.warn("Choose tickets to proceed!");
    } else {
      navigation(`/personalInfo/${value}`, {state:{data:cartTickets}});
    }
  };

  const isTicketSelected = (id) => {
    return cartTickets.includes(id);
  };

  return (
    <div>
      <Headerr />
      <Sidebar/> 
      <div className="ticket-parent"> 
 
      <div className="tickets-list">
        {status === 'loading' && <p>Loading Tickets...</p>}
        {status === 'error' && <p>Error: {error}</p>}
        {status === 'idle' && data && (
          <>
            <h2 className="ticket-heading">Tickets Available</h2>
            {data.tickets && data.tickets.length > 0 ? (
              data.tickets.map((ticket, index) => (
                <div key={index} className="tickets">
                  <div className="borderTop"></div>
                  <div className="ticket-deets">
                    <h3>{ticket.TicketType}</h3>
                    <h5>INR {ticket.price}</h5>
                    <button
                      onClick={() => handleBuyTicket(ticket._id)}
                      className={isTicketSelected(ticket._id) ? "selectedButton" : ""}
                    >
                      {isTicketSelected(ticket._id) ? "SELECTED" : "SELECT"}
                    </button>
                  </div>
                  <div className="borderBottom"></div>
                </div>
              ))
            ) : (
              <p>No tickets found for this event</p>
            )}
            <div>
              <button onClick={handleProceed} className="getTicket">
                PROCEED
              </button>
            </div>
          </>
        )}
      </div>
      </div>
     </div>
  );
};

export default TicketSelection;
