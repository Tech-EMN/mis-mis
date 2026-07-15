/* === UI === */


const PROJECT_WORKSPACE_GROUPS = [
  { label: 'Visão geral', items: [
    { id: 'dashboard', label: 'Visão geral', icon: 'Dashboard' },
    { id: 'detalhe_projeto', label: 'Dados do projeto', icon: 'Building' },
  ]},
  { label: 'Planejamento e obra', items: [
    { id: 'cronograma', label: 'Cronograma', icon: 'Calendar' },
    { id: 'execucao', label: 'Execução', icon: 'Activity' },
    { id: 'atividades', label: 'Atividades', icon: 'Clipboard' },
    { id: 'relatorio_foto', label: 'Fotos', icon: 'Camera' },
  ]},
  { label: 'Operação', items: [
    { id: 'suprimentos', label: 'Suprimentos', icon: 'Package' },
    { id: 'pendencias', label: 'Pendências', icon: 'Clipboard' },
    { id: 'alertas', label: 'Alertas', icon: 'Bell' },
    { id: 'atualizacoes', label: 'Atualizações', icon: 'Refresh' },
    { id: 'arquivos_projeto', label: 'Arquivos', icon: 'Upload' },
  ]},
  { label: 'Financeiro', items: [
    { id: 'financeiro', label: 'Visão financeira', icon: 'Dollar' },
    { id: 'contas_receber', label: 'A receber', icon: 'TrendUp' },
    { id: 'contas_pagar', label: 'A pagar', icon: 'Clipboard' },
    { id: 'fluxo_caixa', label: 'Fluxo de caixa', icon: 'Activity' },
    { id: 'medicoes', label: 'Medições', icon: 'BarChart' },
  ]},
  { label: 'Contratos e compras', items: [
    { id: 'contrato', label: 'Contratos', icon: 'FileText' },
    { id: 'cotacoes', label: 'Cotações', icon: 'FileText' },
    { id: 'pedidos', label: 'Pedidos e NF', icon: 'Package' },
  ]},
  { label: 'Inteligência', items: [
    { id: 'chat', label: 'Oráculo MIS', icon: 'Sparkles' },
    { id: 'resolver_problema', label: 'Diagnóstico', icon: 'Zap' },
  ]},
];

const ProjectWorkspaceDropdown = ({ active, project, onNavigate }) => {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const close = event => { if (ref.current && !ref.current.contains(event.target)) setOpen(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);
  const allItems = PROJECT_WORKSPACE_GROUPS.flatMap(group => group.items.map(item => ({ ...item, group: group.label })));
  const current = allItems.find(item => item.id === active) || allItems[0];
  const CurrentIcon = Ic[current.icon] || Ic.Grid;
  return (
    <section className="project-context-compact" aria-label="Navegação do projeto selecionado" ref={ref}>
      <div className="project-context-identity">
        <button className="project-workspace-back" onClick={() => onNavigate('projetos')}><Ic.ArrowLeft size={14} />Todos os projetos</button>
        <span className="project-context-divider">/</span>
        <div className="project-context-project"><Ic.Building size={15} color={C.navActive} /><strong>{project.name}</strong></div>
        <Badge color="green">Projeto selecionado</Badge>
      </div>
      <div className="project-module-picker">
        <span className="project-module-caption">Visualizando</span>
        <button className={`project-module-trigger${open ? ' open' : ''}`} onClick={() => setOpen(v => !v)} aria-expanded={open}>
          <CurrentIcon size={16} /><span>{current.label}</span><Ic.ChevronDown size={14} />
        </button>
        {open && (
          <div className="project-module-menu">
            {PROJECT_WORKSPACE_GROUPS.map(group => (
              <div className="project-module-group" key={group.label}>
                <div className="project-module-group-title">{group.label}</div>
                {group.items.map(item => {
                  const Icon = Ic[item.icon];
                  return <button key={item.id} className={`project-module-option mis-select-btn${active === item.id ? ' active' : ''}`} onClick={() => { setOpen(false); onNavigate(item.id); }}>{Icon && <Icon size={15} />}<span>{item.label}</span>{active === item.id && <Ic.Check size={14} />}</button>;
                })}
              </div>
            ))}
          </div>
        )}
      </div>
      <button className="project-change-btn" onClick={() => onNavigate('projetos')}>Trocar projeto</button>
    </section>
  );
};

const NewProjectFlowNav = ({ active, onNavigate }) => {
  const currentIndex = Math.max(0, NEW_PROJECT_FLOW.findIndex(step => step.id === active));
  return (
    <section className="new-project-flow" aria-label="Etapas de inclusão do novo projeto">
      <div className="new-project-flow-copy"><span>Novo projeto</span><strong>Inclusão, orçamento e proposta</strong></div>
      <div className="new-project-flow-steps">
        {NEW_PROJECT_FLOW.map((step, index) => {
          const Icon = Ic[step.icon];
          const state = index < currentIndex ? 'done' : index === currentIndex ? 'active' : '';
          return <button key={step.id} className={`new-project-step mis-select-btn ${state}`} onClick={() => onNavigate(step.id)}><span className="new-project-step-index">{state === 'done' ? <Ic.Check size={12} /> : index + 1}</span>{Icon && <Icon size={14} />}<span>{step.label}</span></button>;
        })}
      </div>
    </section>
  );
};

const PAGE_CATALOG = [
  { id: 'dashboard', label: 'Visão geral do projeto', group: 'Projeto selecionado' },
  { id: 'dashboard_uc', label: 'Dashboard do cliente', group: 'Gestão' },
  { id: 'feed', label: 'MIS Feed', group: 'Gestão' },
  { id: 'projetos', label: 'Projetos', group: 'Gestão' },
  { id: 'detalhe_projeto', label: 'Detalhe do projeto', group: 'Gestão' },
  { id: 'cronograma', label: 'Cronograma', group: 'Gestão' },
  { id: 'execucao', label: 'Execução da obra', group: 'Obra' },
  { id: 'atividades', label: 'Atividades diárias', group: 'Obra' },
  { id: 'relatorio_foto', label: 'Relatório fotográfico', group: 'Obra' },
  { id: 'suprimentos', label: 'Suprimentos', group: 'Operação' },
  { id: 'pendencias', label: 'Pendências', group: 'Operação' },
  { id: 'alertas', label: 'Alertas', group: 'Operação' },
  { id: 'atualizacoes', label: 'Atualizações', group: 'Operação' },
  { id: 'upload', label: 'Novo projeto e upload', group: 'Gestão geral' },
  { id: 'arquivos_projeto', label: 'Arquivos do projeto', group: 'Projeto selecionado' },
  { id: 'chat', label: 'Oráculo MIS', group: 'Inteligência' },
  { id: 'reformar', label: 'Quero reformar', group: 'Orçamento' },
  { id: 'construir', label: 'Quero construir', group: 'Orçamento' },
  { id: 'orcamento', label: 'Solicitar orçamento', group: 'Orçamento' },
  { id: 'analise', label: 'Análise de arquivos', group: 'Orçamento' },
  { id: 'orcamento_quant', label: 'Orçamento quantitativo', group: 'Orçamento' },
  { id: 'proposta', label: 'Proposta de orçamento', group: 'Orçamento' },
  { id: 'aprovacao', label: 'Aprovação da proposta', group: 'Orçamento' },
  { id: 'financeiro_geral', label: 'Financeiro geral', group: 'Gestão geral' },
  { id: 'financeiro', label: 'Painel financeiro do projeto', group: 'Financeiro' },
  { id: 'contas_receber', label: 'Contas a receber', group: 'Financeiro' },
  { id: 'contas_pagar', label: 'Contas a pagar', group: 'Financeiro' },
  { id: 'fluxo_caixa', label: 'Fluxo de caixa', group: 'Financeiro' },
  { id: 'medicoes', label: 'Medições', group: 'Financeiro' },
  { id: 'orcamento_qual', label: 'Orçamento qualitativo', group: 'Jurídico' },
  { id: 'contratos_geral', label: 'Contratos gerais', group: 'Gestão geral' },
  { id: 'contrato', label: 'Contrato do projeto', group: 'Jurídico' },
  { id: 'marketplace', label: 'Marketplace', group: 'Comercial' },
  { id: 'fornecedor', label: 'Painel do fornecedor', group: 'Comercial' },
  { id: 'cotacoes', label: 'Cotações', group: 'Comercial' },
  { id: 'pedidos', label: 'Pedidos e notas fiscais', group: 'Comercial' },
  { id: 'avaliacoes', label: 'Avaliações', group: 'Comercial' },
  { id: 'resolver_problema', label: 'Resolver problema', group: 'Inteligência' },
  { id: 'notificacoes', label: 'Notificações', group: 'Sistema' },
  { id: 'configuracoes', label: 'Configurações', group: 'Sistema' },
  { id: 'perfil_op', label: 'Perfil profissional', group: 'Sistema' },
  { id: 'feed_op', label: 'Feed de oportunidades', group: 'Sistema' },
];

const ModalFrame = ({ children, onClose, width = 560 }) => (
  <div onMouseDown={e => e.target === e.currentTarget && onClose()} style={{
    position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(8,18,37,.34)',
    backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
  }}>
    <div style={{ width: '100%', maxWidth: width, maxHeight: '86vh', overflowY: 'auto', background: '#fff', borderRadius: 22, border: `1px solid ${C.border}`, boxShadow: '0 28px 80px rgba(15,23,42,.22)', padding: 22 }}>
      {children}
    </div>
  </div>
);

const SearchPalette = ({ onClose, onNavigate }) => {
  const [query, setQuery] = React.useState('');
  const normalized = query.trim().toLowerCase();
  const results = PAGE_CATALOG.filter(p => !normalized || `${p.label} ${p.group}`.toLowerCase().includes(normalized));
  const grouped = results.reduce((acc, item) => ((acc[item.group] ||= []).push(item), acc), {});
  return (
    <ModalFrame onClose={onClose} width={680}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '4px 4px 16px', borderBottom: `1px solid ${C.border}` }}>
        <Ic.Search size={20} color={C.t400} />
        <input autoFocus value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar páginas, obras, tarefas ou recursos..." style={{ flex: 1, border: 'none', outline: 'none', fontSize: 16, color: C.t900, background: 'transparent' }} />
        <button onClick={onClose} style={{ border: `1px solid ${C.border}`, background: C.borderLight, color: C.t500, borderRadius: 8, padding: '5px 9px', cursor: 'pointer' }}>Esc</button>
      </div>
      <div style={{ paddingTop: 12, maxHeight: '62vh', overflowY: 'auto' }}>
        {Object.entries(grouped).map(([group, items]) => (
          <div key={group} style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.08em', color: C.t400, textTransform: 'uppercase', padding: '0 8px 6px' }}>{group}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
              {items.map(item => (
                <button key={item.id} onClick={() => { onNavigate(item.id); onClose(); }} style={{ border: `1px solid ${C.border}`, background: '#fff', borderRadius: 12, padding: '12px 14px', cursor: 'pointer', textAlign: 'left', color: C.t900, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{item.label}</span><Ic.ChevronRight size={14} color={C.t400} />
                </button>
              ))}
            </div>
          </div>
        ))}
        {!results.length && <div style={{ padding: 28, textAlign: 'center', color: C.t500 }}>Nenhuma página encontrada.</div>}
      </div>
    </ModalFrame>
  );
};

const ActionDialog = ({ active, label, onClose, onNavigate }) => {
  const [saved, setSaved] = React.useState(false);
  const isExport = active === 'fluxo_caixa' || active === 'financeiro_geral';
  const submit = () => {
    if (active === 'projetos' || active === 'feed' || active === 'dashboard' || active === 'contratos_geral') return onNavigate('upload');
    if (active === 'suprimentos') return onNavigate('pedidos');
    if (active === 'perfil_op') return onNavigate('configuracoes');
    setSaved(true);
    setTimeout(onClose, 900);
  };
  return (
    <ModalFrame onClose={onClose} width={520}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: 20 }}>
        <div><div style={{ fontSize: 11, color: C.t400, fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase' }}>Ação rápida</div><h3 style={{ fontSize: 22, color: C.t900, marginTop: 5 }}>{label.replace(/^\+\s*/, '')}</h3></div>
        <button onClick={onClose} style={{ width: 34, height: 34, borderRadius: 17, border: `1px solid ${C.border}`, background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ic.X size={16} /></button>
      </div>
      {saved ? (
        <div style={{ minHeight: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <div style={{ width: 54, height: 54, borderRadius: 27, background: C.green100, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}><Ic.Check size={26} color={C.green600} /></div>
          <strong style={{ color: C.t900 }}>Ação concluída</strong><span style={{ color: C.t500, fontSize: 13, marginTop: 5 }}>O protótipo registrou a operação com sucesso.</span>
        </div>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Input label="Título" placeholder={isExport ? 'Relatório financeiro' : 'Informe um título'} style={{ gridColumn: '1 / -1' }} />
            <Input label="Responsável" placeholder="Eduardo Nunes" />
            <Input label="Prazo" placeholder="dd/mm/aaaa" />
          </div>
          <div style={{ marginTop: 12 }}><label style={{ fontSize: 13, fontWeight: 600, color: C.t700, display: 'block', marginBottom: 6 }}>Descrição</label><textarea placeholder="Inclua as informações necessárias para esta ação." style={{ width: '100%', minHeight: 100, resize: 'vertical', padding: 12, border: `1.5px solid ${C.border}`, borderRadius: 12, outline: 'none', fontSize: 14 }} /></div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 20 }}><Btn variant="secondary" onClick={onClose}>Cancelar</Btn><Btn onClick={submit}>{isExport ? 'Gerar arquivo' : 'Confirmar'}</Btn></div>
        </>
      )}
    </ModalFrame>
  );
};
