/* === SUPRIMENTOS === */

const SuprimentosScreen = ({ onNavigate }) => {
  const project = readActiveProject() || DEFAULT_PROJECT;
  const [filtro, setFiltro] = useOp('todos');
  const [abertos, setAbertos] = useOp(['active']);

  const toggle = id => setAbertos(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const obrasCatalogo = [
    {
      id: 'aurora', name: 'Residencial Aurora', loc: 'Campinas, SP', img: 'aurora', criticos: 3,
      itens: [
        { dot: C.red500,    nome: 'Cimento CP-II',   qtd: '120 sacos',  status: 'Crítico',  alerta: true,  desc: 'Estoque abaixo do mínimo operacional. Pode impactar a etapa de concretagem prevista para os próximos dias.' },
        { dot: C.green500,  nome: 'Vergalhão CA-50', qtd: '2,4 toneladas', status: 'Normal', alerta: false, desc: 'Quantidade suficiente para a frente estrutural atual. Manter acompanhamento para próxima medição.' },
        { dot: C.orange500, nome: 'Argamassa AC-II', qtd: '85 sacos',   status: 'Atenção', alerta: false, desc: 'Consumo acima do previsto para a etapa atual. Recomenda-se revisar projeção de compra.' },
      ],
    },
    {
      id: 'horizonte', name: 'Edifício Horizonte', loc: 'São Paulo, SP', img: 'horizonte', criticos: 2,
      itens: [
        { dot: C.orange500, nome: 'Porcelanato 90×90',   qtd: '1.200 m²', status: 'Atenção', alerta: false, desc: 'Entrega parcial confirmada. A quantidade atual pode limitar a execução em duas frentes de acabamento.' },
        { dot: C.red500,    nome: 'Cabos elétricos 10mm',qtd: '680 m',    status: 'Crítico', alerta: true,  desc: 'Fornecedor ainda não confirmou agenda de entrega. Existe risco de atraso na etapa elétrica.' },
        { dot: C.green500,  nome: 'Massa corrida',       qtd: '320 barracas', status: 'Normal',  alerta: false, desc: 'Estoque acima do mínimo previsto para a semana. Sem necessidade de nova compra imediata.' },
      ],
    },
    {
      id: 'vilaverde', name: 'Complexo Vila Verde', loc: 'Jundiaí, SP', img: 'vilaverde', criticos: 0,
      itens: [
        { dot: C.green500,  nome: 'Tubulação PVC 100mm', qtd: '430 m',      status: 'Normal',  alerta: false, desc: 'Estoque adequado para as frentes hidráulicas planejadas para a próxima semana.' },
        { dot: C.green500,  nome: 'Blocos cerâmicos',    qtd: '12.000 un.',  status: 'Normal',  alerta: false, desc: 'Material disponível em quantidade suficiente para a etapa atual de alvenaria.' },
        { dot: C.orange500, nome: 'Areia média',          qtd: '18 m³',      status: 'Atenção', alerta: false, desc: 'Estoque próximo do limite mínimo. Entrega prevista para amanhã deve normalizar o volume.' },
      ],
    },
    {
      id: 'torre', name: 'Torre Central', loc: 'Santo André, SP', img: 'torre', criticos: 5,
      itens: [
        { dot: C.red500,    nome: 'Drywall ST',       qtd: '540 placas', status: 'Crítico', alerta: true,  desc: 'Material abaixo do estoque mínimo e sem confirmação de entrega. Pode comprometer avanço de vedação interna.' },
        { dot: C.orange500, nome: 'Perfis metálicos',  qtd: '1.800 m',   status: 'Atenção', alerta: false, desc: 'Quantidade parcialmente suficiente. Necessário acompanhar consumo por frente.' },
        { dot: C.red500,    nome: 'Luminárias LED',   qtd: '240 un.',    status: 'Crítico', alerta: true,  desc: 'Entrega sem confirmação. Risco para etapa de finalização de áreas comuns.' },
      ],
    },
  ];
  const templateIndex = Math.abs(String(project.id || project.name).split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0)) % obrasCatalogo.length;
  const templateObra = obrasCatalogo[templateIndex];
  const obras = [{ ...templateObra, id: 'active', name: project.name, loc: project.loc || 'Local não informado', img: templateObra.img }];

  const itensCriticos = [
    { nome: 'Cimento CP-II',  proj: project.name, data: 'Hoje' },
    { nome: 'Cabos elétricos',proj: project.name, data: 'Hoje' },
    { nome: 'Drywall ST',     proj: project.name,      data: 'Hoje' },
    { nome: 'Luminárias LED', proj: project.name,      data: 'Hoje' },
    { nome: 'Tela soldada',   proj: project.name,       data: 'Aguardando' },
  ];

  const categorias = ['Materiais básicos','Estrutura','Acabamento','Instalações','Hidráulica','Alvenaria','Pintura','Vedação','Pavimentação'];
  const statusColor = { 'Crítico': 'red', 'Atenção': 'orange', 'Normal': 'green' };

  const filtrados = filtro === 'todos' ? obras : obras.filter(o => {
    if (filtro === 'criticos') return o.criticos > 0;
    if (filtro === 'atencao') return o.itens.some(i => i.status === 'Atenção');
    if (filtro === 'normal') return o.itens.every(i => i.status === 'Normal');
    return true;
  });

  return (
    <AppShell active="suprimentos" onNavigate={onNavigate}>
      <SectionHeader title="Suprimentos" subtitle={`Monitore materiais, estoque mínimo, entregas e riscos de abastecimento de ${project.name}.`}
        action={<Btn onClick={() => window.dispatchEvent(new CustomEvent('mis:action'))} variant="primary" size="sm" icon={<Ic.Plus size={14}/>}>Novo pedido</Btn>}/>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 20 }}>
        {[
          { label:'Projeto monitorado', value:'1', sub:<Badge color="blue">{project.name}</Badge> },
          { label:'Itens monitorados', value:String(obras[0].itens.length), sub:<Badge color="green">Projeto selecionado</Badge> },
          { label:'Itens críticos',    value:String(obras[0].criticos), sub:<Badge color="red">Exigem ação</Badge> },
          { label:'Pedidos pendentes', value:'6', sub:<Badge color="orange">Aguardando retorno</Badge> },
        ].map(k => (
          <Card key={k.label} style={{ padding: '18px 20px' }}>
            <div style={{ fontSize: 13, color: C.t500, marginBottom: 8 }}>{k.label}</div>
            <div style={{ fontSize: 36, fontWeight: 700, color: C.t900, lineHeight: 1, marginBottom: 10 }}>{k.value}</div>
            {k.sub}
          </Card>
        ))}
      </div>

      {/* Search + Filter */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 18 }}>
        <div style={{ display: 'flex', flex: 1, alignItems: 'center', gap: 8, background: '#fff', border: `1.5px solid ${C.border}`, borderRadius: 10, padding: '9px 14px' }}>
          <Ic.Search size={15} color={C.t400}/>
          <input placeholder="Buscar por obra, material, fornecedor, categoria ou responsável..." style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14, color: C.t900, fontFamily: 'inherit', background: 'transparent' }}/>
        </div>
        <button style={{ background: 'none', border: `1.5px solid ${C.border}`, borderRadius: 10, padding: '9px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.t700, fontFamily: 'inherit' }}>
          <Ic.Filter size={14}/> Filtrar
        </button>
        <ChipBar chips={[{id:'todos',label:'Todos'},{id:'criticos',label:'Críticos'},{id:'atencao',label:'Atenção'},{id:'normal',label:'Normal'}]} active={filtro} onChange={setFiltro}/>
      </div>

      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        {/* Main */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: C.t700, marginBottom: 14 }}>Controle do projeto</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filtrados.map(o => (
              <Card key={o.id} style={{ padding: 0, overflow: 'hidden' }}>
                {/* Obra header */}
                <button onClick={() => toggle(o.id)} style={{ width: '100%', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', borderBottom: abertos.includes(o.id) ? `1px solid ${C.border}` : 'none' }}>
                  <ObraImg obra={o.img} style={{ width: 44, height: 44, borderRadius: 8, flexShrink: 0 }}/>
                  <div style={{ flex: 1, textAlign: 'left' }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: C.t900 }}>{o.name}</div>
                    <div style={{ fontSize: 12, color: C.t500 }}>{o.loc} · {o.itens.length} itens</div>
                  </div>
                  {o.criticos > 0 && <Badge color="red" dot>{o.criticos} críticos</Badge>}
                  {abertos.includes(o.id) ? <Ic.ChevronUp size={16} color={C.t400}/> : <Ic.ChevronDown size={16} color={C.t400}/>}
                </button>

                {/* Items */}
                {abertos.includes(o.id) && (
                  <div style={{ padding: '4px 0 4px' }}>
                    {o.itens.map((it, i) => (
                      <div key={i} style={{ padding: '12px 18px', borderBottom: i < o.itens.length - 1 ? `1px solid ${C.borderLight}` : 'none' }}>
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 4 }}>
                          <StatusDot color={it.dot} size={9}/>
                          <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: C.t900 }}>{it.nome}</span>
                          <span style={{ fontSize: 13, color: C.t500 }}>{it.qtd}</span>
                          <Badge color={statusColor[it.status]}>{it.status}</Badge>
                          {it.alerta && <Ic.AlertTriangle size={16} color={C.orange500}/>}
                        </div>
                        <div style={{ fontSize: 12, color: C.t500, lineHeight: 1.5, paddingLeft: 19 }}>{it.desc}</div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ width: 240, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Card style={{ padding: '16px 18px' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.t900, marginBottom: 12 }}>Resumo crítico</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <StatusDot color={C.red500} size={8} style={{ marginTop: 4 }}/>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.t900 }}>5 itens críticos</div>
                  <div style={{ fontSize: 12, color: C.t500 }}>Materiais abaixo do mínimo ou sem confirmação de entrega.</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <StatusDot color={C.orange500} size={8} style={{ marginTop: 4 }}/>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.t900 }}>5 em atenção</div>
                  <div style={{ fontSize: 12, color: C.t500 }}>Itens próximos ao limite ou com previsão sensível.</div>
                </div>
              </div>
            </div>
          </Card>

          <Card style={{ padding: '16px 18px' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.t900, marginBottom: 12 }}>Itens críticos</div>
            {itensCriticos.map((ic, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10, paddingBottom: 10, borderBottom: i < itensCriticos.length - 1 ? `1px solid ${C.borderLight}` : 'none' }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: C.t900 }}>{ic.nome}</div>
                  <div style={{ fontSize: 11, color: C.t500 }}>{ic.proj}</div>
                </div>
                <span style={{ fontSize: 11, color: C.t400, whiteSpace: 'nowrap' }}>{ic.data}</span>
              </div>
            ))}
          </Card>

          <Card style={{ padding: '16px 18px' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.t900, marginBottom: 10 }}>Categorias</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {categorias.map(c => (
                <span key={c} style={{ padding: '4px 10px', borderRadius: 20, background: C.blue100, color: C.blue600, fontSize: 11, fontWeight: 500, cursor: 'pointer' }}>{c}</span>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
};

// ─── PENDÊNCIAS ───────────────────────────────────────────────────────────────

Object.assign(window, { SuprimentosScreen });
