import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Header from "../components/Header";
import MainContent from "../routers/MainContent";

const AppRouter = () => {
  return (
    <Router>
      <Header />
      <MainContent />
    </Router>
  );
};

export default AppRouter;
