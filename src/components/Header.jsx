import { useAuth } from "../hooks/useAuth";
import Login from "./Login";
import { Link } from "react-router-dom";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header>
      <div className="title">
        <Link to="/" className="logo-title">TRAILERFLIX</Link>
      </div>

      <div className="login-container" style={{ right: 20, top: 10 }}>
        <Login />
        {user && (
          <div id="userInfo" style={{ marginLeft: 12 }}>
            <span id="userNameDisplay">{user.nombre || user.usuario}</span>
            <button id="logoutBtn" onClick={logout}>Cerrar sesión</button>
          </div>
        )}
      </div>
    </header>
  );
}
