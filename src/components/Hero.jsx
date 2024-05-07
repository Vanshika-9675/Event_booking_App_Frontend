import React from 'react'
import './Hero.css'
import { useState ,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



const Hero = () => {

    const text = "Diiscover and experience unforgettable events!";
    const history = useNavigate();

    const [typedText, setTypedText] = useState("");
  
    useEffect(() => {
        let index = 0;
        const timer = setInterval(() => {
          if (index < text.length) {
            setTypedText(prevTypedText => prevTypedText + text.charAt(index));
            index++;
          } 
          else {
            clearInterval(timer);
          }
        }, 100);
    
        return () => {
          clearInterval(timer);
        };

      }, [text]);

const handleUser = ()=>{
    history('/user');
}
const handleOrganizer = ()=>{
    history('/organizer');
}

  return (
    <div className='hero'>
        <div className="overlay">
          <div className='hero-main'>
            <h1>Welcome to Event Booking App</h1>
            <h2>{typedText}</h2>
             <div>
                <button onClick={handleUser}>User</button>
                <button  onClick={handleOrganizer}>Organizer</button>
             </div>
             </div>
        </div>
    </div>
  )
}

export default Hero