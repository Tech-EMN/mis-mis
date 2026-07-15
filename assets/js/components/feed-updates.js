/* === FEED UPDATES === */

const AtualizacoesScreen = ({ onNavigate }) => {
  const [selObra, setSelObra] = useOp('villa');
  const [tabFeed, setTabFeed] = useOp('Tudo');
  const isDark = typeof document !== 'undefined' && document.documentElement.dataset.theme === 'dark';
  const lightPanelBg = '#d1cdcd';
  const lightFieldBg = '#d1cdcd';
  const lightBorder = 'rgba(255,255,255,.34)';
  const lightShadow = '10px 10px 22px rgba(138,138,138,.18), -8px -8px 18px rgba(255,255,255,.18), inset 0 1px 0 rgba(255,255,255,.24)';

  const obrasList = [
    { id:'villa',   name:'Villa Aurora',       badge:'AO VIVO', badgeColor:C.green500, img:'aurora',   last:'Mariana atualizou o avanço...', notif:8, time:'agora' },
    { id:'jardins', name:'Residencial Jardins', badge:null,       badgeColor:null,       img:'jardins',  last:'João Pedro anexou Memor...',    notif:3, time:'08:42' },
    { id:'torre',   name:'Corporate Tower',     badge:'AO VIVO', badgeColor:C.green500, img:'corporate',last:'ALERTA: estrutura do 8°...',     notif:12,time:'12 min' },
    { id:'loft',    name:'Loft Panorama',       badge:null,       badgeColor:null,       img:'loft',     last:'Rafael Souza concluiu vist...',  notif:0, time:'Ontem' },
    { id:'horizonte',name:'Horizonte',          badge:null,       badgeColor:null,       img:'horizonte',last:'Aprovação solicitada: me...',    notif:1, time:'Ontem' },
    { id:'greenview',name:'Est. Greenview',     badge:null,       badgeColor:null,       img:'greenview',last:'Relatório semanal publicado',   notif:0, time:'Seg' },
  ];

  const tabsFeed = ['Tudo','Avanço 2','Fotos 1','Arquivos 1','Vistorias 1','Comentários 1','Aprovações 1','Alertas 1'];
  const feed = [
    { avatar:'MC', name:'Mariana Costa', action:'atualizou', badge:'Avanço', badgeColor:C.blue500, time:'agora', type:'avanco', pct:72, desc:'Estrutura - Fundação', delta:'+7 pontos · cronograma adiantado' },
    { avatar:'MC', name:'Mariana Costa', action:'compartilhou uma foto', badge:'Foto', badgeColor:C.purple600, time:'08:12', type:'foto', caption:'Concretagem da laje L1 finalizada às 07:38. Cura programada para 72h.', img:'torre', likes:12, comments:4 },
    { avatar:'RS', name:'Rafael Souza',  action:'registrou vistoria', badge:'Vistoria', badgeColor:C.green600, time:'07:38', type:'vistoria', caption:'Verificação concluída no setor estrutural. Sem não conformidades críticas.' },
  ];

  return (
    <AppShell active="atualizacoes" onNavigate={onNavigate} noPad>
      <div className="updates-workspace" style={{ display:'flex', height:'100%', overflow:'hidden' }}>

        {/* Left panel */}
        <div style={{ width: 260, borderRight:`1px solid ${isDark ? C.border : lightBorder}`, display:'flex', flexDirection:'column', overflow:'hidden', background:isDark ? '#fff' : lightPanelBg, boxShadow:isDark ? 'none' : lightShadow }}>
          <div style={{ padding:'18px 16px 12px', borderBottom:`1px solid ${isDark ? C.border : lightBorder}` }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
              <span style={{ fontSize:16, fontWeight:700, color:C.t900 }}>Atualizações <span style={{ background:C.blue500, color:'#fff', borderRadius:10, padding:'2px 7px', fontSize:11, fontWeight:700 }}>24</span></span>
              <button style={{ background:'none', border:'none', cursor:'pointer', color:C.t500 }}><Ic.Plus size={18}/></button>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:6, background:isDark ? C.bg : lightFieldBg, border:`1px solid ${isDark ? C.border : lightBorder}`, borderRadius:8, padding:'7px 10px', marginBottom:10, boxShadow:isDark ? 'none' : 'inset 0 1px 0 rgba(255,255,255,.22)' }}>
              <Ic.Search size={13} color={C.t400}/>
              <input placeholder="Buscar obra..." style={{ flex:1, border:'none', outline:'none', fontSize:13, color:C.t900, fontFamily:'inherit', background:'transparent' }}/>
            </div>
            <div style={{ display:'flex', gap:2 }}>
              {['Todas','Com novidades'].map(t => (
                <button key={t} className={`mis-select-btn${t === 'Todas' ? ' active' : ''}`} aria-pressed={t === 'Todas'} style={{ padding:'5px 8px', borderRadius:6, fontSize:11, cursor:'pointer', border:'none', fontFamily:'inherit', background:t==='Todas'?C.t900:'transparent', color:t==='Todas'?'#fff':C.t500, fontWeight:t==='Todas'?600:400 }}>{t}</button>
              ))}
            </div>
          </div>
          <div style={{ overflowY:'hidden', flex:1 }}>
            <div style={{ padding:'10px 16px', fontSize:10, fontWeight:700, color:C.t400, letterSpacing:0.5 }}>SUAS OBRAS</div>
            {obrasList.map(o => (
              <button key={o.id} className={`mis-select-btn${selObra === o.id ? ' active' : ''}`} aria-pressed={selObra === o.id} onClick={() => setSelObra(o.id)} style={{ width:'100%', padding:'10px 16px', display:'flex', gap:10, alignItems:'center', background:selObra===o.id?(isDark ? C.borderLight : 'linear-gradient(180deg, rgba(2,3,59,.10), rgba(2,3,59,.03)), rgba(255,255,255,.12)'):'transparent', border:'none', cursor:'pointer', fontFamily:'inherit', textAlign:'left' }}>
                <ObraImg obra={o.img} style={{ width:40, height:40, borderRadius:8, flexShrink:0 }}/>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:'flex', gap:6, alignItems:'center', marginBottom:2 }}>
                    <span style={{ fontSize:13, fontWeight:600, color:C.t900, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{o.name}</span>
                    {o.badge && <span style={{ background:o.badgeColor, color:'#fff', fontSize:9, fontWeight:700, borderRadius:3, padding:'1px 5px', whiteSpace:'nowrap' }}>{o.badge}</span>}
                  </div>
                  <div style={{ fontSize:11, color:C.t500, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{o.last}</div>
                </div>
                <div style={{ flexShrink:0, textAlign:'right' }}>
                  <div style={{ fontSize:10, color:C.t400, marginBottom:2 }}>{o.time}</div>
                  {o.notif > 0 && <div style={{ background:C.red500, color:'#fff', borderRadius:10, padding:'1px 6px', fontSize:10, fontWeight:700, display:'inline-block' }}>{o.notif}</div>}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Center feed */}
        <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
          {/* Header */}
          <div style={{ padding:'12px 18px', borderBottom:`1px solid ${isDark ? C.border : lightBorder}`, display:'flex', alignItems:'center', gap:12, background:isDark ? '#fff' : lightPanelBg, boxShadow:isDark ? 'none' : lightShadow }}>
            <ObraImg obra="aurora" style={{ width:36, height:36, borderRadius:8 }}/>
            <div style={{ flex:1 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ fontSize:15, fontWeight:700, color:C.t900 }}>Villa Aurora</span>
                <StatusDot color={C.green500} size={7}/>
                <span style={{ fontSize:12, color:C.t500 }}>Estrutura - Fundação · 72% · Florianópolis, SC</span>
              </div>
            </div>
            <div style={{ display:'flex', gap:8, alignItems:'center' }}>
              <button style={{ padding:'6px 14px', borderRadius:8, background:'transparent', border:`1px solid ${C.border}`, fontSize:13, color:C.t700, cursor:'pointer', fontFamily:'inherit' }}>Acompanhando</button>
              <button style={{ background:'none', border:'none', cursor:'pointer', color:C.t500 }}><Ic.Calendar size={18}/></button>
              <button style={{ background:'none', border:'none', cursor:'pointer', color:C.t500 }}><Ic.Bell size={18}/></button>
              <button style={{ background:'none', border:'none', cursor:'pointer', color:C.t500 }}><Ic.MoreH size={18}/></button>
            </div>
          </div>
          {/* Search + tabs */}
          <div style={{ padding:'10px 18px', borderBottom:`1px solid ${isDark ? C.border : lightBorder}`, background:isDark ? '#fff' : lightPanelBg, boxShadow:isDark ? 'none' : lightShadow }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, background:isDark ? C.bg : lightFieldBg, border:`1px solid ${isDark ? C.border : lightBorder}`, borderRadius:8, padding:'7px 12px', marginBottom:10, boxShadow:isDark ? 'none' : 'inset 0 1px 0 rgba(255,255,255,.22)' }}>
              <Ic.Search size={13} color={C.t400}/>
              <input placeholder="Buscar em Villa Aurora..." style={{ flex:1, border:'none', outline:'none', fontSize:13, fontFamily:'inherit', background:'transparent', color:C.t900 }}/>
            </div>
            <div style={{ display:'flex', gap:2, overflowX:'auto' }}>
              {tabsFeed.map(t => {
                const isA = tabFeed===t;
                return <button key={t} className={`mis-select-btn${isA ? ' active' : ''}`} aria-pressed={isA} onClick={() => setTabFeed(t)} style={{ padding:'5px 12px', borderRadius:6, fontSize:12, cursor:'pointer', border:'none', fontFamily:'inherit', background:isA?C.t900:'transparent', color:isA?'#fff':C.t500, fontWeight:isA?600:400, whiteSpace:'nowrap' }}>{t}</button>;
              })}
            </div>
          </div>
          {/* Feed */}
          <div style={{ position:'relative', flex:1, minHeight:0 }}>
            <div style={{ flex:1, height:'100%', overflowY:'auto', padding:'16px 18px 54px', display:'flex', flexDirection:'column', gap:16 }}>
              <div style={{ fontSize:11, fontWeight:700, color:C.t400, letterSpacing:0.5 }}>HOJE</div>
              {feed.map((f, i) => (
                <div key={i} style={{ display:'flex', gap:12 }}>
                <Avatar name={f.avatar} size={34}/>
                <div style={{ flex:1 }}>
                  <div style={{ display:'flex', gap:8, alignItems:'center', marginBottom:6 }}>
                    <span style={{ fontSize:13, fontWeight:600, color:C.t900 }}>{f.name}</span>
                    <span style={{ fontSize:12, color:C.t500 }}>{f.action}</span>
                    <span style={{ background:f.badgeColor, color:'#fff', fontSize:10, fontWeight:700, borderRadius:4, padding:'2px 7px' }}>{f.badge}</span>
                    <span style={{ marginLeft:'auto', fontSize:11, color:C.t400 }}>{f.time}</span>
                  </div>
                  {f.type==='avanco' && (
                    <Card style={{ padding:'14px 16px' }}>
                      <div style={{ display:'flex', gap:12, alignItems:'center', marginBottom:8 }}>
                        <span style={{ fontSize:22, fontWeight:800, color:C.green600 }}>{f.pct}%</span>
                        <div>
                          <div style={{ fontSize:14, fontWeight:600, color:C.t900 }}>{f.desc}</div>
                          <div style={{ fontSize:12, color:C.green600 }}>{f.delta}</div>
                        </div>
                      </div>
                      <ProgressBar value={f.pct} color={C.green500} height={6}/>
                    </Card>
                  )}
                  {f.type==='foto' && (
                    <Card style={{ padding:0, overflow:'hidden' }}>
                      <div style={{ padding:'12px 14px 8px', fontSize:13, color:C.t700 }}>{f.caption}</div>
                      <ObraImg obra="torre" style={{ height:180 }}/>
                      <div style={{ padding:'8px 14px', display:'flex', gap:12 }}>
                        <button style={{ background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:4, fontSize:13, color:C.t500, fontFamily:'inherit' }}><Ic.Heart size={14}/> {f.likes}</button>
                        <button style={{ background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:4, fontSize:13, color:C.t500, fontFamily:'inherit' }}><Ic.Message size={14}/> {f.comments}</button>
                      </div>
                    </Card>
                  )}
                  {f.type==='vistoria' && (
                    <Card style={{ padding:'12px 16px', display:'flex', gap:10, alignItems:'flex-start' }}>
                      <Ic.Check size={16} color={C.green600} style={{ marginTop:2, flexShrink:0 }}/>
                      <div style={{ fontSize:13, color:C.t700, lineHeight:1.5 }}>{f.caption}</div>
                    </Card>
                  )}
                </div>
              </div>
              ))}
            </div>
            <div style={{
              position:'absolute', left:0, right:0, bottom:0, height:40, pointerEvents:'none',
              background: isDark
                ? 'linear-gradient(180deg, rgba(9,18,31,0) 0%, rgba(9,18,31,.95) 100%)'
                : 'linear-gradient(180deg, rgba(195,195,195,0) 0%, rgba(195,195,195,.96) 100%)',
              borderTop: `1px solid ${isDark ? 'rgba(255,255,255,.08)' : 'rgba(255,255,255,.38)'}`,
              boxShadow: isDark ? '0 -10px 24px rgba(0,0,0,.12)' : '0 -10px 24px rgba(138,138,138,.10)'
            }} />
          </div>
        </div>

        {/* Right panel */}
        <div style={{ width:200, borderLeft:`1px solid ${isDark ? C.border : lightBorder}`, background:isDark ? '#fff' : lightPanelBg, overflowY:'hidden', flexShrink:0, boxShadow:isDark ? 'none' : lightShadow }}>
          <ObraImg obra="aurora" style={{ height:100, position:'relative' }}>
            <div style={{ position:'absolute', top:8, left:8 }}>
              <span style={{ background:C.green500, color:'#fff', fontSize:9, fontWeight:700, borderRadius:4, padding:'2px 6px', display:'flex', alignItems:'center', gap:4 }}>
                <StatusDot color="#fff" size={5}/> Ao vivo
              </span>
            </div>
          </ObraImg>
          <div style={{ padding:'14px 14px' }}>
            <div style={{ fontSize:14, fontWeight:700, color:C.t900, marginBottom:2 }}>Villa Aurora</div>
            <div style={{ fontSize:12, color:C.t500, marginBottom:14, display:'flex', alignItems:'center', gap:4 }}><Ic.MapPin size={12}/> Florianópolis, SC</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:14 }}>
              {[{icon:Ic.Calendar,label:'Agenda'},{icon:Ic.Package,label:'Suprimentos'},{icon:Ic.Users,label:'Equipe'},{icon:Ic.Bell,label:'Notificar'}].map(a => (
                <button key={a.label} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4, padding:'10px 6px', borderRadius:10, border:`1px solid ${C.border}`, background:'#fff', cursor:'pointer', fontFamily:'inherit' }}>
                  <a.icon size={18} color={C.t500}/>
                  <span style={{ fontSize:11, color:C.t700, fontWeight:500 }}>{a.label}</span>
                </button>
              ))}
            </div>
            <div style={{ fontSize:10, fontWeight:700, color:C.t400, letterSpacing:0.5, marginBottom:8 }}>STATUS ATUAL</div>
            <div style={{ marginBottom:14 }}>
              {[['Etapa','Estrutura - Fundação'],['Avanço','72%']].map(([k,v]) => (
                <div key={k} style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                  <span style={{ fontSize:12, color:C.t500 }}>{k}</span>
                  <span style={{ fontSize:12, fontWeight:600, color:C.t900 }}>{v}</span>
                </div>
              ))}
              <ProgressBar value={72} color={C.green500} height={5}/>
            </div>
            <div style={{ fontSize:10, fontWeight:700, color:C.t400, letterSpacing:0.5, marginBottom:8 }}>RESUMO DE HOJE</div>
            {[['Atualizações','8'],['Fotos publicadas','2'],['Documentos','1'],['Vistorias','1']].map(([k,v]) => (
              <div key={k} style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                <span style={{ fontSize:12, color:C.t500 }}>{k}</span>
                <span style={{ fontSize:12, fontWeight:700, color:C.t900 }}>{v}</span>
              </div>
            ))}
            <div style={{ fontSize:10, fontWeight:700, color:C.t400, letterSpacing:0.5, margin:'14px 0 8px' }}>EQUIPE</div>
            {[['Mariana Costa','Eng. Responsável'],['Rafael Souza','Mestre de obras'],['João Pedro','Arquiteto']].map(([n,r]) => (
              <div key={n} style={{ display:'flex', gap:8, alignItems:'center', marginBottom:8 }}>
                <Avatar name={n} size={28}/>
                <div>
                  <div style={{ fontSize:11, fontWeight:600, color:C.t900 }}>{n}</div>
                  <div style={{ fontSize:10, color:C.t500 }}>{r}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
};

