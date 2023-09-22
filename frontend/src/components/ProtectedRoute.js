import React from "react";
import { Navigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const ProtectedRoute = ({ email, loggedIn, element: Component, ...props }) => {
  return loggedIn ? (
    <>
      <Header email={email} loggedIn={loggedIn} />
      <Component {...props} /> <Footer />
    </>
  ) : (
    <Navigate to="/sign-in" replace />
  );
};

export default ProtectedRoute;
