import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import debounce from 'lodash.debounce';  // Import debounce function
import DisasterList from './DisasterList';

const socket = io('http://localhost:5000');

const Dashboard = () => {
  const [location, setLocation] = useState('');
  const [disasters, setDisasters] = useState([]);

  // Define a debounced version of fetchDisasters
  const fetchDisasters = useCallback(
    debounce(async (loc) => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/fetch_disasters', {
          params: { location: loc },
          headers: { Authorization: `Bearer ${token}` },
        });
        setDisasters(response.data);
      } catch (error) {
        console.error('Error fetching disasters:', error);
      }
    }, 500), []  // No dependencies because debounce handles location changes
  );

  useEffect(() => {
    fetchDisasters(location);
    const id = setInterval(() => fetchDisasters(location), 5000);

    return () => clearInterval(id);  // Cleanup interval on component unmount
  }, [fetchDisasters, location]);  // Dependencies include fetchDisasters and location

  useEffect(() => {
    const handleSocketResponse = (data) => {
      console.log('Socket data received:', data);
      fetchDisasters(location);  // Fetch disasters on receiving notification
    };

    socket.on('response', handleSocketResponse);

    return () => {
      socket.off('response', handleSocketResponse);
    };
  }, [fetchDisasters, location]);  // Dependencies include fetchDisasters and location

  const handleSave = async (disaster) => {
    try {
      const token = localStorage.getItem('token');
      console.log('Saving disaster:', disaster);  // Debug: Log the disaster object
      await axios.post('http://localhost:5000/disasters', disaster, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      fetchDisasters(location);  // Fetch disasters after saving
    } catch (error) {
      console.error('Error saving disaster:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <DisasterList disasters={disasters} onSave={handleSave} />
    </div>
  );
};

export default Dashboard;
