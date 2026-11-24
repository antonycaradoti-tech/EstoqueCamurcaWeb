# Estado do projeto — Estoque Camurça Web

Última revisão: 2026-11-24

## Objetivo e escopo confirmado
Aplicação web de controle de estoque servida por um Cloudflare Worker, com interface no navegador e integração planejada para consultar produtos da TagPlus. O escopo futuro de múltiplas lojas, sincronização entre dispositivos e atualizações automáticas ainda precisa ser confirmado antes de implementação.

## Repositório e versão observados
- Repositório: `antonycaradoti-tech/EstoqueCamurcaWeb`
- Branch revisada: `fix/primeiro-acesso-tagplus-2026-11-19`
- Commit observado na branch: `586e5ec6a09047feb2ba10b3778f4a6d19a583ec`
- Comparação com `main`: branch 10 commits à frente e 0 atrás na conferência de 2026-11-24.
- PR #1: aberto e em Draft; não mesclado.
- Arquivos de aplicação: `estoque-web/worker.js`, `estoque-web/wrangler.toml`, `estoque-web/README.md`, mais `wrangler.toml` na raiz.

## Últimos marcos com evidência
- Login/primeiro acesso no Preview: usuário confirmou funcionamento na conversa anterior.
- Preview do commit `586e5ec`: comentário automático do Cloudflare no PR registra build e deploy bem-sucedidos em 2026-11-19.
- Integração TagPlus: NÃO concluída. Teste mais recente informado pelo usuário retorna: `An authentication plugin must be enabled and the consumer must be identified too`.
- Produção: não foi alterada nesta revisão. Estado de produção citado anteriormente na conversa não foi reconsultado em 2026-11-24.

## Estado atual
- Integração TagPlus: BLOCKED — aguardando resposta oficial da TagPlus para confirmar autenticação e endpoint adequados ao Personal Access Token.
- Segurança da API: BACKLOG — endpoint de produtos não tem autenticação própria.
- Segurança da interface: BACKLOG — senha armazenada em texto puro no localStorage; campos de produto são interpolados em innerHTML.
- Persistência: BACKLOG — produtos armazenados apenas no localStorage de cada navegador.
- Qualidade: BACKLOG — não foram encontrados scripts ou suíte de testes no diretório revisado.
- CI/CD: VALIDATING — PR e Preview existem; fluxo de produção/build deve ser reavaliado separadamente.

## Bloqueios e riscos
1. Não alterar a autenticação TagPlus antes de resposta/documentação inequívoca.
2. Não expor tokens, segredos ou senhas no GitHub, código do navegador ou logs.
3. Não mesclar o PR nem publicar em produção sem autorização explícita do usuário.
4. A senha local não deve ser tratada como controle de acesso real à API.
5. Confirmar requisitos para várias lojas, usuários, dispositivos, volumes e frequência de sincronização.

## Próximo passo único
Obter e analisar a resposta da TagPlus sobre Personal Access Tokens, autenticação exigida, identificação do consumidor e endpoint de listagem de produtos.

## Arquivos a ler ao retomar
1. `PROJECT_STATE.md`
2. `ROADMAP.md`
3. `PROJECT_MAP.md`
4. `DECISIONS.md`
5. `CHANGELOG.md`
6. `estoque-web/worker.js`
7. `estoque-web/README.md`
