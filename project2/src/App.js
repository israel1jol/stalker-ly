import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Components/Navbar.component";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Profile from "./Pages/Profile";
import Logout from "./Pages/Logout";
import Discover from "./Pages/Discover";
import Account from "./Pages/Account";

function App() {

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<SignUp  />}/>
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/discover" element={<Discover />}/>
          <Route path="/discover/:account" element={<Account />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
