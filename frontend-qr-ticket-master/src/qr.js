
import React from "react";
import QRCode from 'qrcode.react';

const Qr = ()=>{
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <QRCode value="Ticket confirmed" />
        </div>
      );
}

export default Qr;
