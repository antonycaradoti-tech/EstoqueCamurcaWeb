# Carmurça — Estoque Web

Aplicação de controle de estoque servida por um único Cloudflare Worker. O Worker entrega a interface web e faz a comunicação com a API TagPlus.

## Estrutura do repositório

Os arquivos do projeto ficam dentro de `estoque-web/` neste repositório:

- `estoque-web/worker.js` — aplicação web e endpoint `POST /api/tagplus/produtos`
- `estoque-web/wrangler.toml` — configuração do Wrangler
- `estoque-web/README.md` — estas instruções

Repositório: `antonycaradoti-tech/EstoqueCamurcaWeb`.

## Publicar pelo painel Cloudflare

1. Entre no [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Abra **Workers & Pages**.
3. Localize o Worker que já existe e que corresponde a este projeto. Não crie outro antes de confirmar se ele já existe.
4. Abra o Worker e entre em **Edit code** (ou opção equivalente de edição).
5. Substitua o código pelo conteúdo completo de `estoque-web/worker.js`, salve e faça **Deploy**.
6. Em **Settings → Variables and Secrets** (o nome pode variar), confirme que existe a variável `TAGPLUS_API_KEY` como **Secret**. Não cole a chave no código nem no navegador.
7. Em **Settings → Domains & Routes**, habilite/adicione o endereço gratuito `workers.dev`, se ainda não estiver habilitado para a conta.
8. Depois do deploy, copie a URL `*.workers.dev` exibida pelo Cloudflare e abra no navegador.

> Se o painel mostrar que não existe Worker para este projeto, pare e confirme antes de criar um novo. O objetivo é atualizar o Worker correto, não publicar uma cópia sem necessidade.

## Integração TagPlus

O endpoint do site é `POST /api/tagplus/produtos`. O Worker lê a chave exclusivamente de `env.TAGPLUS_API_KEY`, configurada como Secret no Cloudflare. A chave não deve ser salva no localStorage nem enviada pelo navegador.

O endpoint remoto configurado no código é `https://developers.tagplus.com.br/v1/produtos`.

## Observações

- Os produtos e a senha são armazenados no navegador por meio de `localStorage`; cada navegador/dispositivo mantém seus próprios dados.
- O primeiro acesso solicita a criação de uma senha local.
- Publicar o código no GitHub, por si só, não publica o Worker no Cloudflare. É necessário fazer o deploy no painel ou por uma integração de CI/CD configurada.
