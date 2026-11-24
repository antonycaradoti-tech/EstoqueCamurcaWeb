# Roadmap — Estoque Camurça Web

Estados: BACKLOG, READY, IN_PROGRESS, BLOCKED, VALIDATING, DONE, REGRESSED.

## Fase 1 — Integração TagPlus
| ID | Tarefa | Estado | Dependência | Critério de aceite |
|---|---|---|---|---|
| API-001 | Confirmar com a TagPlus o método de autenticação aceito para Personal Access Token, incluindo identificação do consumidor | BLOCKED | Resposta do suporte | Resposta/documentação oficial identifica headers, endpoint e tipo de token |
| API-002 | Confirmar endpoint v2, escopo read:produtos, paginação e formato do retorno | BLOCKED | API-001 | Contrato documentado e compatível com conta do usuário |
| API-003 | Implementar autenticação conforme contrato confirmado, mantendo segredos no Cloudflare | BACKLOG | API-001, API-002 | Consulta autenticada funciona no Preview sem expor credenciais |
| API-004 | Implementar paginação e importação idempotente de produtos | BACKLOG | API-003 | Todos os produtos do escopo são importados sem duplicação |
| API-006 | Definir política de atualização do catálogo sem zerar nem sobrescrever quantidades já contadas | BACKLOG | API-004 | Reimportação atualiza dados cadastrais e preserva contagem local existente |
| API-005 | Tratar erros, limites, timeout e renovação de credencial se aplicável | BACKLOG | API-003 | Falhas previsíveis, sem vazar segredos e com recuperação documentada |

## Fase 2 — Segurança
| ID | Tarefa | Estado | Dependência | Critério de aceite |
|---|---|---|---|---|
| SEC-001 | Proteger o Worker e /api/tagplus/produtos para um único usuário | BACKLOG | Escolher controle de acesso simples (ex.: Cloudflare Access) | A página e a API só respondem após autenticação do único usuário |
| SEC-002 | Retirar a falsa sensação de segurança da senha local e integrar o acesso ao controle no servidor | BACKLOG | SEC-001 | A autorização é verificada no servidor/edge; segredo não fica em localStorage |
| SEC-003 | Remover riscos de XSS na renderização dos dados de produto | BACKLOG | Nenhuma | Dados de produto são exibidos como texto seguro |
| SEC-004 | Revisar rate limiting, logs, mensagens de erro e exposição de dados | BACKLOG | SEC-001 | Não há segredos ou dados de estoque expostos indevidamente |

## Fase 3 — Dados e experiência
| ID | Tarefa | Estado | Dependência | Critério de aceite |
|---|---|---|---|---|
| DATA-001 | Registrar escopo de loja principal e usuário único | DONE | Decisão explícita do usuário em 2026-11-24 | Documentação exclui multi-loja e multiusuário |
| DATA-002 | Manter localStorage como primeira versão e avaliar necessidade de banco central apenas se houver uso em outro dispositivo | BACKLOG | Confirmar dispositivo de uso e criticidade dos dados | Dados não são perdidos sem possibilidade de recuperação; não introduzir banco sem necessidade |
| DATA-003 | Criar backup e restauração dos dados locais da contagem | READY | Nenhuma | Backup JSON pode ser exportado e restaurado com validação e sem apagar dados acidentalmente |
| UI-001 | Melhorar feedback de sincronização, progresso e erros | BACKLOG | API-003 | Usuário entende o que foi importado e o que falhou |
| UI-002 | Preservar fluxo de senha/login e lista atual durante melhorias | VALIDATING | Mudanças futuras | Testes de regressão aprovados |
| UI-003 | Validar leitura de códigos, cópia e exportação CSV em teste de regressão | READY | Nenhuma | Códigos válidos/inválidos e exportação com quebras de linha corretas passam em teste |

## Fase 4 — Qualidade e entrega
| ID | Tarefa | Estado | Dependência | Critério de aceite |
|---|---|---|---|---|
| TEST-001 | Criar testes automatizados ou verificações reproduzíveis para rotas e transformação dos produtos | BACKLOG | API-003 | Casos positivos, negativos e dados inválidos cobertos |
| DOC-001 | Alinhar README ao endpoint e à configuração atuais do Worker | DONE | Inspeção do README e Worker em 2026-11-24 | README descreve o endpoint e os headers atualmente presentes no código, mantendo autenticação marcada como pendente |
| TEST-002 | Criar checklist de regressão do primeiro acesso, lista, exportação e sincronização | READY | Nenhuma | Checklist executado e evidências registradas |
| DEP-001 | Revisar configuração Workers Builds para Preview e Production | VALIDATING | Nenhuma | Preview e produção têm comandos e variáveis separados |
| DEP-002 | Validar Preview antes de qualquer merge | READY | TEST-002 | Usuário confirma fluxo e PR revisado |
| DEP-003 | Publicar em produção somente com aprovação explícita | BLOCKED | DEP-002 | Aprovação explícita e verificação pós-deploy |

## Escopo confirmado
- Uma única loja: loja principal.
- Um único usuário: o próprio usuário.
- Multi-loja, multiusuário e papéis/permissões de funcionários estão fora do escopo.
- Não adicionar banco de dados central sem necessidade demonstrada; primeiro proteger e respaldar o armazenamento local.

## Evidências já disponíveis
- Usuário confirmou que o primeiro acesso/login funcionou no Preview após commit `8e53b4f`.
- Comentário automático do Cloudflare no PR registra Preview com build e deploy bem-sucedidos para commit `586e5ec` em 2026-11-19.
- Teste TagPlus mais recente informado pelo usuário falhou com erro de autenticação/identificação do consumidor; por isso API-001 permanece BLOCKED.

## Regras de execução
- Fazer alterações pequenas na branch de trabalho.
- Preservar `main` e produção até validação e aprovação.
- Nunca marcar tarefa DONE apenas porque o código foi escrito.
- Registrar commit, teste, ambiente e resultado para cada conclusão.
