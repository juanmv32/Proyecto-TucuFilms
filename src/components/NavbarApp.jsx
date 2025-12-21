import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NavBarApp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Validación simple - credenciales hardcodeadas
    (username === 'juliometal' && password === 'blacksabbath') && navigate('/Admin');
    
    // Limpiar formulario
    setUsername('');
    setPassword('');
  };

  return (
    <>
      {/* Navbar temporal - reemplazar con tu diseño personalizado */}
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">TucuFilms</a>
          {/* Botón para abrir modal de login admin */}
          <button className="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#loginModal">
            Admin
          </button>
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
                <button type="submit" className="btn btn-primary w-100" data-bs-dismiss="modal">Ingresar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBarApp;