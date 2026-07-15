/* === ORCAMENTO PROPOSTAS === */

    { cod: 'HID-002', desc: 'Registro de gaveta 1/2"', un: 'un', qt: 14, pu: 65, orig: 'Manual' },
    { cod: 'ELE-001', desc: 'Eletroduto corrugado 3/4"', un: 'm', qt: 420, pu: 12, orig: 'IA' },
    { cod: 'ACB-001', desc: 'Porcelanato 90×90 retif.', un: 'm²', qt: 198, pu: 145, orig: 'IA' },
  ];
  const total = itens.reduce((s, i) => s + i.qt * i.pu, 0);

  return (
    <AppShell active="orcamento_quant" onNavigate={onNavigate}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => onNavigate('analise')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: C.t500, fontSize: 14, fontFamily: 'inherit' }}>
            <Ic.ArrowLeft size={16} /> Análise
          </button>
          <span style={{ color: C.t300 }}>/</span>
          <span style={{ fontSize: 14, fontWeight: 500, color: C.t900 }}>Orçamento quantitativo — {readProjectDraft().name || 'Novo projeto'}</span>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Btn variant="secondary" icon={<Ic.Download size={14} />}>Exportar Excel</Btn>
          <Btn onClick={() => onNavigate('proposta')} icon={<Ic.FileText size={14} />}>Gerar Proposta</Btn>
        </div>
      </div>

      <Card style={{ padding: '18px 20px', marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
          <TabBar tabs={[{id:'disciplina',label:'Por disciplina'},{id:'etapa',label:'Por etapa'},{id:'ambiente',label:'Por ambiente'}]} active={tab} onChange={setTab} />
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: C.borderLight, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: '7px 12px' }}>
              <Ic.Search size={14} color={C.t400} />
              <input placeholder="Buscar item..." style={{ border: 'none', outline: 'none', fontSize: 13, background: 'transparent', fontFamily: 'inherit', width: 180 }} />
            </div>
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: C.borderLight }}>
              {['Cód.', 'Descrição', 'Un.', 'Quantidade', 'P. Unit. (R$)', 'Total (R$)', 'Origem'].map(h => (
                <th key={h} style={{ padding: '10px 12px', textAlign: h === 'Descrição' ? 'left' : 'right', color: C.t500, fontWeight: 600, fontSize: 12, borderBottom: `1px solid ${C.border}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {itens.map(item => (
              <tr key={item.cod} style={{ borderBottom: `1px solid ${C.borderLight}` }}>
                <td style={{ padding: '10px 12px', color: C.t400, fontFamily: 'monospace', fontSize: 12 }}>{item.cod}</td>
                <td style={{ padding: '10px 12px', color: C.t900, fontWeight: 500 }}>{item.desc}</td>
                <td style={{ padding: '10px 12px', textAlign: 'right', color: C.t500 }}>{item.un}</td>
                <td style={{ padding: '10px 12px', textAlign: 'right', color: C.t900 }}>{item.qt.toFixed(1)}</td>
                <td style={{ padding: '10px 12px', textAlign: 'right', color: C.t900 }}>
                  <input defaultValue={item.pu.toFixed(2)} style={{ width: 80, textAlign: 'right', border: `1px solid ${C.border}`, borderRadius: 6, padding: '4px 8px', fontSize: 13, fontFamily: 'inherit', outline: 'none' }} />
                </td>
                <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 600, color: C.blue600 }}>R$ {(item.qt * item.pu).toLocaleString('pt-BR')}</td>
                <td style={{ padding: '10px 12px', textAlign: 'right' }}>
                  <Badge color={item.orig === 'IA' ? 'purple' : 'gray'}>{item.orig}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Footer total */}
      <Card style={{ padding: '18px 24px', background: C.t900 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 32 }}>
            {[{ l: 'Subtotal', v: `R$ ${(total * 0.85).toLocaleString('pt-BR')}` }, { l: 'BDI (18%)', v: `R$ ${(total * 0.15).toLocaleString('pt-BR')}` }].map(k => (
              <div key={k.l}><div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{k.l}</div><div style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>{k.v}</div></div>
            ))}
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Total geral</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#fff' }}>R$ {total.toLocaleString('pt-BR')}</div>
          </div>
          <Btn onClick={() => onNavigate('proposta')} variant="outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>Gerar Proposta →</Btn>
        </div>
      </Card>
    </AppShell>
  );
};

// ─── PROPOSTA ORÇAMENTÁRIA ─────────────────────────────
const PropostaOrcamentoScreen = ({ onNavigate }) => (
  <AppShell active="proposta" onNavigate={onNavigate}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => onNavigate('orcamento_quant')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: C.t500, fontSize: 14, fontFamily: 'inherit' }}><Ic.ArrowLeft size={16} /> Orçamento</button>
        <span style={{ color: C.t300 }}>/</span>
        <span style={{ fontSize: 14, fontWeight: 500, color: C.t900 }}>Proposta — {readProjectDraft().name || 'Novo projeto'}</span>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <Btn variant="secondary" icon={<Ic.Download size={14} />}>Exportar PDF</Btn>
        <Btn onClick={() => onNavigate('aprovacao')} icon={<Ic.Send size={14} />}>Enviar para aprovação</Btn>
      </div>
    </div>

    <div style={{ display: 'flex', gap: 16 }}>
      <Card style={{ flex: 1, padding: '32px' }}>
        {/* Header proposta */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32, paddingBottom: 24, borderBottom: `2px solid ${C.t900}` }}>
          <div>
            <MisBrand size={48} style={{ marginBottom: 12, boxShadow: '0 8px 24px rgba(5,25,43,.20)' }} />
            <div style={{ fontSize: 13, color: C.t500 }}>M Group Intelligence System</div>
            <div style={{ fontSize: 12, color: C.t400 }}>contato@mgroup.com.br · (11) 99999-0000</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: C.t900 }}>PROPOSTA ORÇAMENTÁRIA</div>
            <div style={{ fontSize: 13, color: C.t500, marginTop: 4 }}>Nº 2025-0042 · Emitida em 02/06/2025</div>
            <div style={{ fontSize: 13, color: C.t500 }}>Válida até: 02/07/2025</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 28 }}>
          <div><div style={{ fontSize: 12, color: C.t400, marginBottom: 4 }}>CLIENTE</div><div style={{ fontSize: 15, fontWeight: 600, color: C.t900 }}>{readProjectDraft().client || 'Cliente em cadastro'}</div><div style={{ fontSize: 13, color: C.t500 }}>{readProjectDraft().responsible || 'Responsável comercial'}</div></div>
          <div><div style={{ fontSize: 12, color: C.t400, marginBottom: 4 }}>OBRA</div><div style={{ fontSize: 15, fontWeight: 600, color: C.t900 }}>{readProjectDraft().name || 'Novo projeto'}</div><div style={{ fontSize: 13, color: C.t500 }}>{readProjectDraft().city || 'Local a definir'}</div></div>
        </div>

        <Card style={{ padding: '16px 20px', background: C.borderLight, marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.t900, marginBottom: 6 }}>Resumo executivo (gerado pelo Oráculo MIS)</div>
          <div style={{ fontSize: 13, color: C.t700, lineHeight: 1.6 }}>
            A proposta cobre o escopo consolidado do novo projeto, incluindo as disciplinas identificadas na análise técnica, especificações qualitativas, quantitativos e condições comerciais. O escopo contempla fornecimento de mão de obra e materiais conforme levantamento quantitativo gerado pela IA.
          </div>
        </Card>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }}>
          <thead>
            <tr style={{ background: C.t900 }}>
              {['Disciplina', 'Descrição', 'Valor'].map(h => (
                <th key={h} style={{ padding: '10px 16px', textAlign: h === 'Valor' ? 'right' : 'left', color: '#fff', fontSize: 13 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[['Estrutura', '14 atividades · fundação, pilares, lajes', 'R$ 68.400'], ['Vedações', '8 atividades · alvenaria, revestimentos', 'R$ 22.100'], ['Hidráulica', '11 atividades · tubulação, louças, metais', 'R$ 18.700'], ['Elétrica', '9 atividades · eletrodutos, quadros, pontos', 'R$ 24.300'], ['Acabamentos', '17 atividades · pisos, pinturas, forros', 'R$ 41.800']].map(([d, desc, v], i) => (
              <tr key={d} style={{ background: i % 2 === 0 ? '#fff' : C.borderLight, borderBottom: `1px solid ${C.border}` }}>
                <td style={{ padding: '12px 16px', fontWeight: 600, color: C.t900 }}>{d}</td>
                <td style={{ padding: '12px 16px', color: C.t500 }}>{desc}</td>
                <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 700, color: C.t900 }}>{v}</td>
              </tr>
            ))}
            <tr style={{ background: C.t900 }}>
              <td colSpan={2} style={{ padding: '14px 16px', color: '#fff', fontWeight: 700 }}>TOTAL GERAL (com BDI 18%)</td>
              <td style={{ padding: '14px 16px', textAlign: 'right', color: '#fff', fontWeight: 800, fontSize: 18 }}>R$ 175.300</td>
            </tr>
          </tbody>
        </table>

        <div style={{ fontSize: 12, color: C.t400 }}>Condições: pagamento em 4× mensais · prazo de execução: 90 dias · validade da proposta: 30 dias.</div>
      </Card>

      <div style={{ width: 240, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Card style={{ padding: '18px 20px' }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: C.t900, marginBottom: 14 }}>Ações</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Btn onClick={() => onNavigate('aprovacao')} style={{ width: '100%', justifyContent: 'center' }} icon={<Ic.Send size={14} />}>Enviar ao cliente</Btn>
            <Btn variant="secondary" style={{ width: '100%', justifyContent: 'center' }} icon={<Ic.Download size={14} />}>Exportar PDF</Btn>
            <Btn variant="ghost" style={{ width: '100%', justifyContent: 'center' }} icon={<Ic.Edit size={14} />}>Editar proposta</Btn>
          </div>
        </Card>
        <Card style={{ padding: '18px 20px' }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: C.t900, marginBottom: 10 }}>Status</div>
          <Badge color="orange" dot>Aguardando envio</Badge>
        </Card>
      </div>
    </div>
  </AppShell>
);

// ─── APROVAÇÃO DE PROPOSTA ─────────────────────────────
const AprovacaoPropostaScreen = ({ onNavigate }) => {
  const [decision, setDecision] = useQ(null);
  const draft = readProjectDraft();
  const activateProject = () => {
    const created = writeActiveProject({
      id: `draft-${Date.now()}`,
      name: draft.name || 'Novo projeto',
      loc: draft.city || 'Local a definir',
      address: draft.city || 'Local a definir',
      pct: 0,
      deadline: 'A definir',
      team: 1,
      budget: '175300',
      area: 'A definir',
      status: 'planejamento',
      priority: draft.priority || 'Média',
      type: draft.type || 'Residencial',
      resp: draft.responsible || 'Eduardo Nunes',
      alerts: 0,
    });
    localStorage.removeItem('mis_project_draft');
    onNavigate('dashboard');
  };
  return (
    <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ maxWidth: 620, width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <MisBrand size={52} style={{ margin: '0 auto 14px', boxShadow: '0 10px 28px rgba(5,25,43,.22)' }} />
          <h2 style={{ fontSize: 22, fontWeight: 700, color: C.t900 }}>Proposta de Orçamento</h2>
          <p style={{ fontSize: 14, color: C.t500, marginTop: 4 }}>{draft.name || 'Novo projeto'}</p>
        </div>

        <Card style={{ padding: '24px', marginBottom: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 16, marginBottom: 20 }}>
            {[{ l: 'Projeto', v: draft.name || 'Novo projeto' }, { l: 'Responsável', v: draft.responsible || 'Eduardo Nunes' }, { l: 'Valor total', v: 'R$ 175.300' }, { l: 'Validade', v: '02/07/2025' }].map(k => (
              <div key={k.l}><div style={{ fontSize: 12, color: C.t400 }}>{k.l}</div><div style={{ fontSize: 14, fontWeight: 600, color: C.t900, marginTop: 2 }}>{k.v}</div></div>
            ))}
          </div>
          <ProgressBar value={100} color={C.blue500} height={6} />
          <div style={{ fontSize: 12, color: C.t400, marginTop: 6 }}>Orçamento completo · 59 itens · 5 disciplinas</div>
        </Card>

        {!decision ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <button onClick={() => setDecision('aprovar')} style={{ padding: '18px', borderRadius: 14, border: `2px solid ${C.navActive}`, background: C.navActive, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 14, color: '#fff', boxShadow: '0 12px 24px rgba(2,3,59,.20)' }}>
              <div style={{ width: 44, height: 44, background: 'rgba(255,255,255,.14)', borderRadius: 22, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ic.Check size={20} color="#fff" /></div>
              <div style={{ textAlign: 'left' }}><div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>✅ Aprovar proposta</div><div style={{ fontSize: 13, color: 'rgba(255,255,255,.72)' }}>Dar início aos trabalhos conforme escopo apresentado.</div></div>
            </button>
            <button onClick={() => setDecision('revisar')} style={{ padding: '18px', borderRadius: 14, border: `2px solid ${C.orange500}`, background: C.orange100, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 44, height: 44, background: C.orange500, borderRadius: 22, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ic.Refresh size={20} color="#fff" /></div>
              <div style={{ textAlign: 'left' }}><div style={{ fontSize: 16, fontWeight: 700, color: C.orange600 }}>🔄 Solicitar revisão</div><div style={{ fontSize: 13, color: C.t500 }}>Pedir ajustes no escopo ou nos valores apresentados.</div></div>
            </button>
            <button style={{ padding: '14px', borderRadius: 14, border: `1.5px solid ${C.border}`, background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, color: C.t500 }}>❌ Recusar proposta</button>
          </div>
        ) : (
          <Card style={{ padding: '28px', textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>{decision === 'aprovar' ? '🎉' : '📝'}</div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: C.t900, marginBottom: 8 }}>{decision === 'aprovar' ? 'Proposta aprovada!' : 'Revisão solicitada'}</h3>
            <p style={{ fontSize: 14, color: C.t500, marginBottom: 24 }}>{decision === 'aprovar' ? 'O contrato será gerado e enviado em breve. A equipe já foi notificada.' : 'Descreva o que precisa ser ajustado:'}</p>
            {decision === 'revisar' && <textarea placeholder="O que precisa mudar?" style={{ width: '100%', padding: '12px', border: `1.5px solid ${C.border}`, borderRadius: 10, fontSize: 14, fontFamily: 'inherit', resize: 'vertical', minHeight: 80, outline: 'none', marginBottom: 16 }} />}
            <Btn onClick={() => decision === 'aprovar' ? activateProject() : onNavigate('proposta')} style={{ padding: '12px 32px' }}>{decision === 'aprovar' ? 'Criar projeto e abrir dashboard' : 'Enviar revisão'}</Btn>
          </Card>
        )}

        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <button onClick={() => onNavigate('chat')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: C.t500, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6, margin: '0 auto' }}>
            <Ic.Sparkles size={14} color={C.t400} /> Tirar dúvidas com o Oráculo MIS
          </button>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { QueroReformarScreen, QueroOrcamentoScreen, AnaliseArquivosScreen, OrcamentoQuantScreen, PropostaOrcamentoScreen, AprovacaoPropostaScreen });

// mis-ops.jsx — MIS Feed, Suprimentos, Pendências, Alertas, Atualizações, Upload
// Rebuilt to match reference design

const { useState: useOp } = React;

// ─── Circular Progress ────────────────────────────────────────────────────────
const CircProg = ({ value, size = 56, color, stroke = 3.5 }) => {
  const col = color || (value >= 70 ? C.green500 : value >= 50 ? C.blue500 : C.orange500);
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#E5E7EB" strokeWidth={stroke}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={col} strokeWidth={stroke}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"/>
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: Math.round(size * 0.24), fontWeight: 700, color: col, lineHeight: 1 }}>{value}%</span>
      </div>
    </div>
  );
};

