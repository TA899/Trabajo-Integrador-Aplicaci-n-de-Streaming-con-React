import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const { user, login, logout, loading, error } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Si está logueado mostramos saludo y nombre de usuario
  if (user) {
    return (
      <div className="login-container">
        <div id="userInfo" style={{ display: "flex" }}>
          <span id="userNameDisplay">
            Bienvenido, {user.firstName || user.username}
          </span>
          <button id="logoutBtn" onClick={logout}>
            Cerrar sesión
          </button>
        </div>
      </div>
    );
  }

  // Si no está logueado se muestra formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ usuario: username, password });
    setPassword("");
  };

  return (
    <div className="login-container">
      <form id="loginForm" onSubmit={handleSubmit}>
        <input
          id="username"
          placeholder="Usuario"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          id="password"
          type="password"
          placeholder="Contraseña"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Ingresando..." : "Ingresar"}
        </button>

        {error && (
          <div className="error" style={{ color: "red" }}>
            {error}
          </div>
        )}
      </form>
    </div>
  );
}
