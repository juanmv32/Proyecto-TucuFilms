import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/logotucufilms3.png";

const NavBarApp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Validar credenciales
    if (username === 'juliometal' && password === 'blacksabbath') {
      setUsername('');
      setPassword('');
      
      // Cerrar modal
      document.querySelector('#loginModal .btn-close')?.click();
      
      // Redirigir a admin
      setTimeout(() => navigate('/Admin'), 300);
    } else {
      alert('Credenciales incorrectas');
      setUsername('');
      setPassword('');
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src={logo} alt="logo TucuFilms" width="45" className="me-2" />
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
                <button className="nav-link btn btn-link" data-bs-toggle="modal" data-bs-target="#loginModal" style={{ border: 'none', textDecoration: 'none' }}>Administración</button>
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
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label">Usuario</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Contraseña</label>
                  <input 
                    type="password" 
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Ingresar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBarApp;