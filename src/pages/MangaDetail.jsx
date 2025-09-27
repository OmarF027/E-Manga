import React, { useState, useEffect } from "react";
import { useParams, Link, useOutletContext } from "react-router-dom";
import "./MangaDetail.css";

const MangaDetail = () => {
  const { id } = useParams();
  const [manga, setManga] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useOutletContext();

  // Prezzi definiti come in Shop.jsx
  const mangaPrices = {
    13: 7.90,     // One Piece
    42: 6.90,     // Dragon Ball
    23390: 7.50,  // Attack on Titan
    113138: 7.90, // Jujutsu Kaisen
    44347: 7.90,  // One Punch Man
    11: 6.90,     // Naruto
    116778: 7.90, // Chainsaw Man
    25: 7.90,     // Fullmetal Alchemist
    21: 6.90,     // Death Note
    2: 6.90       // Berserk
  };

  // Scroll to top quando il componente viene montato
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchManga = async () => {
      try {
        const res = await fetch(`https://api.jikan.moe/v4/manga/${id}`);
        const data = await res.json();
        setManga(data.data);
      } catch (err) {
        console.error("Errore fetch manga:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchManga();
  }, [id]);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (manga) {
      const product = {
        id: manga.mal_id,
        title: manga.title,
        image: manga.images.jpg.large_image_url,
        price: mangaPrices[manga.mal_id] || 7.90
      };
      
      addToCart(product, quantity);
      setQuantity(1);
    }
  };

  if (isLoading) return <p className="manga-detail-loading">Caricamento manga…</p>;
  if (!manga) return <p className="manga-detail-error">Manga non trovato!</p>;

  const mangaPrice = mangaPrices[manga.mal_id] || 7.90;

  return (
    <div className="manga-detail-container">
      <Link to="/" className="manga-detail-back-link">
        ← Torna alla Home
      </Link>
      
      <div className="manga-detail-content">
        <div className="manga-detail-image-container">
          <img 
            src={manga.images.jpg.large_image_url} 
            alt={manga.title} 
            className="manga-detail-image"
          />
        </div>
        
        <div className="manga-detail-info">
          <h1 className="manga-detail-title">{manga.title}</h1>
          
          <div className="manga-detail-info-item">
            <strong>Autore:</strong> {manga.authors?.map(a => a.name).join(", ") || "Sconosciuto"}
          </div>
          
          <div className="manga-detail-info-item">
            <strong>Stato:</strong> {manga.status}
          </div>
          
          <div className="manga-detail-info-item">
            <strong>Volumi:</strong> {manga.volumes || "N/D"}
          </div>
          
          <div className="manga-detail-info-item">
            <strong>Capitoli:</strong> {manga.chapters || "N/D"}
          </div>
          
          <div className="manga-detail-info-item">
            <strong>Pubblicazione:</strong> {manga.published?.string || "N/D"}
          </div>
          
          <div className="manga-detail-info-item">
            <strong>Valutazione:</strong> {manga.score || "N/D"} {manga.score && "/10"}
          </div>
          
          <div className="manga-detail-info-item">
            <strong>Prezzo:</strong> €{mangaPrice.toFixed(2)}
          </div>
          
          <div className="manga-detail-quantity-selector">
            <span className="manga-detail-quantity-label"><strong>Quantità:</strong></span>
            <button 
              onClick={handleDecrement}
              className="manga-detail-quantity-btn"
            >
              -
            </button>
            <input 
              type="number" 
              value={quantity} 
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)} 
              min="1"
              className="manga-detail-quantity-input"
            />
            <button 
              onClick={handleIncrement}
              className="manga-detail-quantity-btn"
            >
              +
            </button>
          </div>
          
          <button 
            onClick={handleAddToCart}
            className="manga-detail-add-to-cart-btn"
          >
            Aggiungi al carrello (€{(mangaPrice * quantity).toFixed(2)})
          </button>
        </div>
      </div>
    </div>
  );
};

export default MangaDetail;