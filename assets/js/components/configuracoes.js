/* === CONFIGURACOES === */

const ConfiguracoesScreen = ({ onNavigate }) => {
  const [section, setSection] = useSys('conta');
  const sections = [
    { id: 'conta', label: 'Conta', icon: Ic.User },
    { id: 'plano', label: 'Meu Plano', icon: Ic.Zap },
    { id: 'notificacoes', label: 'Notificações', icon: Ic.Bell },
    { id: 'privacidade', label: 'Privacidade e segurança', icon: Ic.Lock },
    { id: 'integracoes', label: 'Integrações', icon: Ic.Layers },
    { id: 'ajuda', label: 'Ajuda e suporte', icon: Ic.Info },
    { id: 'sobre', label: 'Sobre o MIS', icon: Ic.Sparkles },
  ];

  return (
    <AppShell active="configuracoes" onNavigate={onNavigate}>
      <SectionHeader title="Configurações" subtitle="Gerencie sua conta, preferências e integrações." />
      <div style={{ display: 'flex', gap: 20 }}>
        {/* Sidebar nav */}
        <div style={{ width: 220, flexShrink: 0 }}>
          <Card style={{ padding: '8px' }}>
            {sections.map(s => (
              <button key={s.id} className={`mis-select-btn${section === s.id ? ' active' : ''}`} aria-pressed={section === s.id} onClick={() => setSection(s.id)} style={{
                display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                padding: '10px 12px', borderRadius: 8, border: 'none',
                background: section === s.id ? C.navActive : 'transparent',
                color: section === s.id ? '#fff' : C.t700,
                cursor: 'pointer', fontSize: 14, fontFamily: 'inherit', textAlign: 'left',
                transition: 'all 0.15s',
              }}>
                <s.icon size={16} />
                {s.label}
              </button>
            ))}
            <div style={{ borderTop: `1px solid ${C.border}`, margin: '8px 0', paddingTop: 8 }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 12px', borderRadius: 8, border: 'none', background: 'transparent', color: C.red600, cursor: 'pointer', fontSize: 14, fontFamily: 'inherit' }}>
                <Ic.X size={16} /> Sair da conta
              </button>
            </div>
          </Card>
        </div>

        {/* Content */}
        <div style={{ flex: 1 }}>
          {section === 'conta' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Card style={{ padding: '24px' }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: C.t900, marginBottom: 20 }}>Informações pessoais</div>
                <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', marginBottom: 24 }}>
                  <div style={{ position: 'relative' }}>
                    <Avatar name="Eduardo Nunes" size={72} />
                    <button style={{ position: 'absolute', bottom: 0, right: 0, width: 24, height: 24, background: C.t900, border: '2px solid #fff', borderRadius: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Ic.Edit size={12} color="#fff" />
                    </button>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: C.t900 }}>Eduardo Nunes</div>
                    <div style={{ fontSize: 14, color: C.t500, marginTop: 2 }}>Gestor MIS · Plano Pro</div>
                    <Badge color="green" style={{ marginTop: 8 }}>✓ Conta verificada</Badge>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <Input label="Nome completo" placeholder="Eduardo Nunes" />
                  <Input label="E-mail" placeholder="eduardo@mgroup.com.br" type="email" />
                  <Input label="Telefone" placeholder="(11) 99999-0000" type="tel" />
                  <Input label="Cargo / Função" placeholder="Gestor de Obras" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
                  <Btn>Salvar alterações</Btn>
                </div>
              </Card>
              <Card style={{ padding: '24px' }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: C.t900, marginBottom: 20 }}>Segurança</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <Input label="Senha atual" type="password" placeholder="••••••••" />
                  <Input label="Nova senha" type="password" placeholder="••••••••" />
                </div>
                <div style={{ display: 'flex', gap: 20, marginTop: 20, alignItems: 'center' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', flex: 1 }}>
                    <div style={{ width: 44, height: 24, background: C.navActive, borderRadius: 12, position: 'relative' }}>
                      <div style={{ position: 'absolute', right: 3, top: 3, width: 18, height: 18, background: '#fff', borderRadius: 9 }} />
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500, color: C.t900 }}>Autenticação em 2 fatores</div>
                      <div style={{ fontSize: 12, color: C.t500 }}>Ativada via SMS</div>
                    </div>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                    <div style={{ width: 44, height: 24, background: C.navActive, borderRadius: 12, position: 'relative' }}>
                      <div style={{ position: 'absolute', right: 3, top: 3, width: 18, height: 18, background: '#fff', borderRadius: 9 }} />
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500, color: C.t900 }}>Biometria</div>
                      <div style={{ fontSize: 12, color: C.t500 }}>FaceID / TouchID</div>
                    </div>
                  </label>
                </div>
              </Card>
            </div>
          )}

          {section === 'notificacoes' && (
            <Card style={{ padding: '24px' }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: C.t900, marginBottom: 20 }}>Preferências de notificação</div>
              {[
                { cat: 'Alertas críticos', desc: 'Atrasos, riscos e bloqueios operacionais', push: true, email: true, sms: true },
                { cat: 'Pendências', desc: 'Tarefas atribuídas e vencimentos', push: true, email: true, sms: false },
                { cat: 'Suprimentos', desc: 'Estoque crítico e entregas', push: true, email: false, sms: false },
                { cat: 'Atualizações de obras', desc: 'Novos registros e fotos', push: true, email: true, sms: false },
                { cat: 'Financeiro', desc: 'Aprovações e pagamentos', push: false, email: true, sms: true },
                { cat: 'Oráculo MIS', desc: 'Sugestões e análises da IA', push: true, email: false, sms: false },
              ].map(n => (
                <div key={n.cat} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 0', borderBottom: `1px solid ${C.borderLight}` }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 500, color: C.t900 }}>{n.cat}</div>
                    <div style={{ fontSize: 12, color: C.t500, marginTop: 2 }}>{n.desc}</div>
                  </div>
                  {[{ l: 'Push', v: n.push }, { l: 'E-mail', v: n.email }, { l: 'SMS', v: n.sms }].map(ch => (
                    <div key={ch.l} style={{ textAlign: 'center', minWidth: 60 }}>
                      <div style={{ fontSize: 11, color: C.t400, marginBottom: 6 }}>{ch.l}</div>
                      <div style={{ width: 36, height: 20, background: ch.v ? C.navActive : C.border, borderRadius: 10, margin: '0 auto', position: 'relative', cursor: 'pointer' }}>
                        <div style={{ position: 'absolute', top: 2, left: ch.v ? 18 : 2, width: 16, height: 16, background: '#fff', borderRadius: 8, transition: 'left 0.2s' }} />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </Card>
          )}

          {section === 'plano' && (
            <Card style={{ padding: '24px' }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: C.t900, marginBottom: 20 }}>Meu Plano</div>
              <div style={{ background: 'linear-gradient(135deg, #1C3A2A 0%, #1d4ed8 100%)', borderRadius: 16, padding: '24px', marginBottom: 20 }}>
                <Badge color="gray" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', marginBottom: 12 }}>Plano atual</Badge>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#fff', marginBottom: 4 }}>MIS Pro</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', marginBottom: 16 }}>Gestão completa · Até 20 obras simultâneas · Oráculo ilimitado</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#fff' }}>R$ 297<span style={{ fontSize: 14, fontWeight: 400 }}>/mês</span></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 20 }}>
                {[{ l: 'Obras ativas', v: '8 / 20', c: C.blue600 }, { l: 'Usuários', v: '5 / 10', c: C.t900 }, { l: 'Storage', v: '24GB / 100GB', c: C.green600 }].map(k => (
                  <Card key={k.l} style={{ padding: '14px', textAlign: 'center' }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: k.c }}>{k.v}</div>
                    <div style={{ fontSize: 12, color: C.t500, marginTop: 4 }}>{k.l}</div>
                  </Card>
                ))}
              </div>
              <Btn style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>Fazer upgrade para Enterprise</Btn>
            </Card>
          )}

          {!['conta','notificacoes','plano'].includes(section) && (
            <Card style={{ padding: '40px', textAlign: 'center', color: C.t400 }}>
              <Ic.Settings size={32} color={C.t300} />
              <div style={{ marginTop: 12, fontSize: 14 }}>Seção <strong style={{ color: C.t700 }}>{section}</strong> em construção</div>
            </Card>
          )}
        </div>
      </div>
    </AppShell>
  );
};

// ─── PERFIL DO PROFISSIONAL (OP) ───────────────────────
const PerfilProfissionalScreen = ({ onNavigate }) => {
  const [tab, setTab] = useSys('portfolio');
  const skills = ['Estrutura','Concreto armado','Alvenaria','Impermeabilização','Fundação','Concretagem'];
  const avalis = [
    { name: 'Eduardo Nunes', role: 'Gestor MIS', text: 'Excelente profissional. Entregou no prazo e com alta qualidade.', rating: 5 },
    { name: 'Mariana Costa', role: 'Engenheira', text: 'Trabalho impecável na etapa de fundação. Recomendo.', rating: 5 },
    { name: 'João Pedro', role: 'Arquiteto', text: 'Muito organizado e pontual. Ótima comunicação.', rating: 4 },
  ];

  return (
    <AppShell active="perfil_op" onNavigate={onNavigate}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        {/* Header */}
        <Card style={{ padding: '28px', marginBottom: 20 }}>
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
            <div style={{ position: 'relative' }}>
              <Avatar name="Rafael Souza" size={88} />
              <div style={{ position: 'absolute', bottom: 4, right: 4, width: 20, height: 20, background: C.green500, borderRadius: 10, border: '2px solid #fff' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                  <h2 style={{ fontSize: 24, fontWeight: 700, color: C.t900 }}>Rafael Souza</h2>
                  <div style={{ display: 'flex', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
                    {skills.slice(0, 4).map(s => <Badge key={s} color="blue">{s}</Badge>)}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <Btn variant="secondary" icon={<Ic.Message size={14} />}>Mensagem</Btn>
                  <Btn icon={<Ic.Check size={14} />}>Contratar</Btn>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,auto)', gap: 24, marginTop: 20 }}>
                {[{ l: 'Avaliação', v: '4.9', icon: Ic.Star, c: C.orange500 }, { l: 'Trabalhos', v: '47', icon: Ic.Layers, c: C.blue600 }, { l: 'No prazo', v: '98%', icon: Ic.Clock, c: C.green600 }, { l: 'Membro desde', v: '2022', icon: Ic.Calendar, c: C.t500 }].map(k => (
                  <div key={k.l} style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, fontSize: 20, fontWeight: 700, color: k.c }}>
                      <k.icon size={16} color={k.c} />{k.v}
                    </div>
                    <div style={{ fontSize: 12, color: C.t400, marginTop: 2 }}>{k.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 20, padding: '16px', background: C.borderLight, borderRadius: 10 }}>
            <div style={{ fontSize: 14, color: C.t700, lineHeight: 1.65 }}>
              Mestre de obras com 12 anos de experiência em construção civil residencial e comercial. Especialista em estruturas de concreto armado e gestão de equipes em canteiro. Certificação CREA-SP ativo.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
            <Badge color="green" dot>Disponível para obras</Badge>
            <Badge color="blue"><Ic.MapPin size={12} color={C.blue600} style={{ marginRight: 3 }} />São Paulo, SP · até 40km</Badge>
            <Badge color="gray">✓ Verificado MIS</Badge>
          </div>
        </Card>

        {/* Tabs */}
        <div style={{ borderBottom: `1px solid ${C.border}`, marginBottom: 20 }}>
          <TabBar tabs={[{id:'portfolio',label:'Portfólio'},{id:'avaliacoes',label:'Avaliações'},{id:'disponibilidade',label:'Disponibilidade'},{id:'precos',label:'Preços'}]} active={tab} onChange={setTab} />
        </div>

        {tab === 'portfolio' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 20 }}>
              {['Fundação radier, Campinas','Estrutura metálica, Guarulhos','Concretagem laje, São Paulo','Alvenaria estrutural, Jundiaí','Impermeabilização, Santos','Piso industrial, Santo André'].map((p, i) => (
                <Card key={i} style={{ overflow: 'hidden' }}>
                  <ImgPlaceholder style={{ height: 140, borderRadius: 0 }} label={p} />
                  <div style={{ padding: '12px 14px' }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: C.t900 }}>{p}</div>
                    <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
                      {[...Array(5)].map((_, j) => <Ic.Star key={j} size={12} color={C.orange500} fill={C.orange500} />)}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {tab === 'avaliacoes' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {avalis.map((a, i) => (
              <Card key={i} style={{ padding: '18px 20px' }}>
                <div style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
                  <Avatar name={a.name} size={38} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: C.t900 }}>{a.name}</div>
                    <div style={{ fontSize: 12, color: C.t500 }}>{a.role}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 3 }}>{[...Array(5)].map((_, j) => <Ic.Star key={j} size={14} color={j < a.rating ? C.orange500 : C.border} />)}</div>
                </div>
                <div style={{ fontSize: 14, color: C.t700, lineHeight: 1.6, fontStyle: 'italic' }}>"{a.text}"</div>
              </Card>
            ))}
          </div>
        )}

        {(tab === 'disponibilidade' || tab === 'precos') && (
          <Card style={{ padding: '32px', textAlign: 'center', color: C.t400 }}>
            <Ic.Calendar size={32} color={C.t300} />
            <div style={{ marginTop: 12, fontSize: 14 }}>Seção em construção: <strong style={{ color: C.t700 }}>{tab}</strong></div>
          </Card>
        )}
      </div>
    </AppShell>
  );
};

// ─── FEED DE OPORTUNIDADES (OP) ────────────────────────
const FeedOportunidadesScreen = ({ onNavigate }) => {
  const [avail, setAvail] = useSys(true);
  const [filter, setFilter] = useSys('todas');
  const opps = [
    { id: 1, tipo: 'Concretagem de laje', desc: 'Concretagem de laje maciça h=20cm, área de 280m². Material fornecido pelo cliente. Início imediato.', loc: 'São Paulo, SP', dist: '3 km', valor: 'R$ 4.200', prazo: '3 dias', urgencia: 'urgente', foto: true },
    { id: 2, tipo: 'Alvenaria estrutural', desc: 'Execução de alvenaria em bloco cerâmico 14cm para residência unifamiliar. 180m² de paredes.', loc: 'Santo André, SP', dist: '12 km', valor: 'R$ 7.800', prazo: '10 dias', urgencia: 'normal', foto: true },
    { id: 3, tipo: 'Impermeabilização deck', desc: 'Impermeabilização de deck externo com manta asfáltica. 60m². Urgente por previsão de chuvas.', loc: 'Guarulhos, SP', dist: '18 km', valor: 'R$ 2.100', prazo: '1 dia', urgencia: 'emergencia', foto: true },
    { id: 4, tipo: 'Instalação de fôrmas', desc: 'Montagem de fôrmas para pilares e vigas — 2 andares. Equipe de 4 pessoas necessária.', loc: 'Campinas, SP', dist: '80 km', valor: 'R$ 9.500', prazo: '7 dias', urgencia: 'normal', foto: true },
    { id: 5, tipo: 'Piso industrial epóxi', desc: 'Aplicação de epóxi autonivelante em galpão logístico. 1.200m². Noturno após 22h.', loc: 'Guarulhos, SP', dist: '21 km', valor: 'R$ 14.400', prazo: '5 dias', urgencia: 'urgente', foto: true },
  ];
  const urgColors = { normal: { c: C.blue600, bg: C.blue100 }, urgente: { c: C.orange600, bg: C.orange100 }, emergencia: { c: C.red600, bg: C.red100 } };

  return (
    <AppShell active="feed_op" onNavigate={onNavigate}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <SectionHeader title="Oportunidades" subtitle="Novos serviços disponíveis compatíveis com seu perfil." style={{ marginBottom: 0 }} />
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 44, height: 24, background: avail ? C.navActive : C.border, borderRadius: 12, position: 'relative', cursor: 'pointer' }} onClick={() => setAvail(!avail)}>
              <div style={{ position: 'absolute', top: 3, left: avail ? 22 : 3, width: 18, height: 18, background: '#fff', borderRadius: 9, transition: 'left 0.2s' }} />
            </div>
            <span style={{ fontSize: 14, fontWeight: 500, color: avail ? C.green600 : C.t500 }}>{avail ? 'Disponível para obras' : 'Indisponível'}</span>
          </div>
        </div>
      </div>

      <ChipBar chips={['todas','próximas','urgentes','estrutura','hidráulica','acabamento'].map(c=>({id:c,label:c.charAt(0).toUpperCase()+c.slice(1)}))} active={filter} onChange={setFilter} style={{ marginBottom: 20 }} />

      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {opps.map(op => {
            const urg = urgColors[op.urgencia];
            return (
              <Card key={op.id} style={{ padding: '18px 20px' }}>
                <div style={{ display: 'flex', gap: 16 }}>
                  {op.foto && <ImgPlaceholder style={{ width: 100, height: 80, flexShrink: 0 }} label="local" />}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                      <div>
                        <div style={{ fontSize: 16, fontWeight: 600, color: C.t900 }}>{op.tipo}</div>
                        <div style={{ display: 'flex', gap: 10, fontSize: 13, color: C.t500, marginTop: 4 }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Ic.MapPin size={13} color={C.t400} />{op.loc}</span>
                          <span style={{ color: C.t300 }}>·</span>
                          <span>{op.dist}</span>
                        </div>
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 600, padding: '4px 12px', borderRadius: 12, background: urg.bg, color: urg.c }}>
                        {op.urgencia.charAt(0).toUpperCase() + op.urgencia.slice(1)}
                      </span>
                    </div>
                    <div style={{ fontSize: 13, color: C.t500, lineHeight: 1.5, marginBottom: 12 }}>{op.desc}</div>
                    <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                      <div><div style={{ fontSize: 12, color: C.t400 }}>Valor estimado</div><div style={{ fontSize: 16, fontWeight: 700, color: C.t900 }}>{op.valor}</div></div>
                      <div><div style={{ fontSize: 12, color: C.t400 }}>Prazo</div><div style={{ fontSize: 14, fontWeight: 600, color: C.t900 }}>{op.prazo}</div></div>
                      <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                        <Btn variant="secondary" size="sm">Ver detalhes</Btn>
                        <Btn variant="green" size="sm" icon={<Ic.Check size={13} color="#fff" />}>Aceitar</Btn>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div style={{ width: 240, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Card style={{ padding: '18px 20px' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.t900, marginBottom: 14 }}>Seu perfil</div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14 }}>
              <Avatar name="Rafael Souza" size={44} />
              <div><div style={{ fontSize: 14, fontWeight: 600, color: C.t900 }}>Rafael Souza</div><div style={{ display: 'flex', gap: 3 }}>{[...Array(5)].map((_, j) => <Ic.Star key={j} size={12} color={C.orange500} />)}<span style={{ fontSize: 12, color: C.t500 }}>4.9</span></div></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
              {[{ l: 'Obras concluídas', v: '47' }, { l: 'No prazo', v: '98%' }, { l: 'Avaliação média', v: '4.9 ★' }].map(k => (
                <div key={k.l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: C.t500 }}>{k.l}</span><span style={{ fontWeight: 700, color: C.t900 }}>{k.v}</span>
                </div>
              ))}
            </div>
            <Btn variant="secondary" onClick={() => onNavigate('perfil_op')} style={{ width: '100%', justifyContent: 'center' }}>Ver perfil completo</Btn>
          </Card>
          <Card style={{ padding: '18px 20px' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.t900, marginBottom: 12 }}>Compatibilidade IA</div>
            <div style={{ fontSize: 13, color: C.t500, marginBottom: 12 }}>Oportunidades alinhadas ao seu histórico e especialidades.</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[['Estrutura','Alta',C.green600],['Concretagem','Alta',C.green600],['Alvenaria','Média',C.orange600],['Instalações','Baixa',C.red600]].map(([s,m,c]) => (
                <div key={s} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: C.t700 }}>{s}</span>
                  <span style={{ fontWeight: 600, color: c }}>{m}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
};

Object.assign(window, { NotificacoesScreen, ConfiguracoesScreen, PerfilProfissionalScreen, FeedOportunidadesScreen });

// mis-financeiro.jsx — Financeiro, Contas a Receber, Contas a Pagar, Fluxo de Caixa

const { useState: useF } = React;

// ─── FINANCEIRO (PAINEL GERAL) ───────────────────────────────────────────────
