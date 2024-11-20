import React, { useState } from "react";
import { scheduleEmail } from "../api/emailApi";

const EmailScheduler = () => {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    body: "",
    time: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await scheduleEmail(formData);
    if (response.data.success) {
      alert("Email scheduled successfully!");
    } else {
      alert("Failed to schedule email.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Recipient Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={formData.subject}
        onChange={handleChange}
        required
      />
      <textarea
        name="body"
        placeholder="Email Body"
        value={formData.body}
        onChange={handleChange}
        required
      />
      <input
        type="datetime-local"
        name="time"
        value={formData.time}
        onChange={handleChange}
        required
      />
      <button type="submit">Schedule Email</button>
    </form>
  );
};

export default EmailScheduler;
