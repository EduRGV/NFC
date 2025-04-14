import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProfileContainer from "./ProfileContainer";
import ProfilePage from "./ProfilePage";
import ListingPage from "./components/Listing/ListingPage";
import Login from "./components/login/login";
import Layout from "./Layout"; // el nuevo layout con Sidebar
import "./App.css";
import Register from "./components/Register/Register";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta de Login como página principal */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Rutas con Sidebar */}
        <Route element={<Layout />}>
          <Route path="/profile" element={<ProfileContainer />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/listar" element={<ListingPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;