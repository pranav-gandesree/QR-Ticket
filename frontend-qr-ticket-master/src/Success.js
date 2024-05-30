import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QRCode from 'qrcode.react';
import Navbar from './components/Navbar';
import './index.css';

const Success = () => {
    const location = useLocation();
    const session_id = new URLSearchParams(location.search).get('session_id');

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
            <div className="qr-container"> 
                <QRCode value="Ticket confirmed" />
            </div>
        </>
    );
};

export default Success;

