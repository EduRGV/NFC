import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfileContainer from "./ProfileContainer";
import ProfilePage from "./ProfilePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProfileContainer />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
};

export default App;
