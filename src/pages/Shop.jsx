// Shop.jsx
import { useState, useEffect, useLayoutEffect } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import './Shop.css';

const Shop = () => {
  const { addToCart } = useOutletContext();
  const [quantities, setQuantities] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // SOLUZIONE COMBINATA PER SCROLL IN ALTO
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  const selectedMangaIds = [
    13,     // One Piece
    42,     // Dragon Ball
    23390,  // Attack on Titan
    113138, // Jujutsu Kaisen
    44347,  // One Punch Man
    11,     // Naruto
    116778, // Chainsaw Man
    25,     // Fullmetal Alchemist
    21,     // Death Note
    2,      // Berserk
    3       // Slam Dunk
  ];

  const mangaPrices = {
    13: 7.90,
    42: 6.90,
    23390: 7.50,
    113138: 7.90,
    44347: 7.90,
    11: 6.90,
    116778: 7.90,
    25: 7.90,
    21: 6.90,
    2: 6.90,
    3: 7.50
  };

  useEffect(() => {
    const fetchMangas = async () => {
      try {
        setLoading(true);
        const mangas = await Promise.all(
          selectedMangaIds.map(async (id) => {
            const res = await fetch(`https://api.jikan.moe/v4/manga/${id}`);
            const data = await res.json();

            if (!data.data) return null;

            return {
              id: data.data.mal_id,
              title: data.data.title,
              image: data.data.images?.jpg?.image_url || "https://via.placeholder.com/200x300/2d3436/ffffff?text=Manga",
              price: mangaPrices[id] || 7.90,
              synopsis: data.data.synopsis,
              chapters: data.data.chapters,
              volumes: data.data.volumes,
              score: data.data.score,
              authors: data.data.authors
            };
          })
        );

        const validMangas = mangas.filter(m => m !== null);
        setProducts(validMangas);

        const initialQuantities = {};
        validMangas.forEach(m => initialQuantities[m.id] = 1);
        setQuantities(initialQuantities);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMangas();
  }, []);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      setQuantities(prev => ({ ...prev, [productId]: newQuantity }));
    }
  };

  const handleIncrement = (productId) => {
    setQuantities(prev => ({ ...prev, [productId]: prev[productId] + 1 }));
  };

  const handleDecrement = (productId) => {
    if (quantities[productId] > 1) {
      setQuantities(prev => ({ ...prev, [productId]: prev[productId] - 1 }));
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product, quantities[product.id]);
    setQuantities(prev => ({ ...prev, [product.id]: 1 }));
  };

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Caricamento manga...</p>
    </div>
  );
  
  if (error) return (
    <div className="error-container">
      <p>Errore: {error}</p>
      <button onClick={() => window.location.reload()}>Riprova</button>
    </div>
  );

  return (
    <div className="shop-container">
      <div className="shop-header">
        <h1>Collezione Manga</h1>
        <p>Scopri i nostri manga più popolari</p>
      </div>

      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            {/* Solo l'immagine e il titolo sono cliccabili per i dettagli */}
            <Link to={`/manga/${product.id}`} className="product-link">
              <div className="product-image">
                <img 
                  src={product.image} 
                  alt={product.title}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/200x300/2d3436/ffffff?text=Copertina';
                  }}
                />
              </div>
              
              <div className="product-info">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-price">€{product.price.toFixed(2)}</p>
              </div>
            </Link>

            {/* I controlli quantità e il bottone NON sono nel Link */}
            <div className="product-actions">
              <div className="quantity-controls">
                <button 
                  className="quantity-btn"
                  onClick={() => handleDecrement(product.id)}
                  disabled={quantities[product.id] <= 1}
                >
                  -
                </button>
                <input 
                  type="number" 
                  value={quantities[product.id] || 1} 
                  onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value) || 1)} 
                  min="1"
                  className="quantity-input"
                />
                <button 
                  className="quantity-btn"
                  onClick={() => handleIncrement(product.id)}
                >
                  +
                </button>
              </div>

              <button 
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(product)}
              >
                Aggiungi al carrello
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;