/* === DASHBOARD UC === */

              <span style={{ textAlign: 'right' }}>Uso<br /><strong style={{ color: C.t900 }}>79%</strong></span>
            </div>
          </Card>

          {/* Dias restantes — compactado */}
          <Card style={{ padding: '12px 14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: C.t500 }}>DIAS RESTANTES</span>
              <Badge color="orange" style={{ fontSize: 10, padding: '2px 8px' }}>⚠ Atraso</Badge>
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: C.orange500, lineHeight: 1, marginBottom: 6 }}>28d</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px 8px', fontSize: 10 }}>
              {[['ENTREGA PREVISTA', '15 Jul 2025'], ['DATA ORIGINAL', '08 Jul 2025'], ['ATRASO ATUAL', '+7 dias'], ['CONCLUÍDO', '78%']].map(([k, v]) => (
                <div key={k}><div style={{ color: C.t400, fontSize: 9 }}>{k}</div><div style={{ fontWeight: 600, color: k === 'ATRASO ATUAL' ? C.orange500 : C.t900 }}>{v}</div></div>
              ))}
            </div>
          </Card>

          {/* Score IA — alinhado */}
          <Card style={{ padding: '14px 14px 16px', minHeight: 152, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: C.t900 }}>Score IA</span>
              <span style={{ fontSize: 10, color: C.t400 }}>Atualizado 09h47</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 31, fontWeight: 800, color: C.blue600, lineHeight: 1 }}>8.7</span>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: C.green600 }}>● Excelente</div>
                <div style={{ fontSize: 10, color: C.t400 }}>Saúde da obra</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 8px' }}>
              {[['CRONOGRAMA', '9.2', C.t900], ['ORÇAMENTO', '8.8', C.t900], ['QUALIDADE', '7.9', C.orange500], ['SEGURANÇA', '9.5', C.green600]].map(([k, v, col]) => (
                <div key={k}><div style={{ fontSize: 9, color: C.t400 }}>{k}</div><div style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.1, color: col }}>{v}</div></div>
              ))}
            </div>
          </Card>

        </div>
      </div>
      </div>
    </AppShell>
  );
};

// ─── DASHBOARD UC ────────────────────────────────────
const DashboardUCScreen = ({ onNavigate }) => {
  const quickActions = [
    { label: 'Quero Reformar', icon: Ic.Home, color: C.blue100, iconColor: C.blue600, screen: 'reformar' },
    { label: 'Quero Construir', icon: Ic.Building, color: C.green100, iconColor: C.green600, screen: 'construir' },
    { label: 'Pedir Orçamento', icon: Ic.Dollar, color: C.orange100, iconColor: C.orange600, screen: 'orcamento' },
    { label: 'Falar com MIS', icon: Ic.Sparkles, color: C.purple100, iconColor: C.purple600, screen: 'chat' },
  ];
  return (
    <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '24px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <MisBrand size={40} style={{ boxShadow: '0 8px 22px rgba(5,25,43,.20)' }} />
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 9, cursor: 'pointer', display: 'flex' }}><Ic.Search size={18} color={C.t600} /></button>
          <div style={{ position: 'relative' }}>
            <button style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 9, cursor: 'pointer', display: 'flex' }}><Ic.Bell size={18} color={C.t600} /></button>
            <div style={{ position: 'absolute', top: 2, right: 2, width: 14, height: 14, background: C.red500, borderRadius: 7, fontSize: 9, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>2</div>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 24px 100px', marginTop: 24 }}>
        {/* Oracle banner */}
        <Card style={{ padding: '20px', background: 'linear-gradient(135deg, #1C3A2A 0%, #1d4ed8 100%)', marginBottom: 20 }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <div style={{ width: 40, height: 40, background: 'rgba(255,255,255,0.15)', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Ic.Sparkles size={20} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 4 }}>Bom dia, Eduardo! 👋</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>Você tem 1 projeto em andamento. A concretagem da fundação está prevista para amanhã.</div>
              <button onClick={() => onNavigate('chat')} style={{ marginTop: 10, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 8, padding: '6px 14px', fontSize: 13, color: '#fff', cursor: 'pointer', fontFamily: 'inherit' }}>
                Falar com Oráculo →
              </button>
            </div>
          </div>
        </Card>

        {/* Quick actions */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: C.t900, marginBottom: 14 }}>O que você precisa?</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {quickActions.map(a => (
              <button key={a.label} onClick={() => onNavigate(a.screen)} style={{
                padding: '20px 16px', borderRadius: 14, background: a.color, border: 'none',
                cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
              }}>
                <div style={{ width: 40, height: 40, background: 'rgba(255,255,255,0.5)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                  <a.icon size={20} color={a.iconColor} />
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.t900 }}>{a.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div style={{ fontSize: 16, fontWeight: 600, color: C.t900, marginBottom: 14 }}>Meus Projetos</div>
        {[{ name: 'Residência Jardins', fase: 'Fundação', pct: 32, status: 'Em andamento', color: C.green500 }].map(p => (
          <Card key={p.name} onClick={() => onNavigate('detalhe_projeto')} style={{ padding: '18px', marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: C.t900 }}>{p.name}</div>
                <div style={{ fontSize: 13, color: C.t500, marginTop: 2 }}>Fase atual: {p.fase}</div>
              </div>
              <Badge color="green">{p.status}</Badge>
            </div>
            <ProgressBar value={p.pct} color={p.color} height={6} style={{ marginBottom: 6 }} />
            <div style={{ fontSize: 13, color: C.t500 }}>{p.pct}% concluído</div>
          </Card>
        ))}
        <button onClick={() => onNavigate('upload')} style={{
          width: '100%', padding: '14px', borderRadius: 12, border: `2px dashed ${C.border}`,
          background: 'transparent', cursor: 'pointer', fontSize: 14, color: C.t500, fontFamily: 'inherit',
        }}>+ Iniciar novo projeto</button>
      </div>
    </div>
  );
};

// ─── CHAT ORÁCULO ────────────────────────────────────
const ChatScreen = ({ onNavigate }) => {
  const [project, setProject] = useD(readActiveProject());
  React.useEffect(() => {
    const sync = e => setProject(e.detail || readActiveProject());
    window.addEventListener('mis:project-change', sync);
    return () => window.removeEventListener('mis:project-change', sync);
  }, []);
  const buildInitialMessages = currentProject => [
    { from: 'oracle', text: 'Olá, Eduardo! Sou o Oráculo MIS. Como posso ajudar você hoje?', time: '09:47' },
    ...(currentProject ? [
      { from: 'oracle', text: `Contexto ativo: ${currentProject.name} · ${currentProject.pct || 0}% concluído`, time: '09:47', isContext: true },
      { from: 'user', text: 'Qual o maior risco atual da obra?', time: '09:48' },
      { from: 'oracle', text: 'Com base nos dados atuais, identifico 3 riscos principais:\n\n1. **Atraso na Sala Técnica** (+5 dias) — as instalações elétricas dependem de material em trânsito.\n2. **Revestimento pendente** na Recepção — fornecedor sem data confirmada.\n3. **Budget próximo do limite** — 79% consumido com 22% da obra restante.', time: '09:48' },
    ] : [
      { from: 'oracle', text: 'Nenhum projeto está selecionado. Posso responder perguntas gerais ou você pode escolher um projeto para ativar análises contextuais.', time: '09:47', isContext: true },
    ])
  ];
  const [msgs, setMsgs] = useD(() => buildInitialMessages(project));
  const [input, setInput] = useD('');
  const isDark = typeof document !== 'undefined' && document.documentElement.dataset.theme === 'dark';
  const lightChatPanel = '#D1CDCD';
  const lightOracleBubble = '#E2DEDE';
  const lightChatBorder = 'rgba(255,255,255,.38)';
  const chips = project ? ['Gerar relatório', 'Ver suprimentos', 'Replanejar cronograma', 'Analisar orçamento'] : ['Selecionar projeto', 'Visão geral da carteira', 'Criar relatório executivo'];

  const send = () => {
    if (!input.trim()) return;
    if (input === 'Selecionar projeto') { onNavigate('projetos'); setInput(''); return; }
    setMsgs(m => [...m, { from: 'user', text: input, time: 'agora' }, { from: 'oracle', text: project ? 'Analisando os dados da obra... Processando sua solicitação com base no contexto atual do projeto.' : 'Analisando os dados gerais da operação MIS para responder à sua solicitação.', time: 'agora', loading: true }]);
    setInput('');
  };

  return (
    <AppShell active="chat" onNavigate={onNavigate}>
      <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0 0 16px', borderBottom: `1px solid ${C.border}`, marginBottom: 16 }}>
          <div style={{ width: 40, height: 40, background: 'linear-gradient(135deg, #1C3A2A, #1d4ed8)', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Ic.Sparkles size={18} color="#fff" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: C.t900 }}>Oráculo MIS</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: C.t500 }}>
              <StatusDot color={C.green500} size={7} />
              Online · Contexto: {project ? project.name : 'Visão geral da empresa'}
            </div>
          </div>
          <button onClick={() => { if (project) { clearActiveProject(); setProject(null); setMsgs(buildInitialMessages(null)); } else { onNavigate('projetos'); } }} style={{ background: project ? C.navActive : C.blue100, border: 'none', borderRadius: 8, padding: '6px 12px', fontSize: 13, color: project ? '#fff' : C.blue600, cursor: 'pointer', fontFamily: 'inherit', boxShadow: project ? '0 8px 16px rgba(2,3,59,.18)' : 'none' }}>{project ? '✕ Limpar contexto' : 'Selecionar projeto'}</button>
        </div>

        <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Messages container */}
          <div style={{
            flex: 1,
            minHeight: 0,
            overflow: 'hidden',
            borderRadius: 24,
            background: isDark
              ? 'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.03)), rgba(21,31,49,0.62)'
              : lightChatPanel,
            border: isDark ? '1px solid rgba(255,255,255,0.10)' : `1px solid ${lightChatBorder}`,
            boxShadow: isDark
              ? '0 18px 40px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.06)'
              : '10px 10px 24px rgba(126,126,126,.10), -6px -6px 16px rgba(255,255,255,.16), inset 0 1px 0 rgba(255,255,255,.22)',
            padding: 20,
          }}>
            <div style={{ height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16, paddingRight: 8 }}>
              {msgs.map((m, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start' }}>
                  {m.from === 'oracle' && (
                    <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg, #1C3A2A, #1d4ed8)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                      <Ic.Sparkles size={14} color="#fff" />
                    </div>
                  )}
                  <div style={{ maxWidth: '70%' }}>
                    {m.isContext ? (
                      <div style={{
                        background: isDark ? 'rgba(18, 120, 86, 0.16)' : '#DDF2E6',
                        border: isDark ? '1px solid rgba(34, 197, 94, 0.22)' : `1px solid ${C.green500}26`,
                        borderRadius: 10,
                        padding: '8px 14px',
                        fontSize: 13,
                        color: isDark ? '#7EE0A8' : C.green600,
                        boxShadow: isDark ? '0 10px 24px rgba(0,0,0,0.16)' : '0 4px 10px rgba(126,126,126,.08)'
                      }}>
                        🏗️ {m.text}
                      </div>
                    ) : (
                      <div style={{
                        background: m.from === 'user'
                          ? (isDark ? 'linear-gradient(180deg, rgba(78, 111, 216, 0.34), rgba(49, 76, 158, 0.28)), rgba(40, 58, 96, 0.86)' : '#02033B')
                          : (isDark ? 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.05)), rgba(29, 44, 70, 0.72)' : lightOracleBubble),
                        border: m.from === 'user'
                          ? (isDark ? '1px solid rgba(120, 155, 255, 0.22)' : 'none')
                          : (isDark ? '1px solid rgba(255,255,255,0.10)' : `1px solid ${lightChatBorder}`),
                        borderRadius: m.from === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                        padding: '12px 16px',
                        boxShadow: isDark ? '0 14px 28px rgba(0,0,0,0.14)' : '0 6px 16px rgba(126,126,126,.08), inset 0 1px 0 rgba(255,255,255,.16)',
                        backdropFilter: isDark ? 'blur(12px)' : 'none',
                      }}>
                        <div style={{ fontSize: 14, color: m.from === 'user' ? '#F8FBFF' : (isDark ? '#EAF1F8' : C.t900), lineHeight: 1.6, whiteSpace: 'pre-line' }}>{m.text}</div>
                        <div style={{ fontSize: 11, color: m.from === 'user' ? (isDark ? 'rgba(248,251,255,0.68)' : 'rgba(255,255,255,0.68)') : (isDark ? '#8EA0B6' : C.t400), marginTop: 6, textAlign: 'right' }}>{m.time}</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Suggestion chips */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', paddingLeft: 42 }}>
                {chips.map(c => (
                  <button key={c} onClick={() => setInput(c)} style={{
                    padding: '6px 14px', borderRadius: 20,
                    background: isDark ? 'rgba(255,255,255,0.08)' : '#D8D4D4',
                    border: isDark ? '1px solid rgba(255,255,255,0.10)' : `1px solid ${lightChatBorder}`,
                    fontSize: 13, color: isDark ? '#DCE6F3' : C.t700,
                    cursor: 'pointer', fontFamily: 'inherit',
                    boxShadow: isDark ? '0 8px 18px rgba(0,0,0,0.12)' : '0 4px 12px rgba(126,126,126,.06)',
                  }}>{c}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Input */}
          <div style={{
            borderTop: `1px solid ${isDark ? C.border : lightChatBorder}`,
            paddingTop: 16,
            display: 'flex',
            gap: 10,
            alignItems: 'flex-end',
          }}>
            <button style={{ background: 'none', border: 'none', padding: 8, cursor: 'pointer', color: C.t400, display: 'flex' }}><Ic.Mic size={20} /></button>
            <div style={{
              flex: 1,
              background: isDark ? 'rgba(255,255,255,0.08)' : '#D8D4D4',
              border: isDark ? '1.5px solid rgba(255,255,255,0.10)' : `1.5px solid ${lightChatBorder}`,
              borderRadius: 14,
              padding: '10px 14px',
              boxShadow: isDark ? '0 10px 22px rgba(0,0,0,0.12)' : '0 6px 16px rgba(126,126,126,.08), inset 0 1px 0 rgba(255,255,255,.16)',
              backdropFilter: isDark ? 'blur(12px)' : 'none'
            }}>
              <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Digite uma mensagem..." style={{ width: '100%', border: 'none', outline: 'none', fontSize: 14, color: isDark ? '#ECF3FB' : C.t900, fontFamily: 'inherit', background: 'transparent' }} />
            </div>
            <button style={{ background: 'none', border: 'none', padding: 8, cursor: 'pointer', color: C.t400, display: 'flex' }}><Ic.Paperclip size={20} /></button>
            <button onClick={send} style={{
              width: 42, height: 42, background: C.t900, border: 'none', borderRadius: 21,
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}><Ic.Send size={16} color="#fff" /></button>
          </div>
        </div>
      </div>
    </AppShell>
  );
};

Object.assign(window, { DashboardScreen, DashboardUCScreen, ChatScreen });

// mis-projetos.jsx — Projetos (lista), Detalhe do Projeto, Cronograma

const { useState: useP } = React;

