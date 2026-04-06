import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Login from "./Pages/login";
import Home from "./Pages/home";
import Search from "./Pages/Search";
function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <Link className="nav" to="/">
            Home
          </Link>
          <Link className="nav" to="/Pages/login">
            Login
          </Link>
          <Link className="nav" to="/Pages/search">
            Search
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Pages/login" element={<Login />}></Route>
          <Route path="/Pages/search" element={<Search />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
