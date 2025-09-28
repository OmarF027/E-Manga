// Home.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";

const featuredMangaTitles = ["One Piece", "Attack on Titan", "Slam Dunk"];

const Home = () => {
  const [mangaList, setMangaList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Fetch dei 3 manga principali
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const promises = featuredMangaTitles.map(async (title) => {
          const res = await fetch(
            `https://api.jikan.moe/v4/manga?q=${encodeURIComponent(title)}&limit=1`
          );
          const data = await res.json();
          const m = data.data[0];
          return {
            id: m.mal_id,
            title: m.title,
            author: m.authors?.[0]?.name || "Sconosciuto",
            volumes: m.volumes || "N/D",
            status: m.status,
            year: m.published?.prop?.from?.year || "N/D",
            coverImage: m.images.jpg.large_image_url,
          };
        });

        const results = await Promise.all(promises);
        setMangaList(results);
      } catch (err) {
        console.error("Errore fetch featured manga:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            {/* Logo Section con sottotitolo */}
            <div className="logo-section">
              <img src="/images/logo.jpg" alt="E-Manga Logo" className="hero-logo-full" />
            </div>

            {/* Hero Text */}
            <div className="hero-text">
              <p className="hero-description">
                Scopri migliaia di titoli, dalle ultime uscite ai classici senza tempo. 
                Consegna rapida e prezzi competitivi.
              </p>
              
              {/* Search Bar Funzionante */}
              <form className="search-bar" onSubmit={handleSearch}>
                <div className="search-input-container">
                  <input 
                    type="text" 
                    placeholder="Cerca il tuo manga..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button type="submit" className="search-btn">
                    🔍 Cerca
                  </button>
                </div>
              </form>

          
            </div>
          </div>
        </div>
      </section>

      {/* Featured Manga */}
      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">In Evidenza</h2>

          {isLoading ? (
            <p style={{ textAlign: "center" }}>Caricamento manga…</p>
          ) : (
            <>
              <div className="manga-grid">
                {mangaList.map((manga) => (
                  <Link
                    key={manga.id}
                    to={`/manga/${manga.id}`}
                    className="manga-card"
                  >
                    <div
                      className="manga-cover"
                      style={{ backgroundImage: `url(${manga.coverImage})` }}
                    >
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
              
              {/* Call-to-Action */}
              <div className="cta-container">
                <Link 
                to="/shop" 
                className="cta-button"
                onClick={() => window.scrollTo(0, 0)}
              >
                🛒 Vedi tutti i manga
              </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;