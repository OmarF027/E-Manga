// Shop.jsx
import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const Shop = () => {
  const { addToCart } = useOutletContext();
  const [quantities, setQuantities] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    2       // Berserk
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
    2: 6.90
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
              image: data.data.images?.jpg?.image_url || "https://via.placeholder.com/150",
              price: mangaPrices[id] || 7.90
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

  if (loading) return <p>Caricamento manga...</p>;
  if (error) return <p>Errore: {error}</p>;

  return (
    <div>
      <h1>Collezione Manga</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {products.map(product => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '10px', width: '200px' }}>
            <img 
              src={product.image} 
              alt={product.title} 
              style={{ width: '100%', height: 'auto' }} 
              onError={(e) => e.target.src = 'https://via.placeholder.com/150'}
            />
            <h3>{product.title}</h3>
            <p>€{product.price.toFixed(2)}</p>
            <div style={{ display: 'flex', gap: '5px', marginBottom: '5px' }}>
              <button onClick={() => handleDecrement(product.id)}>-</button>
              <input 
                type="number" 
                value={quantities[product.id] || 1} 
                onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value) || 1)} 
                min="1"
                style={{ width: '40px' }}
              />
              <button onClick={() => handleIncrement(product.id)}>+</button>
            </div>
            <button onClick={() => handleAddToCart(product)}>Aggiungi al carrello</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
