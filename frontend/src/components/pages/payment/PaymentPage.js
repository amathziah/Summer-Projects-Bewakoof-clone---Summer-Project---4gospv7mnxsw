import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-50 to-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Payment Details</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg border border-gray-300">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="cardNumber">
            Card Number:
          </label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={paymentData.cardNumber}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="cardHolderName">
            Card Holder Name:
          </label>
          <input
            type="text"
            id="cardHolderName"
            name="cardHolderName"
            value={paymentData.cardHolderName}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="expirationDate">
            Expiration Date:
          </label>
          <input
            type="month"
            id="expirationDate"
            name="expirationDate"
            value={paymentData.expirationDate}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="cvv">
            CVV:
          </label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            value={paymentData.cvv}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
            required
          />
        </div>
        <div className="flex justify-between mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit Payment
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentPage;


