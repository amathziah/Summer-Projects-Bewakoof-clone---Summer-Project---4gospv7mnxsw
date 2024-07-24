import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentPage.css';

const PaymentPage = () => {
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardHolderName: '',
    expirationDate: '',
    cvv: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle payment submission logic
    alert('Payment submitted successfully!');
    navigate('/confirmation');
  };

  const handleCancel = () => {
    // Redirect to a different page or go back
    navigate(-1);
  };

  return (
    <div className="payment-container">
      <h1>Payment Details</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Card Number:
          <input
            type="text"
            name="cardNumber"
            value={paymentData.cardNumber}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Card Holder Name:
          <input
            type="text"
            name="cardHolderName"
            value={paymentData.cardHolderName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Expiration Date:
          <input
            type="month"
            name="expirationDate"
            value={paymentData.expirationDate}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          CVV:
          <input
            type="text"
            name="cvv"
            value={paymentData.cvv}
            onChange={handleChange}
            required
          />
        </label>
        <div className="button-group">
          <button type="submit">Submit Payment</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default PaymentPage;
