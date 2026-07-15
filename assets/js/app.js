/* === APP === */

const SCREEN_MAP = {
  // Auth
  login: LoginScreen,
  cadastro: CadastroScreen,
  onboarding: OnboardingScreen,
  // Dashboard
  dashboard: DashboardScreen,
  dashboard_uc: DashboardUCScreen,
  chat: ChatScreen,
  // Projetos
  projetos: ProjetosScreen,
  detalhe_projeto: DetalheProjetoScreen,
  cronograma: CronogramaScreen,
  // Obra
  execucao: ObraExecucaoScreen,
  atividades: AtividadesDiariasScreen,
  relatorio_foto: RelatorioFotograficoScreen,
  // Orçamento
  reformar: QueroReformarScreen,
  construir: QueroReformarScreen,
  orcamento: QueroOrcamentoScreen,
  analise: AnaliseArquivosScreen,
  orcamento_quant: OrcamentoQuantScreen,
  proposta: PropostaOrcamentoScreen,
  aprovacao: AprovacaoPropostaScreen,
  // Ops (existing)
  feed: MisFeedScreen,
  suprimentos: SuprimentosScreen,
  pendencias: PendenciasScreen,
  alertas: AlertasScreen,
  atualizacoes: AtualizacoesScreen,
  upload: UploadScreen,
  arquivos_projeto: ProjectFilesScreen,
  // System
  notificacoes: NotificacoesScreen,
  configuracoes: ConfiguracoesScreen,
  perfil_op: PerfilProfissionalScreen,
  feed_op: FeedOportunidadesScreen,
  // Financeiro
  financeiro_geral: FinanceiroGeralScreen,
  contratos_geral: ContratosGeralScreen,
  financeiro: FinanceiroScreen,
  contas_receber: ContasReceberScreen,
  contas_pagar: ContasPagarScreen,
  fluxo_caixa: FluxoCaixaScreen,
  // Jurídico
  orcamento_qual: OrcamentoQualScreen,
  contrato: ContratoScreen,
  // Extra
  resolver_problema: ResolverProblemaScreen,
  marketplace: MarketplaceScreen,
  fornecedor: FornecedorScreen,
  cotacoes: CotacoesScreen,
  pedidos: PedidosScreen,
  medicoes: MedicoesScreen,
  avaliacoes: AvaliacoesScreen,
};

// Screens that don't use AppShell (full-page)
const FULLPAGE_SCREENS = new Set(['login', 'cadastro', 'onboarding', 'dashboard_uc', 'aprovacao']);

const App = () => {
  const [screen, setScreen] = useApp(() => {
    const stored = localStorage.getItem('mis_screen') || 'feed'; return PROJECT_SCOPED_SCREENS.has(stored) && !readActiveProject() ? 'feed' : stored;
  });
  const [history, setHistory] = useApp([]);

  const navigate = (s) => {
    if (!SCREEN_MAP[s]) return;
    if (PROJECT_SCOPED_SCREENS.has(s) && !readActiveProject()) s = 'feed';
    setHistory(h => [...h, screen]);
    setScreen(s);
    localStorage.setItem('mis_screen', s);
    window.scrollTo(0, 0);
  };

  const ScreenComponent = SCREEN_MAP[screen];
  if (!ScreenComponent) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.bg, flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 18, color: C.t500 }}>Tela "{screen}" não encontrada</div>
      <Btn onClick={() => navigate('login')}>Voltar ao início</Btn>
    </div>
  );

  return <ScreenComponent onNavigate={navigate} />;
};

// ─── Quick navigation panel (dev helper) ─────────────
const QuickNav = ({ onNavigate }) => {
  const [open, setOpen] = React.useState(false);
  const groups = [
    { label: 'Auth', screens: [['login','Login'],['cadastro','Cadastro'],['onboarding','Onboarding']] },
    { label: 'Projeto selecionado', screens: [['dashboard','Visão geral'],['dashboard_uc','Dashboard do cliente'],['chat','Chat Oráculo']] },
    { label: 'Projetos', screens: [['projetos','Projetos'],['detalhe_projeto','Detalhe Projeto'],['cronograma','Cronograma']] },
    { label: 'Obra', screens: [['execucao','Execução'],['atividades','Atividades Diárias'],['relatorio_foto','Rel. Fotográfico']] },
    { label: 'Novo projeto', screens: [['upload','Dados e arquivos'],['reformar','Quero Reformar'],['orcamento','Quero Orçamento'],['analise','Análise IA'],['orcamento_quant','Orçamento Quant.'],['proposta','Proposta'],['aprovacao','Aprovação']] },
    { label: 'Ops', screens: [['feed','MIS Feed'],['suprimentos','Suprimentos'],['pendencias','Pendências'],['alertas','Alertas'],['atualizacoes','Atualizações'],['arquivos_projeto','Arquivos do projeto']] },
    { label: 'Sistema', screens: [['notificacoes','Notificações'],['configuracoes','Configurações'],['perfil_op','Perfil OP'],['feed_op','Feed Oportunidades']] },
    { label: 'Financeiro', screens: [['financeiro_geral','Financeiro Geral'],['financeiro','Painel Financeiro'],['contas_receber','Contas a Receber'],['contas_pagar','Contas a Pagar'],['fluxo_caixa','Fluxo de Caixa'],['medicoes','Medições']] },
    { label: 'Jurídico', screens: [['contratos_geral','Contratos Gerais'],['orcamento_qual','Orçamento Qualitativo'],['contrato','Contrato']] },
    { label: 'Extra', screens: [['resolver_problema','Resolver Problema'],['marketplace','Marketplace'],['fornecedor','Painel Fornecedor'],['cotacoes','Cotações'],['pedidos','Pedidos e NF'],['avaliacoes','Avaliações']] },
  ];

  const landingLinks = [
    ['Landing Page', 'Landing Page.html'],
    ['Acesso / Login', 'Landing Page.html#acesso'],
  ];

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999 }}>
      {open && (
        <div style={{
          position: 'absolute', bottom: 52, right: 0,
          background: '#fff', borderRadius: 16, boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
          border: `1px solid ${C.border}`, padding: '12px', width: 320,
          maxHeight: '70vh', overflowY: 'auto',
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.t400, letterSpacing: 0.5, marginBottom: 8, padding: '0 4px' }}>NAVEGAR PARA TELA</div>

          {/* Landing Page — links externos */}
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.t400, padding: '4px 8px' }}>LANDING PAGE</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {landingLinks.map(([label, url]) => (
                <a key={url} href={url} style={{
                  padding: '5px 10px', borderRadius: 8, border: `1px solid ${C.navActive || '#1C3A2A'}`,
                  background: C.navActive || '#1C3A2A', fontSize: 12, cursor: 'pointer',
                  fontFamily: 'inherit', color: '#fff', transition: 'all 0.1s', textDecoration: 'none',
                }}>{label}</a>
              ))}
            </div>
          </div>

          {groups.map(g => (
            <div key={g.label} style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: C.t400, padding: '4px 8px' }}>{g.label.toUpperCase()}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {g.screens.map(([id, label]) => (
                  <button key={id} onClick={() => { onNavigate(id); setOpen(false); }} style={{
                    padding: '5px 10px', borderRadius: 8, border: `1px solid ${C.border}`,
                    background: C.borderLight, fontSize: 12, cursor: 'pointer',
                    fontFamily: 'inherit', color: C.t700, transition: 'all 0.1s',
                  }}>{label}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      <button onClick={() => setOpen(!open)} style={{
        width: 48, height: 48, borderRadius: 24,
        background: '#111827', border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
        color: '#fff', fontSize: 20,
      }}>{open ? '×' : '☰'}</button>
    </div>
  );
};

const Root = () => {
  const getInitial = () => {
    const hash = window.location.hash.replace(/^#\/?/, '');

    // A rota explícita na URL continua funcionando. Sem rota, o protótipo sempre
    // abre no MIS Feed, evitando restaurar uma tela operacional isolada
    // salva por uma execução anterior no localStorage.
    const candidate = hash && SCREEN_MAP[hash] ? hash : 'feed';
    const next = PROJECT_SCOPED_SCREENS.has(candidate) && !readActiveProject() ? 'feed' : candidate;

    if (!hash) {
      localStorage.setItem('mis_screen', next);
      window.history.replaceState(null, '', `#${next}`);
    }
    return next;
  };
  const [screen, setScreen] = React.useState(getInitial);
  React.useEffect(() => {
    const syncHash = () => {
      let next = window.location.hash.replace(/^#\/?/, '');
      if (!next || !SCREEN_MAP[next]) {
        next = 'feed';
        window.history.replaceState(null, '', '#feed');
      }
      if (PROJECT_SCOPED_SCREENS.has(next) && !readActiveProject()) {
        next = 'feed';
        if (window.location.hash !== '#feed') window.history.replaceState(null, '', '#feed');
      }
      setScreen(next);
    };
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, []);
  const navigate = (s) => {
    if (!SCREEN_MAP[s]) return;
    if (PROJECT_SCOPED_SCREENS.has(s) && !readActiveProject()) s = 'feed';
    setScreen(s);
    const nonPersistentScreens = new Set(['atividades', 'dashboard_uc', 'aprovacao']);
    localStorage.setItem('mis_screen', nonPersistentScreens.has(s) ? 'feed' : s);
    if (window.location.hash !== `#${s}`) window.location.hash = s;
    const scroller = document.querySelector('.mis-page-scroll');
    if (scroller) scroller.scrollTo({ top: 0, behavior: 'auto' });
  };
  const ScreenComponent = SCREEN_MAP[screen];
  return ScreenComponent ? <ScreenComponent onNavigate={navigate} /> : (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.bg }}>
      <div style={{ textAlign: 'center' }}><div style={{ fontSize: 16, color: C.t500, marginBottom: 16 }}>Tela &quot;{screen}&quot; não encontrada</div><Btn onClick={() => navigate('login')}>Voltar ao início</Btn></div>
    </div>
  );
};

const rootEl = document.getElementById('root');
const reactRoot = ReactDOM.createRoot(rootEl);
reactRoot.render(<Root />);

  
