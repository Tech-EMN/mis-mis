/* === FINANCEIRO FLUXO === */


      {/* Alert período negativo */}
      <Card style={{ padding: '14px 18px', background: C.orange100, border: `1px solid ${C.orange500}30`, marginBottom: 14 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Ic.AlertCircle size={20} color={C.orange600}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.orange600 }}>Atenção: Saldo cai para R$ 302k em 01/06</div>
            <div style={{ fontSize: 13, color: C.t700, marginTop: 1 }}>Vencimento da Cerâmica Hz sem entrada prevista no mesmo período.</div>
          </div>
          <Btn variant="ghost" size="sm" style={{ color: C.orange600 }}>Como resolver?</Btn>
        </div>
      </Card>

      {/* Tabela */}
      <Card style={{ padding: '20px 24px' }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: C.t900, marginBottom: 14 }}>Detalhamento por Data</div>
        <table style={{ width: '100%', fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${C.border}` }}>
              {['Data','Entrada Prevista','Saída Prevista','Saldo Projetado'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontSize: 12, fontWeight: 600, color: C.t500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dados.map((d,i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${C.borderLight}` }}>
                <td style={{ padding: '12px', color: C.t700 }}>{d.data}</td>
                <td style={{ padding: '12px', color: d.entradas > 0 ? C.green600 : C.t400, fontWeight: d.entradas > 0 ? 600 : 400 }}>
                  {d.entradas > 0 ? `+R$ ${d.entradas.toLocaleString('pt-BR')}` : '—'}
                </td>
                <td style={{ padding: '12px', color: d.saidas > 0 ? C.red600 : C.t400, fontWeight: d.saidas > 0 ? 600 : 400 }}>
                  {d.saidas > 0 ? `-R$ ${d.saidas.toLocaleString('pt-BR')}` : '—'}
                </td>
                <td style={{ padding: '12px', fontWeight: 700, color: C.blue600 }}>R$ {d.saldo.toLocaleString('pt-BR')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </AppShell>
  );
};

const FinanceiroGeralScreen = ({ onNavigate }) => {
  const openProject = project => { writeActiveProject(project); onNavigate('financeiro'); };
  const totals = { budget: 69350000, committed: 48740000, paid: 33180000, receivable: 8420000 };
  return (
    <AppShell active="financeiro_geral" onNavigate={onNavigate}>
      <SectionHeader title="Financeiro" subtitle="Visão consolidada de todos os projetos, incluindo pré-projetos em orçamento e proposta." action={<Btn variant="secondary" icon={<Ic.Download size={14}/>}>Exportar consolidado</Btn>}/>
      <div style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14,marginBottom:18 }}>
        {[['Orçamento da carteira',`R$ ${(totals.budget/1000000).toFixed(1).replace('.',',')}M`,'6 projetos ativos','blue'],['Valor comprometido',`R$ ${(totals.committed/1000000).toFixed(1).replace('.',',')}M`,'70% da carteira','orange'],['Total pago',`R$ ${(totals.paid/1000000).toFixed(1).replace('.',',')}M`,'48% do orçamento','green'],['A receber',`R$ ${(totals.receivable/1000000).toFixed(1).replace('.',',')}M`,'12 títulos abertos','purple']].map(([label,value,sub,color]) => <StatCard key={label} label={label} value={value} sub={<Badge color={color}>{sub}</Badge>}/>) }
      </div>
      <div style={{ display:'grid',gridTemplateColumns:'minmax(0,1fr) 290px',gap:16 }}>
        <Card style={{ overflow:'hidden' }}>
          <div style={{ padding:'18px 20px',display:'flex',alignItems:'center',justifyContent:'space-between',borderBottom:`1px solid ${C.border}` }}><div><div style={{ fontSize:15,fontWeight:700,color:C.t900 }}>Consolidado por projeto</div><div style={{ fontSize:12,color:C.t500,marginTop:3 }}>Selecione um projeto para abrir o financeiro detalhado.</div></div><button onClick={() => onNavigate('upload')} style={{ border:`1px solid ${C.border}`,background:'#fff',borderRadius:9,padding:'8px 11px',cursor:'pointer',fontSize:12,fontWeight:700 }}>+ Incluir novo projeto</button></div>
          <table style={{ width:'100%',borderCollapse:'collapse' }}><thead><tr style={{ background:'#fafbfb' }}>{['Projeto','Orçamento','Executado','Situação',''].map(h => <th key={h} style={{ textAlign:h===''?'right':'left',padding:'11px 16px',fontSize:11,color:C.t500,borderBottom:`1px solid ${C.border}` }}>{h}</th>)}</tr></thead><tbody>{PORTFOLIO_PROJECTS.map((p,index) => { const budget=Number(p.budget); const executed=budget*(p.pct/100)*.86; const status=p.status==='atrasado'?'Crítico':p.status==='atencao'?'Atenção':'Regular'; const color=p.status==='atrasado'?'red':p.status==='atencao'?'orange':'green'; return <tr key={p.id} style={{ borderBottom:index<PORTFOLIO_PROJECTS.length-1?`1px solid ${C.borderLight}`:'none' }}><td style={{ padding:'13px 16px' }}><div style={{ fontSize:13,fontWeight:700,color:C.t900 }}>{p.name}</div><div style={{ fontSize:11,color:C.t500 }}>{p.loc} · {p.resp}</div></td><td style={{ padding:'13px 16px',fontSize:12,fontWeight:600 }}>{formatProjectBudget(p.budget)}</td><td style={{ padding:'13px 16px' }}><div style={{ fontSize:12,fontWeight:600 }}>R$ {(executed/1000000).toFixed(1).replace('.',',')}M</div><ProgressBar value={p.pct} height={4} style={{ marginTop:5,width:110 }}/></td><td style={{ padding:'13px 16px' }}><Badge color={color}>{status}</Badge></td><td style={{ padding:'13px 16px',textAlign:'right' }}><button onClick={() => openProject(p)} style={{ border:`1px solid ${C.border}`,background:'#fff',borderRadius:9,padding:'7px 10px',cursor:'pointer',fontSize:11,fontWeight:700 }}>Abrir financeiro</button></td></tr>; })}</tbody></table>
        </Card>
        <div style={{ display:'flex',flexDirection:'column',gap:14 }}>
          <Card style={{ padding:'18px 20px' }}><div style={{ fontSize:14,fontWeight:700,color:C.t900,marginBottom:12 }}>Pré-projetos</div><div style={{ padding:'12px',border:`1px solid ${C.border}`,borderRadius:11,marginBottom:9 }}><div style={{ display:'flex',justifyContent:'space-between',gap:8 }}><strong style={{ fontSize:12 }}>Residencial Primavera</strong><Badge color="orange">Orçamento</Badge></div><div style={{ fontSize:11,color:C.t500,marginTop:5 }}>Proposta em preparação · R$ 285 mil</div></div><button onClick={() => onNavigate('upload')} style={{ border:0,background:'transparent',color:C.blue600,cursor:'pointer',fontSize:12,fontWeight:700 }}>Ver fluxo de inclusão →</button></Card>
          <Card style={{ padding:'18px 20px' }}><div style={{ fontSize:14,fontWeight:700,color:C.t900,marginBottom:12 }}>Indicadores</div>{[['Margem prevista','18,4%'],['Desvio médio','+2,7%'],['Inadimplência','1,2%'],['Medições pendentes','5']].map(([k,v]) => <div key={k} style={{ display:'flex',justifyContent:'space-between',padding:'7px 0',borderBottom:`1px solid ${C.borderLight}` }}><span style={{ fontSize:12,color:C.t500 }}>{k}</span><strong style={{ fontSize:12,color:C.t900 }}>{v}</strong></div>)}</Card>
          <Card style={{ padding:'18px 20px' }}><div style={{ fontSize:14,fontWeight:700,color:C.t900,marginBottom:10 }}>Acessos rápidos</div><div style={{ display:'flex',flexDirection:'column',gap:8 }}><button onClick={() => onNavigate('projetos')} className="general-link-btn">Selecionar projeto para contas a receber</button><button onClick={() => onNavigate('projetos')} className="general-link-btn">Selecionar projeto para fluxo de caixa</button></div></Card>
        </div>
      </div>
    </AppShell>
  );
};

const ContratosGeralScreen = ({ onNavigate }) => {
  const contracts = [
    { id:'CTR-2026-041',project:PORTFOLIO_PROJECTS[0],client:'Construtora Aurora',value:'R$ 4,85M',status:'Assinado',color:'green',deadline:'15/08/2026' },
    { id:'CTR-2026-052',project:PORTFOLIO_PROJECTS[1],client:'Horizonte Engenharia',value:'R$ 8,20M',status:'Em execução',color:'blue',deadline:'30/09/2026' },
    { id:'CTR-2026-063',project:PORTFOLIO_PROJECTS[3],client:'Central Offices',value:'R$ 15,70M',status:'Revisão jurídica',color:'orange',deadline:'05/11/2026' },
    { id:'PRÉ-2026-019',project:null,client:'Família Primavera',value:'R$ 285 mil',status:'Aguardando proposta',color:'purple',deadline:'A definir' },
  ];
  const openContract = row => { if (row.project) { writeActiveProject(row.project); onNavigate('contrato'); } else onNavigate('proposta'); };
  return (
    <AppShell active="contratos_geral" onNavigate={onNavigate}>
      <SectionHeader title="Contratos" subtitle="Gestão geral de contratos ativos, minutas e documentos de pré-projetos." action={<Btn onClick={() => onNavigate('upload')} icon={<Ic.Plus size={14}/>}>Iniciar novo contrato</Btn>}/>
      <div style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14,marginBottom:18 }}>{[['Contratos ativos','18','R$ 52,4M','blue'],['Aguardando assinatura','3','Exigem acompanhamento','orange'],['Em revisão jurídica','2','Prazo médio 2 dias','purple'],['Vencem em 60 dias','4','Renovação ou aditivo','red']].map(([label,value,sub,color]) => <StatCard key={label} label={label} value={value} sub={<Badge color={color}>{sub}</Badge>}/>)}</div>
      <Card style={{ padding:'16px 18px',marginBottom:14,display:'flex',alignItems:'center',gap:10 }}><div style={{ flex:1,display:'flex',alignItems:'center',gap:8,border:`1px solid ${C.border}`,borderRadius:10,padding:'9px 12px' }}><Ic.Search size={15} color={C.t400}/><input placeholder="Buscar contrato, cliente ou projeto..." style={{ flex:1,border:0,outline:0,fontSize:13 }}/></div><ChipBar chips={['Todos','Assinados','Em execução','Em revisão','Pré-projetos']} active="Todos" onChange={() => {}}/></Card>
      <div style={{ display:'grid',gridTemplateColumns:'minmax(0,1fr) 280px',gap:16 }}>
        <Card style={{ overflow:'hidden' }}><div style={{ padding:'17px 20px',borderBottom:`1px solid ${C.border}` }}><div style={{ fontSize:15,fontWeight:700,color:C.t900 }}>Carteira contratual</div><div style={{ fontSize:12,color:C.t500,marginTop:3 }}>Contratos de projetos ativos e documentos anteriores à ativação do projeto.</div></div>{contracts.map((row,index) => <button key={row.id} onClick={() => openContract(row)} style={{ width:'100%',border:0,borderBottom:index<contracts.length-1?`1px solid ${C.borderLight}`:'none',background:'#fff',padding:'15px 20px',display:'grid',gridTemplateColumns:'130px minmax(0,1fr) 140px 150px 28px',gap:12,alignItems:'center',textAlign:'left',cursor:'pointer' }}><span style={{ fontSize:12,fontWeight:800,color:C.t700 }}>{row.id}</span><span><strong style={{ display:'block',fontSize:13,color:C.t900 }}>{row.project?.name || 'Projeto em inclusão'}</strong><small style={{ fontSize:11,color:C.t500 }}>{row.client}</small></span><span style={{ fontSize:12,fontWeight:700,color:C.t900 }}>{row.value}</span><span><Badge color={row.color}>{row.status}</Badge><small style={{ display:'block',fontSize:10,color:C.t500,marginTop:4 }}>{row.deadline}</small></span><Ic.ChevronRight size={15} color={C.t400}/></button>)}</Card>
        <div style={{ display:'flex',flexDirection:'column',gap:14 }}><Card style={{ padding:'18px 20px' }}><div style={{ fontSize:14,fontWeight:700,color:C.t900,marginBottom:11 }}>Fluxo pré-contratual</div>{[['1','Dados e arquivos'],['2','Análise e orçamento'],['3','Proposta aprovada'],['4','Contrato e ativação']].map(([n,label]) => <div key={n} style={{ display:'flex',gap:9,alignItems:'center',padding:'7px 0' }}><span style={{ width:22,height:22,borderRadius:11,background:C.borderLight,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:800 }}>{n}</span><span style={{ fontSize:12,color:C.t700 }}>{label}</span></div>)}<Btn onClick={() => onNavigate('upload')} variant="secondary" style={{ width:'100%',justifyContent:'center',marginTop:10 }}>Novo pré-projeto</Btn></Card><Card style={{ padding:'18px 20px' }}><div style={{ fontSize:14,fontWeight:700,color:C.t900,marginBottom:9 }}>Alertas contratuais</div><div style={{ fontSize:12,color:C.t500,lineHeight:1.6 }}>2 documentos aguardam revisão e 4 contratos entram em janela de renovação nos próximos 60 dias.</div></Card></div>
      </div>
    </AppShell>
  );
};

Object.assign(window, { FinanceiroGeralScreen, ContratosGeralScreen, FinanceiroScreen, ContasReceberScreen, ContasPagarScreen, FluxoCaixaScreen });

// mis-juridico.jsx — Orçamento Qualitativo, Contrato/Jurídico

const { useState: useJ } = React;

// ─── ORÇAMENTO QUALITATIVO ───────────────────────────────────────────────────
const OrcamentoQualScreen = ({ onNavigate }) => {
  const [aberto, setAberto] = useJ(null);

  const disciplinas = [
    {
      id: 'civil', label: 'Civil / Estrutura', total: 'R$ 820.000',
      etapas: [
        { nome: 'Fundação', spec: 'Radier em concreto fck 25 MPa, armadura CA-50', norma: 'NBR 6122', padrao: 'Médio', mis: 'MIS sugere fck 30 MPa para solo argiloso identificado' },
        { nome: 'Laje nervurada', spec: 'Laje nervurada bidirecional h=25cm, fck 30 MPa', norma: 'NBR 6118', padrao: 'Alto', mis: null },
      ],
    },
    {
      id: 'hidraulica', label: 'Hidráulica', total: 'R$ 184.000',
      etapas: [
        { nome: 'Água fria', spec: 'Tubulação CPVC 25mm — pressão máxima 150 kPa', norma: 'NBR 5626', padrao: 'Médio', mis: null },
        { nome: 'Esgoto', spec: 'Tubulação PVC série R, DN 100mm', norma: 'NBR 8160', padrao: 'Médio', mis: 'MIS sugere saída de visita em cada ramal' },
      ],
    },
    {
      id: 'eletrica', label: 'Elétrica', total: 'R$ 210.000',
      etapas: [
        { nome: 'Cabos e fios', spec: 'Cabo flexível 750V seção mínima 2,5mm² (iluminação) / 4mm² (tomadas)', norma: 'NBR 5410', padrao: 'Médio', mis: 'MIS alerta: usar 4mm² em todas as tomadas para conformidade' },
        { nome: 'Quadro de distribuição', spec: 'Disjuntor termomagnético, barramento Cu, grau IP40', norma: 'NBR 5410', padrao: 'Alto', mis: null },
      ],
    },
    {
      id: 'acabamento', label: 'Acabamentos', total: 'R$ 340.000',
      etapas: [
        { nome: 'Revestimento piso', spec: 'Porcelanato polido 60×60cm, absorção < 0,1%', norma: 'NBR 13816', padrao: 'Alto', mis: null },
        { nome: 'Pintura interna', spec: 'Tinta acrílica premium, 2 demãos, acabamento fosco', norma: 'NBR 11702', padrao: 'Médio', mis: 'MIS sugere selador antes da primeira demão no bloco cerâmico' },
      ],
    },
  ];

  return (
    <AppShell active="orcamento_qual" onNavigate={onNavigate}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <button onClick={() => onNavigate('analise')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: C.t500, fontSize: 14, fontFamily: 'inherit' }}>
          <Ic.ArrowLeft size={16}/> Análise técnica
        </button>
        <span style={{ color: C.t300 }}>›</span>
        <span style={{ fontSize: 14, color: C.t900, fontWeight: 500 }}>Especificações Qualitativas</span>
      </div>

      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        {/* Lista de disciplinas */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Banner MIS */}
          <Card style={{ padding: '14px 18px', background: C.navActive, border: 'none' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <Ic.Sparkles size={20} color="#fff"/>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>Oráculo MIS — Especificações</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.72)', marginTop: 1 }}>Sugestões baseadas no tipo de projeto e padrão selecionado. Revise e edite antes de aplicar.</div>
              </div>
              <button onClick={() => onNavigate('chat')} style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 8, padding: '6px 14px', fontSize: 12, color: '#fff', cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>Consultar →</button>
            </div>
          </Card>

          {disciplinas.map(d => (
            <Card key={d.id} style={{ padding: 0, overflow: 'hidden' }}>
              {/* Header colapsável */}
              <button onClick={() => setAberto(aberto === d.id ? null : d.id)} style={{ width: '100%', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', borderBottom: aberto === d.id ? `1px solid ${C.border}` : 'none' }}>
                <Ic.Layers size={16} color={C.blue500}/>
                <span style={{ flex: 1, fontSize: 15, fontWeight: 600, color: C.t900, textAlign: 'left' }}>{d.label}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: C.blue600 }}>{d.total}</span>
                {aberto === d.id ? <Ic.ChevronUp size={16} color={C.t400}/> : <Ic.ChevronDown size={16} color={C.t400}/>}
              </button>

              {aberto === d.id && (
                <div style={{ padding: '0 20px 16px' }}>
                  {d.etapas.map((e, i) => (
                    <div key={i} style={{ padding: '16px 0', borderBottom: i < d.etapas.length - 1 ? `1px solid ${C.borderLight}` : 'none' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                        <span style={{ fontSize: 14, fontWeight: 600, color: C.t900 }}>{e.nome}</span>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <Badge color="gray">{e.padrao}</Badge>
                          {e.norma && <Badge color="blue">{e.norma}</Badge>}
                        </div>
                      </div>
                      <div style={{ fontSize: 13, color: C.t700, lineHeight: 1.5, marginBottom: e.mis ? 10 : 0 }}>{e.spec}</div>
                      {e.mis && (
                        <div style={{ background: C.green50, border: `1px solid ${C.green500}30`, borderRadius: 8, padding: '8px 12px', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                          <Ic.Sparkles size={14} color={C.green600} style={{ marginTop: 1 }}/>
                          <div style={{ fontSize: 12, color: C.green600 }}><strong>MIS sugere:</strong> {e.mis}</div>
                        </div>
                      )}
                      <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                        <button style={{ fontSize: 12, color: C.blue600, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 4 }}>
                          <Ic.Edit size={13}/> Editar especificação
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          ))}

          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8 }}>
            <Btn variant="secondary">Gerar memorial descritivo</Btn>
            <Btn variant="primary" onClick={() => onNavigate('orcamento_quant')}>Continuar para orçamento →</Btn>
          </div>
        </div>

        {/* Sidebar resumo */}
        <div style={{ width: 220, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Card style={{ padding: '16px 18px' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.t900, marginBottom: 12 }}>Resumo por Disciplina</div>
            {disciplinas.map(d => (
              <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontSize: 12, color: C.t700 }}>{d.label}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: C.t900 }}>{d.total}</span>
              </div>
            ))}
            <Divider style={{ margin: '10px 0' }}/>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: C.t900 }}>Total</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: C.blue600 }}>R$ 1.554.000</span>
            </div>
          </Card>

          <Card style={{ padding: '16px 18px' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.t900, marginBottom: 10 }}>Alertas de Conformidade</div>
            {[
              { msg: 'Elétrica: seção de tomadas abaixo do recomendado NBR 5410', color: C.orange500 },
              { msg: 'Hidráulica: saída de visita ausente em ramal de esgoto', color: C.orange500 },
            ].map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                <StatusDot color={a.color} size={7} style={{ marginTop: 4 }}/>
                <div style={{ fontSize: 12, color: C.t700, lineHeight: 1.4 }}>{a.msg}</div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </AppShell>
  );
};

// ─── CONTRATO / JURÍDICO ─────────────────────────────────────────────────────
const ContratoScreen = ({ onNavigate }) => {
  const [aba, setAba] = useJ('visualizar');
  const [assinado, setAssinado] = useJ(false);

  const clausulas = [
    { id: '1', titulo: '1. Partes',             body: 'Contratante: Eduardo Nunes, CPF 000.000.000-00, residente na Rua das Flores, 120 — São Paulo/SP. Contratada: M Group Engenharia Ltda, CNPJ 00.000.000/0001-00.' },
    { id: '2', titulo: '2. Objeto e Escopo',    body: 'Execução de reforma residencial completa conforme proposta orçamentária aprovada em 28/05/2025, incluindo todas as disciplinas especificadas no memorial descritivo.' },
    { id: '3', titulo: '3. Valor e Pagamento',  body: 'Valor total: R$ 128.400,00. Parcelas: 30% na assinatura (R$ 38.520,00), 40% na conclusão da estrutura (R$ 51.360,00), 30% na entrega (R$ 38.520,00).' },
    { id: '4', titulo: '4. Prazo de Execução',  body: 'Prazo de 90 dias corridos a partir da data de assinatura. Prorrogável por motivo de força maior devidamente comprovado, mediante aditivo.' },
    { id: '5', titulo: '5. Responsabilidades', body: 'A Contratada é responsável pela qualidade técnica, segurança do trabalho e conformidade às normas ABNT. O Contratante deve garantir acesso ao imóvel nos horários acordados.' },
    { id: '6', titulo: '6. Multas e Penalidades', body: 'Multa de 2% sobre o valor total por descumprimento de prazo, acrescida de 0,1% por dia de atraso. Limitada a 20% do valor contratual.' },
    { id: '7', titulo: '7. Foro',              body: 'Fica eleito o foro da Comarca de São Paulo/SP para dirimir quaisquer questões oriundas deste contrato.' },
  ];

  return (
    <AppShell active="contrato" onNavigate={onNavigate}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <button onClick={() => onNavigate('contratos_geral')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: C.t500, fontSize: 14, fontFamily: 'inherit' }}>
          <Ic.ArrowLeft size={16}/> Contratos gerais
        </button>
        <span style={{ color: C.t300 }}>›</span>
        <span style={{ fontSize: 14, color: C.t900, fontWeight: 500 }}>Contrato</span>
      </div>

      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        {/* Documento */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Status bar */}
          <Card style={{ padding: '14px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: C.t900 }}>Contrato nº 2025-047</span>
                  <Badge color={assinado ? 'green' : 'orange'} dot>{assinado ? 'Assinado' : 'Aguardando assinatura'}</Badge>
                </div>
                <div style={{ fontSize: 13, color: C.t500 }}>Residência Jardins · Eduardo Nunes · Gerado em 02/06/2025 · Validade: 15/06/2025</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <Btn variant="secondary" size="sm" icon={<Ic.Download size={14}/>}>Baixar PDF</Btn>
                <Btn variant="secondary" size="sm" icon={<Ic.Share size={14}/>}>Enviar</Btn>
              </div>
            </div>
          </Card>

          {/* Tabs ação */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 0 }}>
            {[{id:'visualizar',label:'Visualizar'},{id:'editar',label:'Editar cláusulas'}].map(t => {
              const isA = aba === t.id;
              return (
                <button key={t.id} className={`mis-select-btn${isA ? ' active' : ''}`} aria-pressed={isA} onClick={() => setAba(t.id)} style={{ padding: '7px 16px', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer', border: 'none', fontFamily: 'inherit', background: isA ? C.t900 : 'transparent', color: isA ? '#fff' : C.t500, transition: 'all 0.15s' }}>{t.label}</button>
              );
            })}
          </div>

          {/* Cláusulas */}
          <Card style={{ padding: '28px 32px' }}>
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <div style={{ fontSize: 11, color: C.t400, letterSpacing: 0.5, marginBottom: 6 }}>CONTRATO DE PRESTAÇÃO DE SERVIÇOS</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: C.t900 }}>M Group Engenharia Ltda</div>
              <div style={{ fontSize: 13, color: C.t500, marginTop: 4 }}>Contrato nº 2025-047 · São Paulo, 02 de junho de 2025</div>
            </div>

            {clausulas.map((cl, i) => (
              <div key={cl.id} style={{ marginBottom: 20, paddingBottom: 20, borderBottom: i < clausulas.length - 1 ? `1px solid ${C.borderLight}` : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.t900, marginBottom: 8 }}>{cl.titulo}</div>
                  {aba === 'editar' && (
                    <button style={{ fontSize: 12, color: C.blue600, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Ic.Edit size={13}/> Editar
                    </button>
                  )}
                </div>
                <div style={{ fontSize: 13, color: C.t700, lineHeight: 1.7 }}>{cl.body}</div>
              </div>
            ))}

            {/* Assinatura */}
            {!assinado ? (
              <div style={{ borderTop: `2px solid ${C.border}`, paddingTop: 28, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                <div style={{ fontSize: 14, color: C.t700, textAlign: 'center' }}>Ao assinar, você concorda com todos os termos acima.</div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button style={{ padding: '5px 14px', borderRadius: 8, background: 'none', border: `1.5px solid ${C.border}`, fontSize: 13, color: C.t500, cursor: 'pointer', fontFamily: 'inherit' }}>Consultar Oráculo</button>
                  <button onClick={() => setAssinado(true)} style={{ padding: '12px 32px', borderRadius: 24, background: C.navActive, border: `1px solid ${C.navActive}`, color: '#fff', fontSize: 15, fontWeight: 650, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 10px 22px rgba(2,3,59,.22)' }}>
                    ✎ Assinar digitalmente
                  </button>
                </div>
                <div style={{ fontSize: 12, color: C.t400 }}>Assinatura eletrônica com validade jurídica · LGPD-compliant</div>
              </div>
            ) : (
              <div style={{ borderTop: `2px solid ${C.green500}`, paddingTop: 24, textAlign: 'center' }}>
                <div style={{ width: 52, height: 52, background: C.green100, borderRadius: 26, margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Ic.Check size={24} color={C.green600}/>
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, color: C.green600 }}>Contrato assinado com sucesso</div>
                <div style={{ fontSize: 13, color: C.t500, marginTop: 4 }}>02/06/2025 às 14:32 · IP 189.x.x.x · São Paulo/SP</div>
                <button onClick={() => onNavigate('execucao')} style={{ marginTop: 14, padding: '10px 24px', borderRadius: 20, background: C.navActive, border: 'none', color: '#fff', fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
                  Acompanhar obra →
                </button>
              </div>
            )}
          </Card>
        </div>

        {/* Sidebar */}
        <div style={{ width: 220, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Card style={{ padding: '16px 18px' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.t900, marginBottom: 12 }}>Partes do Contrato</div>
            {[
              { label: 'Contratante', name: 'Eduardo Nunes', role: 'Cliente' },
              { label: 'Contratada',  name: 'M Group Eng.', role: 'Executora' },
            ].map(p => (
              <div key={p.label} style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 11, color: C.t400, marginBottom: 4 }}>{p.label.toUpperCase()}</div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <Avatar name={p.name} size={28}/>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: C.t900 }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: C.t500 }}>{p.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </Card>

          <Card style={{ padding: '16px 18px' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.t900, marginBottom: 12 }}>Resumo Financeiro</div>
            {[['Valor total', 'R$ 128.400'], ['1ª Parcela (30%)', 'R$ 38.520'], ['2ª Parcela (40%)', 'R$ 51.360'], ['3ª Parcela (30%)', 'R$ 38.520']].map(([k,v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 12, color: C.t500 }}>{k}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: C.t900 }}>{v}</span>
              </div>
            ))}
          </Card>

          <Card style={{ padding: '16px 18px' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.t900, marginBottom: 10 }}>Ajuda do Oráculo</div>
            <div style={{ fontSize: 12, color: C.t500, lineHeight: 1.5, marginBottom: 10 }}>Não entendeu alguma cláusula? Pergunte ao Oráculo em linguagem simples.</div>
            <Btn variant="green" size="sm" icon={<Ic.Sparkles size={14}/>} onClick={() => onNavigate('chat')} style={{ width: '100%', justifyContent: 'center' }}>Consultar Oráculo</Btn>
          </Card>
        </div>
      </div>
    </AppShell>
  );
};

Object.assign(window, { OrcamentoQualScreen, ContratoScreen });

// mis-extra.jsx — Resolver Problema, Marketplace, Fornecedor, Cotações, Pedidos, Medições, Avaliações

const { useState: useX } = React;

// ─── RESOLVER PROBLEMA ESPECÍFICO ────────────────────────────────────────────
const ResolverProblemaScreen = ({ onNavigate }) => {
  const [query, setQuery]     = useX('');
  const [tag, setTag]         = useX(null);
  const [fase, setFase]       = useX('busca'); // busca | diagnostico

  const tags = ['Vazamento','Rachadura','Elétrica','Infiltração','Porta/Janela','Pintura','Piso','Outro'];

  const diag = {
    title: 'Diagnóstico: Infiltração em parede',
    severidade: 'Moderado',
    sevColor: C.orange600,
