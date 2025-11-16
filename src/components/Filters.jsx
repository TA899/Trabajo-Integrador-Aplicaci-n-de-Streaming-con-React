export default function Filters({
  genres = [],
  categories = [],
  selectedGenres = [],
  selectedCategories = [],
  toggleGenre,
  toggleCategory,
  onClear
}) {
  return (
    <div className="filters-container">
      <div className="filter-group">
        <div className="filter-label">Géneros</div>
        <div className="filter-buttons">
          {genres.map((g) => (
            <button
              key={g}
              className={`filter-btn ${selectedGenres.includes(g) ? "active" : ""}`}
              onClick={() => toggleGenre(g)}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <div className="filter-label">Categoría</div>
        <div className="filter-buttons">
          {categories.map((c) => (
            <button
              key={c}
              className={`filter-btn ${selectedCategories.includes(c) ? "active" : ""}`}
              onClick={() => toggleCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div>
        <button className="clear-btn" onClick={onClear}>Limpiar filtros</button>
      </div>
    </div>
  );
}
