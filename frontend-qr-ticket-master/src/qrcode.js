// // QRCodeDisplay.js

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const QRCodeDisplay = () => {
//   const [qrCodeData, setQRCodeData] = useState('');


//   useEffect(() => {
//     // Fetch QR code data from backend
//     axios.post('http://localhost:1111/generate-qr-code', { data: 'Your QR Code Data', expirationDate: new Date() })
//       .then(response => {
//         if (response.data.success) {
//           setQRCodeData(response.data.imagePath);
          
//         } else {
//           console.error('Error generating and saving QR code:', response.data.message);
//         }
//       })
//       .catch(error => {
//         console.error('Error generating and saving QR code:', error);
//       });
//   }, []);

//   return (
//     <div>
//       <img src={qrCodeData} alt="QR Code" />
//     </div>
//   );
// };

// export default QRCodeDisplay;




import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QRCodeDisplay = () => {
  const [qrCodeData, setQRCodeData] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios.post('http://localhost:1111/generate-qr-code', { data: 'Ticket confirm' })
      .then(response => {
        if (response.data.success) {
          setQRCodeData(response.data.imagePath);
        } else {
          setErrorMessage(response.data.message);
        }
      })
      .catch(error => {
        console.error('Error generating and saving QR code:', error);
        setErrorMessage('An error occurred while generating and saving QR code.');
      });
  }, []);

  return (
    <div>
      {errorMessage && <p>{errorMessage}</p>}
      {qrCodeData && <img src={qrCodeData} alt="QR Code" />}
    </div>
  );
};

export default QRCodeDisplay;
