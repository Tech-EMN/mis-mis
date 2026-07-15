/* === MIS API CLIENT ===
 * Comunicação com o MIS Engine (FastAPI backend).
 * 
 * Configuração: MIS_API_URL em config.js
 *   - Local dev: http://localhost:8000/api/v1
 *   - Produção:  https://mis-engine-xxxx.up.railway.app/api/v1
 */

const MISApi = {
  /** URL base da API (definida em config.js) */
  get baseUrl() {
    return window.MIS_API_URL || 'http://localhost:8000/api/v1';
  },

  /**
   * Healthcheck — verifica se o back-end está online.
   * @returns {Promise<{status, version, dependencies}>}
   */
  async health() {
    const res = await fetch(`${this.baseUrl}/health`);
    if (!res.ok) throw new Error(`Healthcheck failed: ${res.status}`);
    return res.json();
  },

  /**
   * Inicia extração assíncrona de um arquivo de projeto.
   * @param {File} file — Arquivo PDF/DXF/DWG
   * @param {string} projectName — Nome do projeto (opcional)
   * @returns {Promise<{task_id, status, status_url}>}
   */
  async extract(file, projectName) {
    const form = new FormData();
    form.append('file', file);
    if (projectName) form.append('project_name', projectName);
    
    const res = await fetch(`${this.baseUrl}/extract`, {
      method: 'POST',
      body: form,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || `Extract failed: ${res.status}`);
    }
    return res.json();
  },

  /**
   * Consulta status de uma extração (polling).
   * @param {string} taskId
   * @returns {Promise<{task_id, status, progress_pct, source_type, result}>}
   */
  async getStatus(taskId) {
    const res = await fetch(`${this.baseUrl}/extract/${taskId}/status`);
    if (!res.ok) throw new Error(`Status check failed: ${res.status}`);
    return res.json();
  },

  /**
   * Aguarda conclusão de extração com polling automático.
   * @param {string} taskId
   * @param {number} intervalMs — Intervalo entre polls (padrão: 1000ms)
   * @param {number} timeoutMs — Timeout total (padrão: 120000ms = 2min)
   * @param {function} onProgress — Callback opcional: ({progressPct, status}) => void
   * @returns {Promise<object>} Resultado final
   */
  async waitForResult(taskId, { intervalMs = 1000, timeoutMs = 120000, onProgress } = {}) {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
      const status = await this.getStatus(taskId);
      
      if (onProgress) {
        onProgress({ progressPct: status.progress_pct, status: status.status });
      }
      
      if (status.status === 'done') return status.result;
      if (status.status === 'failed') throw new Error(status.error || 'Extraction failed');
      
      await new Promise(r => setTimeout(r, intervalMs));
    }
    throw new Error('Timeout: extraction took too long');
  },

  /**
   * Lista projetos processados.
   * @param {object} params — {status, source_type, limit, offset}
   * @returns {Promise<{total, limit, offset, projects}>}
   */
  async listProjects(params = {}) {
    const query = new URLSearchParams();
    if (params.status) query.set('status', params.status);
    if (params.source_type) query.set('source_type', params.source_type);
    if (params.limit) query.set('limit', params.limit);
    if (params.offset) query.set('offset', params.offset);
    
    const qs = query.toString();
    const url = `${this.baseUrl}/projects${qs ? '?' + qs : ''}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`List projects failed: ${res.status}`);
    return res.json();
  },

  /**
   * Obtém detalhes de um projeto específico.
   * @param {string} projectId — UUID do projeto
   * @returns {Promise<object>}
   */
  async getProject(projectId) {
    const res = await fetch(`${this.baseUrl}/projects/${projectId}`);
    if (!res.ok) throw new Error(`Get project failed: ${res.status}`);
    return res.json();
  },
};

/* Exportar para escopo global (sem build system) */
window.MISApi = MISApi;
