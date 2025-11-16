import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const nav = useNavigate();
  return (
    <div className="error-container">
      <h1 className="error-code">404</h1>
      <h2 className="error-message">Página no encontrada</h2>
      <p className="error-description">Lo sentimos, la ruta solicitada no existe.</p>
      <button className="back-home-btn" onClick={() => nav("/")}>Volver al inicio</button>
    </div>
  );
}
