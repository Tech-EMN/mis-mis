/* === PENDENCIAS === */

const PendenciasScreen = ({ onNavigate }) => {
  const project = readActiveProject() || DEFAULT_PROJECT;
  const [filtro, setFiltro] = useOp('todas');
  const [view, setView] = useOp('Lista');

  const pendencias = [
    { id:1, tarefa:'Validar entrega de concreto',              obra:'Residencial Aurora',  obraColor:C.green500,  prio:'Crítica', pB:'red',    resp:'Carlos Mendes',  role:'Suprimentos',    date:'Hoje',      ontime:false, pct:20 },
    { id:2, tarefa:'Revisar cronograma da etapa elétrica',     obra:'Torre Central',       obraColor:C.blue500,   prio:'Alta',    pB:'blue',   resp:'Ricardo Alves',  role:'Planejamento',   date:'Hoje',      ontime:true,  pct:60 },
    { id:3, tarefa:'Solicitar documentação técnica pendente',  obra:'Complexo Vila Verde', obraColor:C.purple600, prio:'Média',   pB:'orange', resp:'Fernanda Rocha', role:'Documentação',   date:'Amanhã',    ontime:true,  pct:20 },
    { id:4, tarefa:'Atualizar medição físico-financeira',      obra:'Edifício Horizonte',  obraColor:C.orange500, prio:'Média',   pB:'orange', resp:'Mariana Lopes',  role:'Financeiro',     date:'2 dias',    ontime:true,  pct:80 },
    { id:5, tarefa:'Confirmar agenda do fornecedor de...',     obra:'Edifício Horizonte',  obraColor:C.orange500, prio:'Alta',    pB:'blue',   resp:'Patrícia Gomes', role:'Fornecedor',     date:'Hoje',      ontime:true,  pct:20 },
    { id:6, tarefa:'Regularizar estoque de argamassa',         obra:'Residencial Aurora',  obraColor:C.green500,  prio:'Média',   pB:'orange', resp:'João Ferreira',  role:'Suprimentos',   date:'Esta semana',ontime:true, pct:20 },
    { id:7, tarefa:'Validar presença da equipe de acab...',    obra:'Edifício Horizonte',  obraColor:C.orange500, prio:'Média',   pB:'orange', resp:'Mariana Lopes',  role:'Mão de obra',    date:'Concluído', ontime:true,  pct:100 },
    { id:8, tarefa:'Revisar impacto do atraso hospitalar',     obra:'Hospital São Lucas',  obraColor:C.red500,    prio:'Crítica', pB:'red',    resp:'João Ferreira',  role:'Cronograma',     date:'Hoje',      ontime:false, pct:60 },
  ].map(item => ({ ...item, obra: project.name }));

  const filtradas = filtro === 'todas' ? pendencias : pendencias.filter(p => {
    if (filtro === 'pendentes') return p.pct < 100 && p.pct < 80;
    if (filtro === 'andamento') return p.pct >= 20 && p.pct < 100;
    if (filtro === 'revisao')   return p.prio === 'Crítica';
    if (filtro === 'concluidas')return p.pct === 100;
    return true;
  });

  return (
    <AppShell active="pendencias" onNavigate={onNavigate}>
      <SectionHeader title="Pendências" subtitle={<span>Controle tarefas <span style={{ color: C.orange600 }}>abertas</span>, responsáveis, prazos e bloqueios de {project.name}.</span>}
        action={<Btn onClick={() => window.dispatchEvent(new CustomEvent('mis:action'))} variant="primary" size="sm" icon={<Ic.Plus size={14}/>}>Nova pendência</Btn>}/>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 20 }}>
        {[
          { label:'Total de pendências', value:'8', sub:<Badge color="gray">{project.name}</Badge> },
          { label:'Pendentes',           value:'4', sub:<Badge color="orange">Aguardando ação</Badge> },
          { label:'Críticas',            value:'2', sub:<Badge color="red">Alta urgência</Badge> },
          { label:'Concluídas',          value:'1', sub:<Badge color="green">Hoje / recentes</Badge> },
        ].map(k => (
          <Card key={k.label} style={{ padding: '18px 20px' }}>
            <div style={{ fontSize: 13, color: C.t500, marginBottom: 8 }}>{k.label}</div>
            <div style={{ fontSize: 36, fontWeight: 700, color: C.t900, lineHeight: 1, marginBottom: 10 }}>{k.value}</div>
            {k.sub}
          </Card>
        ))}
      </div>

      {/* Search + filter */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 18 }}>
        <div style={{ display: 'flex', flex: '0 0 340px', alignItems: 'center', gap: 8, background: '#fff', border: `1.5px solid ${C.border}`, borderRadius: 10, padding: '9px 14px' }}>
          <Ic.Search size={15} color={C.t400}/>
          <input placeholder="Buscar por tarefa, obra, responsável ou categoria..." style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14, color: C.t900, fontFamily: 'inherit', background: 'transparent' }}/>
        </div>
        <button style={{ background: 'none', border: `1.5px solid ${C.border}`, borderRadius: 10, padding: '9px 12px', cursor: 'pointer', display: 'flex', color: C.t500 }}><Ic.Filter size={15}/></button>
        <TabBar tabs={[{id:'todas',label:'Todas'},{id:'pendentes',label:'Pendentes'},{id:'andamento',label:'Em andamento'},{id:'revisao',label:'Em revisão'},{id:'concluidas',label:'Concluídas'}]} active={filtro} onChange={setFiltro}/>
        <div style={{ marginLeft: 'auto', display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
          {['Lista','Kanban'].map(v => <button key={v} className={`mis-select-btn${view === v ? ' active' : ''}`} aria-pressed={view === v} onClick={() => setView(v)} style={{ padding: '6px 12px', background: view===v?C.blue600:'#fff', border:'none', cursor:'pointer', fontSize:12, color:view===v?'#fff':C.t500, fontFamily:'inherit', fontWeight:600 }}>{v}</button>)}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        {/* List */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.t700, marginBottom: 12 }}>{view === 'Kanban' ? 'Kanban de pendências' : 'Lista de pendências'} <span style={{ color: C.t400, fontWeight: 400 }}>· {filtradas.length} pendências encontradas</span></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {filtradas.map(p => (
              <Card key={p.id} style={{ padding: '14px 20px' }}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                  {/* Checkbox */}
                  <div style={{ width: 22, height: 22, borderRadius: 11, border: `2px solid ${p.pct===100?C.green500:C.border}`, background: p.pct===100?C.green500:'transparent', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, cursor:'pointer' }}>
                    {p.pct===100 && <Ic.Check size={12} color="#fff"/>}
                  </div>
                  {/* Task + obra */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 500, color: p.pct===100?C.t400:C.t900, textDecoration: p.pct===100?'line-through':'none' }}>{p.tarefa}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
                      <StatusDot color={p.obraColor} size={7}/>
                      <span style={{ fontSize: 12, color: C.t500 }}>{p.obra}</span>
                    </div>
                  </div>
                  {/* Priority */}
                  <Badge color={p.pB} style={{ flexShrink: 0 }}>{p.prio}</Badge>
                  {/* Avatar + name + role */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0, width: 160 }}>
                    <Avatar name={p.resp} size={32}/>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: C.t900, whiteSpace: 'nowrap' }}>{p.resp}</div>
                      <div style={{ fontSize: 11, color: C.t500 }}>{p.role}</div>
                    </div>
                  </div>
                  {/* Date + status */}
                  <div style={{ flexShrink: 0, width: 90, textAlign: 'right' }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: p.ontime ? C.t700 : C.orange600 }}>{p.date}</div>
                    <div style={{ fontSize: 11, color: p.ontime ? C.t400 : C.orange600 }}>{p.ontime ? 'no prazo' : 'ação necessária'}</div>
                  </div>
                  {/* Progress bar + % */}
                  <div style={{ flexShrink: 0, width: 100, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <ProgressBar value={p.pct} color={C.blue500} height={4} style={{ flex: 1 }}/>
                    <span style={{ fontSize: 12, color: C.t500, width: 32, textAlign: 'right' }}>{p.pct}%</span>
                  </div>
                  {/* More */}
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.t400, padding: 4, flexShrink: 0 }}><Ic.MoreH size={16}/></button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ width: 220, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Card style={{ padding: '16px 18px' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.t900, marginBottom: 4 }}>Resumo operacional</div>
            <div style={{ fontSize: 12, color: C.t500, marginBottom: 14 }}>Pendências que exigem acompanhamento.</div>
            {[
              { n:'4 urgentes hoje',  d:'Tarefas críticas ou de alta prioridade com vencimento imediato.', dot:C.red500 },
              { n:'2 críticas',       d:'Devem ser tratadas antes das demais pendências.',                dot:C.orange500 },
              { n:'7 abertas',        d:'Ainda não foram concluídas pela operação.',                      dot:C.blue500 },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
                <StatusDot color={item.dot} size={8} style={{ marginTop: 4, flexShrink: 0 }}/>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.t900 }}>{item.n}</div>
                  <div style={{ fontSize: 11, color: C.t500, lineHeight: 1.4 }}>{item.d}</div>
                </div>
              </div>
            ))}
          </Card>
          <Card style={{ padding: '16px 18px' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.t900, marginBottom: 12 }}>Prioridade</div>
            {[
              { nome:'Validar entrega de concreto',  obra:'Residencial Aurora', color:C.red500 },
              { nome:'Revisar impacto do atraso...', obra:'Hospital São Lucas',  color:C.orange500 },
            ].map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10 }}>
                <Ic.AlertTriangle size={16} color={p.color} style={{ flexShrink:0, marginTop:1 }}/>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: C.t900 }}>{p.nome}</div>
                  <div style={{ fontSize: 11, color: C.t500 }}>{p.obra}</div>
                </div>
                <span style={{ marginLeft:'auto', fontSize:11, color:C.t400, whiteSpace:'nowrap' }}>Hoje</span>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </AppShell>
  );
};

// ─── ALERTAS ──────────────────────────────────────────────────────────────────
const AlertasScreen = ({ onNavigate }) => {
  const project = readActiveProject() || DEFAULT_PROJECT;
  const [filtro, setFiltro] = useOp('todos');
  const [periodo, setPeriodo] = useOp('tudo');
  const [removedAlerts, setRemovedAlerts] = useOp([]);

  const alertas = [
    { tipo:'critico', icon:'red',    title:'Atraso crítico na entrega de concreto',   novo:true,  badge:'Crítico',    descricao:'A entrega programada para hoje às 08h não foi confirmada pelo fornecedor. A etapa de concretagem pode impactar o cronograma da obra.', obra:'Residencial Aurora', loc:'Campinas, SP', resp:'Carlos Mendes', data:'Hoje', tags:['Suprimentos'], lido:false },
    { tipo:'atencao', icon:'orange', title:'Equipe abaixo do previsto no canteiro',   novo:true,  badge:'Atenção',    descricao:'A obra registrou presença inferior ao planejado para a frente de acabamento. Pode haver impacto na produtividade diária.', obra:'Edifício Horizonte', loc:'São Paulo, SP', resp:'Mariana Lopes', data:'Hoje', tags:['Mão de obra'], lido:false },
    { tipo:'atencao', icon:'orange', title:'Pendência documental sem atualização',    novo:false, badge:'Atenção',    descricao:'O documento de aprovação técnica permanece sem atualização há mais de 5 dias. Recomenda-se acionar o responsável.', obra:'Complexo Vila Verde', loc:'Jundiaí, SP', resp:'Fernanda Rocha', data:'Amanhã', tags:['Documentação'], lido:true },
    { tipo:'info',    icon:'blue',   title:'Consumo de material acima da média',      novo:false, badge:'Informativo', descricao:'O consumo de argamassa está 18% acima da média prevista para o estágio atual da obra.', obra:'Residencial Aurora', loc:'Campinas, SP', resp:'João Ferreira', data:'Esta semana', tags:['Suprimentos'], lido:true },
    { tipo:'critico', icon:'red',    title:'Risco de conflito entre etapas',          novo:true,  badge:'Crítico',    descricao:'A instalação elétrica foi reagendada para o mesmo período da execução de forro. É necessário revisar a sequência operacional.', obra:'Torre Central', loc:'Santo André, SP', resp:'Ricardo Alves', data:'Hoje', tags:['Planejamento'], lido:false },
    { tipo:'atencao', icon:'orange', title:'Fornecedor sem confirmação de agenda',    novo:false, badge:'Atenção',    descricao:'O fornecedor de esquadrias ainda não confirmou a data de medição técnica. A indefinição pode afetar o prazo de instalação.', obra:'Edifício Horizonte', loc:'São Paulo, SP', resp:'Patrícia Gomes', data:'2 dias', tags:['Fornecedor'], lido:true },
    { tipo:'critico', icon:'red',    title:'Risco de segurança identificado',         novo:true,  badge:'Crítico',    descricao:'Vistoria registrou EPIs ausentes em três trabalhadores no canteiro central. Ação imediata recomendada.', obra:'Villa Aurora', loc:'Florianópolis, SC', resp:'Mariana Costa', data:'Hoje', tags:['Segurança'], lido:false },
    { tipo:'atencao', icon:'orange', title:'Orçamento próximo do limite',             novo:false, badge:'Atenção',    descricao:'O projeto utilizou 92% do orçamento aprovado. Recomenda-se revisar os próximos aportes antes da próxima medição.', obra:'Residencial Jardins', loc:'São Paulo, SP', resp:'João Pedro', data:'7 dias', tags:['Financeiro'], lido:true },
  ].map(item => ({ ...item, obra: project.name, loc: project.loc || item.loc }));

  const iconColors = { red: C.red500, orange: C.orange500, blue: C.blue500 };
  const tagColors = { 'Suprimentos':'orange', 'Mão de obra':'blue', 'Documentação':'purple', 'Planejamento':'blue', 'Fornecedor':'gray', 'Segurança':'red', 'Financeiro':'green' };

  const visibleAlerts = alertas.filter(a => !removedAlerts.includes(a.title));
  const filtrados = filtro === 'todos' ? visibleAlerts : visibleAlerts.filter(a => {
    if (filtro === 'criticos')  return a.tipo === 'critico';
    if (filtro === 'atencao')   return a.tipo === 'atencao';
    if (filtro === 'nao_lidos') return !a.lido;
    return true;
  });

  return (
    <AppShell active="alertas" onNavigate={onNavigate}>
      <SectionHeader title="Alertas" subtitle={`Monitore riscos, atrasos e eventos operacionais de ${project.name}.`}
        action={<Btn onClick={() => window.dispatchEvent(new CustomEvent('mis:action'))} variant="primary" size="sm" icon={<Ic.Plus size={14}/>}>Novo alerta</Btn>}/>

      {/* KPIs row */}
      <div style={{ display: 'flex', gap: 14, marginBottom: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, flex: 1 }}>
          {[
            { label:'Total de alertas',    value:'8',  sub:<Badge color="gray">+12%</Badge> },
            { label:'Alertas críticos',    value:'3',  sub:<Badge color="red">Alta prioridade</Badge> },
            { label:'Não lidos',           value:'4',  sub:<Badge color="orange">Exigem análise</Badge> },
          ].map(k => (
            <Card key={k.label} style={{ padding: '18px 20px' }}>
              <div style={{ fontSize: 13, color: C.t500, marginBottom: 8 }}>{k.label}</div>
              <div style={{ fontSize: 36, fontWeight: 700, color: C.t900, lineHeight: 1, marginBottom: 10 }}>{k.value}</div>
              {k.sub}
            </Card>
          ))}
        </div>
        <Card style={{ padding: '18px 20px', width: 180, flexShrink: 0 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
            <Ic.Clock size={16} color={C.orange500}/>
            <span style={{ fontSize: 12, color: C.t500 }}>Tempo médio resolução</span>
          </div>
          <div style={{ fontSize: 34, fontWeight: 800, color: C.t900, lineHeight: 1, marginBottom: 8 }}>3,4h</div>
          <Badge color="green">−22% vs mês passado</Badge>
        </Card>
      </div>

      {/* Search + filter */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 18 }}>
        <div style={{ display: 'flex', flex: '0 0 300px', alignItems: 'center', gap: 8, background: '#fff', border: `1.5px solid ${C.border}`, borderRadius: 10, padding: '9px 14px' }}>
          <Ic.Search size={15} color={C.t400}/>
          <input placeholder="Buscar por alerta, obra ou categoria..." style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14, color: C.t900, fontFamily: 'inherit', background: 'transparent' }}/>
        </div>
        <button style={{ background: 'none', border: `1.5px solid ${C.border}`, borderRadius: 10, padding: '9px 12px', cursor: 'pointer', display: 'flex', color: C.t500 }}><Ic.Filter size={15}/></button>
        <TabBar tabs={[{id:'todos',label:'Todos'},{id:'criticos',label:'Críticos'},{id:'atencao',label:'Atenção'},{id:'nao_lidos',label:'Não lidos'}]} active={filtro} onChange={setFiltro}/>
        <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:6 }}>
          <Ic.Clock size={14} color={C.t400}/>
          {[{id:'tudo',label:'Todo período'},{id:'hoje',label:'Hoje'},{id:'7d',label:'7 dias'},{id:'30d',label:'30 dias'}].map(p => (
            <button key={p.id} className={`mis-select-btn${periodo === p.id ? ' active' : ''}`} aria-pressed={periodo === p.id} onClick={() => setPeriodo(p.id)} style={{ padding:'5px 12px', borderRadius:6, fontSize:12, fontWeight:500, cursor:'pointer', border:'none', fontFamily:'inherit', background: periodo===p.id ? C.t900 : 'transparent', color: periodo===p.id ? '#fff' : C.t500 }}>{p.label}</button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        {/* Alert list */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.t700, marginBottom: 12 }}>Lista de alertas <span style={{ color:C.t400, fontWeight:400 }}>· {filtrados.length} alertas encontrados</span></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filtrados.map((a, i) => (
              <Card key={i} style={{ padding: '16px 20px' }}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  {/* Icon */}
                  <div style={{ width: 38, height: 38, borderRadius: 19, background: `${iconColors[a.icon]}18`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    {a.tipo==='critico' ? <Ic.AlertCircle size={18} color={iconColors[a.icon]}/> : <Ic.AlertTriangle size={18} color={iconColors[a.icon]}/>}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {/* Title row */}
                    <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
                      <span style={{ fontSize:14, fontWeight:600, color:C.t900 }}>{a.title}</span>
                      {a.novo && <span style={{ background:C.blue500, color:'#fff', fontSize:10, fontWeight:700, borderRadius:4, padding:'1px 6px' }}>Novo</span>}
                      <Badge color={a.tipo==='critico'?'red':a.tipo==='atencao'?'orange':'blue'} style={{ marginLeft:'auto' }}>{a.badge}</Badge>
                    </div>
                    {/* Description */}
                    <div style={{ fontSize:13, color:C.t700, lineHeight:1.55, marginBottom:8 }}>{a.descricao}</div>
                    {/* Meta row */}
                    <div style={{ display:'flex', gap:16, marginBottom:8, flexWrap:'wrap' }}>
                      {[
                        [Ic.Building, a.obra],
                        [Ic.MapPin,   a.loc],
                        [Ic.User,     a.resp],
                        [Ic.Calendar, a.data],
                      ].map(([Icon, text], j) => (
                        <span key={j} style={{ display:'flex', alignItems:'center', gap:4, fontSize:12, color:C.t500 }}>
                          <Icon size={13} color={C.t400}/> {text}
                        </span>
                      ))}
                    </div>
                    {/* Tags + actions */}
                    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                      {a.tags.map(t => <Badge key={t} color={tagColors[t]||'gray'}>{t}</Badge>)}
                      <Badge color={a.lido?'gray':'blue'}>{a.lido?'Lido':'Não lido'}</Badge>
                      <div style={{ marginLeft:'auto', display:'flex', gap:8 }}>
                        <button onClick={() => setRemovedAlerts(v => [...v, a.title])} style={{ display:'flex', alignItems:'center', gap:5, padding:'5px 12px', borderRadius:6, background:C.navActive, border:'none', cursor:'pointer', fontSize:12, fontWeight:600, color:'#fff', fontFamily:'inherit', boxShadow:'0 7px 14px rgba(2,3,59,.16)' }}>
                          <Ic.Check size={13}/> Resolver
                        </button>
                        <button onClick={() => setRemovedAlerts(v => [...v, a.title])} style={{ padding:'5px 12px', borderRadius:6, background:'transparent', border:`1px solid ${C.border}`, cursor:'pointer', fontSize:12, color:C.t500, fontFamily:'inherit' }}>Ignorar</button>
                        <button onClick={() => onNavigate('detalhe_projeto')} style={{ padding:'5px 12px', borderRadius:6, background:'transparent', border:`1px solid ${C.border}`, cursor:'pointer', fontSize:12, color:C.t700, fontFamily:'inherit' }}>Ver detalhes</button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ width: 220, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Card style={{ padding: '16px 18px' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.t900, marginBottom: 12 }}>Resumo crítico</div>
            <div style={{ display:'flex', gap:10, marginBottom:12 }}>
              <StatusDot color={C.red500} size={8} style={{ marginTop:4, flexShrink:0 }}/>
              <div>
                <div style={{ fontSize:13, fontWeight:600, color:C.t900 }}>3 alertas críticos</div>
                <div style={{ fontSize:11, color:C.t500, lineHeight:1.4 }}>Devem ser tratados antes do próximo ciclo de obra.</div>
              </div>
            </div>
            <div style={{ display:'flex', gap:10 }}>
              <Ic.Bell size={14} color={C.orange500} style={{ flexShrink:0, marginTop:2 }}/>
              <div>
                <div style={{ fontSize:13, fontWeight:600, color:C.t900 }}>4 não lidos</div>
                <div style={{ fontSize:11, color:C.t500, lineHeight:1.4 }}>Ainda aguardam primeira análise da equipe.</div>
              </div>
            </div>
          </Card>
          <Card style={{ padding: '16px 18px' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.t900, marginBottom: 12 }}>Prioridade</div>
            {[
              { title:'Atraso crítico na entrega d...', obra:'Residencial Aurora' },
              { title:'Risco de conflito entre eta...', obra:'Torre Central' },
              { title:'Risco de segurança identifi...', obra:'Villa Aurora' },
            ].map((p, i) => (
              <div key={i} style={{ display:'flex', gap:10, alignItems:'flex-start', marginBottom:10 }}>
                <Ic.AlertTriangle size={16} color={C.orange500} style={{ flexShrink:0 }}/>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:12, fontWeight:500, color:C.t900 }}>{p.title}</div>
                  <div style={{ fontSize:11, color:C.t500 }}>{p.obra}</div>
                </div>
                <span style={{ fontSize:11, color:C.t400, whiteSpace:'nowrap' }}>Hoje</span>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </AppShell>
  );
};

// ─── ATUALIZAÇÕES ─────────────────────────────────────────────────────────────

Object.assign(window, { PendenciasScreen,AlertasScreen });
