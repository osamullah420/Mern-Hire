import React, { useState } from 'react';
import axios from 'axios';

const DeveloperCard = ({ developer }) => {
  const [feedback, setFeedback] = useState({ user: '', comment: '', rating: 1 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/developers/${developer._id}/feedback`, feedback);
      // Re-fetch developers to get updated data after feedback is added
    } catch (error) {
      console.error('Error adding feedback:', error);
    }
  };

  return (
    <div style={cardStyle}>
      <h2 style={nameStyle}>{developer.name}</h2>
      <p style={skillsStyle}>{developer.skills.join(', ')}</p>
      <p style={contactStyle}>Contact: {developer.contact}</p>
      <p style={websiteStyle}>
        Website: <a href="https://www.werplay.com/" target="_blank" rel="noopener noreferrer">Check out our website</a>
      </p>
      <div style={feedbackContainerStyle}>
        <h3>Previous Feedback</h3>
        <p>Rating: {developer.rating.toFixed(1)}/5</p>
        <ul>
          {developer.feedback.map((fb, index) => (
            <li key={index}>
              <strong>{fb.user}</strong>: {fb.comment} ({fb.rating}/5)
            </li>
          ))}
        </ul>
      </div>
      <div style={addFeedbackStyle}>
        <h3>Add Feedback</h3>
        <form onSubmit={handleSubmit}>
          <textarea
            name="comment"
            placeholder="Your feedback"
            value={feedback.comment}
            onChange={handleChange}
            style={textareaStyle}
          ></textarea>
          <input
            type="text"
            name="user"
            placeholder="Your name"
            value={feedback.user}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="number"
            name="rating"
            min="1"
            max="5"
            value={feedback.rating}
            onChange={handleChange}
            style={inputStyle}
          />
          <button type="submit" style={submitButtonStyle}>Submit</button>
        </form>
      </div>
    </div>
  );
};

const cardStyle = {
  border: '1px solid #ddd',
  borderRadius: '10px',
  padding: '20px',
  margin: '20px',
  maxWidth: '400px',
  textAlign: 'center',
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  transition: '0.3s',
  backgroundColor: '#fff',
};

const nameStyle = {
  fontSize: '24px',
  margin: '10px 0',
};

const skillsStyle = {
  fontSize: '18px',
  color: '#666',
};

const contactStyle = {
  fontSize: '16px',
  color: '#666',
};

const websiteStyle = {
  fontSize: '16px',
  color: '#007bff',
  marginBottom: '10px',
};

const feedbackContainerStyle = {
  marginTop: '20px',
};

const addFeedbackStyle = {
  marginTop: '20px',
};

const textareaStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  marginBottom: '10px',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  marginBottom: '10px',
};

const submitButtonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default DeveloperCard;
