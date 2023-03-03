import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        <div className="logo"></div>
      </Link>
      <div className="search-box">
        <input
          type="text"
          placeholder="Buscar cuentas y videos..."
          className="search-input"
        />

        <a href="#" className="search-botton">
          <i className="fas fa-search"></i>
        </a>
      </div>
      <div className="upload-container">
        <div className="section">
          <Link to="/upload">
            {/* <div className="upload" /> */}
            <button className="upload-btn">Upload</button>
          </Link>
          <Link to="/@omarro">
            <img
              className="personal"
              alt="personal"
              src="https://i.imgur.com/wre2PiR.jpeg"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
