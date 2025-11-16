import { useEffect, useState } from "react";
import { useFilterMovies } from "../hooks/useFilterMovies";
import MovieCard from "../components/MovieCard";
import Login from "../components/Login";

export default function Home() {
  const [movies, setMovies] = useState([]);

  const {
    searchTerm,
    setSearchTerm,
    selectedGenres,
    toggleGenre,
    selectedCategories,
    toggleCategory,
    clearAll,
    filteredMovies
  } = useFilterMovies(movies);

  useEffect(() => {
    fetch("/data/trailerflix.json")
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error("Error cargando películas:", err));
  }, []);

  return (
    <>
      
      <h1 className="logo-title red-text title">TRAILERFLIX</h1>

          
    <div className="login-container">
      <Login />
    </div>

      {/* SECCIÓN BÚSQUEDA + FILTROS */}
      <section className="search-filters-section">
        {/* BUSCADOR */}
        <div className="search-container">
          <input
            id="searchInput"
            type="text"
            className="search-input"
            placeholder="Buscar por título, género, reparto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>

        {/* FILTROS */}
        <div className="filters-container">
          {/* Filtro por género */}
          <div className="filter-group">
            <p className="filter-label">Géneros:</p>
            <div className="filter-buttons" id="genreFilters">
              {[
                "Ciencia Ficción",
                "Drama",
                "Suceso Real",
                "Suspenso",
                "Fantasía",
                "Familia",
                "Acción",
                "Terror",
                "Aventura",
              ].map((gen) => (
                <button
                  key={gen}
                  type="button"
                  className={
                    "filter-btn" +
                    (selectedGenres.includes(gen) ? " active" : "")
                  }
                  onClick={() => toggleGenre(gen)}
                >
                  {gen}
                </button>
              ))}
            </div>
          </div>

          {/* Filtro por categoría */}
          <div className="filter-group">
            <p className="filter-label">Categoría:</p>
            <div className="filter-buttons" id="categoryFilters">
              {["Película", "Serie"].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={
                    "filter-btn" +
                    (selectedCategories.includes(cat) ? " active" : "")
                  }
                  onClick={() => toggleCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Botón limpiar filtros */}
          <button
            type="button"
            id="clearFilters"
            className="clear-btn"
            onClick={clearAll}
          >
            Limpiar filtros
          </button>
        </div>

        {/* Contador de resultados */}
        <p
          id="resultsCount"
          className="results-count"
          style={
            searchTerm ||
            selectedGenres.length > 0 ||
            selectedCategories.length > 0
              ? { display: "block" }
              : { display: "none" }
          }
        >
          Se encontraron {filteredMovies.length} resultado
          {filteredMovies.length !== 1 ? "s" : ""}
        </p>
      </section>

      {/* LISTA DE PELÍCULAS */}
      <main className="container">
        {filteredMovies.length === 0 ? (
          <div className="error">
            <h2 className="red-text">No se encontraron resultados</h2>
            <p>
              Intenta con otros términos de búsqueda o filtros diferentes 🍿
            </p>
          </div>
        ) : (
          filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        )}
      </main>
    </>
  );
}
