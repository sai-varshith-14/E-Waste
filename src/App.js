import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // We will add styling in Step 3

function App() {
  // 1. State for storing the list of requests
  const [requests, setRequests] = useState([]);

  // 2. State for the form inputs
  const [formData, setFormData] = useState({
    user_name: '',
    contact: '',
    item_type: 'Laptop',
    item_condition: '',
    estimated_value: ''
  });

  // 3. Fetch data when the app loads
  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      // Make sure your backend is running on port 5000!
      const response = await axios.get('http://localhost:5001/api/requests');
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // 4. Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 5. Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/requests', formData);
      alert('Request Submitted Successfully!');
      fetchRequests(); // Refresh the table
      // Reset form
      setFormData({
        user_name: '',
        contact: '',
        item_type: 'Laptop',
        item_condition: '',
        estimated_value: ''
      });
    } catch (error) {
      console.error("Error submitting request:", error);
      alert('Failed to submit request.');
    }
  };

  return (
    <div className="container">
      <header>
        <h1>♻️ E-Waste Management System</h1>
      </header>

      {/* Form Section */}
      <div className="form-section">
        <h2>Submit New Request</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" name="user_name" placeholder="Your Name" 
            value={formData.user_name} onChange={handleChange} required 
          />
          <input 
            type="text" name="contact" placeholder="Contact Number" 
            value={formData.contact} onChange={handleChange} required 
          />
          <select name="item_type" value={formData.item_type} onChange={handleChange}>
            <option value="Laptop">Laptop</option>
            <option value="Mobile">Mobile</option>
            <option value="Accessories">Accessories</option>
          </select>
          <input 
            type="text" name="item_condition" placeholder="Condition (e.g., Old, Broken)" 
            value={formData.item_condition} onChange={handleChange} required 
          />
          <input 
            type="number" name="estimated_value" placeholder="Estimated Value (₹)" 
            value={formData.estimated_value} onChange={handleChange} required 
          />
          <button type="submit">Submit Request</button>
        </form>
      </div>

      {/* Table Section */}
      <div className="table-section">
        <h2>Current Requests</h2>
        {requests.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Item</th>
                <th>Condition</th>
                <th>Value</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id}>
                  <td>{req.id}</td>
                  <td>{req.user_name}</td>
                  <td>{req.item_type}</td>
                  <td>{req.item_condition}</td>
                  <td>₹{req.estimated_value}</td>
                  <td><span className="status-badge">{req.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No requests found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
