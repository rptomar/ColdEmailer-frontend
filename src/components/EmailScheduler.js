import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scheduleEmail } from "../api/emailApi";
import swal from 'sweetalert';

const EmailScheduler = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    body: "",
    time: "",
    flowchartId: "", // Field to store the ID of the passed data
  });

  useEffect(() => {
    // Log and set data from the previous page
    if (location.state?.flowchart) {
      console.log("Received Flowchart Data:", location.state.flowchart);
      setFormData((prevData) => ({
        ...prevData,
        flowchartId: location.state.flowchart._id, // Setting flowchart ID
      }));
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await scheduleEmail(formData);
        if (response.data) {
          swal("Success", "Email Shedule Successfully", "success").then(() => {
          });
        } else {
          swal("Error", "Error in saving flowchart", "error");
        }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Schedule Email</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          background: "#f9f9f9",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <label style={{ fontWeight: "bold" }}>
          Recipient Email:
          <input
            type="email"
            name="email"
            placeholder="Enter recipient's email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              width: "100%",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </label>

        <label style={{ fontWeight: "bold" }}>
          Subject:
          <input
            type="text"
            name="subject"
            placeholder="Enter subject"
            value={formData.subject}
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              width: "100%",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </label>

        <label style={{ fontWeight: "bold" }}>
          Email Body:
          <textarea
            name="body"
            placeholder="Enter email body"
            value={formData.body}
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              width: "100%",
              border: "1px solid #ccc",
              borderRadius: "4px",
              minHeight: "100px",
            }}
          />
        </label>

        <label style={{ fontWeight: "bold" }}>
          Schedule Time:
          <input
            type="datetime-local"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              width: "100%",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </label>

        <button
          type="submit"
          style={{
            padding: "10px 15px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Schedule Email
        </button>
      </form>
    </div>
  );
};

export default EmailScheduler;
