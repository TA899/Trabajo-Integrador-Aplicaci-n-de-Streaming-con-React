export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-container">
      <input
        className="search-input"
        placeholder="Buscar por título, género, reparto..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="search-icon">🔎</div>
    </div>
  );
}
