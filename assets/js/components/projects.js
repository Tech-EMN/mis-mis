/* === PROJECTS === */

const ProjetosScreen = ({ onNavigate }) => {
  const [filter, setFilter] = useP('todos');
  const [typeFilter, setTypeFilter] = useP('todos');
  const [search, setSearch] = useP('');

  const projects = [
    { id: 1, name: 'Residencial Aurora', desc: 'Obra residencial de médio porte com foco em execução estrutural, acabamento e controle físico-financeiro.', status: 'andamento', priority: 'Alta', type: 'Residencial', client: 'Construtora Aurora', budget: '4.850.000', deadline: '15/08/2026', team: 42, pct: 68, loc: 'Campinas, SP', resp: 'Carlos Mendes', color: C.blue500, area: '1.240 m²', address: 'Campinas, SP · Condomínio Aurora · 3 blocos', alerts: 3 },
    { id: 2, name: 'Edifício Horizonte', desc: 'Empreendimento vertical em fase de acabamento, com atenção especial a suprimentos, instalações e compatibilização.', status: 'andamento', priority: 'Média', type: 'Comercial', client: 'Horizonte Engenharia', budget: '8.200.000', deadline: '30/09/2026', team: 58, pct: 74, loc: 'São Paulo, SP', resp: 'Mariana Lopes', color: C.blue500, area: '2.480 m²', address: 'São Paulo, SP · 18 pavimentos · Torre única', alerts: 4 },
    { id: 3, name: 'Complexo Vila Verde', desc: 'Projeto misto com unidades residenciais, áreas comuns e infraestrutura de lazer em fase de planejamento executivo.', status: 'planejamento', priority: 'Média', type: 'Misto', client: 'Vila Verde SPE', budget: '12.400.000', deadline: '20/12/2026', team: 26, pct: 32, loc: 'Jundiaí, SP', resp: 'Fernanda Rocha', color: C.blue500, area: '6.100 m²', address: 'Jundiaí, SP · Complexo residencial e comercial', alerts: 2 },
    { id: 4, name: 'Torre Central', desc: 'Obra corporativa com alto grau de complexidade técnica, múltiplas frentes simultâneas e cronograma sensível.', status: 'atencao', priority: 'Crítica', type: 'Corporativo', client: 'Central Offices', budget: '15.700.000', deadline: '05/11/2026', team: 73, pct: 51, loc: 'Santo André, SP', resp: 'Ricardo Alves', color: C.orange500, area: '8.750 m²', address: 'Santo André, SP · 24 pavimentos corporativos', alerts: 13 },
    { id: 5, name: 'Galpão Logístico Norte', desc: 'Construção industrial com foco em estrutura metálica, piso de alta resistência e operação logística.', status: 'andamento', priority: 'Alta', type: 'Industrial', client: 'Norte Logística', budget: '6.900.000', deadline: '18/10/2026', team: 39, pct: 59, loc: 'Guarulhos, SP', resp: 'Patrícia Gomes', color: C.blue500, area: '12.800 m²', address: 'Guarulhos, SP · Centro logístico industrial', alerts: 5 },
    { id: 6, name: 'Hospital São Lucas', desc: 'Ampliação hospitalar com exigência elevada de documentação, controle técnico e gestão de interferências.', status: 'atrasado', priority: 'Crítica', type: 'Saúde', client: 'Rede São Lucas', budget: '21.300.000', deadline: '28/02/2027', team: 81, pct: 46, loc: 'Sorocaba, SP', resp: 'João Ferreira', color: C.red500, area: '9.300 m²', address: 'Sorocaba, SP · Ampliação hospitalar', alerts: 23 },
  ];

  const statusMap = { andamento: { label: 'Em andamento', color: 'green' }, planejamento: { label: 'Planejamento', color: 'blue' }, atencao: { label: 'Atenção', color: 'orange' }, atrasado: { label: 'Atrasado', color: 'red' } };
  const priorityMap = { Alta: 'orange', Média: 'blue', Crítica: 'red' };

  const filtered = projects.filter(p => {
    const statusOk = filter === 'todos' || p.status === filter;
    const typeOk = typeFilter === 'todos' || p.type === typeFilter;
    const q = search.trim().toLowerCase();
    const searchOk = !q || `${p.name} ${p.client} ${p.loc} ${p.resp} ${p.type}`.toLowerCase().includes(q);
    return statusOk && typeOk && searchOk;
  });
  const openProject = p => openProjectDashboard(p, onNavigate);
  const activeProject = readActiveProject();

  return (
    <AppShell active="projetos" onNavigate={onNavigate}>
      <SectionHeader title="Projetos" subtitle="Selecione um card para abrir o dashboard e todos os módulos de acompanhamento daquele projeto." />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 14, marginBottom: 22 }}>
        <StatCard label="Projetos ativos" value="6" sub={<Badge color="blue">+3 este mês</Badge>} />
        <StatCard label="Progresso médio" value="55%" sub={<Badge color="green">Execução geral</Badge>} />
        <StatCard label="Projetos críticos" value="2" sub={<Badge color="red">Exigem atenção</Badge>} />
        <StatCard label="Pendências abertas" value="82" sub={<Badge color="orange">Todas as obras</Badge>} />
      </div>

      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        {/* Main */}
        <div style={{ flex: 1 }}>
          {/* Filters */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 14 }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, background: C.card, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: '8px 14px' }}>
              <Ic.Search size={14} color={C.t400} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar por projeto, cliente, cidade ou responsável..." style={{ border: 'none', outline: 'none', fontSize: 14, color: C.t500, background: 'transparent', fontFamily: 'inherit', width: '100%' }} />
            </div>
            <Ic.Filter size={16} color={C.t400} />
            <TabBar tabs={[{id:'todos',label:'Todos'},{id:'andamento',label:'Em andamento'},{id:'atencao',label:'Atenção'},{id:'atrasado',label:'Atrasados'},{id:'planejamento',label:'Planejamento'}]} active={filter} onChange={setFilter} />
          </div>
          <ChipBar chips={['todos','Residencial','Comercial','Misto','Corporativo','Industrial','Saúde'].map(c=>({id:c,label:c==='todos'?'Todos os tipos':c}))} active={typeFilter} onChange={setTypeFilter} style={{ marginBottom: 18 }} />

          <div style={{ fontSize: 14, fontWeight: 600, color: C.t900, marginBottom: 4 }}>Carteira de projetos</div>
          <div style={{ fontSize: 13, color: C.t400, marginBottom: 16 }}>{filtered.length} projetos encontrados · clique em um card para abrir o ambiente completo de acompanhamento</div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {filtered.map(p => {
              const st = statusMap[p.status];
              return (
                <Card key={p.id} role="button" tabIndex={0} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') openProject(p); }} style={{ padding: '18px 20px', border: activeProject && String(activeProject.id) === String(p.id) ? `2px solid ${C.navActive}` : `1px solid ${C.border}` }} onClick={() => openProject(p)}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 12 }}>
                    <ObraImg obra={['aurora','horizonte','vilaverde','torre','galpao','hospital'][p.id-1] || 'nordica'} style={{ width: 56, height: 56, borderRadius: 10, flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                        <div style={{ fontSize: 15, fontWeight: 600, color: C.t900 }}>{p.name}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          {activeProject && String(activeProject.id) === String(p.id) && <Badge color="dark">Ativo</Badge>}
                          <Badge color={st.color}>{st.label}</Badge>
                        </div>
                      </div>
                      <div style={{ fontSize: 13, color: C.t500, marginTop: 4, lineHeight: 1.4 }}>{p.desc}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                    <Badge color={priorityMap[p.priority]}>{p.priority}</Badge>
                    <Badge color="gray">{p.type}</Badge>
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                      <span style={{ fontSize: 12, color: C.t500 }}>Progresso da obra</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: p.color }}>{p.pct}%</span>
                    </div>
                    <ProgressBar value={p.pct} color={p.color} height={6} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 4, fontSize: 12, color: C.t500, marginBottom: 12 }}>
                    <div><div style={{ color: C.t400 }}>Cliente</div><div style={{ fontWeight: 600, color: C.t900, fontSize: 11 }}>{p.client}</div></div>
                    <div><div style={{ color: C.t400 }}>Orçamento</div><div style={{ fontWeight: 600, color: C.t900, fontSize: 11 }}>{formatProjectBudget(p.budget)}</div></div>
                    <div><div style={{ color: C.t400 }}>Prazo</div><div style={{ fontWeight: 600, color: C.t900, fontSize: 11 }}>{p.deadline}</div></div>
                    <div><div style={{ color: C.t400 }}>Equipe</div><div style={{ fontWeight: 600, color: C.t900, fontSize: 11 }}>{p.team} pess.</div></div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: C.t500 }}>
                      <Ic.MapPin size={12} color={C.t400} /> {p.loc}
                      <span style={{ marginLeft: 8 }}><Ic.Users size={12} color={C.t400} /> {p.resp}</span>
                    </div>
                    <button onClick={e => { e.stopPropagation(); openProject(p); }} style={{ background: 'none', border: 'none', fontSize: 13, color: C.blue600, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 500 }}>Selecionar projeto</button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{ width: 240, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Card style={{ padding: '18px 20px' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.t900, marginBottom: 6 }}>Projetos em atenção</div>
            <div style={{ fontSize: 13, color: C.t500, marginBottom: 14 }}>Obras com atraso, status crítico ou risco operacional.</div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <StatusDot color={C.red500} size={8} style={{ marginTop: 4 }} />
              <div><div style={{ fontSize: 13, fontWeight: 600, color: C.t900 }}>2 projetos exigem ação</div><div style={{ fontSize: 12, color: C.t500, marginTop: 2 }}>Priorize revisão de prazo, orçamento e pendências abertas.</div></div>
            </div>
          </Card>
          <Card style={{ padding: '18px 20px' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.t900, marginBottom: 14 }}>Prioridades</div>
            <div style={{ fontSize: 13, color: C.t500, marginBottom: 12 }}>Projetos críticos ou com maior volume de alertas.</div>
            {[{ name: 'Torre Central', a: 13, b: 6, pct: 51 }, { name: 'Hospital São Lucas', a: 23, b: 8, pct: 46 }].map(p => (
              <div key={p.name} onClick={() => { const selected = projects.find(x => x.name === p.name); if (selected) openProject(selected); }} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, cursor: 'pointer' }}>
                <ObraImg obra={p.name === 'Torre Central' ? 'torre' : 'hospital'} style={{ width: 36, height: 36, borderRadius: 8, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: C.t900, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: C.t500 }}>{p.a} pendências · {p.b} alertas</div>
                </div>
                <Badge color="red">{p.pct}%</Badge>
              </div>
            ))}
          </Card>
          <Card style={{ padding: '18px 20px' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.t900, marginBottom: 14 }}>Resumo executivo</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { icon: Ic.TrendUp, label: 'Progresso médio', sub: 'Execução física consolidada', val: '55%', color: C.blue600 },
                { icon: Ic.AlertTriangle, label: 'Alertas ativos', sub: 'Todos os projetos', val: '26', color: C.orange600 },
                { icon: Ic.Clock, label: 'Prazos críticos', sub: 'Projetos atrasados ou em atenção', val: '2', color: C.red600 },
                { icon: Ic.Dollar, label: 'Controle financeiro', sub: 'Comparar orçamento previsto...', val: 'Ativo', color: C.green600 },
              ].map(r => (
                <div key={r.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 32, height: 32, background: C.borderLight, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <r.icon size={15} color={r.color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: C.t900 }}>{r.label}</div>
                    <div style={{ fontSize: 11, color: C.t500 }}>{r.sub}</div>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: r.color }}>{r.val}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
};

// ─── DETALHE DO PROJETO ────────────────────────────────
const DetalheProjetoScreen = ({ onNavigate }) => {
  const project = readActiveProject() || DEFAULT_PROJECT;
  const [tab, setTab] = useP('visao');
  const fases = [
    { label: 'Arquitetura', pct: 100, color: C.green500 },
    { label: 'Estrutura', pct: 95, color: C.green500 },
    { label: 'Elétrica', pct: 72, color: C.blue500 },
    { label: 'Hidráulica', pct: 68, color: C.blue500 },
    { label: 'Vedações', pct: 82, color: C.blue500 },
    { label: 'Acabamentos', pct: 45, color: C.orange500 },
  ];
  const equipe = [
    { name: 'Mariana Costa', role: 'Eng. Responsável' },
    { name: 'Rafael Souza', role: 'Mestre de obras' },
    { name: 'João Pedro', role: 'Arquiteto' },
    { name: 'Ana Lima', role: 'Estagiária' },
  ];
  return (
    <AppShell active="detalhe_projeto" onNavigate={onNavigate}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <button onClick={() => onNavigate('projetos')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: C.t500, fontSize: 14, fontFamily: 'inherit' }}>
          <Ic.ArrowLeft size={16} /> Projetos
        </button>
        <span style={{ color: C.t300 }}>/</span>
        <span style={{ fontSize: 14, color: C.t900, fontWeight: 500 }}>{project.name}</span>
      </div>

      {/* Cover */}
      <Card style={{ marginBottom: 20, overflow: 'hidden' }}>
        <div style={{ position: 'relative', height: 160 }}>
          <ImgPlaceholder style={{ width: '100%', height: '100%', borderRadius: 0 }} label="foto da obra" />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }} />
          <div style={{ position: 'absolute', bottom: 20, left: 24, right: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <div style={{ color: '#fff', fontSize: 22, fontWeight: 700 }}>{project.name}</div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>{project.address || project.loc}</div>
            </div>
            <Badge color="green">Em andamento</Badge>
          </div>
        </div>
        <div style={{ padding: '16px 24px', display: 'flex', gap: 32 }}>
          {[{ l: 'Conclusão', v: `${project.pct || 0}%`, c: C.blue600 }, { l: 'Dias restantes', v: `${projectDaysRemaining(project.deadline)} d`, c: C.orange500 }, { l: 'Orçamento', v: formatProjectBudget(project.budget), c: C.t900 }, { l: 'Equipe', v: `${project.team || 0} pessoas`, c: C.t900 }, { l: 'Prazo', v: project.deadline || 'A definir', c: C.t900 }].map(k => (
            <div key={k.l}><div style={{ fontSize: 12, color: C.t400, marginBottom: 2 }}>{k.l}</div><div style={{ fontSize: 16, fontWeight: 700, color: k.c }}>{k.v}</div></div>
          ))}
          <button onClick={() => onNavigate('chat')} style={{ marginLeft: 'auto', background: C.navActive, border: 'none', borderRadius: 10, padding: '8px 16px', color: '#fff', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Ic.Sparkles size={14} color="#fff" /> Oráculo
          </button>
        </div>
      </Card>

      {/* Tabs */}
      <div style={{ borderBottom: `1px solid ${C.border}`, marginBottom: 20 }}>
        <TabBar tabs={[{id:'visao',label:'Visão Geral'},{id:'cronograma',label:'Cronograma'},{id:'equipe',label:'Equipe'},{id:'suprimentos',label:'Suprimentos'},{id:'financeiro',label:'Financeiro'},{id:'documentos',label:'Documentos'}]} active={tab} onChange={t => { const routes = { cronograma:'cronograma', suprimentos:'suprimentos', financeiro:'financeiro', documentos:'arquivos_projeto' }; routes[t] ? onNavigate(routes[t]) : setTab(t); }} style={{ gap: 0 }} />
      </div>

      {tab === 'visao' && (
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12, marginBottom: 20 }}>
              {[{ l: '% Concluído', v: `${project.pct || 0}%`, c: C.blue600 }, { l: 'Atividades abertas', v: '14', c: C.orange500 }, { l: 'Valor executado', v: 'R$3,3M', c: C.t900 }, { l: 'Score IA', v: '8.7', c: C.green600 }].map(k => (
                <Card key={k.l} style={{ padding: '16px 18px', textAlign: 'center' }}>
                  <div style={{ fontSize: 24, fontWeight: 700, color: k.c }}>{k.v}</div>
                  <div style={{ fontSize: 12, color: C.t500, marginTop: 4 }}>{k.l}</div>
                </Card>
              ))}
            </div>
            <Card style={{ padding: '18px 20px', marginBottom: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.t900, marginBottom: 14 }}>Progresso por Disciplina</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {fases.map(f => (
                  <div key={f.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 13, color: C.t700, width: 100, flexShrink: 0 }}>{f.label}</span>
                    <div style={{ flex: 1 }}><ProgressBar value={f.pct} color={f.color} height={8} /></div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: f.color, width: 36, textAlign: 'right' }}>{f.pct}%</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card style={{ padding: '18px 20px' }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.t900, marginBottom: 14 }}>Fotos Recentes</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 8 }}>
                {[0,1,2,3].map(i => <ImgPlaceholder key={i} style={{ height: 80, borderRadius: 8 }} label="foto" />)}
              </div>
            </Card>
          </div>

          {/* Right */}
          <div style={{ width: 240, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Card style={{ padding: '18px 20px' }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.t900, marginBottom: 12 }}>Alertas ativos</div>
              {[{ t: 'Atraso na Sala Técnica', c: C.red500 }, { t: 'Revestimento pendente', c: C.orange500 }, { t: 'Validação IA pendente', c: C.orange500 }].map((a, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                  <StatusDot color={a.c} size={7} style={{ marginTop: 4 }} />
                  <span style={{ fontSize: 13, color: C.t700 }}>{a.t}</span>
                </div>
              ))}
            </Card>
            <Card style={{ padding: '18px 20px' }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.t900, marginBottom: 12 }}>Equipe</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {equipe.map(m => (
                  <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Avatar name={m.name} size={32} />
                    <div><div style={{ fontSize: 13, fontWeight: 500, color: C.t900 }}>{m.name}</div><div style={{ fontSize: 11, color: C.t500 }}>{m.role}</div></div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {tab !== 'visao' && (
        <Card style={{ padding: 32, textAlign: 'center', color: C.t400 }}>
          <Ic.FileText size={32} color={C.t300} />
          <div style={{ marginTop: 12, fontSize: 14 }}>Aba em construção: <strong style={{ color: C.t700 }}>{tab}</strong></div>
        </Card>
      )}
    </AppShell>
  );
};

// ─── CRONOGRAMA ────────────────────────────────────────
const CronogramaScreen = ({ onNavigate }) => {
  const project = readActiveProject() || DEFAULT_PROJECT;
  const [scale, setScale] = useP('mes');
  const etapas = [
    { name: 'Fundação', inicio: 0, dur: 8, real: 8, color: C.green500, done: true },
    { name: 'Estrutura', inicio: 6, dur: 16, real: 15, color: C.green500, done: true },
    { name: 'Vedações', inicio: 18, dur: 10, real: 8, color: C.blue500, done: false },
    { name: 'Hidráulica', inicio: 22, dur: 8, real: 5, color: C.blue500, done: false },
    { name: 'Elétrica', inicio: 24, dur: 10, real: 5, color: C.orange500, done: false },
    { name: 'Revestimento', inicio: 28, dur: 8, real: 2, color: C.orange500, done: false },
    { name: 'Acabamento', inicio: 32, dur: 6, real: 0, color: C.t300, done: false },
  ];
  const total = 40;
  const hoje = 30;

  return (
    <AppShell active="cronograma" onNavigate={onNavigate}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <button onClick={() => onNavigate('detalhe_projeto')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: C.t500, fontSize: 14, fontFamily: 'inherit' }}>
          <Ic.ArrowLeft size={16} /> {project.name}
        </button>
        <span style={{ color: C.t300 }}>/</span>
        <span style={{ fontSize: 14, color: C.t900, fontWeight: 500 }}>Cronograma</span>
      </div>

      <Card style={{ padding: '18px 20px', marginBottom: 16 }}>
        <div className="mis-feed-toolbar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: C.t900 }}>Cronograma — {project.name}</div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <TabBar tabs={[{id:'semana',label:'Semana'},{id:'mes',label:'Mês'},{id:'total',label:'Total'}]} active={scale} onChange={setScale} />
            <Btn variant="green" size="sm" icon={<Ic.Sparkles size={13} color="#fff" />}>Replanejar com MIS</Btn>
          </div>
        </div>

        {/* Gantt */}
        <div style={{ display: 'flex', gap: 0 }}>
          {/* Left labels */}
          <div style={{ width: 120, flexShrink: 0 }}>
            <div style={{ height: 32, fontSize: 11, color: C.t400, display: 'flex', alignItems: 'flex-end', paddingBottom: 8 }}>Etapa</div>
            {etapas.map(e => (
              <div key={e.name} style={{ height: 44, display: 'flex', alignItems: 'center', borderBottom: `1px solid ${C.borderLight}` }}>
                <span style={{ fontSize: 13, color: C.t700, fontWeight: 500 }}>{e.name}</span>
              </div>
            ))}
          </div>

          {/* Gantt bars */}
          <div style={{ flex: 1, position: 'relative', overflowX: 'auto' }}>
            {/* Header weeks */}
            <div style={{ height: 32, display: 'flex', borderBottom: `1px solid ${C.border}`, paddingBottom: 8 }}>
              {Array.from({ length: total }, (_, i) => (
                <div key={i} style={{ flex: 1, fontSize: 10, color: C.t400, textAlign: 'center', paddingTop: 2 }}>
                  {i % 4 === 0 ? `S${i + 1}` : ''}
                </div>
              ))}
            </div>

            {/* Today line */}
            <div style={{
              position: 'absolute', top: 32, bottom: 0, left: `${(hoje / total) * 100}%`,
              width: 2, background: C.red500, zIndex: 10,
            }}>
              <div style={{ position: 'absolute', top: 0, left: -20, background: C.red500, color: '#fff', fontSize: 10, padding: '2px 6px', borderRadius: 4, whiteSpace: 'nowrap' }}>Hoje</div>
            </div>

            {etapas.map(e => (
              <div key={e.name} style={{ height: 44, display: 'flex', alignItems: 'center', borderBottom: `1px solid ${C.borderLight}`, position: 'relative' }}>
                {/* Planned bar */}
                <div style={{
                  position: 'absolute',
                  left: `${(e.inicio / total) * 100}%`,
                  width: `${(e.dur / total) * 100}%`,
                  height: 14, borderRadius: 7,
                  background: `${e.color}25`,
                  border: `1.5px solid ${e.color}50`,
                }} />
                {/* Actual bar */}
                {e.real > 0 && (
                  <div style={{
                    position: 'absolute',
                    left: `${(e.inicio / total) * 100}%`,
                    width: `${(e.real / total) * 100}%`,
                    height: 14, borderRadius: 7,
                    background: e.color,
                  }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: 20, marginTop: 16, fontSize: 12, color: C.t500 }}>
          {[{ c: C.blue500, l: 'Planejado' }, { c: C.green500, l: 'Executado' }, { c: C.orange500, l: 'Em andamento' }, { c: C.red500, l: 'Hoje' }].map(l => (
            <div key={l.l} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 16, height: 6, background: l.c, borderRadius: 3 }} />
              {l.l}
            </div>
          ))}
        </div>
      </Card>

      {/* Desvios */}
      <Card style={{ padding: '18px 20px' }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: C.t900, marginBottom: 14 }}>Resumo de Desvios</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          {[{ l: 'Adiantadas', v: '2', c: C.green600 }, { l: 'No prazo', v: '3', c: C.blue600 }, { l: 'Atrasadas', v: '2', c: C.red600 }, { l: 'Desvio médio', v: '+5d', c: C.orange600 }].map(d => (
            <div key={d.l} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: d.c }}>{d.v}</div>
              <div style={{ fontSize: 12, color: C.t500, marginTop: 4 }}>{d.l}</div>
            </div>
          ))}
        </div>
      </Card>
    </AppShell>
  );
};

Object.assign(window, { ProjetosScreen, DetalheProjetoScreen, CronogramaScreen });

// mis-obra.jsx — Obra/Execução, Atividades Diárias, Relatório Fotográfico

const { useState: useO } = React;

// ─── OBRA / EXECUÇÃO ──────────────────────────────────
const ObraExecucaoScreen = ({ onNavigate }) => {
  const project = readActiveProject() || DEFAULT_PROJECT;
  const [filterTab, setFilterTab] = useO('todas');
  const atividades = [
