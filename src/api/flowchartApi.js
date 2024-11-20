import axios from "axios";

export const saveFlowchart = async (flowchart) =>
  axios.post("https://coldemailer-backend.onrender.com/api/flowchart/save", flowchart);

export const getSavedFlowcharts = async () =>
  axios.get("https://coldemailer-backend.onrender.com/api/flowchart/get");
