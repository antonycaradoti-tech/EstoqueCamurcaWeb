# Changelog técnico

## 2026-11-24 — Revisão inicial com Dev-Master
- IDs: API-001, SEC-001, SEC-002, SEC-003, DATA-001, DATA-002, DEP-001.
- Branch inspecionada: `fix/primeiro-acesso-tagplus-2026-11-19`.
- Commit observado: `586e5ec6a09047feb2ba10b3778f4a6d19a583ec`.
- Arquivos revisados: `wrangler.toml`, `estoque-web/worker.js`, `estoque-web/wrangler.toml`, `estoque-web/README.md`.
- PR #1: aberto, Draft, não mesclado; 10 commits à frente de main na conferência.
- Preview: comentário automático do Cloudflare registra build e deploy bem-sucedidos para o commit 586e5ec em 2026-11-19.
- Achados: autenticação TagPlus não confirmada; endpoint sem autenticação própria; senha em texto puro no localStorage; dados de produto interpolados em innerHTML; persistência limitada ao navegador.
- Testes executados nesta revisão: leitura de arquivos e metadados do GitHub, comparação main/head e inspeção do diff do PR.
- Testes não executados: testes locais, testes automatizados, chamadas diretas à TagPlus, inspeção atual do dashboard Cloudflare e deploy.
- Impacto: nenhum código da aplicação alterado nesta revisão; documentação de continuidade criada.
- Pendência principal: resposta oficial da TagPlus.

## Complemento da revisão de 2026-11-24\n- Achado adicional no Worker: a string HTML contém escapes duplicados em validação de código e em delimitadores de linhas da cópia/exportação. O efeito precisa ser confirmado por teste no navegador; tarefa UI-003 criada.\n- Divergência documental: `estoque-web/README.md` ainda descreve endpoint legado `developers.tagplus.com.br/v1/produtos`, enquanto o Worker revisado consulta `api.tagplus.com.br/produtos?per_page=100`; tarefa DOC-001 criada.\n- A interface insere campos retornados da TagPlus em `innerHTML`; tarefa SEC-003 cobre correção.\n- Documentos de continuidade criados na branch: `PROJECT_STATE.md`, `ROADMAP.md`, `PROJECT_MAP.md`, `DECISIONS.md`, `CHANGELOG.md`.\n- Nenhum arquivo de aplicação foi modificado e nenhum deploy/merge foi executado nesta revisão.\n\n## 2026-11-19 — Histórico de Preview (evidência no comentário automático do PR)
- Preview build/deploy registrados para commits `182b7a1`, `8e53b4f` e `586e5ec`.
- Usuário confirmou que login/primeiro acesso funcionou no Preview após as correções de interface.
- A integração TagPlus ainda não foi validada funcionalmente.
