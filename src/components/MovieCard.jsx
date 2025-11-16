import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  // Normalizar la ruta para Vite
  const posterSrc = "/" + (movie.poster || "").replace(/^\.\//, "");

  return (
    <div className="card">
      <Link to={`/movie/${movie.id}`}>
        <div className="movie-poster img">
          <img  src={posterSrc} alt={movie.titulo} title={movie.titulo} />
        </div>

        <div className="card-bottom">
          <p className="card-bottom-title">{movie.titulo}</p>
          <p>{movie.categoria}</p>
        </div>
      </Link>
    </div>
  );
}
