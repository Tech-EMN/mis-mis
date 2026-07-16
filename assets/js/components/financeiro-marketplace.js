/* === FINANCEIRO MARKETPLACE === */
const { useState: useApp, useEffect: useEffectApp } = React;
const PedidosScreen = ({ onNavigate }) => React.createElement('div', { style: { minHeight: '100vh', background: 'var(--mis-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' } }, React.createElement('p', { style: { color: 'var(--mis-text-muted)' } }, 'Pedidos — Em desenvolvimento'));
const MedicoesScreen = ({ onNavigate }) => React.createElement('div', { style: { minHeight: '100vh', background: 'var(--mis-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' } }, React.createElement('p', { style: { color: 'var(--mis-text-muted)' } }, 'Medições — Em desenvolvimento'));
const AvaliacoesScreen = ({ onNavigate }) => React.createElement('div', { style: { minHeight: '100vh', background: 'var(--mis-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' } }, React.createElement('p', { style: { color: 'var(--mis-text-muted)' } }, 'Avaliações — Em desenvolvimento'));
Object.assign(window, { PedidosScreen, MedicoesScreen, AvaliacoesScreen });
