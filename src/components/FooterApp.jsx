import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logoletras.png"; 

const FooterApp = () => {
  return (
    <footer className="py-4 bg-dark">
      
      {/* align-items-center: Centra verticalmente los logos con el texto */}
      <div className="row text-center align-items-center">
        
        {/* COLUMNA 1: LOGO */}
        <div className="col bg-dark">
          <Link to="/">
            <img
              src={logo}
              alt="Inicio Tucu Films"
              className="img-fluid"
              style={{ maxWidth: "200px", height: "auto" }}
            />
          </Link>
        </div>

        {/* COLUMNA 2: COPYRIGHT */}
        <div className="col bg-dark p-3 text-light">
          <small>
            &copy; {new Date().getFullYear()} Tucu Films. <br />
            Todos los derechos reservados.
          </small>
        </div>

        {/* COLUMNA 3: REDES SOCIALES */}
        <div className="col d-flex justify-content-center gap-3 bg-dark p-3">
          <a href="http://" target="_blank" rel="noopener noreferrer">
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
              alt="Facebook"
              className="object-fit-contain"
              style={{ maxWidth: "50px", height: "auto" }}
            />
          </a>
          <a href="http://" target="_blank" rel="noopener noreferrer">
            <img
              src="https://cdn-icons-png.flaticon.com/512/174/174855.png"
              alt="Instagram"
              className="object-fit-contain"
              style={{ maxWidth: "50px", height: "auto" }}
            />
          </a>
          <a href="http://" target="_blank" rel="noopener noreferrer">
            <img
              src="https://cdn-icons-png.flaticon.com/512/5968/5968830.png"
              alt="X"
              className="object-fit-contain"
              style={{
                maxWidth: "50px",
                height: "auto",
                filter: "invert(1)",
                cursor: "pointer",
              }}
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FooterApp;