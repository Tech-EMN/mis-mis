/* === ORCAMENTO SCREENS === */

// ─── HELPERS ────────────────────────────────────────────
const QT_FORMAT = (v) => typeof v === 'number' ? v.toFixed(2) : '—';
const QT_CONFIDENCE_COLOR = (v) => v >= 0.9 ? C.green500 : v >= 0.7 ? C.orange500 : C.red500;

// ─── REGRAS SIMPLIFICADAS (P1=A) ──────────────────────
const QT_PE_DIREITO = 2.8; // pé direito padrão
const QT_CALC_RULES = [
  { label: 'Piso',      un: 'm²', calc: (r) => r.area_m2 * 1.10, desc: 'Área + 10% perda' },
  { label: 'Contrapiso', un: 'm²', calc: (r) => r.area_m2 * 1.05, desc: 'Área + 5% perda' },
  { label: 'Parede (alvenaria)', un: 'm²', calc: (r) => r.perimeter_m * QT_PE_DIREITO, desc: 'Perímetro × pé direito 2.80m' },
  { label: 'Reboco interno', un: 'm²', calc: (r) => r.perimeter_m * QT_PE_DIREITO * 2, desc: 'Parede × 2 faces' },
  { label: 'Teto (laje)', un: 'm²', calc: (r) => r.area_m2, desc: 'Área do teto' },
  { label: 'Rodapé', un: 'm', calc: (r) => r.perimeter_m * 0.85, desc: 'Perímetro − vãos (15%)' },
];

// ─── SCREENS EXISTENTES (stubs) ────────────────────────
const QueroReformarScreen = ({ onNavigate }) =>
  React.createElement('div', { style: { minHeight: '100vh', background: 'var(--mis-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12 } },
    React.createElement('h2', { style: { color: 'var(--mis-text-strong)' } }, 'Quero Reformar'),
    React.createElement('p', { style: { color: 'var(--mis-text-muted)' } }, 'Em desenvolvimento'),
    React.createElement('button', { onClick: () => onNavigate('feed'), style: { padding: '10px 20px', borderRadius: 8, background: '#2563eb', color: '#fff', border: 'none', cursor: 'pointer' } }, 'Voltar ao Feed')
  );

const QueroOrcamentoScreen = ({ onNavigate }) =>
  React.createElement('div', { style: { minHeight: '100vh', background: 'var(--mis-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12 } },
    React.createElement('h2', { style: { color: 'var(--mis-text-strong)' } }, 'Quero Orçamento'),
    React.createElement('p', { style: { color: 'var(--mis-text-muted)' } }, 'Em desenvolvimento'),
    React.createElement('button', { onClick: () => onNavigate('upload'), style: { padding: '10px 20px', borderRadius: 8, background: '#2563eb', color: '#fff', border: 'none', cursor: 'pointer' } }, '↑ Upload de arquivos')
  );

const AnaliseArquivosScreen = ({ onNavigate }) =>
  React.createElement('div', { style: { minHeight: '100vh', background: 'var(--mis-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12 } },
    React.createElement('h2', { style: { color: 'var(--mis-text-strong)' } }, 'Análise IA'),
    React.createElement('p', { style: { color: 'var(--mis-text-muted)' } }, 'Processando arquivos com pipeline Draft C v2'),
    React.createElement('button', { onClick: () => onNavigate('orcamento_quant'), style: { padding: '10px 20px', borderRadius: 8, background: '#2563eb', color: '#fff', border: 'none', cursor: 'pointer' } }, 'Ver Levantamento Quantitativo →')
  );

// ─── ORÇAMENTO QUANTITATIVO (FUNCIONAL — Demo) ─────────
const OrcamentoQuantScreen = ({ onNavigate }) => {
  const [project, setProject] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [loadedFrom, setLoadedFrom] = React.useState('');

  // Buscar dados do pipeline ao montar
  React.useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        setLoading(true);
        // Timeout: force fallback after 8s
        const timeout = setTimeout(() => {
          if (!cancelled) {
            setLoading(false);
            console.warn('API timeout — usando dados de demonstração');
          }
        }, 8000);
        // Tenta carregar do último projeto processado (Supabase via API)
        if (window.MISApi) {
          try {
            const projects = await window.MISApi.listProjects({ limit: 5 });
            if (projects?.projects?.length) {
              // Pega o último projeto com status "done"
              const done = projects.projects.find(p => p.status === 'done');
              if (done) {
                const detail = await window.MISApi.getProject(done.id);
                if (detail?.project) {
                  setProject(detail.project);
                  setLoadedFrom('API Railway (último projeto processado)');
                  setLoading(false);
                  return;
                }
              }
            }
          } catch (e) { /* fallback */ }
        }

        // Fallback: dados mockados do pipeline (sample real)
        setProject({
          name: 'Projeto Amostra — Pipeline Draft C v2',
          source_type: 'dxf',
          status: 'done',
          total_rooms: 4, total_area_m2: 470.0,
          rooms: [
            { name: 'Quadrado 5x5', area_m2: 25.0, perimeter_m: 20.0, width_m: 5.0, length_m: 4.17, shape: 'rectangle', confidence_geometry: 1.0, confidence_name: 0.95, faces: [{ label: 'piso', area_m2: 25.0 }, { label: 'teto', area_m2: 25.0 }, { label: 'paredes', area_m2: 56.0 }] },
            { name: 'Retangulo 20x10', area_m2: 200.0, perimeter_m: 60.0, width_m: 20.0, length_m: 10.0, shape: 'rectangle', confidence_geometry: 1.0, confidence_name: 0.95, faces: [{ label: 'piso', area_m2: 200.0 }, { label: 'teto', area_m2: 200.0 }, { label: 'paredes', area_m2: 168.0 }] },
            { name: 'Ambiente Externo', area_m2: 200.0, perimeter_m: 72.0, width_m: 36.0, length_m: 5.56, shape: 'irregular', confidence_geometry: 0.88, confidence_name: 0.70, faces: [{ label: 'piso', area_m2: 200.0 }, { label: 'teto', area_m2: 200.0 }, { label: 'paredes', area_m2: 201.6 }] },
            { name: 'Ambiente Interno', area_m2: 45.0, perimeter_m: 28.0, width_m: 9.0, length_m: 4.17, shape: 'rectangle', confidence_geometry: 1.0, confidence_name: 0.95, faces: [{ label: 'piso', area_m2: 45.0 }, { label: 'teto', area_m2: 45.0 }, { label: 'paredes', area_m2: 78.4 }] },
          ],
          warnings: ['Face detection limitada a entidades LINE/LWPOLYLINE', 'Qualificadores de material (azulejo/drywall) requerem PDF + Claude Vision'],
          fragilities: [],
          elapsed_ms: 3500,
          created_at: new Date().toISOString(),
        });
        setLoadedFrom('Dados de amostra (Pipeline Draft C v2)');
      } catch (err) {
        setError('Falha ao carregar dados: ' + (err.message || 'Erro desconhecido'));
      } finally {
        setLoading(false);
      }
    };
    load(); return () => { cancelled = true; clearTimeout(timeout); };
  }, []);

  // Gerar linhas da tabela quantitativa
  const rows = React.useMemo(() => {
    if (!project?.rooms) return [];
    const items = [];
    project.rooms.forEach((room, ri) => {
      QT_CALC_RULES.forEach(rule => {
        const qty = rule.calc(room);
        if (qty > 0) {
          items.push({
            id: `${ri}-${rule.label}`,
            ambiente: room.name,
            item: rule.label,
            un: rule.un,
            quantidade: qty,
            formula: rule.desc,
            conf: room.confidence_geometry || 0.9,
            area_ref: room.area_m2,
          });
        }
      });
    });
    return items;
  }, [project]);

  // Estatísticas
  const stats = React.useMemo(() => {
    if (!project?.rooms?.length) return {};
    const totalArea = project.rooms.reduce((s, r) => s + r.area_m2, 0);
    const avgConf = project.rooms.reduce((s, r) => s + (r.confidence_geometry || 0), 0) / project.rooms.length;
    return { totalArea, avgConf, roomCount: project.rooms.length, warningCount: (project.warnings || []).length };
  }, [project]);

  // CSV export
  const exportCSV = () => {
    if (!rows.length) return;
    const header = 'Ambiente;Item;Unidade;Quantidade;Fórmula;Confiança\n';
    const body = rows.map(r => `${r.ambiente};${r.item};${r.un};${QT_FORMAT(r.quantidade)};${r.formula};${(r.conf * 100).toFixed(0)}%`).join('\n');
    const blob = new Blob(['\uFEFF' + header + body], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'levantamento_quantitativo.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return React.createElement('div', { style: { minHeight: '100vh', background: 'var(--mis-bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 } },
      React.createElement('div', { style: { width: 40, height: 40, borderRadius: 20, border: '3px solid var(--mis-border)', borderTopColor: '#2563eb', animation: 'mis-spin 0.8s linear infinite' } }),
      React.createElement('p', { style: { color: 'var(--mis-text-muted)', fontSize: 14 } }, 'Carregando dados do pipeline...')
    );
  }

  if (error) {
    return React.createElement('div', { style: { minHeight: '100vh', background: 'var(--mis-bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: 40 } },
      React.createElement('div', { style: { fontSize: 48, marginBottom: 8 } }, '⚠️'),
      React.createElement('h2', { style: { color: C.red600 } }, 'Erro ao carregar dados'),
      React.createElement('p', { style: { color: 'var(--mis-text-muted)' } }, error),
      React.createElement('button', { onClick: () => onNavigate('upload'), style: { marginTop: 16, padding: '10px 24px', borderRadius: 10, background: '#2563eb', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 14 } }, '↑ Tentar novo upload')
    );
  }

  return React.createElement('div', { className: 'mis-page-scroll', style: { minHeight: '100vh', background: 'var(--mis-bg)' } },
    // Header
    React.createElement('div', { style: { background: 'var(--mis-card)', borderBottom: '1px solid var(--mis-border)', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' } },
      React.createElement('button', { onClick: () => onNavigate('upload'), style: { padding: '6px 12px', borderRadius: 6, background: 'var(--mis-surface-muted)', border: '1px solid var(--mis-border)', cursor: 'pointer', fontSize: 13, color: 'var(--mis-text-secondary)' } }, '← Voltar'),
      React.createElement('span', { style: { color: 'var(--mis-text-muted)', fontSize: 12 } }, 'Upload → Análise IA →'),
      React.createElement('span', { style: { color: 'var(--mis-text-strong)', fontSize: 14, fontWeight: 700 } }, 'Levantamento Quantitativo'),
    ),

    // Main content
    React.createElement('div', { style: { maxWidth: 1100, margin: '0 auto', padding: '24px' } },
      React.createElement('div', { style: { background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: '10px 16px', marginBottom: 16, display: 'flex', gap: 10, alignItems: 'center' } },
        React.createElement('span', { style: { fontSize: 18 } }, '⚠️'),
        React.createElement('div', null,
          React.createElement('strong', { style: { color: '#991B1B', fontSize: 13 } }, 'DADOS DE DEMONSTRAÇÃO'),
          React.createElement('div', { style: { color: '#7F1D1D', fontSize: 11, marginTop: 2 } }, 'Walking Skeleton — Sprint 1. Motor funcional, regras de negócio (BDI, SINAPI, memorial descritivo) no Sprint 4.')
        )
      ),
      // Project info
      React.createElement('div', { style: { marginBottom: 20 } },
        React.createElement('h1', { style: { fontSize: 24, fontWeight: 800, color: 'var(--mis-text-strong)', marginBottom: 4 } }, project.name || 'Levantamento Quantitativo'),
        React.createElement('p', { style: { fontSize: 13, color: 'var(--mis-text-muted)' } }, `Fonte: ${loadedFrom} · ${new Date(project.created_at).toLocaleDateString('pt-BR')}`),
      ),

      // Summary cards
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 24 } },
        React.createElement('div', { style: { background: 'var(--mis-card)', borderRadius: 12, border: '1px solid var(--mis-border)', padding: 18 } },
          React.createElement('div', { style: { fontSize: 11, color: 'var(--mis-text-muted)', marginBottom: 4 } }, 'AMBIENTES'),
          React.createElement('div', { style: { fontSize: 32, fontWeight: 800, color: 'var(--mis-text-strong)' } }, stats.roomCount),
        ),
        React.createElement('div', { style: { background: 'var(--mis-card)', borderRadius: 12, border: '1px solid var(--mis-border)', padding: 18 } },
          React.createElement('div', { style: { fontSize: 11, color: 'var(--mis-text-muted)', marginBottom: 4 } }, 'ÁREA TOTAL'),
          React.createElement('div', { style: { fontSize: 32, fontWeight: 800, color: '#2563eb' } }, `${QT_FORMAT(stats.totalArea)} m²`),
        ),
        React.createElement('div', { style: { background: 'var(--mis-card)', borderRadius: 12, border: '1px solid var(--mis-border)', padding: 18 } },
          React.createElement('div', { style: { fontSize: 11, color: 'var(--mis-text-muted)', marginBottom: 4 } }, 'CONFIANÇA MÉDIA'),
          React.createElement('div', { style: { fontSize: 32, fontWeight: 800, color: QT_CONFIDENCE_COLOR(stats.avgConf) } }, `${((stats.avgConf || 0) * 100).toFixed(0)}%`),
        ),
        React.createElement('div', { style: { background: 'var(--mis-card)', borderRadius: 12, border: '1px solid var(--mis-border)', padding: 18 } },
          React.createElement('div', { style: { fontSize: 11, color: 'var(--mis-text-muted)', marginBottom: 4 } }, 'ITENS QUANTITATIVOS'),
          React.createElement('div', { style: { fontSize: 32, fontWeight: 800, color: 'var(--mis-text-strong)' } }, rows.length),
        ),
      ),

      // Pipeline info banner
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', borderRadius: 8, background: stats.warningCount ? '#FFF8E1' : '#F0FDF4', border: `1px solid ${stats.warningCount ? '#FCD34D' : '#BBF7D0'}`, marginBottom: 20, fontSize: 12 } },
        React.createElement('span', null, stats.warningCount ? '⚠️' : '✅'),
        React.createElement('span', { style: { color: 'var(--mis-text-secondary)' } },
          `Pipeline Draft C v2 · ${stats.warningCount ? stats.warningCount + ' ressalvas técnicas' : 'Sem ressalvas'} · Tempo de extração: ${project.elapsed_ms ? (project.elapsed_ms / 1000).toFixed(1) + 's' : 'N/A'}`
        ),
      ),

      // Table header + export button
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
        React.createElement('h2', { style: { fontSize: 16, fontWeight: 700, color: 'var(--mis-text-strong)' } }, '📊 Tabela de Quantitativos'),
        React.createElement('div', { style: { display: 'flex', gap: 8 } },
          React.createElement('button', { onClick: exportCSV, style: { padding: '8px 16px', borderRadius: 8, background: '#059669', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600 } }, '📥 Exportar CSV'),
        ),
      ),

      // Quantitative table
      React.createElement('div', { style: { background: 'var(--mis-card)', borderRadius: 12, border: '1px solid var(--mis-border)', overflow: 'hidden' } },
        React.createElement('table', { style: { width: '100%', borderCollapse: 'collapse' } },
          React.createElement('thead', null,
            React.createElement('tr', { style: { background: 'var(--mis-surface-muted)', borderBottom: '1px solid var(--mis-border)' } },
              ['Ambiente', 'Item', 'Un.', 'Quantidade', 'Fórmula', 'Conf.'].map(h =>
                React.createElement('th', { key: h, style: { textAlign: 'left', padding: '12px 14px', fontSize: 12, fontWeight: 600, color: 'var(--mis-text-muted)', letterSpacing: 0.3 } }, h)
              )
            )
          ),
          React.createElement('tbody', null,
            rows.map((r, i) =>
              React.createElement('tr', { key: r.id, style: { borderBottom: '1px solid var(--mis-border)', background: i % 2 === 0 ? 'transparent' : 'var(--mis-surface-soft)' } },
                React.createElement('td', { style: { padding: '10px 14px', fontSize: 13, fontWeight: 600, color: 'var(--mis-text-strong)' } }, r.ambiente),
                React.createElement('td', { style: { padding: '10px 14px', fontSize: 13, color: 'var(--mis-text-secondary)' } }, r.item),
                React.createElement('td', { style: { padding: '10px 14px', fontSize: 13, color: 'var(--mis-text-muted)' } }, r.un),
                React.createElement('td', { style: { padding: '10px 14px', fontSize: 14, fontWeight: 700, color: 'var(--mis-text-strong)' } }, QT_FORMAT(r.quantidade)),
                React.createElement('td', { style: { padding: '10px 14px', fontSize: 11, color: 'var(--mis-text-muted)', maxWidth: 200 } }, r.formula),
                React.createElement('td', { style: { padding: '10px 14px', fontSize: 13, fontWeight: 600 } },
                  React.createElement('span', { style: { color: QT_CONFIDENCE_COLOR(r.conf), background: r.conf >= 0.9 ? '#DCFCE7' : r.conf >= 0.7 ? '#FFF7ED' : '#FEE2E2', padding: '2px 8px', borderRadius: 10, fontSize: 12 } }, `${(r.conf * 100).toFixed(0)}%`)
                ),
              )
            )
          )
        ),
      ),

      // Warnings section
      project.warnings?.length > 0 && React.createElement('div', { style: { marginTop: 20, padding: 16, borderRadius: 10, background: '#FFFBEB', border: '1px solid #FDE68A' } },
        React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: '#92400E', marginBottom: 6 } }, '⚠️ Ressalvas técnicas do pipeline'),
        ...project.warnings.map((w, i) => React.createElement('div', { key: i, style: { fontSize: 12, color: '#78350F', marginBottom: 3 } }, `• ${w}`))
      ),

      // Action buttons
      React.createElement('div', { style: { display: 'flex', gap: 10, marginTop: 24, flexWrap: 'wrap' } },
        React.createElement('button', { onClick: () => onNavigate('upload'), style: { padding: '12px 24px', borderRadius: 10, background: '#2563eb', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600 } }, '↑ Fazer novo upload'),
        React.createElement('button', { onClick: () => onNavigate('proposta'), style: { padding: '12px 24px', borderRadius: 10, background: 'var(--mis-card)', color: 'var(--mis-text-strong)', border: '1px solid var(--mis-border)', cursor: 'pointer', fontSize: 14, fontWeight: 600 } }, '📋 Gerar Proposta'),
        React.createElement('button', { onClick: exportCSV, style: { padding: '12px 24px', borderRadius: 10, background: 'var(--mis-card)', color: '#059669', border: '1px solid #059669', cursor: 'pointer', fontSize: 14, fontWeight: 600 } }, '📥 Exportar CSV'),
      ),
    ),
  );
};

Object.assign(window, { QueroReformarScreen, QueroOrcamentoScreen, AnaliseArquivosScreen, OrcamentoQuantScreen });
