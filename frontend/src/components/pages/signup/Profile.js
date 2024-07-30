import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      {user ? (
        <form onSubmit={handleUpdateProfile}>
          <h2 className="text-2xl font-bold mb-4">Profile</h2>
          <p className="text-lg mb-2">Username: {user.username}</p>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none"
          >
            Update Profile
          </button>
          {message && <p className="text-sm text-red-500 mt-4">{message}</p>}
        </form>
      ) : (
        <p className="text-center text-gray-600">Login to see this section</p>
      )}
    </div>
  );
};

export default Profile;

