import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Landing from "./pages/Landing";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";

import { AuthContext } from "../context/AuthContext";

const App = () => {
  const { authUser } = useContext(AuthContext);

  return (
    <>
      <Toaster />

      <Routes>
        {/* 🌍 Landing Page (NO background wrapper) */}
        <Route path="/" element={<Landing />} />

        {/* 🔐 All other pages keep OLD pattern */}
        <Route
          path="/*"
          element={
            <div className="bg-[url('/bgImage.svg')] bg-contain min-h-screen">
              <Routes>
                <Route
                  path="login"
                  element={
                    !authUser ? <LoginPage /> : <Navigate to="/" />
                  }
                />

                <Route
                  path="chat"
                  element={
                    authUser ? <HomePage /> : <Navigate to="/login" />
                  }
                />

                <Route
                  path="profile"
                  element={
                    authUser ? <ProfilePage /> : <Navigate to="/login" />
                  }
                />
              </Routes>
            </div>
          }
        />
      </Routes>
    </>
  );
};

export default App;
