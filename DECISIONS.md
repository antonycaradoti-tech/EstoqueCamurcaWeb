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
- Consequências: antes de produção, proteger o acesso do único usuário no servidor/edge; não criar autorização por loja nem papéis multiusuário.


## ADR-005 — Escopo limitado à loja principal e um usuário
- Status: aceita em 2026-11-24.
- Contexto: o usuário confirmou que utilizará somente os dados da loja principal e que apenas ele usará o sistema.
- Decisão: não implementar multi-loja, multiusuário, cadastro de funcionários ou papéis/permissões. A integração TagPlus fica vinculada à única conta da loja principal.
- Consequências: arquitetura e autenticação podem ser mais simples. Ainda é necessário proteger a API no servidor e proteger os dados locais contra perda. Banco central só será considerado se houver requisito real de múltiplos dispositivos ou backup centralizado.

## ADR-006 — Preservar a contagem local durante reimportações
- Status: proposta técnica para implementação.
- Contexto: o código atual importa produtos da TagPlus com quantidade zero e ignora produtos que já existem, sem atualizar dados cadastrais.
- Decisão proposta: após validar a integração, atualizar os dados cadastrais de produtos existentes sem zerar nem substituir a quantidade contada pelo usuário.
- Consequências: reimportações podem manter a contagem em andamento; a regra deve ser coberta por teste antes de uso.
