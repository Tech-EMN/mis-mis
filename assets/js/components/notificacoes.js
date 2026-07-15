/* === NOTIFICACOES === */

const NotificacoesScreen = ({ onNavigate }) => {
  const [filter, setFilter] = useSys('todas');
  const groups = [
    { label: 'Hoje', items: [
      { icon: Ic.AlertCircle, iconBg: C.red100, iconC: C.red600, text: 'Atraso crítico na entrega de concreto — Residencial Aurora', time: '09:12', unread: true, screen: 'alertas' },
      { icon: Ic.Check, iconBg: C.green100, iconC: C.green600, text: 'Estrutura Torre B concluída — validado pela engenharia', time: '08:50', unread: true, screen: 'dashboard' },
      { icon: Ic.Package, iconBg: C.orange100, iconC: C.orange600, text: 'Estoque de Cimento CP-II abaixo do mínimo — Residencial Aurora', time: '08:30', unread: true, screen: 'suprimentos' },
      { icon: Ic.Clipboard, iconBg: C.blue100, iconC: C.blue600, text: 'Nova pendência atribuída a você — Torre Central', time: '08:15', unread: false, screen: 'pendencias' },
      { icon: Ic.Sparkles, iconBg: C.purple100, iconC: C.purple600, text: 'Oráculo MIS: 3 sugestões geradas para o Edifício Nórdica', time: '08:00', unread: false, screen: 'chat' },
    ]},
    { label: 'Ontem', items: [
      { icon: Ic.FileText, iconBg: C.blue100, iconC: C.blue600, text: 'Relatório semanal disponível — Villa Aurora', time: '17:30', unread: false, screen: 'atualizacoes' },
      { icon: Ic.AlertTriangle, iconBg: C.orange100, iconC: C.orange600, text: 'Equipe abaixo do previsto — Edifício Horizonte', time: '15:00', unread: false, screen: 'alertas' },
      { icon: Ic.Dollar, iconBg: C.green100, iconC: C.green600, text: 'Proposta de orçamento aprovada — Residência Jardins', time: '11:22', unread: false, screen: 'proposta' },
    ]},
    { label: 'Semana passada', items: [
      { icon: Ic.User, iconBg: C.blue100, iconC: C.blue600, text: 'Ricardo Alves entrou no projeto Torre Central', time: 'Seg', unread: false, screen: 'projetos' },
      { icon: Ic.Camera, iconBg: C.purple100, iconC: C.purple600, text: '12 novas fotos publicadas — Galpão Logístico Norte', time: 'Dom', unread: false, screen: 'relatorio_foto' },
    ]},
  ];
  const filterTabs = ['todas','alertas','obras','financeiro','mensagens','sistema'];

  return (
    <AppShell active="notificacoes" onNavigate={onNavigate}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <SectionHeader title="Notificações" style={{ marginBottom: 0 }} />
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: C.blue600, fontFamily: 'inherit', fontWeight: 500 }}>Marcar todas como lidas</button>
      </div>

      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1 }}>
          <ChipBar chips={filterTabs.map(f => ({ id: f, label: f.charAt(0).toUpperCase() + f.slice(1) }))} active={filter} onChange={setFilter} style={{ marginBottom: 20 }} />

          {groups.map(group => (
            <div key={group.label} style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: C.t400, letterSpacing: 0.5, marginBottom: 12 }}>{group.label.toUpperCase()}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {group.items.map((item, i) => (
                  <div key={i} className={`notification-row ${item.unread ? 'is-unread' : ''}`} onClick={() => onNavigate(item.screen)} style={{
                    display: 'flex', gap: 12, alignItems: 'flex-start',
                    padding: '14px 16px', borderRadius: 12,
                    background: item.unread ? '#F8FFF8' : C.card,
                    border: `1px solid ${item.unread ? C.green100 : C.border}`,
                    cursor: 'pointer', transition: 'all 0.15s',
                  }}>
                    <div style={{ width: 38, height: 38, background: item.iconBg, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <item.icon size={18} color={item.iconC} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, color: C.t900, fontWeight: item.unread ? 500 : 400, lineHeight: 1.5 }}>{item.text}</div>
                    </div>
                    <div style={{ display: 'flex', flex: 'column', align: 'flex-end', gap: 6 }}>
                      <div style={{ fontSize: 12, color: C.t400, whiteSpace: 'nowrap' }}>{item.time}</div>
                      {item.unread && <div style={{ width: 8, height: 8, borderRadius: 4, background: C.blue500, marginLeft: 'auto' }} />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ width: 240, flexShrink: 0 }}>
          <Card style={{ padding: '18px 20px' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.t900, marginBottom: 14 }}>Resumo</div>
            {[{ l: 'Não lidas', v: 3, c: C.blue600 }, { l: 'Hoje', v: 5, c: C.t900 }, { l: 'Esta semana', v: 10, c: C.t900 }].map(k => (
              <div key={k.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${C.borderLight}`, fontSize: 14 }}>
                <span style={{ color: C.t500 }}>{k.l}</span>
                <span style={{ fontWeight: 700, color: k.c }}>{k.v}</span>
              </div>
            ))}
            <button style={{ marginTop: 14, width: '100%', padding: '9px', background: 'none', border: `1.5px solid ${C.border}`, borderRadius: 10, fontSize: 13, color: C.t500, cursor: 'pointer', fontFamily: 'inherit' }}>
              Preferências de notificação
            </button>
          </Card>
        </div>
      </div>
    </AppShell>
  );
};

// ─── CONFIGURAÇÕES ─────────────────────────────────────
