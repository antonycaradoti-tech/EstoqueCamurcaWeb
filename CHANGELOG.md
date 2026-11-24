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

## 2026-11-19 — Histórico de Preview (evidência no comentário automático do PR)
- Preview build/deploy registrados para commits `182b7a1`, `8e53b4f` e `586e5ec`.
- Usuário confirmou que login/primeiro acesso funcionou no Preview após as correções de interface.
- A integração TagPlus ainda não foi validada funcionalmente.
