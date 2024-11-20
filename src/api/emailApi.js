import axios from "axios";

export const scheduleEmail = async (emailData) =>
  axios.post("http://localhost:5000/api/email/schedule", emailData);
