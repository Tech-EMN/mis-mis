/* === ORCAMENTO === */

const QueroReformarScreen = ({ onNavigate }) => {
  const [step, setStep] = useQ(1);
  const [tipo, setTipo] = useQ(null);
  const [imovel, setImovel] = useQ(null);
  const [orcamento, setOrcamento] = useQ(null);

  const tipos = ['Banheiro','Cozinha','Sala / Quarto','Área externa','Fachada','Casa completa','Outro'];
  const imoveis = ['Casa','Apartamento','Comercial','Outro'];
  const budgets = ['Até R$ 5k','R$ 5k – 20k','R$ 20k – 50k','R$ 50k – 100k','Acima de R$ 100k','Não sei'];

  const StepBar = () => (
    <div style={{ display: 'flex', gap: 4, marginBottom: 28 }}>
      {[1,2,3,4].map(i => (
        <div key={i} style={{ flex: 1, height: 4, borderRadius: 4, background: i <= step ? C.navActive : C.border, transition: 'background 0.3s' }} />
      ))}
    </div>
  );

  const wrap = (content) => (
    <AppShell active="reformar" onNavigate={onNavigate}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <button onClick={() => step > 1 ? setStep(step - 1) : onNavigate('dashboard')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: C.t500, fontSize: 14, fontFamily: 'inherit' }}>
            <Ic.ArrowLeft size={16} /> {step > 1 ? 'Voltar' : 'Dashboard'}
          </button>
          <span style={{ color: C.t300 }}>·</span>
          <span style={{ fontSize: 13, color: C.t400 }}>Etapa {step} de 4</span>
        </div>
        <StepBar />
        {content}
      </div>
    </AppShell>
  );

  if (step === 1) return wrap(
    <div>
      <h2 style={{ fontSize: 26, fontWeight: 700, color: C.t900, marginBottom: 6 }}>Quero Reformar</h2>
      <p style={{ fontSize: 15, color: C.t500, marginBottom: 28 }}>Qual parte do imóvel você quer reformar?</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 24 }}>
        {tipos.map(t => (
          <button key={t} className={`mis-select-btn${tipo === t ? ' active' : ''}`} aria-pressed={tipo === t} onClick={() => setTipo(t)} style={{
            padding: '20px 16px', borderRadius: 14, textAlign: 'center',
            border: `2px solid ${tipo === t ? C.navActive : C.border}`,
            background: tipo === t ? '#F0FFF4' : C.card,
            cursor: 'pointer', fontFamily: 'inherit',
            fontSize: 14, fontWeight: tipo === t ? 600 : 400,
            color: tipo === t ? C.navActive : C.t700, transition: 'all 0.15s',
          }}>{t}</button>
        ))}
      </div>
      <div style={{ marginBottom: 24 }}>
        <label style={{ fontSize: 13, fontWeight: 500, color: C.t700, display: 'block', marginBottom: 8 }}>Ou descreva com suas palavras (opcional)</label>
        <textarea placeholder="Ex: quero reformar o banheiro principal..." style={{ width: '100%', padding: '12px 14px', border: `1.5px solid ${C.border}`, borderRadius: 10, fontSize: 14, fontFamily: 'inherit', resize: 'vertical', minHeight: 80, outline: 'none' }} />
      </div>
      <Btn onClick={() => tipo && setStep(2)} disabled={!tipo} style={{ padding: '12px 40px', fontSize: 15 }}>Continuar →</Btn>
    </div>
  );

  if (step === 2) return wrap(
    <div>
      <h2 style={{ fontSize: 26, fontWeight: 700, color: C.t900, marginBottom: 6 }}>Contexto do imóvel</h2>
      <p style={{ fontSize: 15, color: C.t500, marginBottom: 28 }}>Nos conte um pouco sobre o local da reforma.</p>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: C.t700, marginBottom: 10 }}>Tipo de imóvel</div>
        <div style={{ display: 'flex', gap: 10 }}>
          {imoveis.map(im => (
            <button key={im} className={`mis-select-btn${imovel === im ? ' active' : ''}`} aria-pressed={imovel === im} onClick={() => setImovel(im)} style={{
              padding: '10px 22px', borderRadius: 20, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit',
              border: `2px solid ${imovel === im ? C.navActive : C.border}`,
              background: imovel === im ? '#F0FFF4' : C.card, color: imovel === im ? C.navActive : C.t700,
              fontWeight: imovel === im ? 600 : 400, transition: 'all 0.15s',
            }}>{im}</button>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: C.t700, marginBottom: 10 }}>Área aproximada</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <input type="range" min={5} max={300} defaultValue={40} style={{ flex: 1, accentColor: C.navActive }} />
          <div style={{ background: C.borderLight, padding: '6px 16px', borderRadius: 8, fontSize: 14, fontWeight: 600, color: C.t900, minWidth: 70, textAlign: 'center' }}>40 m²</div>
        </div>
      </div>
      <Input label="CEP / Localização" placeholder="01310-100 ou cidade, estado" style={{ marginBottom: 24 }} />
      <Btn onClick={() => imovel && setStep(3)} disabled={!imovel} style={{ padding: '12px 40px', fontSize: 15 }}>Continuar →</Btn>
    </div>
  );

  if (step === 3) return wrap(
    <div>
      <h2 style={{ fontSize: 26, fontWeight: 700, color: C.t900, marginBottom: 6 }}>Orçamento e prazo</h2>
      <p style={{ fontSize: 15, color: C.t500, marginBottom: 28 }}>Nos ajude a encontrar a melhor solução para o seu bolso.</p>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: C.t700, marginBottom: 10 }}>Orçamento disponível</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          {budgets.map(b => (
            <button key={b} className={`mis-select-btn${orcamento === b ? ' active' : ''}`} aria-pressed={orcamento === b} onClick={() => setOrcamento(b)} style={{
              padding: '12px', borderRadius: 12, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit',
              border: `2px solid ${orcamento === b ? C.navActive : C.border}`,
              background: orcamento === b ? '#F0FFF4' : C.card, color: orcamento === b ? C.navActive : C.t700,
              fontWeight: orcamento === b ? 600 : 400, transition: 'all 0.15s',
            }}>{b}</button>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: C.t700, marginBottom: 10 }}>Urgência</div>
        <div style={{ display: 'flex', gap: 10 }}>
          {['Sem pressa','Moderada','Urgente'].map(u => (
            <button key={u} style={{ padding: '10px 20px', borderRadius: 20, border: `1.5px solid ${C.border}`, background: C.card, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', color: C.t700 }}>{u}</button>
          ))}
        </div>
      </div>
      <Btn onClick={() => orcamento && setStep(4)} disabled={!orcamento} style={{ padding: '12px 40px', fontSize: 15 }}>Continuar →</Btn>
    </div>
  );

  return wrap(
    <div>
      <h2 style={{ fontSize: 26, fontWeight: 700, color: C.t900, marginBottom: 6 }}>Diagnóstico MIS</h2>
      <p style={{ fontSize: 15, color: C.t500, marginBottom: 24 }}>O Oráculo analisou seu projeto. Veja o resultado:</p>
      <Card style={{ padding: '20px', background: 'linear-gradient(135deg, #1C3A2A 0%, #1d4ed8 100%)', marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ width: 40, height: 40, background: 'rgba(255,255,255,0.15)', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Ic.Sparkles size={18} color="#fff" />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 6 }}>Diagnóstico do Oráculo MIS</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
              Para uma reforma de <strong style={{ color: '#fff' }}>{tipo?.toLowerCase()}</strong> em {imovel?.toLowerCase()} com {orcamento?.toLowerCase()}, identifiquei as melhores opções da região. Prazo estimado: <strong style={{ color: '#fff' }}>30 a 45 dias</strong>.
            </div>
          </div>
        </div>
      </Card>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 24 }}>
        {[{ l: 'Estimativa', v: 'R$ 12k – 18k', c: C.blue600 }, { l: 'Prazo típico', v: '30–45 dias', c: C.t900 }, { l: 'Profissionais', v: '4 disponíveis', c: C.green600 }].map(k => (
          <Card key={k.l} style={{ padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: k.c }}>{k.v}</div>
            <div style={{ fontSize: 12, color: C.t500, marginTop: 4 }}>{k.l}</div>
          </Card>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <Btn onClick={() => onNavigate('orcamento_quant')} style={{ flex: 1, justifyContent: 'center', padding: '12px' }}>Gerar orçamento completo</Btn>
        <Btn variant="secondary" onClick={() => onNavigate('chat')} style={{ flex: 1, justifyContent: 'center', padding: '12px' }}>Falar com o Oráculo</Btn>
      </div>
    </div>
  );
};

// ─── QUERO ORÇAMENTO (entry) ────────────────────────────
const QueroOrcamentoScreen = ({ onNavigate }) => (
  <AppShell active="orcamento" onNavigate={onNavigate}>
    <SectionHeader title="Pedir Orçamento" subtitle="Escolha como quer começar o seu orçamento." />
    <div style={{ maxWidth: 700, margin: '0 auto' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
        {[
          { icon: Ic.FileText, title: 'Tenho um arquivo', sub: 'Envie sua planta, PDF ou DWG e a IA extrai automaticamente tudo que precisa.', color: C.blue100, iconColor: C.blue600, screen: 'upload' },
          { icon: Ic.Message, title: 'Quero descrever o que preciso', sub: 'Converse com o Oráculo e receba o orçamento personalizado em minutos.', color: C.purple100, iconColor: C.purple600, screen: 'chat' },
          { icon: Ic.Camera, title: 'Vou enviar fotos', sub: 'Tire fotos do ambiente e deixe a IA identificar os serviços necessários.', color: C.green100, iconColor: C.green600, screen: 'analise' },
        ].map(op => (
          <Card key={op.title} onClick={() => onNavigate(op.screen)} style={{ padding: '24px', cursor: 'pointer', display: 'flex', gap: 20, alignItems: 'center', transition: 'box-shadow 0.15s' }}>
            <div style={{ width: 56, height: 56, background: op.color, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <op.icon size={26} color={op.iconColor} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 600, color: C.t900, marginBottom: 4 }}>{op.title}</div>
              <div style={{ fontSize: 14, color: C.t500, lineHeight: 1.5 }}>{op.sub}</div>
            </div>
            <Ic.ChevronRight size={20} color={C.t300} />
          </Card>
        ))}
      </div>
      <Card style={{ padding: '18px 20px' }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: C.t900, marginBottom: 14 }}>Últimos orçamentos</div>
        {[{ name: 'Residência Jardins — Etapa 02', status: 'aprovado', val: 'R$ 48.200', data: 'Mai 2025' }, { name: 'Torre Central — Elétrica', status: 'aguardando', val: 'R$ 127.600', data: 'Jun 2025' }].map(o => (
          <div key={o.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: `1px solid ${C.borderLight}` }}>
            <Ic.FileText size={18} color={C.t300} />
            <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 500, color: C.t900 }}>{o.name}</div><div style={{ fontSize: 12, color: C.t500 }}>{o.data}</div></div>
            <Badge color={o.status === 'aprovado' ? 'green' : 'orange'}>{o.status === 'aprovado' ? 'Aprovado' : 'Aguardando'}</Badge>
            <span style={{ fontSize: 14, fontWeight: 700, color: C.t900 }}>{o.val}</span>
          </div>
        ))}
      </Card>
    </div>
  </AppShell>
);

// ─── ANÁLISE DE ARQUIVOS ───────────────────────────────
const AnaliseArquivosScreen = ({ onNavigate }) => {
  const disciplinas = [
    { name: 'Estrutura', items: 14, exp: false, atividades: ['Fundação em radier e50','Pilares C30 – 12 und.','Lajes maciças 20cm','Vigas baldrame'] },
    { name: 'Civil / Vedações', items: 8, exp: false, atividades: ['Alvenaria bloco cerâmico 14cm','Revestimento argamassado interno','Chapisco e reboco ext.'] },
    { name: 'Hidráulica', items: 11, exp: false, atividades: ['Tubulação PVC soldável','Instalação registros e metais','Aquecimento solar'] },
    { name: 'Elétrica', items: 9, exp: false, atividades: ['Eletroduto corrugado','Quadro de distribuição','Tomadas e interruptores'] },
    { name: 'Acabamentos', items: 17, exp: false, atividades: ['Piso porcelanato 90×90','Pintura acrílica','Forros de gesso'] },
  ];
  const [expanded, setExpanded] = useQ({});
  return (
    <AppShell active="analise" onNavigate={onNavigate}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <button onClick={() => onNavigate('upload')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: C.t500, fontSize: 14, fontFamily: 'inherit' }}>
          <Ic.ArrowLeft size={16} /> Upload
        </button>
        <span style={{ color: C.t300 }}>/</span>
        <span style={{ fontSize: 14, fontWeight: 500, color: C.t900 }}>Análise técnica — {readProjectDraft().name || 'Novo projeto'}</span>
      </div>

      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1 }}>
          <Card style={{ padding: '16px 20px', marginBottom: 16, background: C.green50, borderLeft: `4px solid ${C.green500}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Ic.Check size={20} color={C.green600} />
              <div><div style={{ fontSize: 14, fontWeight: 600, color: C.green600 }}>Análise concluída em 3min 42s</div><div style={{ fontSize: 13, color: C.green600 }}>3 arquivos processados · 47 atividades identificadas em 5 disciplinas</div></div>
            </div>
          </Card>

          <Card style={{ padding: '18px 20px', marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.t900, marginBottom: 14 }}>Resumo do Projeto (IA)</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 14 }}>
              {[{ l: 'Tipo', v: 'Residencial' }, { l: 'Área total', v: '342 m²' }, { l: 'Ambientes', v: '12' }, { l: 'Arquivos', v: '3 / 3 ✓' }].map(k => (
                <div key={k.l}><div style={{ fontSize: 12, color: C.t400 }}>{k.l}</div><div style={{ fontSize: 15, fontWeight: 700, color: C.t900, marginTop: 2 }}>{k.v}</div></div>
              ))}
            </div>
          </Card>

          <div style={{ fontSize: 14, fontWeight: 600, color: C.t900, marginBottom: 12 }}>Levantamento de Atividades</div>
          {disciplinas.map((d, i) => (
            <Card key={d.name} style={{ marginBottom: 10, overflow: 'hidden' }}>
              <button onClick={() => setExpanded(e => ({ ...e, [i]: !e[i] }))} style={{
                width: '100%', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12,
                background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
              }}>
                <div style={{ width: 10, height: 10, borderRadius: 5, background: [C.blue500,C.t500,C.blue600,C.orange500,C.purple600][i] }} />
                <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: C.t900 }}>{d.name}</span>
                <Badge color="gray">{d.items} atividades</Badge>
                {expanded[i] ? <Ic.ChevronUp size={16} color={C.t400} /> : <Ic.ChevronDown size={16} color={C.t400} />}
              </button>
              {expanded[i] && (
                <div style={{ borderTop: `1px solid ${C.border}`, padding: '12px 18px' }}>
                  {d.atividades.map(a => (
                    <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: `1px solid ${C.borderLight}` }}>
                      <Ic.Check size={13} color={C.green500} />
                      <span style={{ flex: 1, fontSize: 13, color: C.t700 }}>{a}</span>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.t300, display: 'flex' }}><Ic.Edit size={14} /></button>
                    </div>
                  ))}
                  <button style={{ marginTop: 8, background: 'none', border: `1px dashed ${C.border}`, borderRadius: 8, padding: '6px 12px', fontSize: 12, color: C.t500, cursor: 'pointer', fontFamily: 'inherit' }}>+ Adicionar atividade</button>
                </div>
              )}
            </Card>
          ))}
        </div>

        <div style={{ width: 260, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Card style={{ padding: '18px 20px' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.t900, marginBottom: 12 }}>Alertas da IA</div>
            {[{ t: 'Banheiro sem janela', d: 'Avaliar ventilação forçada', c: C.orange500 }, { t: 'Estrutura metálica não compatibilizada', d: 'Verificar interferências com hidráulica', c: C.red500 }].map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 12, padding: '10px', background: C.orange100, borderRadius: 8 }}>
                <Ic.AlertTriangle size={16} color={a.c} style={{ flexShrink: 0, marginTop: 1 }} />
                <div><div style={{ fontSize: 13, fontWeight: 500, color: C.t900 }}>{a.t}</div><div style={{ fontSize: 12, color: C.t500, marginTop: 2 }}>{a.d}</div></div>
              </div>
            ))}
          </Card>
          <Card style={{ padding: '18px 20px' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.t900, marginBottom: 14 }}>Próximos passos</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Btn onClick={() => onNavigate('orcamento_qual')} style={{ width: '100%', justifyContent: 'center', padding: '11px' }}>Definir escopo qualitativo</Btn>
              <Btn variant="secondary" onClick={() => onNavigate('orcamento_quant')} style={{ width: '100%', justifyContent: 'center', padding: '11px' }}>Ir direto ao orçamento quantitativo</Btn>
              <Btn variant="ghost" style={{ width: '100%', justifyContent: 'center', padding: '11px' }}>Editar lista de atividades</Btn>
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
};

// ─── ORÇAMENTO QUANTITATIVO ────────────────────────────
const OrcamentoQuantScreen = ({ onNavigate }) => {
  const [tab, setTab] = useQ('disciplina');
  const itens = [
    { cod: 'EST-001', desc: 'Fundação em radier e=15cm', un: 'm²', qt: 342, pu: 185, orig: 'IA' },
    { cod: 'EST-002', desc: 'Pilar concreto C30 fck', un: 'm³', qt: 18.4, pu: 1250, orig: 'IA' },
    { cod: 'EST-003', desc: 'Laje maciça h=20cm', un: 'm²', qt: 284, pu: 210, orig: 'IA' },
    { cod: 'HID-001', desc: 'Tubulação PVC soldável 40mm', un: 'm', qt: 186, pu: 28, orig: 'IA' },
  ];
  return null;
};

Object.assign(window, { QueroReformarScreen,QueroOrcamentoScreen,AnaliseArquivosScreen,OrcamentoQuantScreen });
