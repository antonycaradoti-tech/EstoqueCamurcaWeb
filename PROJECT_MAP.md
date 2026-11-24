# Mapa do projeto — Estoque Camurça Web

```mermaid
flowchart TD
  USER[Único usuário] --> UI[Interface web no navegador]\n  STORE[Conta TagPlus da loja principal] --> TAG[API TagPlus]
  UI --> LOCAL[localStorage atual]
  UI -->|POST /api/tagplus/produtos| WORKER[Cloudflare Worker]
  WORKER --> SECRET[Secret TAGPLUS_API_KEY]
  WORKER -->|GET /produtos v2 atual — auth pendente| TAG
  TAG --> WORKER
  WORKER --> UI

  subgraph Riscos e melhorias
    AUTH[SEC-001: autenticação do endpoint — BACKLOG]
    PASS[SEC-002: senha local em texto puro — BACKLOG]
    XSS[SEC-003: renderização innerHTML — BACKLOG]
    BACKUP[DATA-003: backup/restauração local — READY]\n    POLICY[API-006: atualizar catálogo sem perder contagem — BACKLOG]
  end

  WORKER -.-> AUTH
  UI -.-> PASS
  UI -.-> XSS
  LOCAL -.-> BACKUP\n  UI -.-> POLICY

  API1[API-001: confirmar autenticação TagPlus — BLOCKED] --> API2[API-002: confirmar contrato e paginação — BLOCKED]
  API2 --> API3[API-003: implementar integração — BACKLOG]
  API3 --> API4[API-004: paginação e importação — BACKLOG]
  API4 --> TEST[TEST-001: testes — BACKLOG]
  TEST --> PREVIEW[DEP-002: validar Preview — READY]
  PREVIEW --> PROD[DEP-003: produção com aprovação — BLOCKED]
```

## Escopo confirmado\n- Uma loja: loja principal.\n- Um usuário: o próprio usuário.\n- Não há necessidade atual de multi-loja, multiusuário ou banco compartilhado entre funcionários.\n\n## Legenda
- BACKLOG: ainda não iniciado.
- READY: pronto e sem dependências pendentes.
- IN_PROGRESS: em execução.
- BLOCKED: impedido por dependência ou decisão.
- VALIDATING: implementação feita, aguardando validação.
- DONE: validado com evidência.
- REGRESSED: comportamento anteriormente validado foi quebrado.

## Limites da arquitetura observada
- Um Cloudflare Worker entrega HTML e API.
- A interface é embutida como string HTML em `estoque-web/worker.js`.
- O navegador mantém produtos e senha em localStorage.
- O Worker consulta a TagPlus usando segredo configurado no ambiente.
- Não foi observada uma base de dados central nem autenticação de sessão no servidor.\n- A quantidade importada da TagPlus é inicializada como zero na interface; a política de contagem física e reimportação precisa ser definida.
