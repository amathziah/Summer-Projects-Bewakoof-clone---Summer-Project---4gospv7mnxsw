import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css'; // Import the CSS file

const Profile = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchProfile() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:4000/profile', {
          headers: {
            'auth-token': token,
          },
        });
        setUser(response.data.user);
        setEmail(response.data.user.email);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    }
    fetchProfile();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:4000/updateprofile',
        { email, password },
        {
          headers: {
            'auth-token': token,
          },
        }
      );
      setMessage(response.data.message);
      setPassword(''); // Clear password field after update
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Failed to update profile');
    }
  };

  return (
    <div className="containerprofile">
      {user ? (
        <form onSubmit={handleUpdateProfile}>
          <h2>Profile</h2>
          <p>Username: {user.username}</p>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Update Profile</button>
          {message && <p className="message">{message}</p>}
        </form>
      ) : (
        <p className="loading">Login to see this section</p>
      )}
    </div>
  );
};

export default Profile;

