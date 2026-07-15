/* === PROJECTS DETAIL === */

    { id: 1, name: 'Concretagem laje L1', etapa: 'Estrutura', resp: 'Carlos Mendes', status: 'andamento', pct: 60, hora: '08:00', bloq: false },
    { id: 2, name: 'Instalação tubulação PVC', etapa: 'Hidráulica', resp: 'João Ferreira', status: 'afazer', pct: 0, hora: '10:30', bloq: false },
    { id: 3, name: 'Aplicação massa corrida', etapa: 'Acabamento', resp: 'Ana Lima', status: 'concluida', pct: 100, hora: '07:00', bloq: false },
    { id: 4, name: 'Passagem eletroduto 3/4"', etapa: 'Elétrica', resp: 'Ricardo Alves', status: 'bloqueada', pct: 20, hora: '09:15', bloq: true },
    { id: 5, name: 'Alvenaria bloco cerâmico', etapa: 'Vedações', resp: 'Rafael Souza', status: 'andamento', pct: 45, hora: '07:30', bloq: false },
    { id: 6, name: 'Impermeabilização deck', etapa: 'Hidráulica', resp: 'Mariana Costa', status: 'afazer', pct: 0, hora: '13:00', bloq: false },
  ];
  const statusConfig = {
    afazer: { label: 'A fazer', bg: C.borderLight, color: C.t700 },
    andamento: { label: 'Em andamento', bg: C.blue100, color: C.blue600 },
    concluida: { label: 'Concluída', bg: C.green100, color: C.green600 },
    bloqueada: { label: 'Bloqueada', bg: C.red100, color: C.red600 },
  };
  const filtered = atividades.filter(a => filterTab === 'todas' || a.status === filterTab);
  const concluidas = atividades.filter(a => a.status === 'concluida').length;

  return (
    <AppShell active="execucao" onNavigate={onNavigate}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
            <button onClick={() => onNavigate('detalhe_projeto')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: C.t500, fontSize: 14, fontFamily: 'inherit' }}>
              <Ic.ArrowLeft size={16} /> {project.name}
            </button>
            <span style={{ color: C.t300 }}>/</span>
            <span style={{ fontSize: 14, color: C.t900, fontWeight: 500 }}>Execução</span>
          </div>
          <div style={{ display: 'flex', gap: 12, fontSize: 13, color: C.t500 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Ic.Calendar size={14} color={C.t400} /> 02 Jun 2025</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><StatusDot color={C.green500} size={7} /> Canteiro ativo</span>
          </div>
        </div>
        <Btn icon={<Ic.Camera size={14} />}>Adicionar foto</Btn>
      </div>

      {/* Status do dia */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 14, marginBottom: 20 }}>
        {[
          { label: 'Previstas hoje', value: atividades.length, color: C.t900 },
          { label: 'Em andamento', value: atividades.filter(a => a.status === 'andamento').length, color: C.blue600 },
          { label: 'Concluídas', value: concluidas, color: C.green600 },
          { label: 'Bloqueadas', value: atividades.filter(a => a.status === 'bloqueada').length, color: C.red600 },
        ].map(k => (
          <Card key={k.label} style={{ padding: '16px 18px', textAlign: 'center' }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: k.color }}>{k.value}</div>
            <div style={{ fontSize: 12, color: C.t500, marginTop: 4 }}>{k.label}</div>
          </Card>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 16 }}>
        {/* Atividades */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <TabBar tabs={[{id:'todas',label:'Todas'},{id:'andamento',label:'Em andamento'},{id:'afazer',label:'A fazer'},{id:'bloqueada',label:'Bloqueadas'},{id:'concluida',label:'Concluídas'}]} active={filterTab} onChange={setFilterTab} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filtered.map(a => {
              const st = statusConfig[a.status];
              return (
                <Card key={a.id} style={{ padding: '16px 18px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <input type="checkbox" checked={a.status === 'concluida'} readOnly style={{ marginTop: 4, accentColor: C.navActive, width: 16, height: 16, cursor: 'pointer', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                        <div>
                          <div style={{ fontSize: 15, fontWeight: 500, color: a.status === 'concluida' ? C.t400 : C.t900, textDecoration: a.status === 'concluida' ? 'line-through' : 'none' }}>{a.name}</div>
                          <div style={{ fontSize: 12, color: C.t500, marginTop: 2 }}>{a.etapa} · {a.hora}</div>
                        </div>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <span style={{ fontSize: 12, fontWeight: 500, padding: '3px 10px', borderRadius: 12, background: st.bg, color: st.color }}>{st.label}</span>
                          {a.bloq && <Ic.AlertTriangle size={14} color={C.red500} />}
                          <Ic.MoreH size={16} color={C.t400} />
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <Avatar name={a.resp} size={24} />
                        <span style={{ fontSize: 12, color: C.t500, flex: 1 }}>{a.resp}</span>
                        {a.pct > 0 && <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: 160 }}>
                          <ProgressBar value={a.pct} height={5} style={{ flex: 1 }} />
                          <span style={{ fontSize: 11, color: C.t500, width: 28 }}>{a.pct}%</span>
                        </div>}
                        <div style={{ display: 'flex', gap: 6 }}>
                          {a.status === 'afazer' && <Btn variant="green" size="sm">Iniciar</Btn>}
                          {a.status === 'andamento' && <Btn variant="primary" size="sm">Concluir</Btn>}
                          {a.status === 'bloqueada' && <Btn variant="danger" size="sm">Resolver</Btn>}
                          <Btn variant="ghost" size="sm" icon={<Ic.Camera size={12} />}>Foto</Btn>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Footer progress */}
          <Card style={{ padding: '16px 20px', marginTop: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: C.t900 }}>{concluidas} de {atividades.length} atividades concluídas hoje</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: C.green600 }}>{Math.round((concluidas / atividades.length) * 100)}%</span>
            </div>
            <ProgressBar value={(concluidas / atividades.length) * 100} color={C.green500} height={8} />
          </Card>
        </div>

        {/* Right sidebar */}
        <div style={{ width: 240, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Card style={{ padding: '18px 20px' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.t900, marginBottom: 12 }}>Equipe presente</div>
            {[{ name: 'Carlos Mendes', status: 'presente' }, { name: 'Rafael Souza', status: 'presente' }, { name: 'Ana Lima', status: 'presente' }, { name: 'João Ferreira', status: 'ausente' }].map(m => (
              <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <Avatar name={m.name} size={30} />
                <span style={{ flex: 1, fontSize: 13, color: C.t700 }}>{m.name}</span>
                <StatusDot color={m.status === 'presente' ? C.green500 : C.red400} size={8} />
              </div>
            ))}
          </Card>
          <Card style={{ padding: '18px 20px' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.t900, marginBottom: 12 }}>Registros de hoje</div>
            {[{ t: 'Concretagem laje L1', tipo: 'Foto', time: '08:12' }, { t: 'Vistoria estrutural', tipo: 'Vistoria', time: '07:38' }].map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 10, cursor: 'pointer' }}>
                <div style={{ width: 32, height: 32, background: C.borderLight, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Ic.Camera size={14} color={C.t400} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 500, color: C.t900 }}>{r.t}</div>
                  <div style={{ fontSize: 11, color: C.t400 }}>{r.tipo} · {r.time}</div>
                </div>
              </div>
            ))}
            <button onClick={() => onNavigate('relatorio_foto')} style={{ width: '100%', padding: '8px', background: 'none', border: `1.5px dashed ${C.border}`, borderRadius: 8, fontSize: 13, color: C.t500, cursor: 'pointer', fontFamily: 'inherit' }}>+ Adicionar foto / nota</button>
          </Card>
        </div>
      </div>
    </AppShell>
  );
};

// ─── ATIVIDADES DIÁRIAS (OP) ──────────────────────────
const AtividadesDiariasScreen = ({ onNavigate }) => {
  const project = readActiveProject() || DEFAULT_PROJECT;
  const [expanded, setExpanded] = useO(null);
  const [filter, setFilter] = useO('todas');
  const [tasks, setTasks] = useO([
    { id: 1, name: 'Concretagem laje L1', location: 'Pavimento 5', hora: '08:00 – 12:00', status: 'andamento', tipo: 'Estrutura', resp: 'Rafael Souza', pct: 58 },
    { id: 2, name: 'Instalação tubulação', location: 'Banheiro 502', hora: '13:00 – 16:00', status: 'afazer', tipo: 'Hidráulica', resp: 'João Ferreira', pct: 0 },
    { id: 3, name: 'Passagem eletroduto', location: 'Pavimento 4', hora: '16:00 – 18:00', status: 'afazer', tipo: 'Elétrica', resp: 'Ricardo Alves', pct: 0 },
  ]);

  const statusMap = {
    afazer: { label: 'A fazer', bg: C.borderLight, color: C.t700, action: 'Iniciar', variant: 'secondary' },
    andamento: { label: 'Em andamento', bg: C.blue100, color: C.blue600, action: 'Concluir', variant: 'primary' },
    concluida: { label: 'Concluída', bg: C.green100, color: C.green600, action: 'Reabrir', variant: 'secondary' },
  };

  const changeStatus = (id, status) => {
    setTasks(current => current.map(task => task.id === id ? {
      ...task,
      status,
      pct: status === 'concluida' ? 100 : status === 'andamento' ? Math.max(task.pct, 12) : 0,
    } : task));
  };

  const filteredTasks = tasks.filter(task => filter === 'todas' || task.status === filter);
  const inProgress = tasks.filter(task => task.status === 'andamento').length;
  const completed = tasks.filter(task => task.status === 'concluida').length;
  const pending = tasks.filter(task => task.status === 'afazer').length;
  const completion = Math.round((completed / Math.max(tasks.length, 1)) * 100);

  return (
    <AppShell active="atividades" onNavigate={onNavigate}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 18, marginBottom: 22 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 8 }}>
            <button onClick={() => onNavigate('execucao')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, color: C.t500, fontSize: 13, fontFamily: 'inherit' }}>
              <Ic.ArrowLeft size={15} /> Execução
            </button>
            <span style={{ color: C.t300 }}>/</span>
            <span style={{ fontSize: 13, color: C.t500 }}>{project.name}</span>
          </div>
          <h1 style={{ fontSize: 36, lineHeight: 1.05, letterSpacing: '-0.7px', fontWeight: 800, color: C.t900 }}>Atividades diárias</h1>
          <p style={{ fontSize: 14, color: C.t500, marginTop: 7 }}>Acompanhe tarefas, responsáveis, horários e registros operacionais do dia.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Btn variant="secondary" icon={<Ic.Calendar size={14} />}>02 Jun 2025</Btn>
          <Btn icon={<Ic.Plus size={14} />}>Nova atividade</Btn>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 14, marginBottom: 20 }}>
        {[
          { label: 'Atividades de hoje', value: tasks.length, sub: `${project.name}`, color: C.t900, icon: Ic.Clipboard },
          { label: 'Em andamento', value: inProgress, sub: 'Execução no canteiro', color: C.blue600, icon: Ic.Activity },
          { label: 'A fazer', value: pending, sub: 'Programadas para hoje', color: C.orange600, icon: Ic.Clock },
          { label: 'Concluídas', value: completed, sub: `${completion}% da programação`, color: C.green600, icon: Ic.Check },
        ].map(item => {
          const Icon = item.icon;
          return (
            <Card key={item.label} style={{ padding: '18px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                <div>
                  <div style={{ fontSize: 12, color: C.t500, marginBottom: 9 }}>{item.label}</div>
                  <div style={{ fontSize: 30, lineHeight: 1, fontWeight: 750, color: item.color }}>{item.value}</div>
                  <div style={{ fontSize: 11, color: C.t400, marginTop: 9 }}>{item.sub}</div>
                </div>
                <div style={{ width: 38, height: 38, borderRadius: 12, background: C.borderLight, display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.color }}>
                  <Icon size={17} color={item.color} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card style={{ padding: '12px 14px', marginBottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <TabBar
            tabs={[
              { id: 'todas', label: 'Todas' },
              { id: 'andamento', label: 'Em andamento' },
              { id: 'afazer', label: 'A fazer' },
              { id: 'concluida', label: 'Concluídas' },
            ]}
            active={filter}
            onChange={setFilter}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: C.t500 }}>
            <Ic.User size={14} color={C.t400} /> Rafael Souza · Mestre de obras
          </div>
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 280px', gap: 16, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filteredTasks.map(task => {
            const status = statusMap[task.status] || statusMap.afazer;
            const isExpanded = expanded === task.id;
            return (
              <Card key={task.id} style={{ padding: '18px 20px', cursor: 'pointer' }} onClick={() => setExpanded(isExpanded ? null : task.id)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 13, background: C.borderLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {task.tipo === 'Estrutura' ? <Ic.Building size={18} color={C.blue600} /> : task.tipo === 'Hidráulica' ? <Ic.Package size={18} color={C.green600} /> : <Ic.Zap size={18} color={C.orange600} />}
                  </div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 15, fontWeight: 650, color: C.t900 }}>{task.name}</span>
                      <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 999, background: status.bg, color: status.color }}>{status.label}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', marginTop: 7, fontSize: 12, color: C.t500 }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><Ic.MapPin size={13} color={C.t400} />{task.location}</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><Ic.Clock size={13} color={C.t400} />{task.hora}</span>
                      <Badge color="gray">{task.tipo}</Badge>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Avatar name={task.resp} size={30} />
                    <Ic.ChevronDown size={15} color={C.t400} style={{ transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform .2s ease' }} />
                  </div>
                </div>

                {task.status === 'andamento' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14 }}>
                    <ProgressBar value={task.pct} height={6} style={{ flex: 1 }} />
                    <span style={{ width: 34, fontSize: 11, fontWeight: 650, color: C.blue600 }}>{task.pct}%</span>
                  </div>
                )}

                {isExpanded && (
                  <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 15, marginTop: 15 }} onClick={event => event.stopPropagation()}>
                    {task.status === 'andamento' && (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, background: C.blue100, borderRadius: 12, padding: '11px 13px', marginBottom: 13 }}>
                        <div>
                          <div style={{ fontSize: 12, fontWeight: 650, color: C.blue600 }}>Atividade em execução</div>
                          <div style={{ fontSize: 11, color: C.blue600, marginTop: 2 }}>Iniciada às 08:00 · duração estimada de 4 horas.</div>
                        </div>
                        <Ic.Activity size={17} color={C.blue600} />
                      </div>
                    )}
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: C.t700, marginBottom: 7 }}>Observação da atividade</label>
                    <textarea placeholder="Registre uma atualização, impedimento ou orientação..." style={{ width: '100%', minHeight: 72, resize: 'vertical', padding: '11px 12px', border: `1.5px solid ${C.border}`, borderRadius: 11, color: C.t900, background: C.card, fontSize: 13, fontFamily: 'inherit', outline: 'none' }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
                      <Btn variant="secondary" size="sm" icon={<Ic.Camera size={13} />}>Adicionar foto</Btn>
                      <Btn variant="secondary" size="sm" icon={<Ic.AlertTriangle size={13} />}>Reportar problema</Btn>
                      <div style={{ flex: 1 }} />
                      {task.status === 'afazer' && <Btn size="sm" onClick={() => changeStatus(task.id, 'andamento')}>Iniciar atividade</Btn>}
                      {task.status === 'andamento' && <Btn size="sm" onClick={() => changeStatus(task.id, 'concluida')}>Concluir atividade</Btn>}
                      {task.status === 'concluida' && <Btn variant="secondary" size="sm" onClick={() => changeStatus(task.id, 'andamento')}>Reabrir</Btn>}
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
          {!filteredTasks.length && (
            <Card style={{ padding: '44px 24px', textAlign: 'center' }}>
              <Ic.Check size={26} color={C.green600} />
              <div style={{ fontSize: 15, fontWeight: 650, color: C.t900, marginTop: 10 }}>Nenhuma atividade neste filtro</div>
              <div style={{ fontSize: 12, color: C.t500, marginTop: 5 }}>Selecione outra situação para visualizar as tarefas.</div>
            </Card>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Card style={{ padding: '18px 20px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.t900 }}>Resumo operacional</div>
            <div style={{ fontSize: 12, color: C.t500, marginTop: 4, marginBottom: 15 }}>Programação diária do projeto.</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                ['Janela operacional', '08:00 – 18:00'],
                ['Responsável', 'Rafael Souza'],
                ['Frente ativa', 'Pavimentos 4 e 5'],
                ['Conclusão do dia', `${completion}%`],
              ].map(([label, value]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, paddingBottom: 11, borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ fontSize: 12, color: C.t500 }}>{label}</span>
                  <strong style={{ fontSize: 12, color: C.t900, textAlign: 'right' }}>{value}</strong>
                </div>
              ))}
            </div>
            <ProgressBar value={completion} color={C.blue600} height={7} style={{ marginTop: 15 }} />
          </Card>

          <Card style={{ padding: '18px 20px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.t900, marginBottom: 13 }}>Equipe em campo</div>
            {[
              ['Rafael Souza', 'Mestre de obras'],
              ['João Ferreira', 'Hidráulica'],
              ['Ricardo Alves', 'Elétrica'],
            ].map(([name, role]) => (
              <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 11 }}>
                <Avatar name={name} size={32} />
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 650, color: C.t900 }}>{name}</div>
                  <div style={{ fontSize: 11, color: C.t500, marginTop: 1 }}>{role}</div>
                </div>
                <StatusDot color={C.green500} size={7} />
              </div>
            ))}
          </Card>
        </div>
      </div>
    </AppShell>
  );
};

// ─── RELATÓRIO FOTOGRÁFICO ─────────────────────────────
const RelatorioFotograficoScreen = ({ onNavigate }) => {
  const project = readActiveProject() || DEFAULT_PROJECT;
  const [filter, setFilter] = useO('todas');
  const [selected, setSelected] = useO(null);

  const fotos = [
    { id: 1, etapa: 'Estrutura', tipo: 'durante', autor: 'Rafael Souza', data: 'Hoje, 08:12', status: 'aprovada', label: 'Concretagem L1' },
    { id: 2, etapa: 'Hidráulica', tipo: 'antes', autor: 'João Ferreira', data: 'Hoje, 07:38', status: 'revisao', label: 'Tubulação 502' },
    { id: 3, etapa: 'Acabamento', tipo: 'depois', autor: 'Ana Lima', data: 'Ontem, 17:22', status: 'aprovada', label: 'Massa corrida' },
    { id: 4, etapa: 'Elétrica', tipo: 'problema', autor: 'Ricardo Alves', data: 'Ontem, 15:00', status: 'rejeitada', label: 'Eletroduto danif.' },
    { id: 5, etapa: 'Estrutura', tipo: 'durante', autor: 'Carlos Mendes', data: 'Ontem, 10:30', status: 'revisao', label: 'Armadura pav 4' },
    { id: 6, etapa: 'Vedações', tipo: 'depois', autor: 'Rafael Souza', data: 'Segunda, 16:45', status: 'aprovada', label: 'Bloco cerâmico' },
  ];

  const stMap = { aprovada: { c: C.green600, bg: C.green100, l: 'Aprovada' }, revisao: { c: C.orange600, bg: C.orange100, l: 'Revisão' }, rejeitada: { c: C.red600, bg: C.red100, l: 'Rejeitada' } };
  const tipoColors = { antes: C.blue500, durante: C.orange500, depois: C.green500, problema: C.red500 };

  return (
    <AppShell active="relatorio_foto" onNavigate={onNavigate}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
            <button onClick={() => onNavigate('execucao')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: C.t500, fontSize: 14, fontFamily: 'inherit' }}>
              <Ic.ArrowLeft size={16} /> Execução
            </button>
            <span style={{ color: C.t300 }}>/</span>
            <span style={{ fontSize: 14, fontWeight: 500, color: C.t900 }}>Relatório Fotográfico</span>
          </div>
          <div style={{ fontSize: 13, color: C.t500 }}>{project.name} · {fotos.length} registros</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Btn variant="secondary" icon={<Ic.Download size={14} />}>Gerar PDF</Btn>
          <Btn icon={<Ic.Camera size={14} />}>Nova foto</Btn>
        </div>
      </div>

      {/* Filter chips */}
      <ChipBar chips={['todas','Estrutura','Hidráulica','Elétrica','Acabamento','Vedações'].map(c=>({id:c,label:c==='todas'?'Todas':c}))} active={filter} onChange={setFilter} style={{ marginBottom: 20 }} />

      <div style={{ display: 'flex', gap: 16 }}>
        {/* Grid */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
          {fotos.filter(f => filter === 'todas' || f.etapa === filter).map(f => {
            const st = stMap[f.status];
            return (
              <Card key={f.id} onClick={() => setSelected(f)} style={{ overflow: 'hidden', cursor: 'pointer' }}>
                <div style={{ position: 'relative' }}>
                  <ImgPlaceholder style={{ height: 140, borderRadius: 0 }} label={f.label} />
                  <div style={{ position: 'absolute', top: 8, left: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 8, background: tipoColors[f.tipo], color: '#fff' }}>{f.tipo}</span>
                  </div>
                  <div style={{ position: 'absolute', top: 8, right: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 500, padding: '3px 8px', borderRadius: 8, background: st.bg, color: st.c }}>{st.l}</span>
                  </div>
                </div>
                <div style={{ padding: '12px 14px' }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: C.t900, marginBottom: 4 }}>{f.label}</div>
                  <div style={{ fontSize: 12, color: C.t500 }}>{f.etapa}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                      <Avatar name={f.autor} size={20} />
                      <span style={{ fontSize: 11, color: C.t500 }}>{f.autor}</span>
                    </div>
                    <span style={{ fontSize: 11, color: C.t400 }}>{f.data}</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Detail panel */}
        {selected ? (
          <div style={{ width: 280, flexShrink: 0 }}>
            <Card style={{ overflow: 'hidden' }}>
              <div style={{ position: 'relative' }}>
                <ImgPlaceholder style={{ height: 180, borderRadius: 0 }} label={selected.label} />
                <button onClick={() => setSelected(null)} style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.4)', border: 'none', borderRadius: 8, padding: 5, cursor: 'pointer', display: 'flex' }}>
                  <Ic.X size={14} color="#fff" />
                </button>
              </div>
              <div style={{ padding: '16px' }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: C.t900, marginBottom: 6 }}>{selected.label}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13, color: C.t500, marginBottom: 14 }}>
                  <div style={{ display: 'flex', gap: 8 }}><span style={{ color: C.t400, width: 70 }}>Etapa</span>{selected.etapa}</div>
                  <div style={{ display: 'flex', gap: 8 }}><span style={{ color: C.t400, width: 70 }}>Autor</span>{selected.autor}</div>
                  <div style={{ display: 'flex', gap: 8 }}><span style={{ color: C.t400, width: 70 }}>Data</span>{selected.data}</div>
                  <div style={{ display: 'flex', gap: 8 }}><span style={{ color: C.t400, width: 70 }}>Tipo</span><span style={{ color: tipoColors[selected.tipo], fontWeight: 600 }}>{selected.tipo}</span></div>
                </div>
                <textarea placeholder="Adicionar comentário..." style={{ width: '100%', padding: '8px 12px', border: `1.5px solid ${C.border}`, borderRadius: 8, fontSize: 13, fontFamily: 'inherit', resize: 'none', height: 64, outline: 'none', marginBottom: 12 }} />
                <div style={{ display: 'flex', gap: 8 }}>
                  <Btn variant="green" size="sm" style={{ flex: 1, justifyContent: 'center' }} icon={<Ic.Check size={13} />}>Aprovar</Btn>
                  <Btn variant="danger" size="sm" style={{ flex: 1, justifyContent: 'center' }} icon={<Ic.X size={13} />}>Rejeitar</Btn>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <div style={{ width: 280, flexShrink: 0 }}>
            <Card style={{ padding: '20px', textAlign: 'center', color: C.t400 }}>
              <Ic.Camera size={28} color={C.t300} />
              <div style={{ marginTop: 10, fontSize: 13 }}>Clique em uma foto para ver detalhes e aprovar</div>
            </Card>
          </div>
        )}
      </div>
    </AppShell>
  );
};

Object.assign(window, { ObraExecucaoScreen, AtividadesDiariasScreen, RelatorioFotograficoScreen });

// mis-orcamento.jsx — Quero Reformar, Construir, Orçamento, Análise, Quantitativo, Proposta, Aprovação

const { useState: useQ } = React;

