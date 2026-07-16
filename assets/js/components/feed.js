/* === FEED === */

const MisFeedScreen = ({ onNavigate }) => {
  const [tab, setTab] = useOp('todos');
  const [view, setView] = useOp('grid');

  const stories = [
    { name: 'Sua obra',      img: OBRA_IMGS.nordica,    isOwn: true },
    { name: 'Jardins',       img: OBRA_IMGS.jardins,    ring: C.green500  },
    { name: 'Corporate',     img: OBRA_IMGS.corporate,  ring: C.blue500   },
    { name: 'Villa Aurora',  img: OBRA_IMGS.aurora,     ring: C.green500  },
    { name: 'Loft Panorama', img: OBRA_IMGS.loft,       ring: C.orange500 },
    { name: 'Est. Greenview',img: OBRA_IMGS.greenview,  ring: C.blue500   },
    { name: 'Horizonte',     img: OBRA_IMGS.horizonte,  ring: C.purple600 },
    { name: 'Aharada',       img: OBRA_IMGS.aharada,    ring: C.green500  },
  ];

  const cards = [
    { name: 'Villa Aurora',       loc: 'Florianópolis, SC', fase: 'Estrutura - Fundação', pct: 72,  img: 'villa',     tag: 'Em andamento', tagBg: C.navActive,    tagTx: '#fff',  resp: 'Mariana Costa', role: 'Engenheira Responsável', time: 'Hoje, 08:42', likes: 128, comments: 32 },
    { name: 'Residencial Jardins', loc: 'São Paulo, SP',     fase: 'Acabamento - Revestimentos', pct: 48, img: 'jardins',  tag: 'Acabamento',   tagBg: C.blue500,      tagTx: '#fff',  resp: 'João Pedro',    role: 'Arquiteto',               time: 'Ontem, 17:30',likes: 96,  comments: 28 },
    { name: 'Corporate Tower',     loc: 'Curitiba, PR',      fase: 'Instalações elétricas',      pct: 25,  img: 'corporate', tag: 'Instalações',  tagBg: C.purple600,    tagTx: '#fff',  resp: 'Fernanda Lima', role: 'Engenheira Elétrica',      time: 'Ontem, 11:15',likes: 74,  comments: 11 },
    { name: 'Edifício Horizonte',  loc: 'São Paulo, SP',     fase: 'Vedações - Alvenaria',       pct: 82,  img: 'horizonte', tag: 'Em andamento', tagBg: C.navActive,    tagTx: '#fff',  resp: 'Carlos Mendes', role: 'Mestre de Obras',          time: 'Seg, 09:00',  likes: 54,  comments: 8  },
    { name: 'Loft Panorama',       loc: 'Porto Alegre, RS',  fase: 'Fundação concluída',         pct: 100, img: 'loft',      tag: 'Concluído',    tagBg: C.green600,     tagTx: '#fff',  resp: 'Ana Souza',     role: 'Gestora de Obras',         time: 'Seg, 07:30',  likes: 210, comments: 45 },
    { name: 'Est. Greenview',      loc: 'Campinas, SP',      fase: 'Estrutura - Pilares',        pct: 37,  img: 'greenview', tag: 'Em andamento', tagBg: C.navActive,    tagTx: '#fff',  resp: 'Ricardo Alves', role: 'Engenheiro Civil',          time: 'Dom, 16:20',  likes: 38,  comments: 6  },
  ];

  const feedProjectDetails = {
    'Villa Aurora': { id: 'feed-villa-aurora', address: 'Florianópolis, SC · Residencial de alto padrão', deadline: '18/09/2026', team: 36, budget: '7200000', area: '3.480 m²', status: 'andamento', priority: 'Alta', type: 'Residencial', alerts: 2 },
    'Residencial Jardins': { id: 'feed-residencial-jardins', address: 'São Paulo, SP · Condomínio Jardins', deadline: '21/12/2026', team: 29, budget: '6300000', area: '2.960 m²', status: 'andamento', priority: 'Média', type: 'Residencial', alerts: 3 },
    'Corporate Tower': { id: 'feed-corporate-tower', address: 'Curitiba, PR · Torre corporativa', deadline: '04/03/2027', team: 54, budget: '14800000', area: '7.850 m²', status: 'atencao', priority: 'Alta', type: 'Corporativo', alerts: 5 },
    'Edifício Horizonte': { id: 2, address: 'São Paulo, SP · 18 pavimentos · Torre única', deadline: '30/09/2026', team: 58, budget: '8200000', area: '2.480 m²', status: 'andamento', priority: 'Média', type: 'Comercial', alerts: 4 },
    'Loft Panorama': { id: 'feed-loft-panorama', address: 'Porto Alegre, RS · Residencial vertical', deadline: '30/05/2026', team: 21, budget: '5100000', area: '2.100 m²', status: 'concluido', priority: 'Baixa', type: 'Residencial', alerts: 0 },
    'Est. Greenview': { id: 'feed-est-greenview', address: 'Campinas, SP · Empreendimento sustentável', deadline: '15/01/2027', team: 33, budget: '9100000', area: '4.620 m²', status: 'andamento', priority: 'Média', type: 'Misto', alerts: 2 },
  };
  const openFeedProject = card => {
    const details = feedProjectDetails[card.name] || {};
    openProjectDashboard({
      ...DEFAULT_PROJECT,
      ...details,
      name: card.name,
      loc: card.loc,
      address: details.address || card.loc,
      pct: card.pct,
      resp: card.resp,
    }, onNavigate);
  };

  return (
    <AppShell active="feed" onNavigate={onNavigate}>
      {/* Stories */}
      <Card className="mis-feed-stories" style={{ padding: '18px 20px', marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: C.t900 }}>Stories de obras</span>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: C.blue600, fontFamily: 'inherit' }}>Ver todos</button>
        </div>
        <div style={{ display: 'flex', gap: 20, overflowX: 'auto', paddingBottom: 4 }}>
          {stories.map((s, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer', flexShrink: 0 }}>
              <div style={{ position: 'relative' }}>
                <div style={{
                  width: 64, height: 64, borderRadius: 32,
                  border: `3px solid ${s.isOwn ? C.t300 : s.ring}`,
                  padding: 2, boxSizing: 'border-box',
                }}>
                  <div style={{ width: '100%', height: '100%', borderRadius: '50%', backgroundImage: `url(${s.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}/>
                </div>
                {s.isOwn && (
                  <div style={{ position: 'absolute', bottom: 0, right: 0, width: 20, height: 20, borderRadius: 10, background: C.blue500, border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Ic.Plus size={10} color="#fff"/>
                  </div>
                )}
              </div>
              <span style={{ fontSize: 11, color: C.t700, textAlign: 'center', maxWidth: 64, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.name}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Filter bar */}
      <div className="mis-feed-toolbar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div className="mis-feed-filters" style={{ display: 'flex', gap: 2 }}>
          {[{id:'todos',label:'Todos'},{id:'seguindo',label:'Seguindo'},{id:'andamento',label:'Em andamento'},{id:'concluidos',label:'Concluídos'}].map(t => {
            const isA = tab === t.id;
            return <button key={t.id} className={`mis-select-btn${isA ? ' active' : ''}`} aria-pressed={isA} onClick={() => setTab(t.id)} style={{ padding: '8px 18px', borderRadius: 20, fontSize: 14, fontWeight: isA ? 600 : 400, cursor: 'pointer', border: 'none', fontFamily: 'inherit', background: isA ? C.t900 : 'transparent', color: isA ? '#fff' : C.t500, transition: 'all 0.15s' }}>{t.label}</button>;
          })}
        </div>
        <div className="mis-feed-view-controls" style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: C.t500, display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'inherit' }}>Mais recentes <Ic.ChevronDown size={13}/></button>
          <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
            {['grid','list'].map(v => <button key={v} className={`mis-select-btn${view === v ? ' active' : ''}`} aria-pressed={view === v} onClick={() => setView(v)} style={{ padding: '6px 10px', background: view === v ? C.t900 : '#fff', border: 'none', cursor: 'pointer', display: 'flex', color: view === v ? '#fff' : C.t500 }}>{v === 'grid' ? <Ic.Grid size={15}/> : <Ic.List size={15}/>}</button>)}
          </div>
        </div>
      </div>

      {/* Cards grid */}
      <div className="mis-feed-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }}>
        {cards.map((c, i) => (
          <Card
            key={i}
            className="mis-feed-project-card"
            role="button"
            tabIndex={0}
            aria-label={`Abrir projeto ${c.name}`}
            onClick={() => openFeedProject(c)}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openFeedProject(c); } }}
            style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }}
          >
            {/* Card header: name + location */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px 10px' }}>
              <ObraImg obra={c.img} style={{ width: 32, height: 32, borderRadius: 6, flexShrink: 0 }}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.t900, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</div>
                <div style={{ fontSize: 11, color: C.t500 }}>{c.loc}</div>
              </div>
              <button onClick={e => e.stopPropagation()} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.t400, padding: 2 }}><Ic.MoreH size={16}/></button>
            </div>

            {/* Image */}
            <div style={{ position: 'relative' }}>
              <ObraImg obra={c.img} style={{ height: 180 }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 50%)' }}/>
                <div style={{ position: 'absolute', bottom: 12, left: 12 }}>
                  <span style={{ background: c.tagBg, color: c.tagTx, borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 600 }}>{c.tag}</span>
                </div>
              </ObraImg>
            </div>

            {/* Progress section */}
            <div style={{ padding: '14px 16px 10px' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 8 }}>
                <CircProg value={c.pct} size={52}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.t900 }}>{c.fase}</div>
                  <div style={{ fontSize: 12, color: C.t500, marginTop: 2 }}>{c.pct}% concluído</div>
                  <ProgressBar value={c.pct} height={3} style={{ marginTop: 6 }}/>
                </div>
              </div>
            </div>

            {/* Responsável */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderTop: `1px solid ${C.borderLight}` }}>
              <Avatar name={c.resp} size={28}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: C.t900, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.resp}</div>
                <div style={{ fontSize: 11, color: C.t500 }}>{c.role}</div>
              </div>
              <span style={{ fontSize: 11, color: C.t400, whiteSpace: 'nowrap' }}>{c.time}</span>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '8px 16px', borderTop: `1px solid ${C.borderLight}` }}>
              <button onClick={e => e.stopPropagation()} style={{ background: 'none', border: `1px solid ${C.border}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, borderRadius: 14, color: C.t500 }}><Ic.Plus size={13}/></button>
              <button onClick={e => e.stopPropagation()} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, color: C.t500, fontFamily: 'inherit', fontSize: 13 }}>
                <Ic.Heart size={15} color="#EF4444"/> <span>{c.likes}</span>
              </button>
              <button onClick={e => e.stopPropagation()} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, color: C.t500, fontFamily: 'inherit', fontSize: 13 }}>
                <Ic.Message size={15}/> <span>{c.comments}</span>
              </button>
              <button onClick={e => e.stopPropagation()} style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: 'auto', color: C.t500 }}><Ic.Share size={15}/></button>
            </div>
          </Card>
        ))}
      </div>
    </AppShell>
  );
};

// ─── SUPRIMENTOS ──────────────────────────────────────────────────────────────

Object.assign(window, { MisFeedScreen });
