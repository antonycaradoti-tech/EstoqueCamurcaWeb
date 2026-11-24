# Registro de decisões técnicas — Estoque Camurça Web

## ADR-001 — Manter Cloudflare Worker como arquitetura atual
- Status: aceita provisoriamente.
- Contexto: o projeto existente serve a interface e o endpoint de integração por um único Worker.
- Opções: manter Worker único; separar frontend e API; migrar para outra plataforma.
- Decisão: manter a stack atual durante a correção e validação da integração.
- Consequências: menor mudança e custo de migração agora; o arquivo único e o acoplamento HTML/API exigirão organização incremental se o projeto crescer.
- Reavaliar se surgirem requisitos de múltiplos módulos, usuários, dados centralizados ou maior volume.

## ADR-002 — Não presumir compatibilidade do Personal Access Token com Bearer
- Status: proposta pendente de evidência oficial.
- Contexto: o usuário criou um Personal Access Token TagPlus com permissões read:produtos, read:relatorio_estoque e read:me. O Worker envia esse valor como Authorization: Bearer e X-Api-Version: 2.0; a API respondeu: "An authentication plugin must be enabled and the consumer must be identified too".
- Opções: continuar tentando variações de header; usar OAuth2 de aplicativo; seguir instrução específica do suporte para Personal Access Token.
- Decisão: aguardar a TagPlus confirmar mecanismo, identificação do consumidor e endpoint aceitos para o token pessoal antes de alterar o código.
- Consequências: integração permanece bloqueada, evitando mudanças especulativas e exposição de credenciais.
- Reavaliar assim que chegar resposta oficial.

## ADR-003 — Produção não recebe mudanças sem Preview validado e aprovação
- Status: aceita.
- Contexto: o PR #1 está aberto em Draft e há um Worker de produção já em uso.
- Decisão: desenvolver na branch de trabalho, validar no Preview, preservar main e produção e só publicar após aprovação explícita.
- Consequências: reduz risco de interromper o estoque em uso; exige checklist de validação antes de merge/deploy.

## ADR-004 — Persistência e autenticação atuais não são segurança de servidor
- Status: aceita como constatação técnica; solução futura pendente.
- Contexto: a senha é comparada e armazenada no localStorage, e a rota TagPlus não exige sessão autenticada no servidor.
- Decisão: não tratar a senha local como proteção de API ou autorização multiusuário.
- Consequências: antes de disponibilizar acesso a outras pessoas/lojas, definir autenticação de servidor e autorização por loja.
