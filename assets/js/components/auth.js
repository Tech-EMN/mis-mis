/* === AUTH === */

const AuthStage = ({ children, size = 'login' }) => (
  <div className="auth-stage">
    <ArchitecturalBackdrop />
    <AuthThemeToggle />
    <div className={`auth-card auth-card-${size}`}>{children}</div>
  </div>
);

const MisOrb = () => <div className="mis-orb"><MisBrand size={68} className="mis-orb-image" /></div>;

const LoginScreen = ({ onNavigate }) => {
  const [email, setEmail] = useA('');
  const [pass, setPass] = useA('');
  const [show, setShow] = useA(false);
  const [message, setMessage] = useA('');
  const login = () => {
    if (!email || !pass) { setMessage('Preencha e-mail e senha para continuar.'); return; }
    onNavigate('feed');
  };
  return (
    <AuthStage size="login">
      <div style={{ textAlign: 'center', marginBottom: 28 }}><MisOrb /><h1 className="auth-brand-title">M Group Intelligence System</h1><p className="auth-brand-subtitle">A Inteligência das Soluções Construtivas</p></div>
      <div className="auth-field"><label>E-mail</label><div className="auth-input-wrap"><Ic.Mail size={17} /><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" onKeyDown={e => e.key === 'Enter' && login()} /></div></div>
      <div className="auth-field"><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><label>Senha</label><button className="auth-link-btn" onClick={() => setMessage('Enviaremos as instruções de recuperação para o seu e-mail.')}>Esqueci minha senha</button></div><div className="auth-input-wrap"><Ic.Lock size={17} /><input type={show ? 'text' : 'password'} value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••" onKeyDown={e => e.key === 'Enter' && login()} /><button className="auth-eye" onClick={() => setShow(v => !v)}><Ic.Eye size={17} /></button></div></div>
      {message && <div className="auth-inline-message">{message}</div>}
      <button className="auth-primary" onClick={login}>Entrar com MIS</button>
      <Divider label="ou continue com" style={{ margin: '22px 0 16px' }} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}><button className="auth-social" onClick={() => setMessage('Login com Google disponível na integração final.')}><span className="google-mark">G</span>Google</button><button className="auth-social" onClick={() => setMessage('Login com Apple disponível na integração final.')}><span style={{ fontSize: 21 }}>●</span>Apple</button></div>
      <p className="auth-account-text">Ainda não tem conta? <button className="auth-create-link" onClick={() => onNavigate('cadastro')}>Criar conta gratuita</button></p>
      <p className="auth-version">v1.0 – MVP</p>
    </AuthStage>
  );
};


const CadastroScreen = ({ onNavigate }) => {
  const [step, setStep] = useA(1);
  const [accepted, setAccepted] = useA(false);
  const [form, setForm] = useA({ nome: '', email: '', telefone: '', senha: '', confirma: '' });
  const [error, setError] = useA('');
  const update = (key, value) => setForm(v => ({ ...v, [key]: value }));
  const continueRegister = () => {
    if (!form.nome || !form.email || !form.telefone || !form.senha || !form.confirma) return setError('Preencha todos os campos.');
    if (form.senha !== form.confirma) return setError('As senhas informadas não são iguais.');
    if (!accepted) return setError('Aceite os Termos de Uso e a Política de Privacidade.');
    setError(''); setStep(2);
  };
  if (step === 2) return (
    <AuthStage size="verify">
      <div className="auth-progress"><span className="done" /><span /></div>
      <div className="verify-icon"><Ic.Mail size={29} color="#0b4d8c" /></div>
      <h2 className="verify-title">Verifique seu e-mail</h2>
      <p className="verify-subtitle">Enviamos um código de 6 dígitos para<br /><strong>{form.email || 'seu@email.com'}</strong></p>
      <div className="otp-row">{[0,1,2,3,4,5].map(i => <input key={i} maxLength={1} autoFocus={i === 0} defaultValue={i === 0 ? '3' : ''} onInput={e => { if (e.currentTarget.value && e.currentTarget.nextElementSibling) e.currentTarget.nextElementSibling.focus(); }} />)}</div>
      <button className="auth-primary" onClick={() => onNavigate('onboarding')}>Verificar e continuar</button>
      <p className="verify-resend">Não recebeu? <button>Reenviar código</button> <span>· 54s</span></p>
      <button className="verify-change" onClick={() => setStep(1)}>← Alterar e-mail</button>
    </AuthStage>
  );
  return (
    <AuthStage size="register">
      <button className="auth-back" onClick={() => onNavigate('login')}><Ic.ArrowLeft size={17} /> Voltar ao login</button>
      <div className="auth-progress"><span className="done" /><span /></div>
      <div className="register-step">Etapa 1 de 2</div><h2 className="register-title">Criar conta</h2><p className="register-subtitle">Preencha seus dados para começar.</p>
      <div className="register-grid">
        <div className="auth-field"><label>Nome completo</label><div className="auth-input-wrap"><Ic.User size={18} /><input value={form.nome} onChange={e => update('nome', e.target.value)} placeholder="Eduardo Nunes" /></div></div>
        <div className="auth-field"><label>E-mail</label><div className="auth-input-wrap"><Ic.Mail size={18} /><input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="seu@email.com" /></div></div>
        <div className="auth-field"><label>Telefone</label><div className="auth-input-wrap"><Ic.Phone size={18} /><input value={form.telefone} onChange={e => update('telefone', e.target.value)} placeholder="(11) 99999-9999" /></div></div>
        <div className="auth-field"><label>Senha</label><div className="auth-input-wrap"><Ic.Lock size={18} /><input type="password" value={form.senha} onChange={e => update('senha', e.target.value)} placeholder="Mínimo 8 caracteres" /></div><small>Inclua letras, números e um símbolo.</small></div>
        <div className="auth-field"><label>Confirmar senha</label><div className="auth-input-wrap"><Ic.Lock size={18} /><input type="password" value={form.confirma} onChange={e => update('confirma', e.target.value)} placeholder="Repita a senha" /></div></div>
      </div>
      <label className="auth-terms"><input type="checkbox" checked={accepted} onChange={e => setAccepted(e.target.checked)} /><span>Aceito os <a href="#" onClick={e => e.preventDefault()}>Termos de Uso</a> e <a href="#" onClick={e => e.preventDefault()}>Política de Privacidade</a></span></label>
      {error && <div className="auth-inline-message">{error}</div>}
      <button className="auth-primary" onClick={continueRegister}>Continuar</button>
    </AuthStage>
  );
};


const OnboardingScreen = ({ onNavigate }) => {
  const [step, setStep] = useA(1);
  const [profile, setProfile] = useA(null);
  const [obras, setObras] = useA(null);
  const [tipo, setTipo] = useA(null);

  const profiles = [
    { id: 'uc', icon: '🏠', title: 'Quero reformar ou construir', desc: 'Usuário comum — cliente final' },
    { id: 'op', icon: '🔧', title: 'Sou profissional / prestador', desc: 'Operador independente' },
    { id: 'go', icon: '🏗️', title: 'Gerencio obras e projetos', desc: 'Gestor de obra — acesso completo' },
    { id: 'fo', icon: '🏪', title: 'Forneço materiais ou serviços', desc: 'Fornecedor parceiro MIS' },
    { id: 'corp', icon: '🏢', title: 'Empresa de arq. ou engenharia', desc: 'Acesso corporativo e multi-projeto' },
  ];

  const StepIndicator = () => (
    <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 32 }}>
      {[1, 2, 3].map(i => (
        <div key={i} style={{ height: 4, width: 40, borderRadius: 4, background: i <= step ? C.navActive : C.border, transition: 'background 0.3s' }} />
      ))}
    </div>
  );

  if (step === 1) return (
    <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ maxWidth: 600, width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <MisBrand size={50} style={{ margin: '0 auto 16px', boxShadow: '0 10px 28px rgba(5,25,43,.22)' }} />
          <StepIndicator />
          <h2 style={{ fontSize: 26, fontWeight: 700, color: C.t900 }}>Vamos configurar sua conta</h2>
          <p style={{ fontSize: 15, color: C.t500, marginTop: 6 }}>Como você vai usar o MIS?</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {profiles.map(p => (
            <button key={p.id} className={`mis-select-btn${profile === p.id ? ' active' : ''}`} aria-pressed={profile === p.id} onClick={() => setProfile(p.id)} style={{
              display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', borderRadius: 14,
              background: profile === p.id ? '#F0FFF4' : '#fff',
              border: `2px solid ${profile === p.id ? C.navActive : C.border}`,
              cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', transition: 'all 0.15s',
            }}>
              <span style={{ fontSize: 26 }}>{p.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: C.t900 }}>{p.title}</div>
                <div style={{ fontSize: 13, color: C.t500, marginTop: 2 }}>{p.desc}</div>
              </div>
              {profile === p.id && <Ic.Check size={18} color={C.navActive} />}
            </button>
          ))}
        </div>
        <Btn onClick={() => profile && setStep(2)} disabled={!profile} style={{ width: '100%', justifyContent: 'center', marginTop: 24, padding: '12px' }}>
          Continuar
        </Btn>
      </div>
    </div>
  );

  if (step === 2) return (
    <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ maxWidth: 560, width: '100%' }}>
        <button onClick={() => setStep(1)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: C.t500, fontSize: 14, marginBottom: 24, fontFamily: 'inherit' }}>
          <Ic.ArrowLeft size={16} /> Voltar
        </button>
        <StepIndicator />
        <h2 style={{ fontSize: 24, fontWeight: 700, color: C.t900, marginBottom: 4 }}>Um pouco mais sobre você</h2>
        <p style={{ fontSize: 14, color: C.t500, marginBottom: 28 }}>Isso personaliza toda a sua experiência MIS.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {[
            { label: 'Obras ativas simultaneamente', opts: ['1–3', '4–10', '11–30', '30+'], state: obras, set: setObras },
            { label: 'Tipo de obra principal', opts: ['Residencial', 'Comercial', 'Industrial', 'Misto'], state: tipo, set: setTipo },
          ].map(({ label, opts, state, set }) => (
            <div key={label}>
              <div style={{ fontSize: 14, fontWeight: 500, color: C.t700, marginBottom: 10 }}>{label}</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {opts.map(o => (
                  <button key={o} className={`mis-select-btn${state === o ? ' active' : ''}`} aria-pressed={state === o} onClick={() => set(o)} style={{
                    padding: '7px 18px', borderRadius: 20, fontSize: 14,
                    cursor: 'pointer', fontFamily: 'inherit',
                    border: `2px solid ${state === o ? C.navActive : C.border}`,
                    background: state === o ? '#F0FFF4' : '#fff',
                    color: state === o ? C.navActive : C.t700, fontWeight: state === o ? 600 : 400,
                    transition: 'all 0.15s',
                  }}>{o}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Btn onClick={() => setStep(3)} style={{ width: '100%', justifyContent: 'center', marginTop: 32, padding: '12px' }}>Continuar</Btn>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ maxWidth: 540, width: '100%', textAlign: 'center' }}>
        <StepIndicator />
        <div style={{
          width: 80, height: 80, margin: '0 auto 20px',
          background: 'linear-gradient(135deg, #1C3A2A 0%, #1d4ed8 100%)',
          borderRadius: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Ic.Sparkles size={34} color="#fff" />
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 700, color: C.t900, marginBottom: 10 }}>Bem-vindo ao MIS, Eduardo!</h2>
        <p style={{ fontSize: 15, color: C.t500, lineHeight: 1.65, maxWidth: 420, margin: '0 auto 32px' }}>
          Sou o <strong style={{ color: C.t900 }}>Oráculo MIS</strong>. Estou aqui para ajudar você a gerenciar suas obras com inteligência preditiva. Vamos começar?
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 36 }}>
          {[
            { icon: Ic.Building, label: 'Gestão de projetos', bg: C.blue100, ic: C.blue600 },
            { icon: Ic.AlertTriangle, label: 'Alertas preditivos', bg: C.orange100, ic: C.orange600 },
            { icon: Ic.Sparkles, label: 'Oráculo IA', bg: C.green100, ic: C.green600 },
          ].map(({ icon: Icon, label, bg, ic }) => (
            <div key={label} style={{ padding: '18px 12px', borderRadius: 14, background: '#fff', textAlign: 'center' }}>
              <div style={{ width: 44, height: 44, borderRadius: 22, background: bg, margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={20} color={ic} />
              </div>
              <div style={{ fontSize: 13, fontWeight: 500, color: C.t700 }}>{label}</div>
            </div>
          ))}
        </div>
        <Btn onClick={() => onNavigate('feed')} style={{ padding: '13px 48px', fontSize: 15 }}>Acessar MIS Feed →</Btn>
      </div>
    </div>
  );
};

Object.assign(window, { LoginScreen, CadastroScreen, OnboardingScreen });

// mis-dashboard.jsx — Dashboard GO, Dashboard UC, Chat Oráculo

const { useState: useD } = React;

