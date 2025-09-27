import React, { useState } from 'react';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email subscribed:', email);
    setEmail('');
    alert('Grazie per esserti iscritto alla newsletter!');
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        
        <div className="footer-top">
          <div className="footer-brand">
            <h3>E-MANGA</h3>
            <p>Scopri e acquista i manga più popolari e le ultime uscite.</p>
            <div className="footer-social">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          <div className="footer-newsletter">
            <h4>Rimani aggiornato sui nostri ultimi arrivi</h4>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="La tua email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Iscriviti</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-top">
            <span className="location">00184 Roma (RM)</span>
            <span className="copyright">© 2025 E-Manga – Tutti i diritti riservati</span>
            <span className="payment-title">Metodi di pagamento accettati:</span>
          </div>
          
          <div className="footer-bottom-bottom">
            <div className="payment-badges">
              <span className="badge">Visa</span>
              <span className="badge">Mastercard</span>
              <span className="badge">PayPal</span>
              <span className="badge">Apple Pay</span>
              <span className="badge">Google Pay</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;