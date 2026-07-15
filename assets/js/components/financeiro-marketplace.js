/* === FINANCEIRO MARKETPLACE === */

                  <td style={{ padding: '12px', color: C.t700 }}>{r.pgto}</td>
                  <td style={{ padding: '12px', fontWeight: 700, color: r.mis ? C.green600 : C.t900 }}>{r.total}</td>
                  <td style={{ padding: '12px' }}>
                    <Btn variant={r.mis ? 'green' : 'secondary'} size="sm" onClick={() => onNavigate('pedidos')}>
                      {r.mis ? 'Fechar pedido ✓' : 'Selecionar'}
                    </Btn>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AppShell>
  );
};

// ─── PEDIDOS E NOTAS FISCAIS ──────────────────────────────────────────────────
const PedidosScreen = ({ onNavigate }) => {
  const [filtro, setFiltro] = useX('todos');

  const pedidos = [
    { id:'P-2025-041', fornecedor:'Metálica SP',  data:'02/06', entregaPrev:'10/06', valor:'R$ 28.240', status:'confirmado', nf:false, itens: 'Aço CA-50 12t, Perf. I300 8un' },
    { id:'P-2025-038', fornecedor:'Elétrica Top', data:'28/05', entregaPrev:'05/06', valor:'R$ 14.200', status:'entregue',   nf:true,  itens: 'Cabo 2,5mm 400m, Disjuntores 20un' },
    { id:'P-2025-035', fornecedor:'Hidrotec',     data:'22/05', entregaPrev:'02/06', valor:'R$ 9.800',  status:'atraso',    nf:false, itens: 'Tubos PVC DN100 30m' },
    { id:'P-2025-030', fornecedor:'Cerâmica Hz',  data:'15/05', entregaPrev:'28/05', valor:'R$ 18.600', status:'entregue',  nf:true,  itens: 'Porcelanato 60×60 180m²' },
  ];

  const sMap = { confirmado:'blue', entregue:'green', atraso:'red' };
  const sLabel = { confirmado:'Confirmado', entregue:'Entregue', atraso:'Em atraso' };

  const filtrados = filtro === 'todos' ? pedidos : pedidos.filter(p => {
    if (filtro === 'abertos') return p.status === 'confirmado';
    if (filtro === 'entregues') return p.status === 'entregue';
    if (filtro === 'sem_nf') return p.status === 'entregue' && !p.nf;
    return true;
  });

  return (
    <AppShell active="pedidos" onNavigate={onNavigate}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <button onClick={() => onNavigate('suprimentos')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: C.t500, fontSize: 14, fontFamily: 'inherit' }}>
          <Ic.ArrowLeft size={16}/> Suprimentos
        </button>
        <span style={{ color: C.t300 }}>›</span>
        <span style={{ fontSize: 14, color: C.t900, fontWeight: 500 }}>Pedidos e Notas Fiscais</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <TabBar tabs={[{id:'todos',label:'Todos'},{id:'abertos',label:'Em andamento'},{id:'entregues',label:'Entregues'},{id:'sem_nf',label:'Sem NF'}]} active={filtro} onChange={setFiltro}/>
        <Btn variant="primary" size="sm" icon={<Ic.Plus size={14}/>}>Novo pedido</Btn>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtrados.map(p => (
          <Card key={p.id} style={{ padding: '18px 20px' }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: C.t900 }}>{p.id}</span>
                  <Badge color={sMap[p.status]} dot>{sLabel[p.status]}</Badge>
                  {p.status === 'entregue' && !p.nf && <Badge color="orange">NF pendente</Badge>}
                  {p.nf && <Badge color="green">NF vinculada</Badge>}
                </div>
                <div style={{ fontSize: 14, fontWeight: 500, color: C.t900, marginBottom: 4 }}>{p.fornecedor}</div>
                <div style={{ fontSize: 12, color: C.t500 }}>{p.itens}</div>
                <div style={{ display: 'flex', gap: 16, marginTop: 6, fontSize: 12, color: C.t400 }}>
                  <span>Pedido: {p.data}</span>
                  <span style={{ color: p.status === 'atraso' ? C.red600 : C.t400 }}>Entrega prev.: {p.entregaPrev}</span>
                </div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: C.t900, marginBottom: 8 }}>{p.valor}</div>
                <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                  {p.status === 'entregue' && !p.nf && (
                    <Btn variant="green" size="sm" icon={<Ic.Camera size={13}/>}>Anexar NF</Btn>
                  )}
                  <Btn variant="secondary" size="sm">Detalhes</Btn>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </AppShell>
  );
};

// ─── MEDIÇÕES ─────────────────────────────────────────────────────────────────
const MedicoesScreen = ({ onNavigate }) => {
  const project = readActiveProject() || DEFAULT_PROJECT;
  const [sel, setSel] = useX(null);

  const medicoes = [
    { id:'M08', periodo:'01/05 – 31/05/2025', valor:'R$ 48.200', status:'aprovada',  fotos: 12, atividades: 8  },
    { id:'M07', periodo:'01/04 – 30/04/2025', valor:'R$ 62.500', status:'paga',      fotos: 18, atividades: 11 },
    { id:'M06', periodo:'01/03 – 31/03/2025', valor:'R$ 35.900', status:'paga',      fotos: 9,  atividades: 7  },
    { id:'M09', periodo:'01/06 – Atual',       valor:'R$ 14.800', status:'aberta',   fotos: 4,  atividades: 3  },
  ];

  const itensM09 = [
    { atividade: 'Instalação elétrica — Pav. 4', qtd_exec: 320, qtd_contr: 400, unidade: 'm', valor: 'R$ 6.400' },
    { atividade: 'Revestimento banheiros — Pav. 3', qtd_exec: 48, qtd_contr: 60, unidade: 'm²', valor: 'R$ 5.760' },
    { atividade: 'Pintura interna — Pav. 2', qtd_exec: 210, qtd_contr: 300, unidade: 'm²', valor: 'R$ 2.520' },
  ];

  const sMap = { aprovada:'green', paga:'gray', aberta:'orange' };
  const sLabel = { aprovada:'Aprovada', paga:'Paga', aberta:'Em aberto' };

  return (
    <AppShell active="medicoes" onNavigate={onNavigate}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <button onClick={() => onNavigate('financeiro')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: C.t500, fontSize: 14, fontFamily: 'inherit' }}>
          <Ic.ArrowLeft size={16}/> Financeiro
        </button>
        <span style={{ color: C.t300 }}>›</span>
        <span style={{ fontSize: 14, color: C.t900, fontWeight: 500 }}>Medições</span>
      </div>

      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        {/* Lista */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {medicoes.map(m => (
            <Card key={m.id} onClick={() => setSel(m.id === sel ? null : m.id)} style={{ padding: '18px 20px', cursor: 'pointer', border: sel === m.id ? `2px solid ${C.blue500}` : `2px solid transparent` }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: C.t900 }}>Medição {m.id}</span>
                    <Badge color={sMap[m.status]} dot>{sLabel[m.status]}</Badge>
                  </div>
                  <div style={{ fontSize: 13, color: C.t500 }}>{m.periodo}</div>
                  <div style={{ fontSize: 12, color: C.t400, marginTop: 4 }}>{m.atividades} atividades · {m.fotos} fotos de evidência</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: C.t900 }}>{m.valor}</div>
                  {m.status === 'aberta' && (
                    <div style={{ display: 'flex', gap: 6, marginTop: 8, justifyContent: 'flex-end' }}>
                      <Btn variant="danger" size="sm">Revisar</Btn>
                      <Btn variant="green" size="sm">Aprovar</Btn>
                    </div>
                  )}
                </div>
              </div>

              {/* Detalhe expandido */}
              {sel === m.id && m.id === 'M09' && (
                <div style={{ marginTop: 16, borderTop: `1px solid ${C.border}`, paddingTop: 14 }}>
                  <table style={{ width: '100%', fontSize: 13 }}>
                    <thead>
                      <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                        {['Atividade','Qtd Exec.','Qtd Contrat.','Un','Valor'].map(h => (
                          <th key={h} style={{ textAlign:'left', padding:'6px 10px', fontSize:11, fontWeight:600, color:C.t500 }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {itensM09.map((it, i) => (
                        <tr key={i} style={{ borderBottom:`1px solid ${C.borderLight}` }}>
                          <td style={{ padding:'10px', color:C.t900 }}>{it.atividade}</td>
                          <td style={{ padding:'10px', color:C.t700 }}>{it.qtd_exec}</td>
                          <td style={{ padding:'10px', color:C.t500 }}>{it.qtd_contr}</td>
                          <td style={{ padding:'10px', color:C.t500 }}>{it.unidade}</td>
                          <td style={{ padding:'10px', fontWeight:600, color:C.t900 }}>{it.valor}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          ))}

          <Btn variant="primary" icon={<Ic.Plus size={14}/>} style={{ alignSelf: 'flex-start' }}>Nova medição</Btn>
        </div>

        {/* Sidebar */}
        <div style={{ width: 220, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Card style={{ padding: '16px 18px' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.t900, marginBottom: 12 }}>Resumo Total</div>
            {[['Total Medido','R$ 161.400'],['Total Aprovado','R$ 146.600'],['Total Pago','R$ 98.400'],['A Receber','R$ 48.200']].map(([k,v]) => (
              <div key={k} style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
                <span style={{ fontSize:12, color:C.t500 }}>{k}</span>
                <span style={{ fontSize:12, fontWeight:600, color:C.t900 }}>{v}</span>
              </div>
            ))}
          </Card>
          <Card style={{ padding: '16px 18px' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.t900, marginBottom: 8 }}>Alerta IA</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Ic.AlertCircle size={16} color={C.orange500} style={{ flexShrink: 0, marginTop: 1 }}/>
              <div style={{ fontSize: 12, color: C.t700, lineHeight: 1.5 }}>Medição M09 — Elétrica executou 80% do contratado. Verifique desvio antes de aprovar.</div>
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
};

// ─── AVALIAÇÕES E RANQUEAMENTO ────────────────────────────────────────────────
const AvaliacoesScreen = ({ onNavigate }) => {
  const [aba, setAba] = useX('recebidas');
  const [nota, setNota] = useX(0);
  const [tags, setTags] = useX([]);
  const [texto, setTexto] = useX('');
  const [enviado, setEnviado] = useX(false);

  const tagsOpc = ['Pontual','Profissional','Qualidade técnica','Comunicação','Limpeza','Segurança'];

  const avaliacoes = [
    { autor:'Eduardo Nunes', nota:5, tags:['Pontual','Qualidade técnica','Comunicação'], texto:'Trabalho impecável, entregou antes do prazo.', data:'28/05/2025', obra:'Residência Jardins' },
    { autor:'Construtora Delta', nota:4, tags:['Profissional','Limpeza'], texto:'Bom trabalho, pequenos ajustes finais necessários.', data:'14/05/2025', obra:'Torre Central' },
    { autor:'Horizonte SA', nota:5, tags:['Pontual','Segurança','Qualidade técnica'], texto:'Excelente equipe, sem nenhuma ocorrência de segurança.', data:'02/05/2025', obra:'Edifício Horizonte' },
  ];

  const misScore = { total: 9.2, cronograma: 9.5, qualidade: 9.0, comunicacao: 8.8, seguranca: 9.5 };

  return (
    <AppShell active="avaliacoes" onNavigate={onNavigate}>
      <SectionHeader title="Avaliações" subtitle="Sistema de avaliação e MIS Score"/>

      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <TabBar tabs={[{id:'recebidas',label:'Recebidas'},{id:'avaliar',label:'Avaliar serviço'}]} active={aba} onChange={setAba} style={{ marginBottom: 4 }}/>

          {aba === 'recebidas' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {avaliacoes.map((a, i) => (
                <Card key={i} style={{ padding: '18px 20px' }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 10 }}>
                    <Avatar name={a.autor} size={40}/>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: C.t900 }}>{a.autor}</div>
                      <div style={{ fontSize: 12, color: C.t500 }}>{a.obra} · {a.data}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 2 }}>
                      {[1,2,3,4,5].map(s => (
                        <span key={s} style={{ fontSize: 16, color: s <= a.nota ? '#F59E0B' : C.t300 }}>★</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
                    {a.tags.map(t => <Badge key={t} color="blue">{t}</Badge>)}
                  </div>
                  <div style={{ fontSize: 13, color: C.t700, fontStyle: 'italic', lineHeight: 1.5 }}>"{a.texto}"</div>
                </Card>
              ))}
            </div>
          ) : (
            <Card style={{ padding: '24px 28px' }}>
              {!enviado ? (
                <>
                  <div style={{ fontSize: 15, fontWeight: 600, color: C.t900, marginBottom: 6 }}>Avaliar: Carlos Henrique</div>
                  <div style={{ fontSize: 13, color: C.t500, marginBottom: 20 }}>Serviço: Pintura interna — Residência Jardins</div>

                  {/* Estrelas */}
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: C.t700, marginBottom: 10 }}>Nota geral</div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {[1,2,3,4,5].map(s => (
                        <button key={s} onClick={() => setNota(s)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 32, color: s <= nota ? '#F59E0B' : C.t300, transition: 'color 0.15s', padding: 0 }}>★</button>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: C.t700, marginBottom: 10 }}>Pontos de destaque (opcional)</div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {tagsOpc.map(t => {
                        const sel = tags.includes(t);
                        return (
                          <button key={t} className={`mis-select-btn${sel ? ' active' : ''}`} aria-pressed={sel} onClick={() => setTags(sel ? tags.filter(x => x !== t) : [...tags, t])} style={{
                            padding: '5px 14px', borderRadius: 20, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit',
                            border: sel ? 'none' : `1.5px solid ${C.border}`,
                            background: sel ? C.blue500 : C.card,
                            color: sel ? '#fff' : C.t700, transition: 'all 0.15s',
                          }}>{t}</button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Texto */}
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: C.t700, marginBottom: 8 }}>Comentário (opcional)</div>
                    <textarea value={texto} onChange={e => setTexto(e.target.value)} placeholder="Como foi a experiência?" rows={3} style={{ width: '100%', padding: '10px 14px', border: `1.5px solid ${C.border}`, borderRadius: 10, fontSize: 14, color: C.t900, fontFamily: 'inherit', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}/>
                  </div>

                  <Btn variant="primary" onClick={() => nota > 0 && setEnviado(true)} disabled={nota === 0} style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
                    Enviar avaliação
                  </Btn>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '32px 0' }}>
                  <div style={{ width: 52, height: 52, background: C.green100, borderRadius: 26, margin: '0 auto 14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Ic.Check size={24} color={C.green600}/>
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: C.green600 }}>Avaliação enviada!</div>
                  <div style={{ fontSize: 13, color: C.t500, marginTop: 6 }}>O MIS Score do profissional foi atualizado.</div>
                  <Btn variant="secondary" onClick={() => { setEnviado(false); setNota(0); setTags([]); setTexto(''); setAba('recebidas'); }} style={{ marginTop: 16 }}>Ver avaliações recebidas</Btn>
                </div>
              )}
            </Card>
          )}
        </div>

        {/* MIS Score sidebar */}
        <div style={{ width: 220, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Card style={{ padding: '16px 18px', textAlign: 'center' }}>
            <div style={{ fontSize: 12, color: C.t500, marginBottom: 4 }}>MIS SCORE</div>
            <div style={{ fontSize: 46, fontWeight: 800, color: C.blue600, lineHeight: 1 }}>{misScore.total}</div>
            <div style={{ fontSize: 12, color: C.green600, fontWeight: 600, marginTop: 4 }}>● Excelente</div>
            <div style={{ fontSize: 11, color: C.t400, marginTop: 2 }}>Top 5% da plataforma</div>
          </Card>

          <Card style={{ padding: '16px 18px' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.t900, marginBottom: 12 }}>Componentes do Score</div>
            {Object.entries({ 'Cronograma': misScore.cronograma, 'Qualidade': misScore.qualidade, 'Comunicação': misScore.comunicacao, 'Segurança': misScore.seguranca }).map(([k, v]) => (
              <div key={k} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: C.t700 }}>{k}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: v >= 9 ? C.green600 : v >= 8 ? C.blue600 : C.orange600 }}>{v}</span>
                </div>
                <ProgressBar value={v * 10} color={v >= 9 ? C.green500 : v >= 8 ? C.blue500 : C.orange500} height={4}/>
              </div>
            ))}
          </Card>

          <Card style={{ padding: '16px 18px' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.t900, marginBottom: 8 }}>Resumo</div>
            {[['Total de avaliações','32'],['Nota média','4.8 ★'],['Taxa de conclusão','97%'],['Membro desde','Jan 2024']].map(([k,v]) => (
              <div key={k} style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
                <span style={{ fontSize:12, color:C.t500 }}>{k}</span>
                <span style={{ fontSize:12, fontWeight:600, color:C.t900 }}>{v}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </AppShell>
  );
};

Object.assign(window, { ResolverProblemaScreen, MarketplaceScreen, FornecedorScreen, CotacoesScreen, PedidosScreen, MedicoesScreen, AvaliacoesScreen });

// mis-app.jsx — Router principal e render

const { useState: useApp, useEffect: useEffectApp } = React;

