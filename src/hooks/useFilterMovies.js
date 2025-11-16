import { useMemo, useState } from "react";

export function useFilterMovies(initialMovies = []) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleSelected = (arr, setter, value) => {
    if (arr.includes(value)) setter(arr.filter((v) => v !== value));
    else setter([...arr, value]);
  };

  const clearAll = () => {
    setSearchTerm("");
    setSelectedGenres([]);
    setSelectedCategories([]);
  };

  const filteredMovies = useMemo(() => {
    const term = (searchTerm || "").trim().toLowerCase();
    const movies = initialMovies || [];
    return movies.filter((movie) => {
      const busqueda = (movie.busqueda || `${movie.titulo} ${movie.genero || ""} ${movie.reparto || ""}`).toLowerCase();
      const matchesSearch = !term || busqueda.includes(term);
      const matchesGenre = selectedGenres.length === 0 || selectedGenres.includes(movie.gen);
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(movie.categoria);
      return matchesSearch && matchesGenre && matchesCategory;
    });
  }, [initialMovies, searchTerm, selectedGenres, selectedCategories]);

  return {
    searchTerm,
    setSearchTerm,
    selectedGenres,
    toggleGenre: (g) => toggleSelected(selectedGenres, setSelectedGenres, g),
    selectedCategories,
    toggleCategory: (c) => toggleSelected(selectedCategories, setSelectedCategories, c),
    clearAll,
    filteredMovies,
    setSelectedGenres,
    setSelectedCategories,
  };
}
