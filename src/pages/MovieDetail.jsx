import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/trailerflix.json")
      .then((r) => r.json())
      .then((data) => {
        const found = (data || []).find((m) => String(m.id) === String(id));
        setMovie(found || null);
      })
      .catch((e) => {
        console.error(e);
        setMovie(null);
      });
  }, [id]);

  if (!movie) return <div className="loading">Cargando...</div>;

  return (
    <div className="movie-page-container">
      <button className="back-btn" onClick={() => navigate(-1)}>Volver al catálogo</button>
      <div className="movie-details">
        <div className="movie-poster">
          <img src={(movie.poster || "").replace("./", "/")} alt={movie.titulo} />
        </div>
        <div className="movie-info">
          <h2>{movie.titulo}</h2>
          <p>{movie.resumen}</p>
          <p><strong>Reparto:</strong> {movie.reparto}</p>
          {movie.trailer && (
            <iframe
              title="trailer"
              src={movie.trailer}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </div>
    </div>
  );
}
