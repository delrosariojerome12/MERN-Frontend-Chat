import React from "react";
import {useNavigate} from "react-router-dom";
const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h3>Page Not Found</h3>
      <button onClick={() => navigate("/")}>Home</button>
    </div>
  );
};

export default ErrorPage;
