/* === ARQUIVOS === */

const UploadScreen = ({ onNavigate }) => {
  const initial = readProjectDraft();
  const [drag, setDrag] = useOp(false);
  const fileInputRef = React.useRef(null);
  const [draft, setDraft] = useOp({
    name: initial.name || '', client: initial.client || '', type: initial.type || 'Residencial',
    responsible: initial.responsible || '', city: initial.city || '', priority: initial.priority || 'Média',
    description: initial.description || ''
  });
  const [arquivos, setArquivos] = useOp(initial.files || []);
  const update = (key, value) => setDraft(prev => ({ ...prev, [key]: value }));
  const addFiles = list => {
    const added = Array.from(list || []).map(file => ({ nome: file.name, tipo: (file.name.split('.').pop() || 'ARQ').toUpperCase(), tam: `${Math.max(.1, file.size / 1024 / 1024).toFixed(1)} MB`, status: 'Pronto' }));
    if (added.length) setArquivos(v => [...v, ...added]);
  };
  const save = () => writeProjectDraft({ ...draft, files: arquivos });
  const continueFlow = () => { save(); onNavigate('analise'); };
  const downloadFolderModel = () => {
    const content = '01_Cliente_e_Briefing\n02_Arquitetura\n03_Estrutura\n04_Instalacoes\n05_Orcamentos_e_Propostas\n06_Contratos';
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([content], { type: 'text/plain' })); a.download = 'modelo_de_pastas_novo_projeto_MIS.txt'; a.click(); URL.revokeObjectURL(a.href);
  };
  return (
    <AppShell active="upload" onNavigate={onNavigate}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:22 }}>
        <div><h1 style={{ fontSize:42, fontWeight:800, color:C.t900, lineHeight:1, marginBottom:8, letterSpacing:'-.7px' }}>Novo projeto</h1><p style={{ fontSize:14, color:C.t500 }}>Cadastre o briefing, envie os arquivos e avance para análise, orçamento e proposta antes de ativar a obra.</p></div>
        <div style={{ display:'flex', gap:10 }}><Btn variant="secondary" onClick={save}>Salvar rascunho</Btn><Btn variant="secondary" onClick={downloadFolderModel} icon={<Ic.Download size={14}/>}>Modelo de pasta</Btn></div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'minmax(0,1fr) 300px', gap:18, alignItems:'start' }}>
        <Card style={{ padding:'22px' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:18 }}><div><div style={{ fontSize:16, fontWeight:700, color:C.t900 }}>Dados iniciais do projeto</div><div style={{ fontSize:12, color:C.t500, marginTop:3 }}>Essas informações acompanharão orçamento, proposta e contrato.</div></div><Badge color="blue">Etapa 1 de 5</Badge></div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
            <Input label="Nome provisório do projeto" placeholder="Ex.: Residencial Primavera" value={draft.name} onChange={e => update('name', e.target.value)} style={{ gridColumn:'1 / -1' }} iconL={<Ic.Building size={15}/>}/>
            <Input label="Cliente / empresa" placeholder="Nome do cliente" value={draft.client} onChange={e => update('client', e.target.value)} iconL={<Ic.User size={15}/>}/>
            <Input label="Responsável comercial" placeholder="Responsável pela inclusão" value={draft.responsible} onChange={e => update('responsible', e.target.value)} iconL={<Ic.User size={15}/>}/>
            <div><label style={{ display:'block', fontSize:13, fontWeight:500, color:C.t700, marginBottom:5 }}>Tipo de obra</label><select value={draft.type} onChange={e => update('type', e.target.value)} style={{ width:'100%', padding:'10px 13px', border:`1.5px solid ${C.border}`, borderRadius:10, background:'#fff', fontSize:14 }}><option>Residencial</option><option>Comercial</option><option>Industrial</option><option>Corporativo</option><option>Saúde</option><option>Misto</option></select></div>
            <Input label="Cidade / UF" placeholder="Campinas, SP" value={draft.city} onChange={e => update('city', e.target.value)} iconL={<Ic.MapPin size={15}/>}/>
            <div><label style={{ display:'block', fontSize:13, fontWeight:500, color:C.t700, marginBottom:5 }}>Prioridade</label><select value={draft.priority} onChange={e => update('priority', e.target.value)} style={{ width:'100%', padding:'10px 13px', border:`1.5px solid ${C.border}`, borderRadius:10, background:'#fff', fontSize:14 }}><option>Baixa</option><option>Média</option><option>Alta</option><option>Crítica</option></select></div>
            <div style={{ gridColumn:'1 / -1' }}><label style={{ display:'block', fontSize:13, fontWeight:500, color:C.t700, marginBottom:5 }}>Briefing inicial</label><textarea value={draft.description} onChange={e => update('description', e.target.value)} placeholder="Objetivos, escopo inicial, restrições e informações comerciais..." style={{ width:'100%', minHeight:92, resize:'vertical', padding:12, border:`1.5px solid ${C.border}`, borderRadius:10, outline:'none', fontSize:14 }}/></div>
          </div>
          <div onClick={() => fileInputRef.current?.click()} onDragOver={e => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)} onDrop={e => { e.preventDefault(); setDrag(false); addFiles(e.dataTransfer.files); }} style={{ marginTop:18, border:`2px dashed ${drag ? C.blue500 : C.border}`, background:drag ? C.blue100 : '#fafbfb', borderRadius:15, padding:'26px 18px', textAlign:'center', cursor:'pointer' }}>
            <input ref={fileInputRef} type="file" multiple style={{ display:'none' }} onChange={e => addFiles(e.target.files)}/><div style={{ width:50, height:50, borderRadius:25, background:C.blue100, margin:'0 auto 10px', display:'flex', alignItems:'center', justifyContent:'center' }}><Ic.Upload size={22} color={C.blue600}/></div><div style={{ fontSize:15, fontWeight:700, color:C.t900 }}>Envie os arquivos de entrada</div><div style={{ fontSize:12, color:C.t500, marginTop:5 }}>Plantas, briefing, memoriais, planilhas, fotos e documentos comerciais.</div>
          </div>
          {arquivos.length > 0 && <div style={{ marginTop:14, display:'flex', flexDirection:'column', gap:8 }}>{arquivos.map((file,index) => <div key={`${file.nome}-${index}`} style={{ display:'flex', alignItems:'center', gap:10, border:`1px solid ${C.border}`, borderRadius:10, padding:'9px 11px' }}><div style={{ width:32,height:32,borderRadius:8,background:C.blue100,display:'flex',alignItems:'center',justifyContent:'center' }}><Ic.FileText size={15} color={C.blue600}/></div><div style={{ flex:1,minWidth:0 }}><div style={{ fontSize:12,fontWeight:600,color:C.t900,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>{file.nome}</div><div style={{ fontSize:10,color:C.t500 }}>{file.tipo} · {file.tam}</div></div><Badge color="green">Pronto</Badge><button onClick={e => { e.stopPropagation(); setArquivos(files => files.filter((_,i) => i !== index)); }} style={{ border:0,background:'transparent',cursor:'pointer',display:'flex' }}><Ic.X size={14} color={C.t400}/></button></div>)}</div>}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:22, paddingTop:18, borderTop:`1px solid ${C.border}` }}><span style={{ fontSize:12,color:C.t500 }}>O projeto somente entra na carteira após a aprovação da proposta.</span><Btn onClick={continueFlow} icon={<Ic.ChevronRight size={14}/>}>Analisar e continuar</Btn></div>
        </Card>
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <Card style={{ padding:'18px 20px' }}><div style={{ fontSize:14,fontWeight:700,color:C.t900,marginBottom:12 }}>Fluxo de inclusão</div>{NEW_PROJECT_FLOW.map((step,index) => <div key={step.id} style={{ display:'flex',alignItems:'center',gap:10,padding:'8px 0',borderBottom:index<NEW_PROJECT_FLOW.length-1?`1px solid ${C.borderLight}`:'none' }}><span style={{ width:24,height:24,borderRadius:12,background:index===0?C.navActive:C.borderLight,color:index===0?'#fff':C.t500,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700 }}>{index+1}</span><span style={{ fontSize:12,fontWeight:index===0?700:500,color:index===0?C.t900:C.t500 }}>{step.label}</span></div>)}</Card>
          <Card style={{ padding:'18px 20px' }}><div style={{ fontSize:14,fontWeight:700,color:C.t900,marginBottom:8 }}>Pré-cadastro</div><div style={{ fontSize:12,color:C.t500,lineHeight:1.55 }}>Financeiro e contratos gerais poderão acompanhar orçamento, proposta e documentos antes da criação definitiva do projeto.</div><button onClick={() => onNavigate('financeiro_geral')} style={{ marginTop:12,border:0,background:'transparent',color:C.blue600,cursor:'pointer',fontSize:12,fontWeight:700 }}>Abrir financeiro geral →</button></Card>
        </div>
      </div>
    </AppShell>
  );
};

const ProjectFilesScreen = ({ onNavigate }) => {
  const project = readActiveProject() || DEFAULT_PROJECT;
  const [drag, setDrag] = useOp(false);
  const fileInputRef = React.useRef(null);
  const [arquivos, setArquivos] = useOp([
    { nome:'Planta baixa térreo.pdf', tipo:'PDF', tam:'4.8 MB', status:'Pronto' },
    { nome:'Memorial descritivo.docx', tipo:'DOCX', tam:'1.2 MB', status:'Pronto' },
  ]);
  const addFiles = list => {
    const added = Array.from(list || []).map(file => ({ nome: file.name, tipo: (file.name.split('.').pop() || 'ARQ').toUpperCase(), tam: `${Math.max(.1, file.size / 1024 / 1024).toFixed(1)} MB`, status: 'Pronto' }));
    if (added.length) setArquivos(v => [...v, ...added]);
  };
  const downloadFolderModel = () => {
    const content = '01_Arquitetura\n02_Estrutura\n03_Instalacoes\n04_Orcamentos\n05_Relatorios\n06_Fotos';
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([content], { type: 'text/plain' })); a.download = 'modelo_de_pastas_MIS.txt'; a.click(); URL.revokeObjectURL(a.href);
  };

  return (
    <AppShell active="arquivos_projeto" onNavigate={onNavigate}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24 }}>
        <div>
          <h1 style={{ fontSize: 44, fontWeight: 800, color: C.t900, lineHeight: 1.0, marginBottom: 8, letterSpacing: '-0.5px' }}>Arquivos do projeto</h1>
          <p style={{ fontSize:14, color:C.t500 }}>Centralize plantas, documentos, imagens e arquivos técnicos vinculados ao projeto selecionado.</p>
        </div>
        <div style={{ display:'flex', gap:10 }}>
          <Btn onClick={() => document.getElementById('recent-files')?.scrollIntoView({ behavior: 'smooth' })} variant="secondary" size="sm">Arquivos recentes</Btn>
          <Btn onClick={downloadFolderModel} variant="secondary" size="sm">Modelo de pasta <Ic.Download size={14}/></Btn>
        </div>
      </div>

      <div style={{ display:'flex', gap: 20, alignItems:'flex-start' }}>
        {/* Main form */}
        <Card style={{ flex:1, padding:'24px 28px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
            <div>
              <div style={{ fontSize:16, fontWeight:700, color:C.t900 }}>Novo pacote de projeto</div>
              <div style={{ fontSize:13, color:C.t500, marginTop:2 }}>Faça upload dos documentos da obra. Os arquivos serão classificados por tipo, etapa e prioridade.</div>
            </div>
            <span style={{ fontSize:12, color:C.green600, fontWeight:500, display:'flex', alignItems:'center', gap:4 }}><Ic.Check size={13}/>Rascunho salvo</span>
          </div>

          {/* Drop area */}
          <div
            onDragOver={e => { e.preventDefault(); setDrag(true); }}
            onDragLeave={() => setDrag(false)}
            onDrop={e => { e.preventDefault(); setDrag(false); addFiles(e.dataTransfer.files); }}
            onClick={() => fileInputRef.current?.click()}
            style={{ border:`2px dashed ${drag ? C.blue500 : C.border}`, borderRadius:14, padding:'40px 24px', textAlign:'center', marginBottom:24, background:drag?C.blue100:'transparent', transition:'all 0.2s', cursor:'pointer' }}
          >
            <input ref={fileInputRef} type="file" multiple style={{ display: 'none' }} onChange={e => addFiles(e.target.files)} />
            <div style={{ width:64, height:64, background:C.blue100, borderRadius:32, margin:'0 auto 14px', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Ic.Upload size={28} color={C.blue500}/>
            </div>
            <div style={{ fontSize:18, fontWeight:600, color:C.t900, marginBottom:6 }}>Arraste seus arquivos aqui</div>
            <div style={{ fontSize:13, color:C.t500, lineHeight:1.6, marginBottom:10 }}>Envie plantas, PDFs, planilhas, fotos de obra, memoriais descritivos ou documentos técnicos. <span style={{ color:C.blue600, cursor:'pointer' }}>Clique para selecionar.</span></div>
            <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
              {['PDF','DWG','XLSX','DOCX','PNG/JPG','ZIP'].map(f => (
                <span key={f} style={{ padding:'3px 10px', borderRadius:4, background:C.bg, border:`1px solid ${C.border}`, fontSize:12, fontWeight:600, color:C.t500 }}>{f}</span>
              ))}
            </div>
          </div>

          {/* Form fields */}
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            <div>
              <label style={{ display:'block', fontSize:12, fontWeight:600, color:C.t500, marginBottom:6 }}>Nome do projeto</label>
              <input defaultValue={`${project.name} — Pacote técnico`} style={{ width:'100%', padding:'10px 14px', border:`1.5px solid ${C.border}`, borderRadius:10, fontSize:14, color:C.t900, fontFamily:'inherit', outline:'none', boxSizing:'border-box' }}/>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
              {[
                { label:'Tipo de obra', val:'Residencial', sel:true },
                { label:'Responsável técnico', val: project.resp || 'Responsável técnico', sel:false },
              ].map(f => (
                <div key={f.label}>
                  <label style={{ display:'block', fontSize:12, fontWeight:600, color:C.t500, marginBottom:6 }}>{f.label}</label>
                  {f.sel ? (
                    <div style={{ position:'relative' }}>
                      <select style={{ width:'100%', padding:'10px 36px 10px 14px', border:`1.5px solid ${C.border}`, borderRadius:10, fontSize:14, color:C.t900, fontFamily:'inherit', outline:'none', appearance:'none', background:'#fff', cursor:'pointer' }}>
                        <option>Residencial</option><option>Comercial</option><option>Industrial</option>
                      </select>
                      <Ic.ChevronDown size={14} color={C.t400} style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }}/>
                    </div>
                  ) : (
                    <input defaultValue={f.val} style={{ width:'100%', padding:'10px 14px', border:`1.5px solid ${C.border}`, borderRadius:10, fontSize:14, color:C.t900, fontFamily:'inherit', outline:'none', boxSizing:'border-box' }}/>
                  )}
                </div>
              ))}
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
              {[
                { label:'Categoria principal', val:'Arquitetura', sel:true },
                { label:'Cidade / UF', val: project.loc || 'Cidade / UF', sel:false },
              ].map(f => (
                <div key={f.label}>
                  <label style={{ display:'block', fontSize:12, fontWeight:600, color:C.t500, marginBottom:6 }}>{f.label}</label>
                  {f.sel ? (
                    <div style={{ position:'relative' }}>
                      <select style={{ width:'100%', padding:'10px 36px 10px 14px', border:`1.5px solid ${C.border}`, borderRadius:10, fontSize:14, color:C.t900, fontFamily:'inherit', outline:'none', appearance:'none', background:'#fff', cursor:'pointer' }}>
                        <option>Arquitetura</option><option>Engenharia</option><option>Instalações</option>
                      </select>
                      <Ic.ChevronDown size={14} color={C.t400} style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }}/>
                    </div>
                  ) : (
                    <input defaultValue={f.val} style={{ width:'100%', padding:'10px 14px', border:`1.5px solid ${C.border}`, borderRadius:10, fontSize:14, color:C.t900, fontFamily:'inherit', outline:'none', boxSizing:'border-box' }}/>
                  )}
                </div>
              ))}
            </div>
            <div>
              <label style={{ display:'block', fontSize:12, fontWeight:600, color:C.t500, marginBottom:6 }}>Prioridade</label>
              <div style={{ position:'relative' }}>
                <select style={{ width:'100%', padding:'10px 36px 10px 14px', border:`1.5px solid ${C.border}`, borderRadius:10, fontSize:14, color:C.t900, fontFamily:'inherit', outline:'none', appearance:'none', background:'#fff', cursor:'pointer' }}>
                  <option>Alta</option><option>Média</option><option>Baixa</option>
                </select>
                <Ic.ChevronDown size={14} color={C.t400} style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }}/>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div style={{ display:'flex', justifyContent:'flex-end', gap:12, marginTop:24, paddingTop:20, borderTop:`1px solid ${C.border}` }}>
            <Btn variant="secondary" onClick={() => onNavigate('dashboard')}>Cancelar</Btn>
            <button onClick={() => onNavigate('dashboard')} style={{ padding:'11px 28px', borderRadius:24, background:C.t900, border:'none', color:'#fff', fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>Salvar arquivos</button>
          </div>
        </Card>

        {/* Sidebar */}
        <div style={{ width:260, flexShrink:0, display:'flex', flexDirection:'column', gap:14 }}>
          <Card style={{ padding:'18px 20px' }}>
            <div style={{ fontSize:14, fontWeight:600, color:C.t900, marginBottom:4 }}>Status do upload</div>
            <div style={{ fontSize:12, color:C.t500, marginBottom:16 }}>Resumo dos arquivos enviados nesta sessão.</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:16 }}>
              {[
                { label:'Arquivos',  val:arquivos.length, color:'#C8CDD4' },
                { label:'Validados', val:arquivos.length, color:'#A5B4FC' },
                { label:'Pendentes', val:0, color:'#FCD34D' },
                { label:'Pastas',    val:6, color:'#C4B5FD' },
              ].map(s => (
                <div key={s.label} style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <div style={{ width:36, height:36, borderRadius:18, background:`${s.color}40`, border:`3px solid ${s.color}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <span style={{ fontSize:13, fontWeight:700, color:C.t700 }}>{s.val}</span>
                  </div>
                  <span style={{ fontSize:12, color:C.t700 }}>{s.label}</span>
                </div>
              ))}
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {[
                { label:'Estrutura de pastas criada',  done:true  },
                { label:'Permissões configuradas',     done:true  },
                { label:'Projeto vinculado à obra',    done:true  },
                { label:'Arquivos técnicos recebidos',done:arquivos.length>0 },
              ].map((item, i) => (
                <div key={i} style={{ display:'flex', gap:8, alignItems:'center' }}>
                  {item.done
                    ? <div style={{ width:16, height:16, borderRadius:8, background:C.green500, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}><Ic.Check size={10} color="#fff"/></div>
                    : <StatusDot color={C.t300} size={8}/>
                  }
                  <span style={{ fontSize:12, color: item.done ? C.green600 : C.t500 }}>{item.label}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card id="recent-files" style={{ padding:'18px 20px' }}>
            <div style={{ fontSize:14, fontWeight:600, color:C.t900, marginBottom:4 }}>Arquivos adicionados</div>
            <div style={{ fontSize:12, color:C.t500, marginBottom:14 }}>Lista dinâmica dos documentos enviados.</div>
            {arquivos.map((a, i) => (
              <div key={i} style={{ display:'flex', gap:10, alignItems:'center', padding:'10px 0', borderBottom: i<arquivos.length-1 ? `1px solid ${C.borderLight}` : 'none' }}>
                <div style={{ width:32, height:32, borderRadius:6, background:C.blue100, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <Ic.FileText size={16} color={C.blue600}/>
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:12, fontWeight:500, color:C.t900, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{a.nome}</div>
                  <div style={{ fontSize:11, color:C.t500 }}>{a.tipo} · {a.tam}</div>
                </div>
                <Badge color="green">{a.status}</Badge>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </AppShell>
  );
};

Object.assign(window, { MisFeedScreen, SuprimentosScreen, PendenciasScreen, AlertasScreen, AtualizacoesScreen, UploadScreen, ProjectFilesScreen });

// mis-system.jsx — Notificações, Configurações, Perfil OP, Feed Oportunidades

const { useState: useSys } = React;

// ─── NOTIFICAÇÕES ─────────────────────────────────────
