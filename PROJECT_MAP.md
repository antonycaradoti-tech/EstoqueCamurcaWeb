# Mapa do projeto — Estoque Camurça Web

```mermaid
flowchart TD
  USER[Usuário do estoque] --> UI[Interface web no navegador]
  UI --> LOCAL[localStorage atual]
  UI -->|POST /api/tagplus/produtos| WORKER[Cloudflare Worker]
  WORKER --> SECRET[Secret TAGPLUS_API_KEY]
  WORKER -->|GET /produtos v2 atual| TAG[API TagPlus]
  TAG --> WORKER
  WORKER --> UI

  subgraph Riscos e melhorias
    AUTH[SEC-001: autenticação do endpoint — BACKLOG]
    PASS[SEC-002: senha local em texto puro — BACKLOG]
    XSS[SEC-003: renderização innerHTML — BACKLOG]
    DB[DATA-002: persistência central — BACKLOG]
  end

  WORKER -.-> AUTH
  UI -.-> PASS
  UI -.-> XSS
  LOCAL -.-> DB

  API1[API-001: confirmar autenticação TagPlus — BLOCKED] --> API2[API-002: confirmar contrato e paginação — BLOCKED]
  API2 --> API3[API-003: implementar integração — BACKLOG]
  API3 --> API4[API-004: paginação e importação — BACKLOG]
  API4 --> TEST[TEST-001: testes — BACKLOG]
  TEST --> PREVIEW[DEP-002: validar Preview — READY]
  PREVIEW --> PROD[DEP-003: produção com aprovação — BLOCKED]
```

## Legenda
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
- Não foi observada uma base de dados central nem autenticação de sessão no servidor.
