import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Auth.css";
import Footerr from "../../components/Footerr";
import { useDispatch, useSelector } from "react-redux";
import { organizerLogin, STATUSES } from "../../store/organizerSlice";
import { useNavigate } from "react-router-dom";
import OrganizerHeader from "../../components/OrganizerHeader";
import { Hourglass } from "react-loader-spinner";

const OrgLogin = () => {
  const { status } = useSelector((state) => state.organizer);
  const dispatch = useDispatch();

  const navigation = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(organizerLogin({ email, password }))
      .unwrap()
      .then(() => {
        navigation("/");
      })
      .catch(() => {
        console.error("Failed to log in:", error);
        alert("Login failed: " + error.toString());
      });
  };

  if (status === STATUSES.LOADING) {
    return (
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
    );
  }

  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong...</h2>;
  }

  return (
    <div className="wrapperParent">
      <OrganizerHeader />
      <div className="login-container">
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn" type="submit">
            Log In
          </button>
          <p>
            Don't have an account? <Link to="/orgSignup">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default OrgLogin;
