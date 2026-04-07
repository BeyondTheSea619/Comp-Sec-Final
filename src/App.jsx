import "./App.css";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Login from "./Pages/login";
import Home from "./Pages/home";
import Search from "./Pages/Search";
import FileUpload from "./Pages/upload";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
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
        </div>

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Pages/login" element={<Login />}></Route>
          <Route path="/Pages/search" element={<Search />}></Route>
          <Route path="/Pages/upload" element={<FileUpload />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
