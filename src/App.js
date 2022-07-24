import Login from "./components/login/Login";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import Register from "./components/register/Register";
import Dashboard from "./components/dashboard/Dashboard";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import Menu from "./components/menu/Menu";
import User from "./components/user/User";
import { createBrowserHistory } from "history";
const history = createBrowserHistory({ basename: "/chatapp" });

function App() {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter basename={"/chatapp"} history={history}>
      <Routes>
        <Route
          path="/"
          element={
            user ? <Navigate to="/dashboard"></Navigate> : <Login></Login>
          }
        >
          Login
        </Route>
        <Route path="/register" element={<Register></Register>}>
          Register
        </Route>
        <Route
          path="/dashboard"
          element={!user ? <Navigate to="/" /> : <Dashboard />}
        >
          Dashboard
        </Route>
        <Route path="/upload" element={<User />}>
          Upload
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
