// App.jsx
import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

function App() {
  const [cart, setCart] = useState([]);
  const location = useLocation();

  // Funzione per aggiungere prodotti al carrello
  const addToCart = (product, quantity) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  // Funzione per aggiornare la quantità di un prodotto nel carrello
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Funzione per rimuovere un prodotto dal carrello
  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  // Calcola il numero totale di articoli nel carrello
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div style={{ padding: "20px", minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <nav style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        padding: "15px", 
        backgroundColor: "#fff", 
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        borderRadius: "8px",
        marginBottom: "20px"
      }}>
        <h1 style={{ margin: 0, color: "#333" }}>Shop</h1>
        <div style={{ display: "flex", gap: "20px" }}>
          <Link 
            to="/" 
            style={{ 
              textDecoration: "none", 
              color: location.pathname === "/" ? "#007bff" : "#333",
              fontWeight: location.pathname === "/" ? "bold" : "normal"
            }}
          >
            Home
          </Link>
          <Link 
            to="/shop" 
            style={{ 
              textDecoration: "none", 
              color: location.pathname === "/shop" ? "#007bff" : "#333",
              fontWeight: location.pathname === "/shop" ? "bold" : "normal"
            }}
          >
            Shop
          </Link>
          <Link 
            to="/cart" 
            style={{ 
              textDecoration: "none", 
              color: location.pathname === "/cart" ? "#007bff" : "#333",
              fontWeight: location.pathname === "/cart" ? "bold" : "normal",
              position: "relative"
            }}
          >
            Cart
            {getTotalItems() > 0 && (
              <span style={{
                position: "absolute",
                top: "-8px",
                right: "-12px",
                backgroundColor: "#007bff",
                color: "white",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px"
              }}>
                {getTotalItems()}
              </span>
            )}
          </Link>
        </div>
      </nav>
      
      <Outlet context={{ cart, addToCart, updateQuantity, removeFromCart }} />
    </div>
  );
}

export default App;