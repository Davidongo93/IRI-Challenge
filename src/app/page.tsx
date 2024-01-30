"use client";
import React, { useState } from "react";
import LoginBox from "./components/loginBox/LoginBox";
import StudentForm from "./components/studentForm/StudentForm";
import ThankYouScreen from "./components/thankYouScreen/ThankYouScreen";

const Home = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleSubmit = () => {

    setSubmitted(true);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-purple">
      {loggedIn ? (
        submitted ? (
          <ThankYouScreen />
        ) : (
          <StudentForm onSubmit={handleSubmit} />
        )
      ) : (
        <LoginBox onLogin={handleLogin} />
      )}
    </main>
  );
};

export default Home;
