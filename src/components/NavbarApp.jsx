import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logotucufilms3.png"


const NavBarApp = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src= {logo} alt="logo TucuFilms" width="45" className="me-2" />
          TucuFilms
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/Admin">Administración</Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBarApp;