import axios from "axios";

export const saveFlowchart = async (flowchart) =>
  axios.post("http://localhost:5000/api/flowchart/save", flowchart);

export const getSavedFlowcharts = async () =>
  axios.get("http://localhost:5000/api/flowchart/get");
