/* === FINANCEIRO CONTRATOS === */

// Stub components — full implementation pending
const MarketplaceScreen = ({ onNavigate }) => {
  return React.createElement('div', { style: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f4f6f9' } },
    React.createElement('div', { style: { textAlign: 'center' } },
      React.createElement('h2', { style: { color: '#1a1a2e' } }, 'Marketplace'),
      React.createElement('p', { style: { color: '#718096' } }, 'Em desenvolvimento')
    )
  );
};

const FornecedorScreen = ({ onNavigate }) => {
  return React.createElement('div', { style: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f4f6f9' } },
    React.createElement('div', { style: { textAlign: 'center' } },
      React.createElement('h2', { style: { color: '#1a1a2e' } }, 'Painel Fornecedor'),
      React.createElement('p', { style: { color: '#718096' } }, 'Em desenvolvimento')
    )
  );
};

const CotacoesScreen = ({ onNavigate }) => {
  return React.createElement('div', { style: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f4f6f9' } },
    React.createElement('div', { style: { textAlign: 'center' } },
      React.createElement('h2', { style: { color: '#1a1a2e' } }, 'Cotações'),
      React.createElement('p', { style: { color: '#718096' } }, 'Em desenvolvimento')
    )
  );
};

Object.assign(window, { MarketplaceScreen, FornecedorScreen, CotacoesScreen });
