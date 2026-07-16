/* === FINANCEIRO === */

const FinanceiroScreen = ({ onNavigate }) => {
  const project = readActiveProject() || DEFAULT_PROJECT;
  const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
  const recebido = [120, 145, 98, 180, 165, 210];
  const pagos    = [95, 110, 88, 140, 130, 162];
  const maxVal   = Math.max(...recebido, ...pagos);

  const subMods = [
    { id: 'contas_receber', icon: Ic.TrendUp,  label: 'Contas a Receber', count: '4 títulos pendentes',        bg: C.green100,  ic: C.green600  },
    { id: 'contas_pagar',   icon: Ic.Clipboard,label: 'Contas a Pagar',   count: '2 vencendo em 7 dias',       bg: C.orange100, ic: C.orange600 },
    { id: 'fluxo_caixa',    icon: Ic.Activity, label: 'Fluxo de Caixa',   count: 'Projeção 90 dias',           bg: C.blue100,   ic: C.blue600   },
    { id: 'medicoes',       icon: Ic.BarChart,  label: 'Medições',         count: '1 aguardando aprovação',     bg: C.purple100, ic: C.purple600 },
  ];

  const movs = [
    { desc: `Recebimento ${project.name} — Med. 08`, valor: '+R$ 48k', color: C.green600, time: 'hoje' },
    { desc: `Pedido elétrico — ${project.name}`, valor: '-R$ 12k', color: C.red600, time: 'ontem' },
    { desc: 'Pgto Metálica SP',               valor: '-R$ 8,4k',color: C.red600,   time: '2d atrás' },
    { desc: 'Recebimento Torre Central',      valor: '+R$ 62k', color: C.green600, time: '3d atrás' },
  ];

  return (
    <AppShell active="financeiro" onNavigate={onNavigate}>
      <SectionHeader
        title="Financeiro"
        subtitle={`Saúde financeira e execução orçamentária de ${project.name}`}
        action={<Btn variant="secondary" size="sm" icon={<Ic.Download size={14}/>}>Exportar</Btn>}
      />

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 20 }}>
        {[
          { label: 'Saldo Atual',       value: 'R$ 312k', sub: '+R$ 48k vs. mês anterior', sc: C.green600,  icon: <Ic.Dollar    size={22} color={C.t300}/> },
          { label: 'A Receber (30d)',   value: 'R$ 185k', sub: '4 títulos pendentes',       sc: C.blue600,   icon: <Ic.TrendUp   size={22} color={C.t300}/> },
          { label: 'A Pagar (30d)',     value: 'R$ 94k',  sub: '2 vencendo em 7 dias',     sc: C.orange600, icon: <Ic.Clipboard size={22} color={C.t300}/> },
          { label: 'Margem Projetada',  value: '28%',     sub: 'Meta: 30% — atenção',       sc: C.orange600, icon: <Ic.BarChart  size={22} color={C.t300}/> },
        ].map(k => (
          <StatCard key={k.label} label={k.label} value={k.value} icon={k.icon}
            sub={<span style={{ fontSize: 12, color: k.sc }}>{k.sub}</span>} />
        ))}
      </div>

      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        {/* Coluna principal */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* Gráfico de barras */}
          <Card style={{ padding: '20px 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <span style={{ fontSize: 15, fontWeight: 600, color: C.t900 }}>Recebido vs. Pago — 2025</span>
              <div style={{ display: 'flex', gap: 16, fontSize: 12, color: C.t500 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ width: 10, height: 10, borderRadius: 2, background: C.blue500, display: 'inline-block' }}/> Recebido
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ width: 10, height: 10, borderRadius: 2, background: C.orange500, display: 'inline-block' }}/> Pago
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', height: 150 }}>
              {meses.map((m, i) => (
                <div key={m} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: '100%', display: 'flex', gap: 3, alignItems: 'flex-end', height: 130 }}>
                    <div style={{ flex: 1, background: C.blue500, borderRadius: '3px 3px 0 0', height: `${(recebido[i]/maxVal)*100}%` }} />
                    <div style={{ flex: 1, background: C.orange500, borderRadius: '3px 3px 0 0', height: `${(pagos[i]/maxVal)*100}%`, opacity: 0.75 }} />
                  </div>
                  <span style={{ fontSize: 11, color: C.t400 }}>{m}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Alerta MIS Finance */}
          <Card style={{ padding: '14px 18px', background: C.orange100, border: `1px solid ${C.orange500}30` }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <Ic.AlertTriangle size={20} color={C.orange600}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.orange600 }}>Alerta MIS Finance</div>
                <div style={{ fontSize: 13, color: C.t700, marginTop: 1 }}>R$ 32.000 vence em 5 dias sem cobertura suficiente de saldo.</div>
              </div>
              <Btn variant="ghost" size="sm" onClick={() => onNavigate('fluxo_caixa')} style={{ color: C.orange600, border: `1px solid ${C.orange500}`, borderRadius: 8, padding: '5px 12px' }}>Ver fluxo</Btn>
            </div>
          </Card>

          {/* Sub-módulos */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {subMods.map(s => (
              <Card key={s.id} onClick={() => onNavigate(s.id)} style={{ padding: '18px 20px', cursor: 'pointer' }}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <s.icon size={20} color={s.ic}/>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: C.t900 }}>{s.label}</div>
                    <div style={{ fontSize: 12, color: C.t500, marginTop: 2 }}>{s.count}</div>
                  </div>
                  <Ic.ChevronRight size={16} color={C.t300}/>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ width: 220, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Card style={{ padding: '16px 18px' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.t900, marginBottom: 14 }}>Projeto atual</div>
            {[
              { name: project.name, valor: formatProjectBudget(project.budget), pct: project.pct || 0, color: (project.pct || 0) >= 70 ? C.green500 : C.blue500 },
            ].map(p => (
              <div key={p.name} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontSize: 12, color: C.t700 }}>{p.name}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: C.t900 }}>{p.valor}</span>
                </div>
                <ProgressBar value={p.pct} color={p.color} height={5}/>
                <div style={{ fontSize: 11, color: C.t400, marginTop: 2 }}>{p.pct}% executado</div>
              </div>
            ))}
          </Card>

          <Card style={{ padding: '16px 18px' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.t900, marginBottom: 12 }}>Movimentações Recentes</div>
            {movs.map((m, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: C.t700 }}>{m.desc}</div>
                  <div style={{ fontSize: 11, color: C.t400 }}>{m.time}</div>
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: m.color, whiteSpace: 'nowrap' }}>{m.valor}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </AppShell>
  );
};

// ─── CONTAS A RECEBER ────────────────────────────────────────────────────────
const ContasReceberScreen = ({ onNavigate }) => {
  const [filtro, setFiltro] = useF('todos');

  const titulos = [
    { id: 1, desc: 'Medição 08 — Edifício Nórdica',    cliente: 'M Group',          venc: '05/06/2025', valor: 'R$ 48.200', status: 'receber', statusLabel: 'A receber' },
    { id: 2, desc: 'Medição 06 — Residencial Aurora',  cliente: 'Eduardo Nunes',     venc: '12/06/2025', valor: 'R$ 22.400', status: 'receber', statusLabel: 'A receber' },
    { id: 3, desc: 'Adiantamento — Torre Central',     cliente: 'Construtora Delta', venc: '01/06/2025', valor: 'R$ 80.000', status: 'vencido', statusLabel: 'Vencido'   },
    { id: 4, desc: 'Proposta 04 — Horizonte',          cliente: 'Horizonte SA',      venc: '30/05/2025', valor: 'R$ 35.000', status: 'recebido',statusLabel: 'Recebido'  },
    { id: 5, desc: 'Medição 09 — Nórdica Torre B',     cliente: 'M Group',          venc: '20/06/2025', valor: 'R$ 51.800', status: 'receber', statusLabel: 'A receber' },
  ];

  const colorMap = { receber: 'blue', vencido: 'red', recebido: 'green' };

  const filtrados = filtro === 'todos' ? titulos : titulos.filter(t => {
    if (filtro === 'pendentes') return t.status === 'receber';
    if (filtro === 'vencidos')  return t.status === 'vencido';
    if (filtro === 'recebidos') return t.status === 'recebido';
    return true;
  });

  const totalReceber  = 'R$ 121.600';
  const totalVencido  = 'R$ 80.000';
  const totalRecebido = 'R$ 35.000';

  return (
    <AppShell active="contas_receber" onNavigate={onNavigate}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <button onClick={() => onNavigate('financeiro')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: C.t500, fontSize: 14, fontFamily: 'inherit' }}>
          <Ic.ArrowLeft size={16}/> Financeiro
        </button>
        <span style={{ color: C.t300 }}>›</span>
        <span style={{ fontSize: 14, color: C.t900, fontWeight: 500 }}>Contas a Receber</span>
      </div>

      {/* Totais */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 20 }}>
        {[
          { label: 'A Receber Total', value: totalReceber,  color: C.blue600  },
          { label: 'Vencido',         value: totalVencido,  color: C.red600   },
          { label: 'Recebido no Mês', value: totalRecebido, color: C.green600 },
        ].map(t => (
          <Card key={t.label} style={{ padding: '16px 20px' }}>
            <div style={{ fontSize: 12, color: C.t500, marginBottom: 6 }}>{t.label}</div>
            <div style={{ fontSize: 26, fontWeight: 700, color: t.color }}>{t.value}</div>
          </Card>
        ))}
      </div>

      <Card style={{ padding: '20px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <TabBar tabs={[{id:'todos',label:'Todos'},{id:'pendentes',label:'A Receber'},{id:'vencidos',label:'Vencidos'},{id:'recebidos',label:'Recebidos'}]}
            active={filtro} onChange={setFiltro}/>
          <Btn variant="primary" size="sm" icon={<Ic.Plus size={14}/>}>Novo título</Btn>
        </div>

        <table style={{ width: '100%', fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${C.border}` }}>
              {['Descrição','Cliente','Vencimento','Valor','Status','Ações'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontSize: 12, fontWeight: 600, color: C.t500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtrados.map(t => (
              <tr key={t.id} style={{ borderBottom: `1px solid ${C.borderLight}` }}>
                <td style={{ padding: '12px', color: C.t900, fontWeight: 500 }}>{t.desc}</td>
                <td style={{ padding: '12px', color: C.t700 }}>{t.cliente}</td>
                <td style={{ padding: '12px', color: t.status === 'vencido' ? C.red600 : C.t700 }}>{t.venc}</td>
                <td style={{ padding: '12px', fontWeight: 600, color: C.t900 }}>{t.valor}</td>
                <td style={{ padding: '12px' }}><Badge color={colorMap[t.status]} dot>{t.statusLabel}</Badge></td>
                <td style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {t.status !== 'recebido' && (
                      <button style={{ fontSize: 12, color: C.navActive, border: 'none', background: 'none', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700 }}>Marcar recebido</button>
                    )}
                    <button style={{ fontSize: 12, color: C.t500, border: 'none', background: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>Cobrança</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </AppShell>
  );
};

// ─── CONTAS A PAGAR ──────────────────────────────────────────────────────────
const ContasPagarScreen = ({ onNavigate }) => {
  const [filtro, setFiltro] = useF('todos');

  const titulos = [
    { id: 1, desc: 'Fornecedor Metálica SP — aço estrutural',    fornecedor: 'Metálica SP',   venc: '05/06/2025', valor: 'R$ 28.900', status: 'pagar',   statusLabel: 'A pagar',    cc: 'Estrutura' },
    { id: 2, desc: 'Elétrica Top — cabos e disjuntores',         fornecedor: 'Elétrica Top',  venc: '08/06/2025', valor: 'R$ 14.200', status: 'pagar',   statusLabel: 'A pagar',    cc: 'Elétrica'  },
    { id: 3, desc: 'Cerâmica Horizonte — revestimento piso',     fornecedor: 'Cerâmica Hz',   venc: '02/06/2025', valor: 'R$ 9.600',  status: 'vencido', statusLabel: 'Vencido',    cc: 'Acabamento'},
    { id: 4, desc: 'Medição OP Carlos — pintura',                fornecedor: 'Carlos OP',     venc: '28/05/2025', valor: 'R$ 4.800',  status: 'pago',    statusLabel: 'Pago',       cc: 'Acabamento'},
    { id: 5, desc: 'Hidrotec — tubulações hidráulicas',          fornecedor: 'Hidrotec Ltda', venc: '15/06/2025', valor: 'R$ 18.400', status: 'pagar',   statusLabel: 'A pagar',    cc: 'Hidráulica'},
  ];

  const colorMap = { pagar: 'orange', vencido: 'red', pago: 'green' };

  const filtrados = filtro === 'todos' ? titulos : titulos.filter(t => {
    if (filtro === 'pendentes') return t.status === 'pagar';
    if (filtro === 'vencidos')  return t.status === 'vencido';
    if (filtro === 'pagos')     return t.status === 'pago';
    return true;
  });

  return (
    <AppShell active="contas_pagar" onNavigate={onNavigate}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <button onClick={() => onNavigate('financeiro')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: C.t500, fontSize: 14, fontFamily: 'inherit' }}>
          <Ic.ArrowLeft size={16}/> Financeiro
        </button>
        <span style={{ color: C.t300 }}>›</span>
        <span style={{ fontSize: 14, color: C.t900, fontWeight: 500 }}>Contas a Pagar</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 20 }}>
        {[
          { label: 'A Pagar Total',   value: 'R$ 62.500', color: C.orange600 },
          { label: 'Vencido',         value: 'R$ 9.600',  color: C.red600    },
          { label: 'Pago no Mês',     value: 'R$ 31.200', color: C.green600  },
        ].map(t => (
          <Card key={t.label} style={{ padding: '16px 20px' }}>
            <div style={{ fontSize: 12, color: C.t500, marginBottom: 6 }}>{t.label}</div>
            <div style={{ fontSize: 26, fontWeight: 700, color: t.color }}>{t.value}</div>
          </Card>
        ))}
      </div>

      <Card style={{ padding: '20px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <TabBar tabs={[{id:'todos',label:'Todos'},{id:'pendentes',label:'A Pagar'},{id:'vencidos',label:'Vencidos'},{id:'pagos',label:'Pagos'}]}
            active={filtro} onChange={setFiltro}/>
          <Btn variant="primary" size="sm" icon={<Ic.Plus size={14}/>}>Nova despesa</Btn>
        </div>

        <table style={{ width: '100%', fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${C.border}` }}>
              {['Descrição','Fornecedor','Vencimento','Valor','Centro de Custo','Status','Ações'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontSize: 12, fontWeight: 600, color: C.t500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtrados.map(t => (
              <tr key={t.id} style={{ borderBottom: `1px solid ${C.borderLight}` }}>
                <td style={{ padding: '12px', color: C.t900, fontWeight: 500 }}>{t.desc}</td>
                <td style={{ padding: '12px', color: C.t700 }}>{t.fornecedor}</td>
                <td style={{ padding: '12px', color: t.status === 'vencido' ? C.red600 : C.t700 }}>{t.venc}</td>
                <td style={{ padding: '12px', fontWeight: 600, color: C.t900 }}>{t.valor}</td>
                <td style={{ padding: '12px' }}><Badge color="gray">{t.cc}</Badge></td>
                <td style={{ padding: '12px' }}><Badge color={colorMap[t.status]} dot>{t.statusLabel}</Badge></td>
                <td style={{ padding: '12px' }}>
                  {t.status !== 'pago' && (
                    <button style={{ fontSize: 12, color: C.navActive, border: 'none', background: 'none', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700 }}>Marcar pago</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </AppShell>
  );
};

// ─── FLUXO DE CAIXA ──────────────────────────────────────────────────────────
const FluxoCaixaScreen = ({ onNavigate }) => {
  const [periodo, setPeriodo] = useF('mes');

  const dados = [
    { data: '01/06', entradas: 0,     saidas: 9600,  saldo: 302400 },
    { data: '05/06', entradas: 48200, saidas: 28900, saldo: 321700 },
    { data: '08/06', entradas: 22400, saidas: 14200, saldo: 329900 },
    { data: '15/06', entradas: 0,     saidas: 18400, saldo: 311500 },
    { data: '20/06', entradas: 51800, saidas: 0,     saldo: 363300 },
    { data: '30/06', entradas: 0,     saidas: 32000, saldo: 331300 },
  ];

  const saldos = dados.map(d => d.saldo);
  const minS   = Math.min(...saldos);
  const maxS   = Math.max(...saldos);
  const range  = maxS - minS || 1;
  const H      = 140;
  const W      = 600;
  const pts    = saldos.map((s, i) => `${(i/(saldos.length-1))*W},${H - ((s-minS)/range)*H}`).join(' ');
  const isDark = typeof document !== 'undefined' && document.documentElement.dataset.theme === 'dark';
  const chartGridColor = isDark ? 'rgba(255,255,255,.14)' : 'rgba(71,85,105,.26)';
  const chartLineColor = isDark ? C.blue500 : '#2F6FFF';
  const chartAreaColor = isDark ? `${C.blue500}15` : 'rgba(47,111,255,.18)';
  const chartLabelColor = isDark ? C.t400 : '#5B6470';
  const chartDotFill = isDark ? '#FFFFFF' : '#EEF4FF';
  const chartDotStroke = chartLineColor;

  return (
    <AppShell active="fluxo_caixa" onNavigate={onNavigate}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <button onClick={() => onNavigate('financeiro')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: C.t500, fontSize: 14, fontFamily: 'inherit' }}>
          <Ic.ArrowLeft size={16}/> Financeiro
        </button>
        <span style={{ color: C.t300 }}>›</span>
        <span style={{ fontSize: 14, color: C.t900, fontWeight: 500 }}>Fluxo de Caixa</span>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 20 }}>
        {[
          { label: 'Saldo Atual',     value: 'R$ 312k', color: C.blue600  },
          { label: 'Mín. Projetado',  value: 'R$ 302k', color: C.orange600},
          { label: 'Máx. Projetado',  value: 'R$ 363k', color: C.green600 },
          { label: 'Saldo 30d',       value: 'R$ 331k', color: C.blue600  },
        ].map(k => (
          <Card key={k.label} style={{ padding: '16px 20px' }}>
            <div style={{ fontSize: 12, color: C.t500, marginBottom: 6 }}>{k.label}</div>
            <div style={{ fontSize: 26, fontWeight: 700, color: k.color }}>{k.value}</div>
          </Card>
        ))}
      </div>

      <Card style={{ padding: '20px 24px', marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: C.t900 }}>Saldo Projetado — Junho 2025</span>
          <TabBar tabs={[{id:'semana',label:'Semana'},{id:'mes',label:'Mês'},{id:'trimestre',label:'Trimestre'}]}
            active={periodo} onChange={setPeriodo}/>
        </div>

        {/* SVG Line chart */}
        <div style={{ overflowX: 'auto' }}>
          <svg viewBox={`-10 -10 ${W+20} ${H+30}`} style={{ width: '100%', minWidth: 400, height: 160 }}>
            {/* Grid lines */}
            {[0,0.25,0.5,0.75,1].map(t => (
              <line key={t} x1={0} x2={W} y1={H - t*H} y2={H - t*H} stroke={chartGridColor} strokeWidth={1.2}/>
            ))}
            {/* Area fill */}
            <polygon points={`0,${H} ${pts} ${W},${H}`} fill={chartAreaColor}/>
            {/* Line */}
            <polyline points={pts} fill="none" stroke={chartLineColor} strokeWidth={2.75} strokeLinecap="round" strokeLinejoin="round"/>
            {/* Dots */}
            {saldos.map((s,i) => (
              <circle key={i} cx={(i/(saldos.length-1))*W} cy={H-((s-minS)/range)*H} r={4.5} fill={chartDotFill} stroke={chartDotStroke} strokeWidth={2.25}/>
            ))}
            {/* X labels */}
            {dados.map((d,i) => (
              <text key={i} x={(i/(saldos.length-1))*W} y={H+20} textAnchor="middle" fontSize={11} fill={chartLabelColor}>{d.data}</text>
            ))}
          </svg>
        </div>
      </Card>

Object.assign(window, { FinanceiroScreen,ContasReceberScreen,ContasPagarScreen,FluxoCaixaScreen });
