// Cart.jsx
import { useOutletContext } from 'react-router-dom';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useOutletContext();

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

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2>Your Cart</h2>
        <p>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Your Cart</h2>
      <div style={{ backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
        {cart.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "15px",
              borderBottom: "1px solid #eee"
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{ width: "80px", height: "80px", objectFit: "contain", marginRight: "15px" }}
            />
            <div style={{ flexGrow: 1 }}>
              <h3 style={{ margin: "0 0 5px 0", fontSize: "16px" }}>{item.title}</h3>
              <p style={{ margin: "0", fontWeight: "bold" }}>${item.price}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button 
                onClick={() => handleDecrement(item.id, item.quantity)}
                style={{ 
                  padding: "5px 10px", 
                  border: "1px solid #ddd", 
                  borderRadius: "4px", 
                  backgroundColor: "#f8f9fa",
                  cursor: "pointer"
                }}
              >
                -
              </button>
              <span style={{ minWidth: "30px", textAlign: "center" }}>{item.quantity}</span>
              <button 
                onClick={() => handleIncrement(item.id, item.quantity)}
                style={{ 
                  padding: "5px 10px", 
                  border: "1px solid #ddd", 
                  borderRadius: "4px", 
                  backgroundColor: "#f8f9fa",
                  cursor: "pointer"
                }}
              >
                +
              </button>
            </div>
            <div style={{ marginLeft: "15px", minWidth: "80px", textAlign: "right" }}>
              <p style={{ margin: "0", fontWeight: "bold" }}>€{(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <button 
              onClick={() => removeFromCart(item.id)}
              style={{ 
                marginLeft: "15px", 
                padding: "5px 10px", 
                backgroundColor: "#dc3545", 
                color: "white", 
                border: "none", 
                borderRadius: "4px", 
                cursor: "pointer" 
              }}
            >
              Remove
            </button>
          </div>
        ))}
        <div style={{ padding: "15px", textAlign: "right", borderTop: "2px solid #eee" }}>
          <h3 style={{ margin: "0" }}>Total: ${calculateTotal()}</h3>
        </div>
      </div>
    </div>
  );
};

export default Cart;