import "./App.css";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Login from "./Pages/login";
import Home from "./Pages/home";
import Search from "./Pages/Search";
import Admin from "./Pages/admin";
import FileUpload from "./Pages/upload";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const userRole = localStorage.getItem("userRole");
  return (
    <BrowserRouter>
      <div>
        <div className="d-flex justify-content-around pt-2 mb-5">
          <Link className="" to="/">
            Home
          </Link>
          <Link className="" to="/Pages/login">
            Login
          </Link>
          <Link className="" to="/Pages/search">
            Search
          </Link>
          <Link className="" to="/Pages/upload">
            Upload
          </Link>
          {userRole === "admin" && (
            <Link className="text-danger fw-bold" to="/Pages/admin">
              Admin
            </Link>
          )}
        </div>

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Pages/login" element={<Login />}></Route>
          <Route path="/Pages/search" element={<Search />}></Route>
          <Route path="/Pages/upload" element={<FileUpload />}></Route>
          <Route path="/Pages/admin" element={<Admin />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
