import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import Login from "./components/login/Login";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Register from "./components/register/Register";
import Dashboard from "./components/dashboard/Dashboard";
import { AuthContextProvider } from "./context/AuthContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login></Login>}>
            Login
          </Route>
          <Route path="/register" element={<Register></Register>}>
            Register
          </Route>
          <Route path="/dashboard" element={<Dashboard />}>
            Dashboard
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
