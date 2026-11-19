const HTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Carmurça — Estoque Web</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
<style>
  body { font-family: 'Inter', sans-serif; }
  .texto-escuro { color: #29232A; }
  .texto-cinza { color: #625B64; }
  .texto-rosa { color: #B80E6D; }
  .bg-rosa { background-color: #D41483; }
  .bg-rosa-escuro { background-color: #B80E6D; }
  .bg-rosa-claro { background-color: #FFFCEAF3; }
  .card-sombra { box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06); }
</style>
</head>
<body class="bg-[#FFFFFAFC] min-h-screen p-4 md:p-8">

  <div id="tela-senha" class="fixed inset-0 z-50 flex items-center justify-center bg-[#FFFFFAFC]">
    <div class="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl border border-gray-100">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-10 h-10 bg-rosa rounded-2xl flex items-center justify-center">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
        <div>
          <h2 class="font-bold texto-escuro text-lg" id="titulo-senha">Acesso ao Estoque</h2>
          <p class="texto-cinza text-xs" id="subtitulo-senha">Digite a senha para continuar</p>
        </div>
      </div>

      <div class="mb-4">
        <label class="block text-xs texto-cinza mb-1">Senha</label>
        <input id="input-senha" type="password" autocomplete="new-password" placeholder="Crie uma senha (mínimo 4 caracteres)" class="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-rosa outline-none text-sm">
      </div>

      <div id="campo-confirmar-senha" class="mb-4 hidden">
        <label class="block text-xs texto-cinza mb-1">Confirme a senha</label>
        <input id="input-confirmar-senha" type="password" autocomplete="new-password" placeholder="Digite a mesma senha novamente" class="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-rosa outline-none text-sm">
      </div>

      <p id="msg-senha" role="status" aria-live="polite" class="mb-4 text-xs text-rosa-escuro hidden"></p>

      <button id="btn-senha" onclick="app.tentarDesbloquear()" class="w-full bg-rosa text-white py-3 rounded-xl font-bold text-sm hover:bg-rosa-escuro transition shadow-md">Criar senha</button>

      <p id="dica-senha" class="mt-4 text-xs texto-cinza text-center">No primeiro acesso, crie uma senha e confirme no campo abaixo.</p>
    </div>
  </div>

  <div id="app-principal" class="hidden max-w-4xl mx-auto">

    <div class="flex flex-col md:flex-row md:items-center justify-between mb-8">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 bg-rosa rounded-2xl flex items-center justify-center shadow-lg">
          <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path></svg>
        </div>
        <div>
          <h1 class="text-2xl font-bold texto-escuro">Carmurça</h1>
          <p class="texto-cinza text-sm">Estoque Web · FBR TECH</p>
        </div>
      </div>

      <div class="flex items-center gap-3 mt-4 md:mt-0">
        <span id="badge-total" class="bg-rosa text-white px-3 py-1.5 rounded-full font-bold text-sm">0 itens</span>
        <button onclick="app.abrirImportarTagPlus()" class="bg-texto-escuro text-white px-3 py-1.5 rounded-lg text-sm hover:bg-[#1A151B] transition">TagPlus</button>
        <button onclick="app.trocarSenha()" class="bg-texto-escuro text-white px-3 py-1.5 rounded-lg text-sm hover:bg-[#1A151B] transition text-xs">Alterar senha</button>
      </div>
    </div>

    <div id="msg" class="mb-4 hidden p-3 rounded-lg bg-rosa-claro border border-rosa/20 text-rosa-escuro text-sm"></div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
      <button onclick="app.abrirImportarTagPlus()" class="bg-rosa text-white px-4 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-rosa-escuro transition shadow-md card-sombra">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
        Sincronizar TagPlus
      </button>
      <button onclick="app.copiarLista()" class="bg-texto-escuro text-white px-4 py-3 rounded-xl font-semibold text-sm hover:bg-[#1A151B] transition shadow-md card-sombra">Copiar lista</button>
      <button onclick="app.exportarExcel()" class="bg-rosa-escuro text-white px-4 py-3 rounded-xl font-semibold text-sm hover:#9C0A57 transition shadow-md card-sombra">Exportar Excel</button>
    </div>

    <div class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
        <div>
          <label class="block text-xs texto-cinza mb-1">Código de barras</label>
          <input id="input-codigo" type="text" placeholder="Digite ou leia o código" class="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-rosa outline-none text-sm">
        </div>
        <div>
          <label class="block text-xs texto-cinza mb-1">Qtd.</label>
          <input id="input-qtd" type="number" value="1" min="1" class="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-rosa outline-none text-sm">
        </div>
        <button onclick="app.adicionar()" class="w-full bg-rosa text-white py-2.5 rounded-xl font-bold text-sm hover:bg-rosa-escuro transition shadow-md">+ Adicionar</button>
      </div>
      <p id="msg-codigo" class="mt-2 text-xs texto-cinza"></p>
    </div>

    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50">
        <span class="font-bold texto-escuro text-sm">Produtos na lista</span>
        <span id="contador" class="text-xs bg-gray-200 px-2 py-0.5 rounded texto-cinza">0</span>
      </div>
      <div id="lista-produtos" class="divide-y divide-gray-50"></div>
      <div id="vazio" class="p-8 text-center texto-cinza hidden">
        <p class="text-sm">Lista vazia. Adicione um código ou sincronize com o TagPlus.</p>
      </div>
      <div class="p-4 border-t border-gray-50 flex justify-between items-center bg-gray-50">
        <div class="flex items-center gap-2">
          <span class="texto-cinza text-sm">Total de itens</span>
          <span id="total-qtd" class="font-bold texto-escuro text-lg bg-rosa text-white px-3 py-1 rounded-full">0</span>
        </div>
        <button onclick="app.confirmarApagar()" class="text-xs text-rosa hover:text-rosa-escuro font-medium">Apagar lista</button>
      </div>
    </div>

    <div id="dialog" class="fixed inset-0 z-50 hidden">
      <div class="fixed inset-0 bg-black/40 backdrop-blur-sm" onclick="app.fecharDialog()"></div>
      <div class="fixed inset-0 flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-100">
          <h3 class="font-bold texto-escuro text-lg mb-2">Confirmar exclusão</h3>
          <p class="texto-cinza text-sm mb-6">Tem certeza que deseja apagar toda a lista? Esta ação não pode ser desfeita.</p>
          <div class="flex gap-3">
            <button onclick="app.apagarLista()" class="flex-1 bg-rosa text-white py-2 rounded-xl font-semibold hover:bg-rosa-escuro">Apagar</button>
            <button onclick="app.fecharDialog()" class="flex-1 bg-gray-100 texto-escuro py-2 rounded-xl font-semibold hover:bg-gray-200">Cancelar</button>
          </div>
        </div>
      </div>
    </div>

    <div id="dialog-importar" class="fixed inset-0 z-50 hidden">
      <div class="fixed inset-0 bg-black/40 backdrop-blur-sm" onclick="app.fecharDialogImportar()"></div>
      <div class="fixed inset-0 flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-100">
          <h3 class="font-bold texto-escuro text-lg mb-4">Sincronizar TagPlus</h3>
          <p class="texto-cinza text-xs mb-4">Puxe os produtos cadastrados na sua conta TagPlus para a base do app.</p>
          <button onclick="app.importarTagPlus()" class="w-full bg-rosa text-white py-2.5 rounded-xl font-semibold hover:bg-rosa-escuro mb-3">Puxar produtos do TagPlus</button>
          <p id="msg-importar" class="mt-3 text-xs"></p>
          <button onclick="app.fecharDialogImportar()" class="w-full bg-gray-100 texto-escuro py-2 rounded-xl font-semibold hover:bg-gray-200">Fechar</button>
        </div>
      </div>
    </div>

  </div>

<script>
const STORAGE_KEY = 'carmurca_produtos';
const SENHA_KEY = 'carmurca_senha';

const app = {
  produtos: [],

  init() {
    const temSenha = localStorage.getItem(SENHA_KEY);
    const telaSenha = document.getElementById('tela-senha');
    const appPrincipal = document.getElementById('app-principal');

    const campoConfirmar = document.getElementById('campo-confirmar-senha');
    const botaoSenha = document.getElementById('btn-senha');
    const dicaSenha = document.getElementById('dica-senha');

    if (!temSenha) {
      document.getElementById('titulo-senha').textContent = 'Primeiro acesso';
      document.getElementById('subtitulo-senha').textContent = 'Crie uma senha para proteger seu estoque';
      document.getElementById('input-senha').placeholder = 'Nova senha';
      document.getElementById('input-senha').autocomplete = 'new-password';
      campoConfirmar.classList.remove('hidden');
      botaoSenha.textContent = 'Criar senha';
      dicaSenha.textContent = 'Escolha uma senha com pelo menos 4 caracteres e confirme abaixo.';
    } else {
      document.getElementById('titulo-senha').textContent = 'Acesso ao Estoque';
      document.getElementById('subtitulo-senha').textContent = 'Digite sua senha para continuar';
      document.getElementById('input-senha').placeholder = 'Digite sua senha';
      document.getElementById('input-senha').autocomplete = 'current-password';
      campoConfirmar.classList.add('hidden');
      botaoSenha.textContent = 'Entrar';
      dicaSenha.textContent = 'Digite sua senha cadastrada para acessar o estoque.';
    }

    telaSenha.classList.remove('hidden');
    appPrincipal.classList.add('hidden');

    document.getElementById('input-senha').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') app.tentarDesbloquear();
    });

    document.getElementById('input-codigo').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.adicionar();
    });
  },

  tentarDesbloquear() {
    const senhaEl = document.getElementById('input-senha');
    const confirmarEl = document.getElementById('input-confirmar-senha');
    const msgEl = document.getElementById('msg-senha');
    const senha = senhaEl.value;
    const jaTem = localStorage.getItem(SENHA_KEY);

    msgEl.classList.remove('hidden');
    msgEl.style.color = '#B80E6D';

    if (!senha || senha.length < 4) {
      msgEl.textContent = 'A senha precisa ter pelo menos 4 caracteres.';
      senhaEl.focus();
      return;
    }

    if (!jaTem) {
      if (senha !== confirmarEl.value) {
        msgEl.textContent = 'As senhas não conferem. Digite a mesma senha nos dois campos.';
        confirmarEl.value = '';
        confirmarEl.focus();
        return;
      }

      try {
        localStorage.setItem(SENHA_KEY, senha);
        if (localStorage.getItem(SENHA_KEY) !== senha) {
          throw new Error('Não foi possível confirmar o salvamento.');
        }
      } catch (e) {
        msgEl.textContent = 'Não foi possível salvar a senha neste navegador. Verifique as configurações de armazenamento e tente novamente.';
        return;
      }

      msgEl.textContent = 'Senha criada e salva com sucesso! Abrindo seu estoque...';
      senhaEl.disabled = true;
      confirmarEl.disabled = true;
      document.getElementById('btn-senha').disabled = true;
      setTimeout(() => this.liberarApp(), 1000);
    } else if (senha === jaTem) {
      this.liberarApp();
    } else {
      msgEl.textContent = 'Senha incorreta. Confira e tente novamente.';
      senhaEl.value = '';
      senhaEl.focus();
    }
  },

  liberarApp() {
    document.getElementById('msg-senha').classList.add('hidden');
    document.getElementById('tela-senha').classList.add('hidden');
    document.getElementById('app-principal').classList.remove('hidden');
    this.carregarProdutos();
    this.render();
  },

  trocarSenha() {
    localStorage.removeItem(SENHA_KEY);
    location.reload();
  },

  carregarProdutos() {
    this.produtos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  },

  salvar() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.produtos));
    this.render();
  },

  render() {
    const lista = document.getElementById('lista-produtos');
    const vazio = document.getElementById('vazio');
    const contador = document.getElementById('contador');
    const totalQtd = document.getElementById('total-qtd');
    const badge = document.getElementById('badge-total');

    lista.innerHTML = '';
    let total = 0;

    if (this.produtos.length === 0) {
      vazio.classList.remove('hidden');
      contador.textContent = '0';
      totalQtd.textContent = '0';
      badge.textContent = '0 itens';
      return;
    }

    vazio.classList.add('hidden');

    this.produtos.forEach((p, i) => {
      total += p.quantidade;
      const item = document.createElement('div');
      item.className = 'p-4 flex items-center justify-between';
      item.innerHTML = '<div class="flex-1"><div class="font-semibold texto-escuro text-sm">' + (p.descricao || 'Produto não cadastrado') + '</div><div class="texto-cinza text-xs">' + (p.codigo || p.codigoBarras || p.codigoInterno) + '</div><div class="mt-1 text-xs texto-cinza">Custo: ' + (p.custo ? 'R$ ' + p.custo : '—') + '</div></div><div class="flex items-center gap-3"><span class="bg-rosa-claro texto-rosa-escuro px-2 py-1 rounded text-xs font-bold">' + String(p.quantidade).padStart(2, '0') + '</span><button onclick="app.remover(' + i + ')" class="texto-rosa text-xs font-medium hover:underline">Excluir ✕</button></div>';
      lista.appendChild(item);
    });

    contador.textContent = this.produtos.length;
    totalQtd.textContent = total;
    badge.textContent = total + ' itens';
  },

  adicionar() {
    const codigo = document.getElementById('input-codigo').value.trim();
    const qtd = parseInt(document.getElementById('input-qtd').value) || 1;
    const msgEl = document.getElementById('msg-codigo');

    if (!codigo) { msgEl.textContent = 'Digite um código.'; return; }
    if (codigo.length > 40 || /[\s]/.test(codigo) || !/^[A-Za-z0-9._/-]+$/.test(codigo)) {
      msgEl.textContent = 'Código inválido.'; return;
    }

    const chave = codigo.toUpperCase();
    const existente = this.produtos.findIndex(p =>
      p.codigo.toUpperCase() === chave ||
      (p.codigoBarras && p.codigoBarras.toUpperCase() === chave) ||
      (p.codigoInterno && p.codigoInterno.toUpperCase() === chave)
    );

    if (existente >= 0) {
      this.produtos[existente].quantidade += qtd;
      msgEl.textContent = 'Quantidade somada ao item existente.';
    } else {
      this.produtos.push({ codigo, quantidade: qtd, descricao: '', codigoBarras: '', codigoInterno: '', custo: '' });
      msgEl.textContent = 'Produto adicionado.';
    }
    msgEl.style.color = '#B80E6D';
    document.getElementById('input-codigo').value = '';
    document.getElementById('input-qtd').value = '1';
    this.salvar();
  },

  remover(i) {
    this.produtos.splice(i, 1);
    this.salvar();
  },

  copiarLista() {
    if (this.produtos.length === 0) { this.mostrarMsg('Não há produtos para copiar.'); return; }
    const linhas = this.produtos.map(p => {
      const codigo = p.codigoBarras || p.codigoInterno || p.codigo;
      const custo = p.custo ? parseFloat(p.custo).toFixed(2).replace('.', ',') : '';
      return [codigo, p.descricao, p.quantidade, custo].join('     ');
    }).join('\n\n');
    navigator.clipboard.writeText(linhas).then(() => {
      this.mostrarMsg(this.produtos.length + ' produtos copiados! Cole no Excel.');
    });
  },

  exportarExcel() {
    if (this.produtos.length === 0) { this.mostrarMsg('Não há produtos para exportar.'); return; }
    const linhas = this.produtos.map((p, i) => {
      const codigo = p.codigoBarras || p.codigoInterno || p.codigo;
      const custoNum = p.custo ? parseFloat(p.custo) : 0;
      const total = (custoNum * p.quantidade).toFixed(2);
      return (i+1) + ';' + codigo + ';' + p.descricao + ';' + p.quantidade + ';' + (p.custo || '') + ';' + total;
    }).join('\n');
    const csv = 'DATA;' + new Date().toLocaleDateString('pt-BR') + '\n\nCOD;DESCRICAO;QTD;CUSTO;TOTAL\n' + linhas;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'carmurca_estoque_' + new Date().toISOString().slice(0,10) + '.csv';
    a.click();
    this.mostrarMsg('Planilha exportada com ' + this.produtos.length + ' produtos!');
  },

  confirmarApagar() {
    if (this.produtos.length === 0) return;
    document.getElementById('dialog').classList.remove('hidden');
  },

  fecharDialog() {
    document.getElementById('dialog').classList.add('hidden');
  },

  apagarLista() {
    this.produtos = [];
    this.salvar();
    this.fecharDialog();
    this.mostrarMsg('Lista apagada.');
  },

  abrirImportarTagPlus() {
    document.getElementById('dialog-importar').classList.remove('hidden');
  },

  fecharDialogImportar() {
    document.getElementById('dialog-importar').classList.add('hidden');
  },

  async importarTagPlus() {
    const msgEl = document.getElementById('msg-importar');
    msgEl.textContent = 'Buscando produtos...';

    try {
      const resposta = await fetch('/api/tagplus/produtos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });

      const dados = await resposta.json().catch(() => ({}));
      if (!resposta.ok) {
        throw new Error(dados.erro || 'Falha na sincronização (HTTP ' + resposta.status + ')');
      }
      const produtos = (dados.produtos || []).map(p => ({
        codigo: p.codigo || p.codigo_interno || p.codigo_barras || '',
        codigoBarras: p.codigo_barras || '',
        codigoInterno: p.codigo_interno || '',
        descricao: p.descricao || p.nome || '',
        custo: p.custo || '',
        quantidade: 0
      }));

      produtos.forEach(novo => {
        const existe = this.produtos.find(p =>
          p.codigoBarras && novo.codigoBarras && p.codigoBarras === novo.codigoBarras ||
          p.codigoInterno && novo.codigoInterno && p.codigoInterno === novo.codigoInterno
        );
        if (!existe) this.produtos.push(novo);
      });

      this.salvar();
      this.fecharDialogImportar();
      msgEl.textContent = '';
      this.mostrarMsg(produtos.length + ' produtos importados do TagPlus.');
    } catch (e) {
      msgEl.textContent = 'Erro: ' + (e.message || 'verifique a chave e a conexão.');
      msgEl.style.color = '#B80E6D';
    }
  },

  mostrarMsg(texto) {
    const el = document.getElementById('msg');
    el.textContent = texto;
    el.classList.remove('hidden');
    setTimeout(() => el.classList.add('hidden'), 4000);
  }
};

app.init();
</script>

</body>
</html>`;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === '/api/tagplus/produtos' && request.method === 'POST') {
      return handleTagPlus(request, env);
    }

    return new Response(HTML, {
      headers: { 'Content-Type': 'text/html;charset=UTF-8' },
    });
  },
};

async function handleTagPlus(request, env) {
  const chave = env.TAGPLUS_API_KEY;
  if (!chave) {
    return new Response(
      JSON.stringify({ erro: 'Chave do TagPlus não configurada no Worker' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const TAGPLUS_URL = 'https://developers.tagplus.com.br/v1/produtos';

  try {
    const resposta = await fetch(TAGPLUS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + chave,
      },
      body: JSON.stringify({}),
    });

    const dados = await resposta.json();

    return new Response(JSON.stringify({ produtos: dados.produtos || dados.data || [] }), {
      status: resposta.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ erro: e.message }), { status: 502 });
  }
}
