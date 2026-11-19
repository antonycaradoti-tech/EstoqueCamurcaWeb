# Carmurça — Estoque Web (Cloudflare Worker)

App web baseado no projeto Android **Carmurça** (FBR TECH). Roda como um único **Cloudflare Worker**, que serve o HTML e faz o proxy da API do TagPlus.

## O que faz
- Adicionar produtos por código (digitado)
- Sincronizar produtos automaticamente com a API do **TagPlus** (substitui o CSV do app Android), incluindo o campo **custo**
- Lista com quantidade, descrição e custo
- Copiar lista para colar no Excel
- Exportar CSV/planilha
- Salva no navegador (localStorage)
- Tela de senha para acesso restrito

## Estrutura
- `worker.js` — Worker único: serve o SPA (HTML embutido) e expõe o POST `/api/tagplus/produtos` que faz proxy para a TagPlus usando `env.TAGPLUS_API_KEY`
- `wrangler.toml` — config do Worker
- `README.md` — este arquivo

## Deploy

### 1. Apagar o projeto Pages antigo (opcional)
Se quiser remover o antigo `estoquefacil-web` do Cloudflare Pages:
- Cloudflare Dashboard → Workers & Pages → `estoquefacil-web` → Settings → Delete project

### 2. Subir no GitHub
Suba esta pasta (`estoque-web/`) para o seu repositório GitHub (`antoyntecaradoti-tech/estoquefacil-web`), com os 3 arquivos na **raiz** do repositório:
- `worker.js`
- `wrangler.toml`
- `README.md`

### 3. Criar o Worker no Cloudflare
- Cloudflare Dashboard → Workers & Pages → **Create** → **Worker**
- Escolha **Deploy from repository** → conecte o GitHub → selecione o repo `estoquefacil-web`
- Se não tiver essa opção, crie o Worker vazio no dashboard, abra o editor e cole o conteúdo de `worker.js`

### 4. Adicionar a chave da TagPlus (segredo)
- No seu Worker → **Settings** → **Variables** → **Environment variables**
- Adicione `TAGPLUS_API_KEY` com sua chave da TagPlus
- Marque como **Encrypt/Secret** (não expor no front)

### 5. Endpoint da TagPlus
O `worker.js` já está com `TAGPLUS_URL` definido como `https://developers.tagplus.com.br/v1/produtos` (endpoint indicado pelo suporte da TagPlus). Se precisar mudar, edite a linha no `worker.js`.

### 6. Usar
Acesse a URL gerada pelo Worker. Na primeira vez, crie uma senha. Cada celular/navegador guarda sua própria lista.

> shortcut: o `functions/api-tagplus.js` e o antigo `wrangler.toml` do Pages não são mais usados — o Worker substitui ambos.