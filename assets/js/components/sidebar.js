/* === SIDEBAR === */

const Sidebar = ({ active, onNavigate }) => {
  const [profileOpen, setProfileOpen] = React.useState(false);
  return (
    <aside className="mis-sidebar">
      <button className="mis-logo" onClick={() => onNavigate('feed')} aria-label="Ir para o MIS Feed"><MisBrand size={48} className="mis-logo-image" /></button>
      <nav className="mis-nav">
        {NAV_ITEMS.map((item, index) => {
          if (item.section) return <div key={`section-${item.section}-${index}`} className="mis-nav-section">{item.section}</div>;
          const sidebarActive = ['financeiro','contas_receber','contas_pagar','fluxo_caixa','medicoes'].includes(active)
            ? 'financeiro_geral'
            : ['contrato'].includes(active) ? 'contratos_geral' : active;
          const isActive = sidebarActive === item.id;
          const Icon = Ic[item.icon];
          return (
            <button key={item.id} onClick={() => onNavigate(item.id)} className={`mis-nav-item${isActive ? ' active' : ''}`} title={item.label} aria-label={item.label}>
              {Icon && <Icon size={17} />}
              <span className="mis-sidebar-label" style={{ flex: 1 }}>{item.label}</span>
              {item.badge && <span className={`mis-nav-badge${isActive ? ' active' : ''}`}>{item.badge}</span>}
            </button>
          );
        })}
      </nav>
      <div style={{ position: 'relative' }}>
        {profileOpen && (
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 'calc(100% + 8px)', background: '#fff', border: `1px solid ${C.border}`, borderRadius: 14, padding: 7, boxShadow: '0 14px 36px rgba(15,23,42,.16)', zIndex: 30 }}>
            <button onClick={() => onNavigate('perfil_op')} className="mis-profile-menu-item"><Ic.User size={15} />Meu perfil</button>
            <button onClick={() => onNavigate('configuracoes')} className="mis-profile-menu-item"><Ic.Settings size={15} />Configurações</button>
            <button onClick={() => { clearActiveProject(); onNavigate('login'); }} className="mis-profile-menu-item" style={{ color: C.red600 }}><Ic.ArrowLeft size={15} />Sair</button>
          </div>
        )}
        <button onClick={() => setProfileOpen(v => !v)} className="mis-profile-card">
          <Avatar name="Eduardo Nunes" size={36} bg="#3F3F3F" />
          <div className="mis-sidebar-label" style={{ flex: 1, minWidth: 0, textAlign: 'left' }}><div style={{ fontSize: 12.5, fontWeight: 700, color: C.t900, lineHeight: 1.1 }}>Eduardo<br />Nunes</div><div style={{ fontSize: 10.5, color: C.t500, marginTop: 3 }}>Gestor MIS</div></div>
          <Ic.ChevronDown className="mis-sidebar-label" size={14} color={C.t400} />
        </button>
      </div>
    </aside>
  );
};

const cta_labels = {
  dashboard: 'Novo registro', cronograma: 'Nova etapa', execucao: 'Nova atividade', atividades: 'Nova atividade', relatorio_foto: 'Adicionar fotos',
  feed: 'Novo projeto', projetos: 'Novo projeto', upload: 'Salvar rascunho',
  suprimentos: 'Novo pedido', pendencias: 'Nova pendência', alertas: 'Novo alerta',
  atualizacoes: 'Publicar', arquivos_projeto: 'Enviar arquivos', chat: 'Nova conversa',
  reformar: 'Novo projeto', construir: 'Novo projeto', notificacoes: 'Marcar todas lidas',
  configuracoes: 'Salvar', perfil_op: 'Editar perfil', feed_op: 'Disponível',
  financeiro_geral: 'Exportar consolidado', contratos_geral: 'Novo contrato', financeiro: 'Nova movimentação', contas_receber: 'Novo título', contas_pagar: 'Nova despesa',
  orcamento_quant: 'Recalcular orçamento',
  fluxo_caixa: 'Exportar', medicoes: 'Nova medição', orcamento_qual: 'Salvar specs',
  contrato: 'Enviar para assinatura', marketplace: 'Lista de compras', fornecedor: 'Novo produto',
  cotacoes: 'Nova cotação', pedidos: 'Novo pedido', avaliacoes: 'Avaliar serviço', resolver_problema: 'Novo diagnóstico',
};

const TopBar = ({ active, onNavigate, dimmed, onToggleDim }) => {
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [actionOpen, setActionOpen] = React.useState(false);
  const [activeProject, setActiveProject] = React.useState(readActiveProject());
  const label = cta_labels[active] || 'Nova ação';
  React.useEffect(() => {
    const sync = e => setActiveProject(e.detail || readActiveProject());
    window.addEventListener('mis:project-change', sync);
    return () => window.removeEventListener('mis:project-change', sync);
  }, []);
  React.useEffect(() => {
    const onKey = e => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setSearchOpen(true); }
      if (e.key === 'Escape') { setSearchOpen(false); setActionOpen(false); }
    };
    const onAction = () => setActionOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener('mis:action', onAction);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('mis:action', onAction); };
  }, []);
  return (
    <>
      <header className="mis-topbar">
        <button className="mis-search-trigger" onClick={() => setSearchOpen(true)}><Ic.Search size={17} color={C.t700} /><span>Buscar obras, tarefas, alertas...</span><kbd>Ctrl K</kbd></button>
        <div style={{ flex: 1 }} />
        <button className="mis-main-cta" onClick={() => setActionOpen(true)}><Ic.Plus size={15} />{label}</button>
        <div style={{ position: 'relative' }}><button className="mis-icon-btn" onClick={() => onNavigate('notificacoes')} aria-label="Notificações"><Ic.Bell size={19} /></button><span className="mis-notification-dot">4</span></div>
        <button className="mis-icon-btn" onClick={() => onNavigate('configuracoes')} aria-label="Configurações"><Ic.Settings size={19} /></button>
        <button className={`mis-icon-btn${dimmed ? ' theme-active' : ''}`} onClick={onToggleDim} aria-label={dimmed ? 'Ativar modo claro' : 'Ativar modo escuro'} title={dimmed ? 'Modo claro' : 'Modo escuro'}><Ic.Moon size={19} /></button>
      </header>
      {searchOpen && <SearchPalette onClose={() => setSearchOpen(false)} onNavigate={onNavigate} />}
      {actionOpen && <ActionDialog active={active} label={label} onClose={() => setActionOpen(false)} onNavigate={s => { setActionOpen(false); onNavigate(s); }} />}
    </>
  );
};
