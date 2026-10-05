import { Routes, Route } from "react-router";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return(
    <Routes>
      <Route path="/" element={ <Dashboard /> } />
      <Route path="/register" element={ <Register /> } />
      <Route path="/login" element={ <Login /> } />
    </Routes>
  );
}

export default App;