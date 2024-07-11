import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeveloperCard from '../components/developercard';

const Home = () => {
  const [developers, setDevelopers] = useState([]);
  const [sortByRating, setSortByRating] = useState(false);

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/developers${sortByRating ? '/sorted' : ''}`);
        setDevelopers(response.data);
      } catch (error) {
        console.error('Error fetching developers:', error);
      }
    };

    fetchDevelopers();
  }, [sortByRating]);

  return (
    <div style={homeStyle}>
      <h1 style={headerStyle}>Developer Profiles</h1>
      <button style={buttonStyle} onClick={() => setSortByRating(!sortByRating)}>
        Sort by {sortByRating ? 'Default' : 'Rating'}
      </button>
      <div style={cardsContainerStyle}>
        {developers.map(developer => (
          <DeveloperCard key={developer._id} developer={developer} />
        ))}
      </div>
    </div>
  );
};

const homeStyle = {
  padding: '20px',
  fontFamily: 'Arial, sans-serif',
};

const headerStyle = {
  textAlign: 'center',
  marginBottom: '20px',
};

const buttonStyle = {
  display: 'block',
  margin: '0 auto 20px',
  padding: '10px 20px',
  fontSize: '16px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const cardsContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '20px',
};

export default Home;
