import React from "react";
import OrganizerHeader from "../../components/OrganizerHeader";
import Sidebar from "../../components/Sidebar";
import "../styles/Events.css";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Events.css";
import { SlCalender } from "react-icons/sl";
import { CiLocationOn } from "react-icons/ci";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { STATUSES, fetchOrgEvents } from "../../store/eventsSlice";
import { ShimmerCategoryItem } from "react-shimmer-effects";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { IoTrashBinSharp } from "react-icons/io5";
import { deleteEvent } from "../../store/eventsSlice";
import { toast } from "react-toastify";

const OrgDashboard = () => {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchOrgEvents());
  }, [dispatch]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (confirmDelete) {
      dispatch(deleteEvent(id))
        .unwrap()
        .then(() => {
          dispatch(fetchOrgEvents());
          alert("Event deleted successfully!");
        })
        .catch((error) => {
          toast.error(error.message || "Failed to delete event");
        });
    }
  };

  const renderShimmerItems = () => {
    const shimmerItems = [];
    for (let i = 0; i < 5; i++) {
      shimmerItems.push(
        <div key={i} className="shim">
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

  return (
    <div className="wrapperParent">
      <OrganizerHeader />
      <section style={{ display: "flex" }}>
        <div style={{ flexBasis: "10%" }}>
          <Sidebar role="organizer" />
        </div>
        <div style={{ flex: "1", flexShrink: "1", padding: "20px" }}>
          <h1 style={{ textAlign: "center" }}>Your Events</h1>
          {status === STATUSES.LOADING && <div>{renderShimmerItems()}</div>}
          {status === STATUSES.ERROR && (
            <p style={{ textAlign: "center" }}>Something went wrong..</p>
          )}
          {status === STATUSES.IDLE && (
            <div className="events-parent">
              {data && data.length > 0 ? (
                data.map((event) => (
                  <div key={event.id} className="event orgEvent">
                    <img height={120} width={150} src={event.Imagesrc} alt="" />
                    <div>
                      <h2 className="event-title">{event.eventName}</h2>
                      <div className="event-details">
                        <SlCalender />
                        <p>{event.date}</p>
                      </div>
                      <div className="event-details">
                        <CiLocationOn />
                        <p>{event.location}</p>
                      </div>
                    </div>
                    <Link
                      className="actions edit"
                      to={`/editEvent/${event._id}`}
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => {
                        handleDelete(event._id);
                      }}
                      className="actions bin"
                    >
                      <IoTrashBinSharp />
                    </button>
                  </div>
                ))
              ) : (
                <p style={{ textAlign: "center" }}>No events found.</p>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default OrgDashboard;
