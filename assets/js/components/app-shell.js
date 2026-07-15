/* === APP SHELL === */

const AppShell = ({ active, onNavigate, children, noPad }) => {
  const [darkMode, setDarkMode] = React.useState(() => {
    try { return localStorage.getItem('mis_theme') === 'dark'; }
    catch (_) { return false; }
  });
  const [activeProject, setActiveProject] = React.useState(readActiveProject());
  React.useEffect(() => {
    const sync = e => setActiveProject(e.detail || readActiveProject());
    window.addEventListener('mis:project-change', sync);
    return () => window.removeEventListener('mis:project-change', sync);
  }, []);
  React.useEffect(() => {
    const theme = darkMode ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('mis_theme', theme); } catch (_) {}
  }, [darkMode]);
  const showProjectWorkspace = !!activeProject && PROJECT_CONTEXTUAL_SCREENS.has(active);
  const showNewProjectFlow = NEW_PROJECT_FLOW_SCREENS.has(active);
  return (
    <div className={`mis-app${darkMode ? ' dark-mode' : ''}`}>
      <Sidebar active={active} onNavigate={onNavigate} />
      <div className="mis-main-shell">
        <TopBar active={active} onNavigate={onNavigate} dimmed={darkMode} onToggleDim={() => setDarkMode(v => !v)} />
        <main className={`mis-page-scroll${noPad ? ' no-pad' : ''} page-${active}`}>
          {showProjectWorkspace && <div className="project-context-wrap"><ProjectWorkspaceDropdown active={active} project={activeProject} onNavigate={onNavigate} /></div>}
          {showNewProjectFlow && <NewProjectFlowNav active={active} onNavigate={onNavigate} />}
          {children}
        </main>
      </div>
    </div>
  );
};

Object.assign(window, { NAV_ITEMS, PROJECT_WORKSPACE_GROUPS, ProjectWorkspaceDropdown, NewProjectFlowNav, Sidebar, TopBar, AppShell });


// mis-auth.jsx — Login, Cadastro, Onboarding

const { useState: useA } = React;

const ArchitecturalBackdrop = () => {
  const floors = [0, 1, 2, 3];
  const cols = [0, 1, 2, 3, 4, 5];
  return (
    <div className="auth-architecture" aria-hidden="true">
      <div className="auth-blueprint-grid" />
      <div className="auth-building">
        {floors.map((f) => <div key={f} className="auth-floor" style={{ transform: `translate(${f * 18}px, ${-f * 92}px)`, opacity: .9 - f * .08 }} />)}
        {cols.map((c) => <div key={c} className="auth-column" style={{ left: `${8 + c * 16}%`, height: `${290 + (c % 2) * 80}px` }} />)}
        <div className="auth-core" /><div className="auth-glass auth-glass-a" /><div className="auth-glass auth-glass-b" />
      </div>
      <div className="auth-plan-line line-a" /><div className="auth-plan-line line-b" /><div className="auth-plan-line line-c" />
    </div>
  );
};

const AuthThemeToggle = () => {
  const [dark, setDark] = React.useState(() => document.documentElement.dataset.theme === 'dark');
  React.useEffect(() => {
    const theme = dark ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('mis_theme', theme); } catch (_) {}
  }, [dark]);
  return (
    <button
      type="button"
      className={`auth-theme-toggle${dark ? ' active' : ''}`}
      onClick={() => setDark(v => !v)}
      aria-label={dark ? 'Ativar modo claro' : 'Ativar modo escuro'}
      title={dark ? 'Ativar modo claro' : 'Ativar modo escuro'}
    >
      {dark ? <span className="auth-theme-sun">☀</span> : <Ic.Moon size={21} />}
    </button>
  );
};
