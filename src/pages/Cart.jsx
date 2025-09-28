import { useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react'; 
import './Cart.css';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useOutletContext();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

  const handleQuantityChange = (id, newQuantity) => {
    updateQuantity(id, newQuantity);
  };

  const handleIncrement = (id, currentQuantity) => {
    updateQuantity(id, currentQuantity + 1);
  };

  const handleDecrement = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(id, currentQuantity - 1);
    } else {
      removeFromCart(id);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const handleCheckout = () => {
    setShowSuccessMessage(true);
    // Qui potresti anche svuotare il carrello dopo l'acquisto
    // clearCart(); se la funzione esiste nel context
  };

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Il tuo carrello</h2>
        <p>Il carrello è vuoto</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      {showSuccessMessage && (
        <div className="success-message">
          <div className="success-content">
            <span className="success-icon">✓</span>
            <div>
              <h3>Grazie per il tuo acquisto!</h3>
              <p>Totale: €{calculateTotal()}</p>
            </div>
          </div>
        </div>
      )}
      
      <h2 className="cart-title">Il tuo carrello</h2>
      <div className="cart-content">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img
              src={item.image}
              alt={item.title}
              className="item-image"
            />
            <div className="item-details">
              <h3 className="item-title">{item.title}</h3>
              <p className="item-price">€{item.price.toFixed(2)}</p>
            </div>
            <div className="quantity-controls">
              <button 
                onClick={() => handleDecrement(item.id, item.quantity)}
                className="quantity-btn"
              >
                -
              </button>
              <span className="quantity-display">{item.quantity}</span>
              <button 
                onClick={() => handleIncrement(item.id, item.quantity)}
                className="quantity-btn"
              >
                +
              </button>
            </div>
            <div className="item-total">
              <p className="total-price">€{(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <button 
              onClick={() => removeFromCart(item.id)}
              className="remove-btn"
            >
              Rimuovi
            </button>
          </div>
        ))}
        <div className="cart-footer">
          <div className="total-section">
            <h3 className="total-text">Totale: €{calculateTotal()}</h3>
            <button 
              onClick={handleCheckout}
              className="checkout-btn"
            >
              Acquista Ora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;