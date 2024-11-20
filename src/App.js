import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Flowcharts from "./pages/Flowcharts";
import ScheduleEmail from "./pages/ScheduleEmail";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/flowcharts" element={<Flowcharts />} />
      <Route path="/schedule" element={<ScheduleEmail />} />
    </Routes>
  </Router>
);

export default App;
