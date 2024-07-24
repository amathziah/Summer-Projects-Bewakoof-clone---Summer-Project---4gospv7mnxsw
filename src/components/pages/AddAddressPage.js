import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddAddressPage.css';

const AddAddressPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    pincode: '',
    city: '',
    state: '',
    streetName: '',
    area: '',
    landmark: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., save data and redirect
    navigate('/payment');
  };

  const handleCancel = () => {
    // Redirect to a different page or go back
    navigate(-1);
  };

  return (
    <div className="add-address-container">
      <h1>Add Address</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Mobile Number:
          <input
            type="tel"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Pincode:
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          State:
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Street Name:
          <input
            type="text"
            name="streetName"
            value={formData.streetName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Area:
          <input
            type="text"
            name="area"
            value={formData.area}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Landmark:
          <input
            type="text"
            name="landmark"
            value={formData.landmark}
            onChange={handleChange}
          />
        </label>
        <div className="button-group">
          <button type="submit">Continue</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddAddressPage;

