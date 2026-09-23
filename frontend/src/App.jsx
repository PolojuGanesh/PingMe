import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import MainHome from "./components/MainHome";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route
          exact
          path="/main-home"
          element={
            <ProtectedRoute>
              <MainHome />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
