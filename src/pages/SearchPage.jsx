// src/pages/SearchPage.jsx
import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import "./SearchPage.css";

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  // Estrae il parametro di ricerca dall'URL
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q") || "";

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const performSearch = async (searchQuery) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const res = await fetch(
        `https://api.jikan.moe/v4/manga?q=${encodeURIComponent(searchQuery)}&limit=12`
      );
      const data = await res.json();
      
      if (data.data) {
        const results = data.data.map(manga => ({
          id: manga.mal_id,
          title: manga.title,
          author: manga.authors?.[0]?.name || "Sconosciuto",
          rating: manga.score || "N/D",
          volumes: manga.volumes || "N/D",
          status: manga.status,
          year: manga.published?.prop?.from?.year || "N/D",
          coverImage: manga.images.jpg.large_image_url,
        }));
        setSearchResults(results);
      }
    } catch (err) {
      setError("Errore nella ricerca. Riprova più tardi.");
      console.error("Search error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="search-page">
      <div className="container">
        <div className="search-header">
          <h1>Risultati della ricerca</h1>
          {query && (
            <p className="search-query">Hai cercato: "<strong>{query}</strong>"</p>
          )}
        </div>

        {isLoading ? (
          <div className="loading">Ricerca in corso...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : searchResults.length > 0 ? (
          <div className="search-results">
            <div className="manga-grid">
              {searchResults.map((manga) => (
                <Link
                  key={manga.id}
                  to={`/manga/${manga.id}`}
                  className="manga-card"
                >
                  <div
                    className="manga-cover"
                    style={{ backgroundImage: `url(${manga.coverImage})` }}
                  >
                    <div className="rating">⭐ {manga.rating}</div>
                    <div
                      className={`status-badge ${
                        manga.status?.includes("Publishing")
                          ? "ongoing"
                          : "completed"
                      }`}
                    >
                      {manga.status?.includes("Publishing")
                        ? "In Corso"
                        : "Completato"}
                    </div>
                  </div>

                  <div className="manga-info">
                    <h3>{manga.title}</h3>
                    <p className="author">{manga.author}</p>
                    <p className="meta">
                      {manga.volumes} volumi • {manga.year}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : query ? (
          <div className="no-results">
            <p>Nessun risultato trovato per "<strong>{query}</strong>"</p>
            <p>Prova con un termine di ricerca diverso.</p>
          </div>
        ) : (
          <div className="no-query">
            <p>Inserisci un termine di ricerca per iniziare.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;