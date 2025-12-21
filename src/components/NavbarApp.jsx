import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logotucufilms3.png";

const NavBarApp = () => {
  const navigate = useNavigate();

  // Lee del localStorage si está autenticado (true/false)
  const [estaAutenticado, setEstaAutenticado] = useState(
    localStorage.getItem("autenticado") === "true"
  );
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");

  const manejarLogin = (e) => {
    e.preventDefault();

    // Validar credenciales (juliometal / blacksabbath)
    if (usuario === "juliometal" && contrasena === "blacksabbath") {
      // Si son correctas: guarda en localStorage y actualiza el estado
      localStorage.setItem("autenticado", "true");
      setEstaAutenticado(true);
      setUsuario("");
      setContrasena("");

      // Cierra el modal de login
      document.querySelector("#loginModal .btn-close")?.click();

      // Redirige a Admin
      setTimeout(() => navigate("/Admin"), 300);
    } else {
      alert("Credenciales incorrectas");
      setUsuario("");
      setContrasena("");
    }
  };

  const manejarLogout = () => {
    // Elimina la autenticación del localStorage
    localStorage.removeItem("autenticado");
    setEstaAutenticado(false);
    // Redirige a inicio
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src={logo} alt="logo TucuFilms" width="45" className="me-2" />
            TucuFilms
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Inicio
                </Link>
              </li>
              {estaAutenticado && (
                <li className="nav-item d-block d-lg-flex">
                  <div>
                    <Link className="nav-link" to="/peliculas">
                      Mis Películas
                    </Link>
                  </div>
                  <div>
                    <Link className="nav-link" to="/admin">
                      Administración
                    </Link>
                  </div>
                </li>
              )}
              <li className="nav-item">
                {estaAutenticado ? (
                  <button
                    className="nav-link btn btn-link"
                    onClick={manejarLogout}
                    style={{
                      border: "none",
                      textDecoration: "none",
                      color: "#fff",
                    }}
                  >
                    Cerrar Sesión
                  </button>
                ) : (
                  <button
                    className="nav-link btn btn-link"
                    data-bs-toggle="modal"
                    data-bs-target="#loginModal"
                    style={{ border: "none", textDecoration: "none" }}
                  >
                    Administración
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Modal de login */}
      <div className="modal fade" id="loginModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Acceso Admin</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={manejarLogin}>
                <div className="mb-3">
                  <label className="form-label">Usuario</label>
                  <input
                    type="text"
                    className="form-control"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Ingresar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBarApp;
