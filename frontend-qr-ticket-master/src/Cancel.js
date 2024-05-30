import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import './index.css'


const Cancel = () => {
    const navigate = useNavigate();

    useEffect(() => {
      const timer = setTimeout(() => {
        navigate('/'); // Redirect to home page after 10 seconds
      }, 15000); // 15000 milliseconds = 10 seconds
  
      return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }, [navigate]);
  
    return (
        <>
            <Navbar />
            <h1 className='cancel'>Ticket Cancelled</h1>
        </>
    )
}

export default Cancel;
