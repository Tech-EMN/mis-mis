/* === DASHBOARD === */

const DashboardScreen = ({ onNavigate }) => {
  const [planScale, setPlanScale] = useD(1);
  const [plan3D, setPlan3D] = useD(false);
  const [project, setProject] = useD(readActiveProject());
  React.useEffect(() => {
    const sync = e => setProject(e.detail || readActiveProject());
    window.addEventListener('mis:project-change', sync);
    return () => window.removeEventListener('mis:project-change', sync);
  }, []);
  if (!project) {
    return (
      <AppShell active="projetos" onNavigate={onNavigate}>
        <Card style={{ maxWidth: 620, margin: '48px auto', padding: 34, textAlign: 'center' }}>
          <div style={{ width: 58, height: 58, borderRadius: 29, background: C.blue100, margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ic.Building size={25} color={C.blue600} /></div>
          <h2 style={{ fontSize: 22, color: C.t900, marginBottom: 8 }}>Selecione um projeto</h2>
          <p style={{ color: C.t500, fontSize: 14, lineHeight: 1.55, marginBottom: 20 }}>A visão geral e os módulos de acompanhamento só ficam disponíveis após a seleção de um card na carteira de projetos.</p>
          <Btn onClick={() => onNavigate('projetos')}>Ver projetos</Btn>
        </Card>
      </AppShell>
    );
  }
  const daysRemaining = projectDaysRemaining(project.deadline);
  const projectBudget = formatProjectBudget(project.budget);
  const projectAddress = project.address || `${project.loc || 'Local não informado'} · ${project.type || 'Obra'} · Responsável: ${project.resp || 'A definir'}`;
  const fases = [
    { label: 'Fundação', pct: 100, color: '#22C55E' },
    { label: 'Estrutura', pct: 95, color: '#22C55E' },
    { label: 'Vedações', pct: 82, color: '#3B82F6' },
    { label: 'Hidráulica', pct: 68, color: '#3B82F6' },
    { label: 'Elétrica', pct: 55, color: '#F59E0B' },
    { label: 'Revestimento', pct: 40, color: '#F59E0B' },
    { label: 'Acabamento', pct: 12, color: '#EF4444' },
  ];
  const alertas = [
    { title: 'Atraso: Sala Técnica', sub: 'Instalações elétricas — desvio de 5 dias', time: '09:12', color: C.red500 },
    { title: 'Pendência: Revestimento', sub: 'Materiais aguardando entrega', time: '08:30', color: C.orange500 },
    { title: 'Validação IA pendente', sub: 'Relatório semanal aguarda revisão', time: '08:05', color: C.orange500 },
    { title: 'Estrutura Torre B concluída', sub: 'Validado pela engenharia RS', time: 'ontem', color: C.green500 },
  ];
  const outras = [
    { id: 1, name: 'Residencial Aurora', loc: 'Campinas, SP', pct: 68, color: C.blue500, area: '1.240 m²', address: 'Campinas, SP · Condomínio Aurora · 3 blocos', alerts: 3, deadline: '15/08/2026', team: 42, budget: '4.850.000', type: 'Residencial', resp: 'Carlos Mendes' },
    { id: 4, name: 'Torre Central', loc: 'Santo André, SP', pct: 51, color: C.orange500, area: '8.750 m²', address: 'Santo André, SP · 24 pavimentos corporativos', alerts: 13, deadline: '05/11/2026', team: 73, budget: '15.700.000', type: 'Corporativo', resp: 'Ricardo Alves' },
    { id: 2, name: 'Edifício Horizonte', loc: 'São Paulo, SP', pct: 74, color: C.blue600, area: '2.480 m²', address: 'São Paulo, SP · 18 pavimentos · Torre única', alerts: 4, deadline: '30/09/2026', team: 58, budget: '8.200.000', type: 'Comercial', resp: 'Mariana Lopes' },
  ];
  const rooms = [
    { name: 'SALA PRINCIPAL', pct: 100, note: 'Estrutura concluída ✓', color: C.green500, x: 18, y: 30 },
    { name: 'RECEPÇÃO', pct: 64, note: 'Revestimento pendente', color: C.orange500, x: 36, y: 14 },
    { name: 'SALA TÉCNICA', pct: 31, note: '▲ Atraso 5 dias', color: C.red500, x: 76, y: 25 },
    { name: 'ÁREA TOTAL', pct: null, note: '930 m²', color: C.blue500, x: 52, y: 52 },
    { name: 'DEPÓSITO', pct: 88, note: 'Instalações OK', color: C.blue500, x: 20, y: 68 },
    { name: 'COPA / WC', pct: 76, note: 'Hidráulica em andamento', color: C.blue500, x: 44, y: 72 },
  ];

  return (
    <AppShell active="dashboard" onNavigate={onNavigate}>
      <div className="mis-dashboard-page-layout">
        {/* Resumo superior: informações da obra + indicadores laterais */}
        <div className="mis-dashboard-summary-row">
          <Card className="mis-dashboard-project-card" style={{ padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <div style={{ width: 4, height: 28, background: C.blue500, borderRadius: 2 }} />
                  <h2 style={{ fontSize: 22, fontWeight: 700, color: C.t900 }}>{project.name}</h2>
                </div>
                <p style={{ fontSize: 13, color: C.t500, marginBottom: 14 }}>{projectAddress}</p>
                <div style={{ display: 'flex', gap: 24 }}>
                  {[
                    { label: 'CONCLUSÃO', value: `${project.pct || 0}%`, color: C.blue600 },
                    { label: 'RESTANTES', value: `${daysRemaining} d`, color: C.t900 },
                    { label: 'ALERTAS', value: String(project.alerts ?? (project.status === 'atrasado' ? 8 : project.status === 'atencao' ? 6 : 3)), color: C.orange500 },
                    { label: 'EQUIPE', value: String(project.team || 9), color: C.blue500 },
                    { label: 'ÁREA TOTAL', value: project.area || '930 m²', color: C.t900 },
                  ].map(k => (
                    <div key={k.label}>
                      <div style={{ fontSize: 18, fontWeight: 700, color: k.color }}>{k.value}</div>
                      <div style={{ fontSize: 11, color: C.t400, marginTop: 2 }}>{k.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
          {/* Progress semanal */}
          <Card className="mis-dashboard-progress-card" style={{ padding: '14px 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: C.t900 }}>Progresso Semanal</span>
              <span style={{ fontSize: 11, color: C.t400 }}>Mai 2025</span>
            </div>
            <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 50 }}>
              {[40, 55, 48, 72].map((h, i) => (
                <div key={i} style={{ flex: 1, background: i === 3 ? C.blue500 : '#E5E7EB', borderRadius: '3px 3px 0 0', height: `${h}%` }} />
              ))}
            </div>
            <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
              {['S2', 'S3', 'S4', 'Hoje'].map(l => (
                <span key={l} style={{ flex: 1, fontSize: 10, color: C.t400, textAlign: 'center' }}>{l}</span>
              ))}
            </div>
          </Card>

          {/* Dias sem acidentes */}
          <Card className="mis-dashboard-safety-card" style={{ padding: '14px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: 12, color: C.t500, marginBottom: 4 }}>DIAS SEM ACIDENTES</div>
            <div style={{ fontSize: 38, fontWeight: 800, color: C.green500, lineHeight: 1 }}>47</div>
            <div style={{ fontSize: 12, color: C.t400, marginTop: 4 }}>CONSECUTIVOS</div>
          </Card>

        </div>

        <div className="mis-dashboard-content-row">
          {/* Main column */}
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Floor plan */}
          <Card style={{ padding: 20 }}>
            <div style={{ fontSize: 11, color: C.t400, marginBottom: 14, letterSpacing: 0.5 }}>— PLANTA BAIXA · PAVIMENTO 1 · TORRE A</div>
            <div id="mis-floor-plan" style={{ position: 'relative', height: 240, background: plan3D ? 'linear-gradient(145deg,#eef5ff,#f9fbff 45%,#edf3fb)' : '#FAFAFA', borderRadius: 10, border: `1px solid ${C.border}`, overflow: 'hidden', perspective: plan3D ? 800 : 'none' }}>
              {rooms.map(r => (
                <div key={r.name} style={{
                  position: 'absolute', left: `${r.x}%`, top: `${r.y}%`,
                  background: '#fff', border: `1px solid ${C.border}`,
                  borderRadius: 8, padding: '8px 12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  maxWidth: 160, transform: `scale(${planScale}) ${plan3D ? 'rotateX(4deg) rotateY(-3deg)' : ''}`, transformOrigin: 'center', transition: 'transform .18s ease',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 2 }}>
                    <StatusDot color={r.color} size={7} />
                    <span style={{ fontSize: 10, fontWeight: 600, color: C.t500, letterSpacing: 0.3 }}>{r.name}</span>
                  </div>
                  {r.pct !== null && <div style={{ fontSize: 15, fontWeight: 700, color: r.color }}>{r.pct}%</div>}
                  {r.pct === null && <div style={{ fontSize: 14, fontWeight: 700, color: r.color }}>{r.note}</div>}
                  {r.pct !== null && <div style={{ fontSize: 11, color: C.t500 }}>{r.note}</div>}
                </div>
              ))}
              <div style={{ position: 'absolute', right: 12, bottom: 12, display: 'flex', gap: 6 }}>
                {['+', '−', '3D', '⤢'].map(b => (
                  <button key={b} className={`mis-select-btn${b === '3D' && plan3D ? ' active' : ''}`} aria-pressed={b === '3D' ? plan3D : undefined} onClick={() => { if (b === '+') setPlanScale(v => Math.min(1.25, v + .08)); else if (b === '−') setPlanScale(v => Math.max(.8, v - .08)); else if (b === '3D') setPlan3D(v => !v); else document.getElementById('mis-floor-plan')?.requestFullscreen?.(); }} style={{ width: 30, height: 30, borderRadius: 6, border: `1px solid ${C.border}`, background: b === '3D' && plan3D ? C.blue600 : '#fff', cursor: 'pointer', fontSize: 13, color: b === '3D' && plan3D ? '#fff' : C.t500, fontFamily: 'inherit' }}>{b}</button>
                ))}
              </div>
            </div>
          </Card>

          {/* Bottom row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {/* Outras obras */}
            <Card style={{ padding: '18px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: C.t900 }}>Outras Obras</span>
                <Badge color="gray">5 projetos ativos</Badge>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {outras.map(o => (
                  <div key={o.name} onClick={() => openProjectDashboard(o, onNavigate)} style={{ cursor: 'pointer' }} title={`Abrir dashboard de ${o.name}`}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 500, color: C.t900 }}>{o.name}</div>
                        <div style={{ fontSize: 12, color: C.t500 }}>{o.loc}</div>
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: o.color }}>{o.pct}%</span>
                    </div>
                    <ProgressBar value={o.pct} color={o.color} height={4} />
                  </div>
                ))}
              </div>
            </Card>

            {/* Fases */}
            <Card style={{ padding: '18px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: C.t900 }}>Fases da Obra</span>
                <span style={{ fontSize: 12, color: C.t400 }}>{project.name}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {fases.map(f => (
                  <div key={f.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 13, color: C.t700, width: 90, flexShrink: 0 }}>{f.label}</span>
                    <div style={{ flex: 1 }}>
                      <ProgressBar value={f.pct} color={f.color} height={8} />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 600, color: f.color, width: 36, textAlign: 'right' }}>{f.pct}%</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="mis-dashboard-side" style={{ width: 220, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* Alertas — versão compacta */}
          <Card style={{ padding: '10px 12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: C.t900 }}>Alertas</span>
              <button onClick={() => onNavigate('alertas')} style={{
                border: 'none', background: 'transparent', padding: 0, cursor: 'pointer',
                fontSize: 10, fontWeight: 600, color: C.blue600, fontFamily: 'inherit'
              }}>Ver todos ({alertas.length})</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {alertas.slice(0, 2).map((a, i) => (
                <div key={i} title={a.sub} style={{
                  display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer',
                  minHeight: 24, padding: '3px 5px', borderRadius: 7,
                  background: 'rgba(148,163,184,0.06)'
                }} onClick={() => onNavigate('alertas')}>
                  <StatusDot color={a.color} size={7} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: 10.5, fontWeight: 600, color: C.t900,
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                    }}>{a.title}</div>
                  </div>
                  <span style={{ fontSize: 9.5, color: C.t400, whiteSpace: 'nowrap' }}>{a.time}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Budget */}
          <Card style={{ padding: '16px 18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: C.t400, letterSpacing: 0.5 }}>BUDGET</span>
              <Badge color="green" style={{ fontSize: 11 }}>▲ 3%</Badge>
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, color: C.blue600, marginBottom: 6 }}>{projectBudget}</div>
            <ProgressBar value={79} color={C.blue500} height={6} style={{ marginBottom: 8 }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: C.t500 }}>
              <span>Consumido<br /><strong style={{ color: C.t900 }}>R$ 3,3M</strong></span>
              <span style={{ textAlign: 'right' }}>Restante<br /><strong style={{ color: C.t900 }}>R$ 0,9M</strong></span>

Object.assign(window, { DashboardScreen });
