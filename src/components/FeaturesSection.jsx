import React from 'react';
import './FeaturesSection.css'; // eventuale CSS separato

const features = [
  {
    icon: '🚚',
    title: 'Spedizione Gratuita',
    description: 'Per ordini superiori a 30€. Consegna in 24-48 ore in tutta Italia.'
  },
  {
    icon: '🛡️',
    title: 'Pagamento Sicuro',
    description: 'Transazioni protette con crittografia SSL. Tutti i metodi di pagamento accettati.'
  },
  {
    icon: '📦',
    title: 'Imballaggio Protetto',
    description: 'I tuoi manga arrivano perfetti grazie al nostro imballaggio speciale.'
  },
  {
    icon: '💬',
    title: 'Supporto Clienti',
    description: 'Assistenza dedicata per ogni tua esigenza. Siamo qui per aiutarti.'
  }
];

const FeaturesSection = () => {
  return (
    <section className="features-section">
      <div className="container">
        <h2 className="section-title">Perché scegliere E-MANGA</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
