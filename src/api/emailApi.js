import axios from "axios";

export const scheduleEmail = async (emailData) =>
  axios.post("https://coldemailer-backend.onrender.com/api/email/schedule", emailData);
