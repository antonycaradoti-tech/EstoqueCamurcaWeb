# Estado do projeto — Estoque Camurça Web

Última revisão: 2026-11-24

## Objetivo e escopo confirmado
Aplicação web de apoio à contagem/conferência de produtos da loja principal, servida por um Cloudflare Worker e integrada à conta TagPlus dessa loja. Escopo confirmado pelo usuário em 2026-11-24: uma loja (principal), um usuário (o próprio usuário). Não desenvolver multi-loja, multiusuário ou permissões por funcionário.

## Repositório e versão observados
- Repositório: `antonycaradoti-tech/EstoqueCamurcaWeb`
- Branch revisada: `fix/primeiro-acesso-tagplus-2026-11-19`
- Commit de código revisado: `586e5ec6a09047feb2ba10b3778f4a6d19a583ec`
- O PR #1 é a referência para o head atual da branch; a auditoria documental foi atualizada em 2026-11-24.
- Comparação com `main`: branch 31 commits à frente e 0 atrás na conferência imediatamente anterior à última atualização documental; `main` não recebeu alterações.
- PR #1: aberto e em Draft; não mesclado.
- Arquivos de aplicação: `estoque-web/worker.js`, `estoque-web/wrangler.toml`, `estoque-web/README.md`, mais `wrangler.toml` na raiz.

## Últimos marcos com evidência
- Login/primeiro acesso no Preview: usuário confirmou funcionamento na conversa anterior.
- Preview do commit `586e5ec`: comentário automático do Cloudflare no PR registra build e deploy bem-sucedidos em 2026-11-19.
- Integração TagPlus: NÃO concluída. Teste mais recente informado pelo usuário retorna: `An authentication plugin must be enabled and the consumer must be identified too`.
- Produção: não foi alterada nesta revisão. Estado de produção citado anteriormente na conversa não foi reconsultado em 2026-11-24.

## Escopo e premissas funcionais
- A conta TagPlus consultada é somente a da loja principal.
- A aplicação é usada por uma única pessoa; não criar cadastro de funcionários, seleção de lojas ou papéis de usuário.
- A interface importa o catálogo TagPlus e permite adicionar/contar quantidades localmente; confirmar com o usuário se quantidade representa contagem física, pois o código atual inicia a quantidade importada em zero.
- Não há requisito confirmado de acesso em múltiplos dispositivos; manter solução simples enquanto o uso for no mesmo navegador.

## Estado atual
- Integração TagPlus: BLOCKED — aguardando resposta oficial da TagPlus para confirmar autenticação e endpoint adequados ao Personal Access Token.
- Segurança da API: BACKLOG — endpoint de produtos não tem autenticação própria.
- Segurança da interface: BACKLOG — senha armazenada em texto puro no localStorage; campos de produto são interpolados em innerHTML.
- Persistência: BACKLOG — produtos armazenados apenas no localStorage de cada navegador.
- Qualidade: BACKLOG — não foram encontrados scripts ou suíte de testes no diretório revisado. A suspeita anterior sobre escapes foi descartada; UI-003 agora é somente validação de regressão.
- CI/CD: VALIDATING — PR e Preview existem; fluxo de produção/build deve ser reavaliado separadamente.

## Bloqueios e riscos
1. Não alterar a autenticação TagPlus antes de resposta/documentação inequívoca.
2. Não expor tokens, segredos ou senhas no GitHub, código do navegador ou logs.
3. Não mesclar o PR nem publicar em produção sem autorização explícita do usuário.
4. A senha local não deve ser tratada como controle de acesso real à API.
5. Proteger o endpoint mesmo com um único usuário; decidir autenticação simples no servidor (por exemplo, Cloudflare Access para uma identidade) antes de produção.

## Próximo passo único
Aguardar e analisar a resposta oficial da TagPlus sobre como autenticar Personal Access Tokens na API v2 e como identificar o consumidor; só então alterar a chamada no Worker.

## Arquivos a ler ao retomar
1. `PROJECT_STATE.md`
2. `ROADMAP.md`
3. `PROJECT_MAP.md`
4. `DECISIONS.md`
5. `CHANGELOG.md`
6. `estoque-web/worker.js`
7. `estoque-web/README.md`
