# Changelog técnico

## 2026-11-24 — Revisão inicial com Dev-Master
- IDs: API-001, SEC-001, SEC-002, SEC-003, DATA-001, DATA-002, DEP-001.
- Branch inspecionada: `fix/primeiro-acesso-tagplus-2026-11-19`.
- Commit observado: `586e5ec6a09047feb2ba10b3778f4a6d19a583ec`.
- Arquivos revisados: `wrangler.toml`, `estoque-web/worker.js`, `estoque-web/wrangler.toml`, `estoque-web/README.md`.
- PR #1: aberto, Draft, não mesclado; 10 commits à frente de main na inspeção inicial do código; depois foram adicionados commits de documentação.
- Preview: comentário automático do Cloudflare registra build e deploy bem-sucedidos para o commit 586e5ec em 2026-11-19.
- Achados: autenticação TagPlus não confirmada; endpoint sem autenticação própria; senha em texto puro no localStorage; dados de produto interpolados em innerHTML; persistência limitada ao navegador.
- Testes executados nesta revisão: leitura de arquivos e metadados do GitHub, comparação main/head e inspeção do diff do PR.
- Testes não executados: testes locais, testes automatizados, chamadas diretas à TagPlus, inspeção atual do dashboard Cloudflare e deploy.
- Impacto: nenhum código da aplicação alterado nesta revisão; documentação de continuidade criada.
- Pendência principal: resposta oficial da TagPlus.

## Complemento da revisão de 2026-11-24
- Correção da revisão: a suspeita anterior sobre escapes duplicados foi descartada após considerar a string HTML como template literal JavaScript; os escapes são necessários para preservar regex e quebras de linha no script entregue ao navegador. UI-003 foi redefinida como teste de regressão, não como bug confirmado.
- Divergência documental: `estoque-web/README.md` ainda descreve endpoint legado `developers.tagplus.com.br/v1/produtos`, enquanto o Worker revisado consulta `api.tagplus.com.br/produtos?per_page=100`; tarefa DOC-001 criada.
- A interface insere campos retornados da TagPlus em `innerHTML`; tarefa SEC-003 cobre correção.\n- O importador atribui quantidade zero aos novos itens e ignora os já existentes, portanto não atualiza cadastro de itens importados anteriormente; criada API-006 para definir atualização sem perder contagem local.\n- Usuário confirmou escopo: loja principal e uso exclusivo por ele; roadmap e arquitetura foram simplificados, sem multi-loja ou multiusuário.\n- Nova revisão da documentação oficial TagPlus confirma `GET /produtos`, `X-Api-Version: 2.0`, `Authorization: Bearer` para OAuth2, paginação por `page`/`per_page` e escopo `read:produtos`. A documentação pública consultada não esclarece como Personal Access Token deve identificar o consumidor; integração permanece bloqueada aguardando suporte.
- Documentos de continuidade criados na branch: `PROJECT_STATE.md`, `ROADMAP.md`, `PROJECT_MAP.md`, `DECISIONS.md`, `CHANGELOG.md`.
- Nenhum arquivo de aplicação foi modificado e nenhum deploy/merge foi executado nesta revisão.

## 2026-11-19 — Histórico de Preview (evidência no comentário automático do PR)
- Preview build/deploy registrados para commits `182b7a1`, `8e53b4f` e `586e5ec`.
- Usuário confirmou que login/primeiro acesso funcionou no Preview após as correções de interface.
- A integração TagPlus ainda não foi validada funcionalmente.


## 2026-11-24 — Escopo refinado e diagnóstico TagPlus
- Recuperado histórico: Personal Access Token criado pelo usuário com permissões `read:produtos`, `read:relatorio_estoque`, `read:me`; o valor foi copiado para o Secret `TAGPLUS_API_KEY` no Cloudflare Preview.
- Teste mais recente passou da falha local de secret ausente e chegou ao serviço remoto, que retornou `An authentication plugin must be enabled and the consumer must be identified too`.
- Documentação pública da API v2 confirma host `api.tagplus.com.br`, GET `/produtos`, cabeçalho `X-Api-Version: 2.0`, Bearer para Access Token OAuth2, paginação `page`/ `per_page`, e escopo `read:produtos`. Não foi localizada orientação oficial pública que diga como usar o Personal Access Token no mesmo fluxo nem como identificar o consumer; resposta do suporte é necessária.
- O Worker não implementa paginação (consulta somente `per_page=100`, página padrão) e o importador não atualiza produtos existentes. API-004/API-006 registram essas melhorias.
- Nenhum código da aplicação foi alterado; nenhuma publicação ou merge foi executado.
