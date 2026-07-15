/* === FINANCEIRO CONTRATOS === */

    sevBg: C.orange100,
    descricao: 'Infiltrações em paredes internas geralmente têm origem em falha de impermeabilização ou trinca na argamassa de revestimento externo.',
    acoes: [
      'Identificar o ponto de entrada da água (fissura, junta, caixilho)',
      'Verificar calha e rufos no trecho correspondente',
      'Aplicar manta acrílica ou resina epóxi conforme diagnóstico in loco',
    ],
    profissional: { nome: 'Carlos Henrique', esp: 'Impermeabilização', rating: '4.9', distancia: '2,3 km', disponivel: true },
  };

  return (
    <AppShell active="resolver_problema" onNavigate={onNavigate}>
      <SectionHeader title="Resolver Problema" subtitle="Diagnóstico rápido com apoio do Oráculo MIS"/>

      {fase === 'busca' ? (
        <div style={{ maxWidth: 640, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Campo de busca */}
          <Card style={{ padding: '20px 24px' }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: C.t700, marginBottom: 8 }}>Descreva seu problema em poucas palavras</label>
            <div style={{ display: 'flex', gap: 10 }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, background: C.bg, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: '10px 14px' }}>
                <Ic.Search size={16} color={C.t400}/>
                <input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Ex: água escorrendo pela parede da sala..."
                  style={{ flex: 1, border: 'none', background: 'transparent', fontSize: 14, color: C.t900, outline: 'none', fontFamily: 'inherit' }}
                />
              </div>
              <Btn variant="primary" onClick={() => query || tag ? setFase('diagnostico') : null}>Diagnosticar</Btn>
            </div>

            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 12, color: C.t500, marginBottom: 8 }}>Ou selecione uma categoria:</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {tags.map(t => (
                  <button key={t} className={`mis-select-btn${tag === t ? ' active' : ''}`} aria-pressed={tag === t} onClick={() => { setTag(t); setFase('diagnostico'); }} style={{
                    padding: '5px 14px', borderRadius: 20, fontSize: 13, fontWeight: 500,
                    cursor: 'pointer', fontFamily: 'inherit',
                    border: tag === t ? 'none' : `1.5px solid ${C.border}`,
                    background: tag === t ? C.t900 : C.card,
                    color: tag === t ? '#fff' : C.t700, transition: 'all 0.15s',
                  }}>{t}</button>
                ))}
              </div>
            </div>
          </Card>

          {/* Histórico */}
          <Card style={{ padding: '18px 20px' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.t900, marginBottom: 12 }}>Problemas Recentes</div>
            {[
              { desc: 'Torneira pingando — banheiro social', status: 'Resolvido', color: 'green', data: '14/05/2025' },
              { desc: 'Disjuntor desarmando ao ligar AC', status: 'Em análise', color: 'orange', data: '28/05/2025' },
            ].map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '10px 0', borderBottom: i === 0 ? `1px solid ${C.borderLight}` : 'none' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: C.t900 }}>{p.desc}</div>
                  <div style={{ fontSize: 12, color: C.t500, marginTop: 2 }}>{p.data}</div>
                </div>
                <Badge color={p.color}>{p.status}</Badge>
              </div>
            ))}
          </Card>
        </div>
      ) : (
        <div style={{ maxWidth: 680, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <button onClick={() => setFase('busca')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: C.t500, fontSize: 14, fontFamily: 'inherit', alignSelf: 'flex-start' }}>
            <Ic.ArrowLeft size={16}/> Nova busca
          </button>

          {/* Diagnóstico */}
          <Card style={{ padding: '20px 24px' }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 16 }}>
              <div style={{ width: 44, height: 44, background: 'linear-gradient(135deg,#1C3A2A,#1d4ed8)', borderRadius: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Ic.Sparkles size={20} color="#fff"/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: C.t900, marginBottom: 4 }}>{diag.title}</div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: diag.sevBg, borderRadius: 20, padding: '3px 12px' }}>
                  <StatusDot color={diag.sevColor} size={7}/>
                  <span style={{ fontSize: 12, fontWeight: 600, color: diag.sevColor }}>Severidade {diag.severidade}</span>
                </div>
              </div>
            </div>

            <div style={{ fontSize: 14, color: C.t700, lineHeight: 1.65, marginBottom: 16 }}>{diag.descricao}</div>

            <div style={{ fontSize: 13, fontWeight: 600, color: C.t900, marginBottom: 10 }}>Ações recomendadas</div>
            {diag.acoes.map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                <div style={{ width: 20, height: 20, borderRadius: 10, background: C.blue100, color: C.blue600, fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i+1}</div>
                <div style={{ fontSize: 13, color: C.t700, lineHeight: 1.5 }}>{a}</div>
              </div>
            ))}
          </Card>

          {/* Profissional sugerido */}
          <Card style={{ padding: '18px 20px' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.t900, marginBottom: 12 }}>Profissional Sugerido pelo MIS</div>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <Avatar name={diag.profissional.nome} size={48}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: C.t900 }}>{diag.profissional.nome}</div>
                <div style={{ fontSize: 13, color: C.t500, marginTop: 2 }}>{diag.profissional.esp}</div>
                <div style={{ display: 'flex', gap: 12, marginTop: 5 }}>
                  <span style={{ fontSize: 12, color: C.t500 }}>★ {diag.profissional.rating}</span>
                  <span style={{ fontSize: 12, color: C.t500 }}>📍 {diag.profissional.distancia}</span>
                  {diag.profissional.disponivel && <Badge color="green" dot>Disponível</Badge>}
                </div>
              </div>
              <Btn variant="green" onClick={() => onNavigate('perfil_op')}>Contratar</Btn>
            </div>
          </Card>

          <div style={{ display: 'flex', gap: 10 }}>
            <Btn variant="secondary" icon={<Ic.Sparkles size={14}/>} onClick={() => onNavigate('chat')}>Falar com Oráculo</Btn>
            <Btn variant="outline" onClick={() => onNavigate('orcamento')}>Pedir orçamento completo</Btn>
          </div>
        </div>
      )}
    </AppShell>
  );
};

// ─── MARKETPLACE DE MATERIAIS ─────────────────────────────────────────────────
const MarketplaceScreen = ({ onNavigate }) => {
  const [cat, setCat]    = useX('todos');
  const [busca, setBusca] = useX('');

  const categorias = [
    { id: 'todos', label: 'Todos' },
    { id: 'cimento', label: 'Cimento' },
    { id: 'ceramica', label: 'Cerâmica' },
    { id: 'eletrica', label: 'Elétrica' },
    { id: 'hidraulica', label: 'Hidráulica' },
    { id: 'tintas', label: 'Tintas' },
    { id: 'ferragens', label: 'Ferragens' },
  ];

  const produtos = [
    { id:1, nome:'Cimento CP-II 50kg',        fornecedor:'Material SP',   preco:'R$ 38,90', cat:'cimento',   best:true,  estoq:'Em estoque',  rating:'4.8', dist:'1,2 km' },
    { id:2, nome:'Porcelanato 60×60 Calacatta',fornecedor:'Cerâmica Plus', preco:'R$ 89,90/m²', cat:'ceramica', best:false, estoq:'Em estoque',  rating:'4.7', dist:'3,5 km' },
    { id:3, nome:'Cabo flexível 2,5mm 100m',   fornecedor:'Elétrica Top',  preco:'R$ 124,00', cat:'eletrica',  best:true,  estoq:'Em estoque',  rating:'4.9', dist:'0,8 km' },
    { id:4, nome:'Tubo PVC Esgoto DN100 6m',   fornecedor:'Hidrotec Ltda', preco:'R$ 42,50', cat:'hidraulica', best:false, estoq:'Sob consulta',rating:'4.5', dist:'2,1 km' },
    { id:5, nome:'Tinta Acrílica Prem. 18L',   fornecedor:'Coral Centro',  preco:'R$ 219,00', cat:'tintas',   best:true,  estoq:'Em estoque',  rating:'4.9', dist:'1,8 km' },
    { id:6, nome:'Parafuso Zinco Sextavado 6mm',fornecedor:'Ferragens SA',  preco:'R$ 0,28/un', cat:'ferragens',best:false, estoq:'Em estoque',  rating:'4.6', dist:'4,0 km' },
  ];

  const filtrados = produtos.filter(p =>
    (cat === 'todos' || p.cat === cat) &&
    (busca === '' || p.nome.toLowerCase().includes(busca.toLowerCase()))
  );

  return (
    <AppShell active="marketplace" onNavigate={onNavigate}>
      <SectionHeader title="Marketplace" subtitle="Materiais e insumos para sua obra" action={<Btn variant="secondary" size="sm" icon={<Ic.MapPin size={14}/>}>São Paulo, SP</Btn>}/>

      {/* Busca */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: `1.5px solid ${C.border}`, borderRadius: 10, padding: '9px 14px', marginBottom: 16 }}>
        <Ic.Search size={16} color={C.t400}/>
        <input value={busca} onChange={e => setBusca(e.target.value)} placeholder="Buscar materiais, insumos..." style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14, color: C.t900, fontFamily: 'inherit', background: 'transparent' }}/>
        <Ic.Filter size={16} color={C.t400}/>
      </div>

      {/* Categorias */}
      <ChipBar chips={categorias} active={cat} onChange={setCat} style={{ marginBottom: 20 }}/>

      {/* Grid de produtos */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
        {filtrados.map(p => (
          <Card key={p.id} style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }}>
            <ImgPlaceholder label={p.cat} style={{ height: 120, borderRadius: 0 }}/>
            <div style={{ padding: '14px 16px' }}>
              {p.best && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 6 }}>
                  <Ic.Sparkles size={12} color={C.green600}/>
                  <span style={{ fontSize: 11, fontWeight: 600, color: C.green600 }}>Melhor custo-benefício</span>
                </div>
              )}
              <div style={{ fontSize: 14, fontWeight: 600, color: C.t900, marginBottom: 4 }}>{p.nome}</div>
              <div style={{ fontSize: 12, color: C.t500, marginBottom: 8 }}>{p.fornecedor}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: C.blue600, marginBottom: 8 }}>{p.preco}</div>
              <div style={{ display: 'flex', gap: 10, fontSize: 12, color: C.t500, marginBottom: 12 }}>
                <span>★ {p.rating}</span>
                <span>📍 {p.dist}</span>
                <span style={{ color: p.estoq === 'Em estoque' ? C.green600 : C.orange600 }}>{p.estoq}</span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <Btn variant="primary" size="sm" style={{ flex: 1, justifyContent: 'center' }}>Adicionar</Btn>
                <Btn variant="secondary" size="sm">Cotar</Btn>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filtrados.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 24px', color: C.t400 }}>
          <Ic.Search size={32} color={C.t300}/>
          <div style={{ marginTop: 12, fontSize: 14 }}>Nenhum produto encontrado</div>
        </div>
      )}
    </AppShell>
  );
};

// ─── PAINEL FORNECEDOR ────────────────────────────────────────────────────────
const FornecedorScreen = ({ onNavigate }) => {
  const areas = [
    { id: 'cotacoes',  icon: Ic.FileText,  label: 'Cotações Recebidas', count: '3 aguardando resposta', badge: 3, bg: C.blue100,   ic: C.blue600   },
    { id: 'pedidos',   icon: Ic.Package,   label: 'Pedidos em Andamento',count: '2 pedidos confirmados', badge: 0, bg: C.green100,  ic: C.green600  },
    { id: 'catalogo',  icon: Ic.Grid,      label: 'Meu Catálogo',        count: '47 produtos cadastrados',badge: 0, bg: C.purple100, ic: C.purple600 },
    { id: 'financeiro',icon: Ic.Dollar,    label: 'Financeiro',           count: 'R$ 42k a receber',      badge: 0, bg: C.orange100, ic: C.orange600 },
  ];

  return (
    <AppShell active="fornecedor" onNavigate={onNavigate}>
      <SectionHeader title="Painel Fornecedor" subtitle="Metálica SP — Materiais e Estruturas Metálicas"/>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 20 }}>
        {[
          { label: 'Cotações Recebidas', value: '3',        icon: <Ic.FileText size={22} color={C.t300}/>, sub: <Badge color="blue">Aguardando</Badge>  },
          { label: 'Pedidos Confirmados',value: '2',        icon: <Ic.Package  size={22} color={C.t300}/>, sub: <Badge color="green">Ativo</Badge>       },
          { label: 'Faturamento Mensal', value: 'R$ 89k',   icon: <Ic.Dollar   size={22} color={C.t300}/>, sub: <span style={{fontSize:12,color:C.green600}}>+12% vs. mai</span> },
          { label: 'Avaliação Média',    value: '4.8 ★',    icon: <Ic.Star     size={22} color={C.t300}/>, sub: <span style={{fontSize:12,color:C.t500}}>32 avaliações</span>  },
        ].map(k => (
          <StatCard key={k.label} label={k.label} value={k.value} icon={k.icon} sub={k.sub}/>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Hub de navegação */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {areas.map(a => (
              <Card key={a.id} onClick={() => a.id !== 'catalogo' ? onNavigate(a.id) : null} style={{ padding: '20px', cursor: 'pointer' }}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: a.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <a.icon size={22} color={a.ic}/>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: C.t900 }}>{a.label}</div>
                    <div style={{ fontSize: 12, color: C.t500, marginTop: 2 }}>{a.count}</div>
                  </div>
                  {a.badge > 0 && <div style={{ minWidth: 22, height: 22, borderRadius: 11, background: C.red500, color: '#fff', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 6px' }}>{a.badge}</div>}
                  <Ic.ChevronRight size={16} color={C.t300}/>
                </div>
              </Card>
            ))}
          </div>

          {/* Cotações recentes */}
          <Card style={{ padding: '20px 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ fontSize: 15, fontWeight: 600, color: C.t900 }}>Cotações Recentes</span>
              <Btn variant="ghost" size="sm" onClick={() => onNavigate('cotacoes')}>Ver todas →</Btn>
            </div>
            {[
              { proj: 'Edifício Nórdica', item: 'Aço CA-50 — 12 ton', prazo: 'Resp. até 06/06', valor: 'R$ ~28.000', status: 'Aguardando', color: 'orange' },
              { proj: 'Torre Central',    item: 'Perfis metálicos I300', prazo: 'Resp. até 08/06', valor: 'R$ ~14.500', status: 'Aguardando', color: 'orange' },
              { proj: 'Aurora Res.',      item: 'Tela soldada Q92',       prazo: 'Encerrada',       valor: 'R$ 8.200',  status: 'Fechada',    color: 'gray'   },
            ].map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px 0', borderBottom: i < 2 ? `1px solid ${C.borderLight}` : 'none' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: C.t900 }}>{c.proj}</div>
                  <div style={{ fontSize: 12, color: C.t500 }}>{c.item}</div>
                  <div style={{ fontSize: 11, color: C.t400, marginTop: 2 }}>{c.prazo}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.t900 }}>{c.valor}</div>
                  <Badge color={c.color} style={{ marginTop: 4 }}>{c.status}</Badge>
                </div>
                {c.status === 'Aguardando' && <Btn variant="primary" size="sm" onClick={() => onNavigate('cotacoes')}>Responder</Btn>}
              </div>
            ))}
          </Card>
        </div>

        <div style={{ width: 220, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Card style={{ padding: '16px 18px' }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14 }}>
              <Avatar name="Metálica SP" size={44}/>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.t900 }}>Metálica SP</div>
                <div style={{ fontSize: 12, color: C.t500 }}>Fornecedor verificado</div>
                <Badge color="green" style={{ marginTop: 4 }}>✓ MIS Parceiro</Badge>
              </div>
            </div>
            <div style={{ fontSize: 12, color: C.t500, lineHeight: 1.5 }}>Especialidade: Estruturas Metálicas, Aço Estrutural, Perfis.</div>
          </Card>

          <Card style={{ padding: '16px 18px' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.t900, marginBottom: 12 }}>Performance</div>
            {[
              ['Taxa de resposta', '96%'],
              ['Entregas no prazo', '91%'],
              ['Cotações ganhas', '68%'],
              ['Clientes recorrentes', '14'],
            ].map(([k,v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 12, color: C.t500 }}>{k}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: C.t900 }}>{v}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </AppShell>
  );
};

// ─── COTAÇÕES ─────────────────────────────────────────────────────────────────
const CotacoesScreen = ({ onNavigate }) => {
  const [aba, setAba] = useX('abertas');

  const cotacoes = [
    { id: 'C001', grupo: 'Estrutura Metálica — Nórdica',     criada: '01/06', prazo: '06/06', respostas: 2, total: 3, status: 'aberta'   },
    { id: 'C002', grupo: 'Revestimento cerâmico — Aurora',    criada: '28/05', prazo: '04/06', respostas: 3, total: 3, status: 'respondida'},
    { id: 'C003', grupo: 'Material elétrico — Torre Central', criada: '25/05', prazo: '02/06', respostas: 2, total: 2, status: 'fechada'  },
  ];

  const comparativo = [
    { fornecedor: 'Metálica SP',  aco: 'R$ 2.480/t', perf: 'R$ 320/un', prazo: '7 dias',  pgto: '30 dias', total: 'R$ 28.240', mis: true  },
    { fornecedor: 'AçoMais',      aco: 'R$ 2.610/t', perf: 'R$ 340/un', prazo: '10 dias', pgto: '15 dias', total: 'R$ 29.700', mis: false },
    { fornecedor: 'Estrutural Bom',aco: 'R$ 2.450/t', perf: 'R$ 345/un', prazo: '14 dias', pgto: '30 dias', total: 'R$ 28.900', mis: false },
  ];

  const statusColor = { aberta: 'orange', respondida: 'blue', fechada: 'green' };

  return (
    <AppShell active="cotacoes" onNavigate={onNavigate}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <button onClick={() => onNavigate('suprimentos')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: C.t500, fontSize: 14, fontFamily: 'inherit' }}>
          <Ic.ArrowLeft size={16}/> Suprimentos
        </button>
        <span style={{ color: C.t300 }}>›</span>
        <span style={{ fontSize: 14, color: C.t900, fontWeight: 500 }}>Cotações</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <TabBar tabs={[{id:'abertas',label:'Em aberto'},{id:'respondidas',label:'Respondidas'},{id:'fechadas',label:'Fechadas'}]} active={aba} onChange={setAba}/>
        <Btn variant="primary" size="sm" icon={<Ic.Plus size={14}/>}>Nova cotação</Btn>
      </div>

      {/* Lista de cotações */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
        {cotacoes.map(c => (
          <Card key={c.id} style={{ padding: '18px 20px' }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontSize: 11, color: C.t400, fontWeight: 600 }}>{c.id}</span>
                  <Badge color={statusColor[c.status]}>{c.status === 'aberta' ? 'Aguardando' : c.status === 'respondida' ? 'Respondida' : 'Fechada'}</Badge>
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.t900 }}>{c.grupo}</div>
                <div style={{ fontSize: 12, color: C.t500, marginTop: 4 }}>Criada: {c.criada} · Prazo: {c.prazo} · {c.respostas}/{c.total} fornecedores responderam</div>
              </div>
              {c.status === 'respondida' && (
                <Btn variant="primary" size="sm">Comparar →</Btn>
              )}
              {c.status === 'aberta' && (
                <Btn variant="secondary" size="sm">Ver detalhes</Btn>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Comparativo */}
      <Card style={{ padding: '20px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: C.t900 }}>Comparativo — C002: Revestimento cerâmico</span>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 12, color: C.t500 }}>
            <Ic.Sparkles size={14} color={C.green600}/>
            <span style={{ color: C.green600 }}>MIS indica melhor custo-benefício</span>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                {['Fornecedor','Aço CA-50/t','Perf. I300/un','Prazo','Pagamento','Total',''].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontSize: 12, fontWeight: 600, color: C.t500 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparativo.map((r, i) => (
                <tr key={i} style={{ background: r.mis ? C.green50 : 'transparent', borderBottom: `1px solid ${C.borderLight}` }}>
                  <td style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      {r.mis && <Ic.Sparkles size={13} color={C.green600}/>}
                      <span style={{ fontWeight: r.mis ? 600 : 400, color: C.t900 }}>{r.fornecedor}</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px', color: C.t700 }}>{r.aco}</td>
                  <td style={{ padding: '12px', color: C.t700 }}>{r.perf}</td>
                  <td style={{ padding: '12px', color: C.t700 }}>{r.prazo}</td>
