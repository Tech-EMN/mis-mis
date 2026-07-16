/* === DASHBOARD === */

const DashboardScreen = ({ onNavigate }) => {
  const [project, setProject] = React.useState(readActiveProject());
  React.useEffect(() => {
    const sync = e => setProject(e.detail || readActiveProject());
    window.addEventListener('mis:project-change', sync);
    return () => window.removeEventListener('mis:project-change', sync);
  }, []);
  if (!project) {
    return React.createElement('div', { style: { minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--mis-bg)' } },
      React.createElement('h2', { style: { color: 'var(--mis-text-muted)', marginBottom: 12 } }, 'Nenhum projeto selecionado'),
      React.createElement('button', { onClick: () => onNavigate('projetos'), style: { padding: '10px 24px', borderRadius: 10, background: '#2563eb', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600 } }, 'Selecionar projeto')
    );
  }
  return React.createElement('div', { style: { minHeight: '100vh', background: 'var(--mis-bg)' } },
    React.createElement('div', { style: { maxWidth: 900, margin: '0 auto', padding: '40px 24px' } },
      React.createElement('h1', { style: { fontSize: 32, fontWeight: 800, color: 'var(--mis-text-strong)', marginBottom: 8 } }, project.name || 'Dashboard'),
      React.createElement('p', { style: { color: 'var(--mis-text-muted)', marginBottom: 24 } }, project.client || 'Visão geral do projeto'),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 } },
        ['Progresso', 'Orçamento', 'Prazo'].map((label, i) =>
          React.createElement('div', { key: i, style: { padding: 24, background: 'var(--mis-card)', borderRadius: 12, border: '1px solid var(--mis-border)' } },
            React.createElement('div', { style: { fontSize: 12, color: 'var(--mis-text-muted)', marginBottom: 8 } }, label),
            React.createElement('div', { style: { fontSize: 28, fontWeight: 700, color: 'var(--mis-text-strong)' } }, '—')
          )
        )
      ),
      React.createElement('div', { style: { marginTop: 24, display: 'flex', gap: 10 } },
        React.createElement('button', { onClick: () => onNavigate('upload'), style: { padding: '12px 24px', borderRadius: 10, background: '#2563eb', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600 } }, '📤 Upload de arquivos'),
        React.createElement('button', { onClick: () => onNavigate('feed'), style: { padding: '12px 24px', borderRadius: 10, background: 'var(--mis-card)', color: 'var(--mis-text-strong)', border: '1px solid var(--mis-border)', cursor: 'pointer', fontSize: 14, fontWeight: 600 } }, 'MIS Feed')
      )
    )
  );
};

Object.assign(window, { DashboardScreen });
