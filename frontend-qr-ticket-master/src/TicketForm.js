
import React, { useState, useEffect } from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem, Button, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';


const places = [
  { id: 1, name: 'hyderabad' },
  { id: 2, name: 'warangal' },
  { id: 3, name: 'khammam' },
  { id: 4, name: 'karimnagar' },
];

const priceMatrix = {
  'hyderabad-warangal': 2000,
  'khammam-karimnagar': 1500,
  'hyderabad-khammam': 2500,
  'warangal-karimnagar': 1800,
  'warangal-khammam' : 400,
  'khammam-warangal': 400,

  // Add other routes and their prices
};

const TicketForm = () => {
  const theme = useTheme();

  const [startPlace, setStartPlace] = useState('');
  const [endPlace, setEndPlace] = useState('');
  const [price, setPrice] = useState(null);
  const [numTickets, setNumTickets] = useState(1);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
      if (startPlace && endPlace) {
          const route = `${startPlace}-${endPlace}`;
          const routePrice = priceMatrix[route] || null;
          setPrice(routePrice);
    
      }
  }, [startPlace, endPlace]);

  const handleStartPlaceChange = (e) => {
      setStartPlace(e.target.value);
  };

  const handleEndPlaceChange = (e) => {
      setEndPlace(e.target.value);
  };

  const incrementNumTickets = () => {
      setNumTickets((prev) => prev + 1);
     
  };

  const decrementNumTickets = () => {
      if (numTickets > 1) {
          setNumTickets((prev) => prev - 1);
      }
  };

  const handleNumTicketsChange = (e) => {
      const value = Math.max(1, Number(e.target.value));
      setNumTickets(value);
  };



  const handleSubmit = async (event) => {
      event.preventDefault();

      if (!stripe || !elements) {
          return;
      }
      try {
          const { data: { id } } = await axios.post('http://localhost:1111/create-checkout-session', {
              items: [
                  { 
                      name: `${startPlace} to ${endPlace}`, 
                      price: price * numTickets, 
                      quantity: numTickets,
                      startPlace,
                      endPlace
                  },
              ],
          });

          const { error } = await stripe.redirectToCheckout({ sessionId: id });

          if (error) {
              console.error(error);
          }
      } catch (error) {
          console.error('Error during payment process:', error);
      }
  };


  return (
    <div style={{ backgroundColor: theme.palette.background.default, minHeight: '100vh', color: theme.palette.text.primary }}>
      <Grid container spacing={2} style={{ padding: '20px' }}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="startLocationLabel" style={{ color: theme.palette.text.primary }}>From:</InputLabel>
            <Select
              labelId="startLocationLabel"
              id="startLocation"
              value={startPlace}
              label="From"
              onChange={handleStartPlaceChange}
              style={{ color: theme.palette.text.primary }}
            >
              <MenuItem value="">Select start location</MenuItem>
              {places.map((item) => (
                <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="destinationLabel" style={{ color: theme.palette.text.primary }}>To:</InputLabel>
            <Select
              labelId="destinationLabel"
              id="destination"
              value={endPlace}
              label="To"
              onChange={handleEndPlaceChange}
              style={{ color: theme.palette.text.primary }}
            >
              <MenuItem value="">Select destination</MenuItem>
              {places.map((item) => (
                <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
              ))}
            
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button variant="contained" onClick={decrementNumTickets} color="primary" >-</Button>
          <TextField
            type="number"
            id="numTickets"
            value={numTickets}
            onChange={handleNumTicketsChange}
            inputProps={{
              min: 1,
              style: { textAlign: 'center', color: theme.palette.text.primary }
            }}
            style={{ margin: '0 10px', color: theme.palette.text.primary }}
          />
          <Button variant="contained" color="primary" onClick={incrementNumTickets} >+</Button>
        </Grid>
        <Grid item xs={12}>
          <TextField
            disabled
            id="outlined-disabled"
            label="Price"
            value={`${price * numTickets} Rs`}
          />
        </Grid>


        <Grid item xs={12}>
          <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>Get Ticket at {price * numTickets} </Button>
        </Grid>

      <ToastContainer />
      </Grid>


    </div>
  );
};

export default TicketForm;
