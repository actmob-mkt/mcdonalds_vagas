/* McDonald's Alto Tietê · Trabalhe Conosco */
(function () {
'use strict';
/* =====================================================================
   DADOS EDITÁVEIS
   Tudo que precisa ser confirmado com o RH / franqueado antes de publicar
   está aqui no topo: configurações, benefícios, vagas, lojas, etapas,
   depoimentos e FAQ.
   ===================================================================== */

const CONFIG = {
  // URL que recebe POST multipart/form-data com a candidatura.
  // Deixe vazio para modo demonstração (simula envio sem enviar dados).
  endpoint: '',
  operador: 'Nome do Franqueado Ltda.',            // TROCAR
  empresaSchema: 'McDonald’s Alto Tietê',
  rhEmail: 'rh.altotiete@seudominio.com.br',       // TROCAR
  rhWhats: '(11) 94782-3150',                       // TROCAR
  rhHorario: 'Segunda a sexta, das 9h às 17h',
  dpoEmail: 'privacidade@seudominio.com.br',        // TROCAR (encarregado LGPD)
  privacyUrl: 'politica-de-privacidade.html',       // TROCAR
  termsUrl: 'termos-de-uso.html',                   // TROCAR
  socials: [                                        // Confirmar perfis oficiais
    { label: 'Instagram', icon: 'ph-instagram-logo', url: 'https://www.instagram.com/mcdonalds_br/' },
    { label: 'Facebook', icon: 'ph-facebook-logo', url: 'https://www.facebook.com/McDonaldsBrasil' },
    { label: 'TikTok', icon: 'ph-tiktok-logo', url: 'https://www.tiktok.com/@mcdonalds_br' },
    { label: 'LinkedIn', icon: 'ph-linkedin-logo', url: 'https://www.linkedin.com/company/arcos-dorados/' }
  ]
};

// Ícones: nomes da biblioteca Phosphor (phosphoricons.com)
const BENEFICIOS = [
  { icon: 'ph-rocket-launch', titulo: 'Primeiro emprego', texto: 'Carteira assinada sem exigir experiência. Muita gente começa a carreira aqui.' },
  { icon: 'ph-chart-line-up', titulo: 'Plano de carreira', texto: 'Trilha clara de atendente a treinador, gerente de turno e gerente de loja.' },
  { icon: 'ph-graduation-cap', titulo: 'Treinamento', texto: 'Você aprende na prática com treinadores e cursos da Universidade do Hambúrguer.' },
  { icon: 'ph-calendar-check', titulo: 'Flexibilidade', texto: 'Turnos que conversam com a escola ou a faculdade. Escala combinada com a loja.' },
  { icon: 'ph-bus', titulo: 'Vale-transporte', texto: 'Ida e volta do trabalho garantidas, conforme a legislação.' },
  { icon: 'ph-hamburger', titulo: 'Refeição', texto: 'Refeição no turno de trabalho, sem custo para você.' },
  { icon: 'ph-t-shirt', titulo: 'Uniforme', texto: 'Uniforme completo fornecido pela loja desde o primeiro dia.' },
  { icon: 'ph-heartbeat', titulo: 'Assistência médica', texto: 'Plano de saúde para colaboradores CLT após o período de experiência.' }
];

const AREAS = [
  { id: 'atendimento', label: 'Atendimento' },
  { id: 'cozinha', label: 'Cozinha' },
  { id: 'mccafe', label: 'McCafé' },
  { id: 'mcdelivery', label: 'McDelivery' },
  { id: 'lideranca', label: 'Liderança' },
  { id: 'aprendiz', label: 'Jovem Aprendiz' }
];

// Cidades com lojas (ordem de exibição)
const CIDADES = ['Mogi das Cruzes', 'Suzano', 'Itaquaquecetuba', 'Poá', 'Ferraz de Vasconcelos', 'Arujá', 'Bertioga'];

// Fonte: planilha Dados_Rest_RCP_RPG_GCP (aba Restaurantes).
// tipo: 'Shopping' ou 'Drive-Thru'. status: 'aberta' ou 'em breve'. inauguracao: AAAA-MM-DD.
const LOJAS = [
  { sigla: 'MOG', maps: 'https://maps.app.goo.gl/NivRxzbv1KmLpJVd7', nome: 'Mogi Shopping', tipo: 'Shopping', cidade: 'Mogi das Cruzes', endereco: 'Av. Ver. Narciso Y. Guimarães, 1001, loja 246, Centro Cívico, 08780-000', inauguracao: '1996-11-20', status: 'aberta' },
  { sigla: 'MUS', maps: 'https://maps.app.goo.gl/bf89hTbgg1KnNvgV9', nome: 'Mogi Urupema Shopping', tipo: 'Shopping', cidade: 'Mogi das Cruzes', endereco: 'Av. Voluntário Fernando Pinheiro Franco, 515, lojas 74 e 75, 5º andar, Centro, 08710-500', inauguracao: '2026-09-30', status: 'aberta' },
  { sigla: 'MBC', maps: 'https://maps.app.goo.gl/kTGncXCSu98Nh3MVA', nome: 'Mogi Braz Cubas', tipo: 'Drive-Thru', cidade: 'Mogi das Cruzes', endereco: 'Av. Henrique Péres, 1662, Vila Bernadotti, 08735-400', inauguracao: '2014-12-29', status: 'aberta' },
  { sigla: 'MCD', maps: 'https://maps.app.goo.gl/5jaZQNtVTdSmUVZ26', nome: 'Mogi Centro Drive', tipo: 'Drive-Thru', cidade: 'Mogi das Cruzes', endereco: 'Av. Fernando Costa, 195, Centro, 08735-000', inauguracao: '2018-11-14', status: 'aberta' },
  { sigla: 'MIP', maps: 'https://maps.app.goo.gl/yknrmm48b2rpWcLD6', nome: 'Mogi Ipoema', tipo: 'Drive-Thru', cidade: 'Mogi das Cruzes', endereco: 'Av. Ver. Dante Jordão Stoppa, 444, Cezar de Souza, 08820-390', inauguracao: '2019-06-28', status: 'aberta' },
  { sigla: 'MGM', nome: 'Mogi Mogilar', tipo: 'Drive-Thru', cidade: 'Mogi das Cruzes', endereco: 'Endereço em breve', inauguracao: '2026-12-10', status: 'em breve', foto: 'assets/fachada-placeholder.svg' },
  { sigla: 'SUS', maps: 'https://maps.app.goo.gl/dZ3fCDRLBfjxMG859', nome: 'Suzano Shopping', tipo: 'Shopping', cidade: 'Suzano', endereco: 'R. Sete de Setembro, 555, Jardim Iraí, 08673-020', inauguracao: '2000-09-22', status: 'aberta' },
  { sigla: 'SZD', maps: 'https://maps.app.goo.gl/gFM7BggB8gaLZZro9', nome: 'Suzano Drive', tipo: 'Drive-Thru', cidade: 'Suzano', endereco: 'R. Baruel, 689, Vila Costa, 08675-000', inauguracao: '2012-04-18', status: 'aberta' },
  { sigla: 'ITS', maps: 'https://maps.app.goo.gl/YqBgmuRxziReLN8u5', nome: 'Itaquá Shopping', tipo: 'Shopping', cidade: 'Itaquaquecetuba', endereco: 'Estr. Mun. do Mandi, 1205, Mandi, 08596-000', inauguracao: '2019-08-05', status: 'aberta', foto: 'assets/fachada-its.webp' },
  { sigla: 'OGS', maps: 'https://maps.app.goo.gl/iAbS1DYmCJfAmGvUA', nome: 'Outlet Grande São Paulo', tipo: 'Shopping', cidade: 'Itaquaquecetuba', endereco: 'Estr. de São Bento, 9550, loja LUC 120, Jardim Josely, 08590-315', inauguracao: '2026-03-12', status: 'aberta' },
  { sigla: 'QUA', maps: 'https://maps.app.goo.gl/njWVmvZzeP7LMKKo8', nome: 'Itaquá Drive', tipo: 'Drive-Thru', cidade: 'Itaquaquecetuba', endereco: 'Rod. Alberto Hinoto, 3085, Vila São Carlos, 08599-515', inauguracao: '2022-08-30', status: 'aberta' },
  { sigla: 'POD', maps: 'https://maps.app.goo.gl/Lk98tFw31bNM6iH48', nome: 'Poá Drive', tipo: 'Drive-Thru', cidade: 'Poá', endereco: 'Av. Nove de Julho, 880, Vila das Acácias, 07434-325', inauguracao: '2012-08-27', status: 'aberta' },
  { sigla: 'FVD', maps: 'https://maps.app.goo.gl/163Q1B7S3Eizicnj8', nome: 'Ferraz Drive', tipo: 'Drive-Thru', cidade: 'Ferraz de Vasconcelos', endereco: 'Av. Dom Pedro II, 33, Vila Romanópolis, 08500-400', inauguracao: '2017-11-01', status: 'aberta' },
  { sigla: 'ARU', maps: 'https://maps.app.goo.gl/UvrVZKS4arceuZzX9', nome: 'Arujá Drive', tipo: 'Drive-Thru', cidade: 'Arujá', endereco: 'Estr. de Santa Isabel, 747, Do Limoeiro, 07428-000', inauguracao: '2013-12-30', status: 'aberta' },
  { sigla: 'RIV', maps: 'https://maps.app.goo.gl/spLtyNNNW3DC6hALA', nome: 'Riviera', tipo: 'Drive-Thru', cidade: 'Bertioga', endereco: 'Rua Aprovada, 399, N. 37, Riviera de São Lourenço, 11250-000', inauguracao: '2008-12-15', status: 'aberta' }
];

// area deve usar um id de AREAS. loja deve ser o nome exato de uma loja em LOJAS. data: AAAA-MM-DD.
const VAGAS = [
  { id: 'v01', titulo: 'Atendente de restaurante', area: 'atendimento', cidade: 'Mogi das Cruzes', loja: 'Mogi Centro Drive', turno: 'Manhã ou tarde', regime: 'CLT · 6x1 · 44h semanais', descricao: 'Recepção de clientes, caixa e entrega de pedidos no balcão e no drive.', data: '2026-10-14' },
  { id: 'v02', titulo: 'Atendente de cozinha', area: 'cozinha', cidade: 'Mogi das Cruzes', loja: 'Mogi Shopping', turno: 'Tarde e noite', regime: 'CLT · Meio período', descricao: 'Preparo de sanduíches e acompanhamentos seguindo os padrões de qualidade.', data: '2026-10-11' },
  { id: 'v03', titulo: 'Gerente de turno', area: 'lideranca', cidade: 'Mogi das Cruzes', loja: 'Mogi Braz Cubas', turno: 'Escala rotativa', regime: 'CLT · 44h semanais', descricao: 'Coordena a equipe do turno, garante metas de serviço e apoia treinamentos.', data: '2026-10-08' },
  { id: 'v12', titulo: 'Equipe de inauguração', area: 'atendimento', cidade: 'Mogi das Cruzes', loja: 'Mogi Mogilar', turno: 'Escala a definir', regime: 'CLT · 44h semanais', descricao: 'Vagas para a nova loja, com treinamento completo antes da abertura em dezembro.', data: '2026-10-18' },
  { id: 'v04', titulo: 'Atendente McCafé', area: 'mccafe', cidade: 'Suzano', loja: 'Suzano Shopping', turno: 'Manhã', regime: 'CLT · Meio período', descricao: 'Preparo de cafés, bebidas e sobremesas no balcão McCafé.', data: '2026-10-15' },
  { id: 'v05', titulo: 'Treinador de equipe', area: 'lideranca', cidade: 'Suzano', loja: 'Suzano Drive', turno: 'Tarde', regime: 'CLT · 44h semanais', descricao: 'Acompanha novos colaboradores e garante o padrão de atendimento.', data: '2026-10-02' },
  { id: 'v06', titulo: 'Jovem Aprendiz', area: 'aprendiz', cidade: 'Poá', loja: 'Poá Drive', turno: 'Manhã ou tarde, conforme escola', regime: 'Aprendiz · 4h a 6h diárias', descricao: 'Para quem tem de 14 a 24 anos e está estudando. Inclui curso de formação.', data: '2026-10-16' },
  { id: 'v07', titulo: 'Jovem Aprendiz', area: 'aprendiz', cidade: 'Ferraz de Vasconcelos', loja: 'Ferraz Drive', turno: 'Tarde', regime: 'Aprendiz · 4h a 6h diárias', descricao: 'Primeira experiência com carteira assinada e curso de formação profissional.', data: '2026-10-09' },
  { id: 'v08', titulo: 'Atendente de cozinha', area: 'cozinha', cidade: 'Itaquaquecetuba', loja: 'Itaquá Drive', turno: 'Noite e madrugada', regime: 'CLT · 6x1 · Adicional noturno', descricao: 'Produção na cozinha para o atendimento 24 horas do drive.', data: '2026-10-13' },
  { id: 'v10', titulo: 'Atendente de restaurante', area: 'atendimento', cidade: 'Itaquaquecetuba', loja: 'Outlet Grande São Paulo', turno: 'Fins de semana', regime: 'CLT · Intermitente', descricao: 'Atendimento no salão e no caixa aos sábados, domingos e feriados.', data: '2026-10-06' },
  { id: 'v09', titulo: 'Atendente McDelivery', area: 'mcdelivery', cidade: 'Arujá', loja: 'Arujá Drive', turno: 'Tarde e noite', regime: 'CLT · 6x1', descricao: 'Organiza e confere pedidos de delivery e faz a entrega aos parceiros.', data: '2026-10-12' },
  { id: 'v11', titulo: 'Atendente de restaurante', area: 'atendimento', cidade: 'Mogi das Cruzes', loja: 'Mogi Ipoema', turno: 'Manhã', regime: 'CLT · Meio período', descricao: 'Caixa, montagem de bandejas e atendimento no totem de autoatendimento.', data: '2026-10-17' }
];

const PROCESSO = [
  { titulo: 'Cadastro online', texto: 'Preencha o formulário desta página pelo celular. Leva cerca de 3 minutos.', prazo: 'Hoje' },
  { titulo: 'Contato pelo WhatsApp', texto: 'O RH confere seu perfil e chama você para combinar a entrevista.', prazo: 'Até 7 dias úteis' },
  { titulo: 'Entrevista na loja', texto: 'Uma conversa com a gerência da loja mais próxima. Não precisa de roupa formal.', prazo: 'Cerca de 30 minutos' },
  { titulo: 'Integração e treinamento', texto: 'Exame admissional, documentos e seu primeiro turno acompanhado por um treinador.', prazo: 'Primeira semana' }
];

// TROCAR: depoimentos reais, com autorização de uso de nome e imagem.
const DEPOIMENTOS = [
  { nome: 'Larissa Okamoto', cargo: 'Gerente de turno · Mogi das Cruzes', foto: 'assets/depoimento-1.jpg', texto: 'Entrei como jovem aprendiz aos 16. Hoje coordeno o turno da noite e ajudo a treinar quem está chegando.' },
  { nome: 'Diego Ferreira', cargo: 'Atendente McCafé · Suzano', foto: 'assets/depoimento-2.jpg', texto: 'Consigo trabalhar de manhã e fazer faculdade à noite. A escala foi combinada desde a entrevista.' },
  { nome: 'Ana Beatriz Nunes', cargo: 'Treinadora · Itaquaquecetuba', foto: 'assets/depoimento-3.jpg', texto: 'Foi meu primeiro emprego. Em um ano e meio virei treinadora e hoje ensino o que aprendi.' },
  { nome: 'Rafael Moreira Santos', cargo: 'Atendente McDelivery · Arujá', foto: 'assets/depoimento-4.webp', texto: 'Moro a dez minutos da loja e trabalho no turno da tarde. Sobra tempo para o curso técnico de manhã.' }
];

const FAQ = [
  { pergunta: 'Qual a idade mínima para trabalhar no McDonald’s?', resposta: 'A partir de 14 anos pelo programa Jovem Aprendiz, para quem está estudando. Para vagas CLT de atendimento e cozinha, a partir de 16 anos, e 18 anos para turnos noturnos.' },
  { pergunta: 'Preciso ter experiência?', resposta: 'Não. Para atendimento, cozinha, McCafé, McDelivery e Jovem Aprendiz você aprende tudo no treinamento. Vagas de liderança pedem experiência prévia.' },
  { pergunta: 'Posso trabalhar e estudar?', resposta: 'Sim. A escala é combinada com a loja para respeitar seus horários de aula. Conte sua disponibilidade no formulário.' },
  { pergunta: 'Posso escolher em qual loja vou trabalhar?', resposta: 'Você indica sua cidade e bairro, e o RH prioriza a loja mais próxima da sua casa sempre que houver vaga.' },
  { pergunta: 'Em quanto tempo recebo retorno?', resposta: 'Normalmente em até 7 dias úteis pelo WhatsApp informado. Se não houver vaga para seu perfil agora, seu cadastro fica no banco de talentos.' },
  { pergunta: 'Preciso enviar currículo?', resposta: 'Não é obrigatório. Se tiver, pode anexar em PDF ou Word. Os dados do formulário já bastam para começar.' },
  { pergunta: 'O processo seletivo tem algum custo?', resposta: 'Nenhum. O McDonald’s nunca cobra taxas, cursos ou exames para contratar. Se alguém pedir pagamento, é golpe: avise o RH.' },
  { pergunta: 'Como meus dados são usados?', resposta: 'Seus dados são usados só para este processo seletivo, conforme a LGPD. Você pode pedir acesso, correção ou exclusão pelo e-mail de privacidade no rodapé.' }
];

const TAGLINE = 'Aqui o primeiro turno é só o começo. Tem gente que entrou como atendente e hoje gerencia a loja.';

const DISPONIBILIDADE = [
  { id: 'manha', label: 'Manhã' },
  { id: 'tarde', label: 'Tarde' },
  { id: 'noite', label: 'Noite' },
  { id: 'madrugada', label: 'Madrugada' },
  { id: 'fds', label: 'Fins de semana' }
];

/* ===================================================================== */

const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
const NAV = [['#beneficios', 'Benefícios'], ['#lojas', 'Lojas'], ['#vagas', 'Vagas'], ['#processo', 'Processo'], ['#depoimentos', 'Depoimentos'], ['#faq', 'FAQ']];

function maskPhone(v) {
  const d = v.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d.length ? '(' + d : '';
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}
function maskCep(v) {
  const d = v.replace(/\D/g, '').slice(0, 8);
  return d.length > 5 ? d.slice(0, 5) + '-' + d.slice(5) : d;
}
function idade(iso) {
  const n = new Date(iso + 'T00:00:00'), h = new Date();
  let a = h.getFullYear() - n.getFullYear();
  const m = h.getMonth() - n.getMonth();
  if (m < 0 || (m === 0 && h.getDate() < n.getDate())) a--;
  return a;
}
function validar(f, file) {
  const e = {};
  if (f.nome.trim().split(/\s+/).filter(Boolean).length < 2) e.nome = 'Escreva seu nome e sobrenome.';
  if (!f.nascimento) e.nascimento = 'Informe sua data de nascimento.';
  else { const a = idade(f.nascimento); if (a < 14) e.nascimento = 'As vagas começam a partir de 14 anos, pelo Jovem Aprendiz.'; else if (a > 90 || isNaN(a)) e.nascimento = 'Confira a data informada.'; }
  const d = f.whatsapp.replace(/\D/g, '');
  if (d.length !== 11 || d[2] !== '9') e.whatsapp = 'Use DDD e número de celular, como (11) 91234-5678.';
  const r = f.recado.replace(/\D/g, '');
  if (r && r.length !== 10 && r.length !== 11) e.recado = 'Use DDD e número, como (11) 4321-5678.';
  else if (r && r === d) e.recado = 'Informe um número diferente do seu.';
  if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email)) e.email = 'Esse e-mail parece incompleto. Confira, por favor.';
  if (f.cep.replace(/\D/g, '').length !== 8) e.cep = 'Informe os 8 números do CEP.';
  if (!f.cidade) e.cidade = 'Escolha sua cidade.';
  if (!f.bairro.trim()) e.bairro = 'Informe seu bairro para acharmos a loja mais perto.';
  if (!f.rua.trim()) e.rua = 'Informe a rua ou avenida.';
  if (!f.numero.trim()) e.numero = 'Informe o número (ou s/n).';
  if (!f.vaga) e.vaga = 'Escolha uma vaga ou o banco de talentos.';
  if (!f.disp.length) e.disp = 'Marque pelo menos um horário.';
  if (file && file.size > 5 * 1024 * 1024) e.arquivo = 'O arquivo passou de 5 MB. Tente um PDF menor.';
  if (!f.lgpd) e.lgpd = 'Precisamos da sua autorização para analisar a candidatura.';
  return e;
}
const ORDER = ['nome', 'nascimento', 'whatsapp', 'recado', 'recadoNome', 'email', 'cep', 'cidade', 'bairro', 'rua', 'numero', 'complemento', 'vaga', 'disp', 'arquivo', 'lgpd'];


/* =====================================================================
   APLICAÇÃO
   ===================================================================== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const areaLabel = id => (AREAS.find(a => a.id === id) || {}).label || id;
const fmtData = iso => { const [, m, d] = iso.split('-'); return +d + ' ' + MESES[+m - 1]; };
const lojaDe = nome => LOJAS.find(l => l.nome === nome) || {};
const fotoLoja = l => l.foto || 'assets/fachada-' + (l.sigla || 'loja').toLowerCase() + '.jpg';

const state = { filtroCidade: '', filtroArea: '', submitted: false, touched: {}, file: null };
let raf = null;

/* ---------- Scroll animado ---------- */
function stopScroll() { if (raf) { cancelAnimationFrame(raf); raf = null; } }
function goTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const start = scrollY;
  const end = Math.max(0, Math.min(el.getBoundingClientRect().top + scrollY - 96, document.documentElement.scrollHeight - innerHeight));
  const dist = end - start;
  const focus = () => { if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1'); el.focus({ preventScroll: true }); };
  stopScroll();
  if (reduced() || Math.abs(dist) < 2) { scrollTo(0, end); focus(); return; }
  const dur = Math.min(1100, Math.max(500, Math.abs(dist) * 0.35));
  const ease = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const t0 = performance.now();
  const step = now => {
    const t = Math.min(1, (now - t0) / dur);
    scrollTo(0, start + dist * ease(t));
    if (t < 1) raf = requestAnimationFrame(step); else { raf = null; focus(); }
  };
  raf = requestAnimationFrame(step);
}

/* ---------- Menu ---------- */
function setMenu(open) {
  document.body.classList.toggle('menu-open', open);
  const b = $('#burger');
  b.setAttribute('aria-expanded', open);
  b.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  $('#menu-mobile').setAttribute('aria-hidden', !open);
  $$('#menu-mobile a').forEach(a => a.tabIndex = open ? 0 : -1);
}

/* ---------- Render ---------- */
function renderStatic() {
  $$('[data-total="vagas"]').forEach(e => e.textContent = VAGAS.length);
  $$('[data-total="lojas"]').forEach(e => e.textContent = LOJAS.length);
  $$('[data-total="cidades"]').forEach(e => e.textContent = CIDADES.length);

  const wa = CONFIG.rhWhats.replace(/\D/g, '');
  const cfg = { ...CONFIG, rhMailto: 'mailto:' + CONFIG.rhEmail, rhWhatsHref: 'https://wa.me/55' + wa, dpoMailto: 'mailto:' + CONFIG.dpoEmail };
  $$('[data-cfg]').forEach(e => e.textContent = cfg[e.dataset.cfg]);
  $$('[data-cfg-href]').forEach(e => e.href = cfg[e.dataset.cfgHref]);
  $$('[data-ano]').forEach(e => e.textContent = new Date().getFullYear());

  $$('[data-nav]').forEach(ul => {
    const mob = ul.dataset.nav === 'mobile';
    ul.innerHTML = NAV.map(([h, l], i) => '<li><a href="' + h + '"' + (mob ? ' tabindex="-1" style="transition-delay:' + (100 + i * 50) + 'ms"' : '') + '>' + esc(l) + '</a></li>').join('');
  });

  $('#lista-beneficios').innerHTML = BENEFICIOS.map(b =>
    '<li class="benefit"><span class="benefit__icon" aria-hidden="true"><i class="ph ' + b.icon + '"></i></span><div><h3>' + esc(b.titulo) + '</h3><p>' + esc(b.texto) + '</p></div></li>').join('');

  $('#tagline-text').innerHTML = TAGLINE.split(' ').map(w => '<span>' + esc(w) + '</span>').join('');

  $('#lista-lojas').innerHTML = CIDADES.flatMap(c => LOJAS.filter(l => l.cidade === c)).map(l => {
    const breve = l.status === 'em breve';
    const [y, m] = l.inauguracao.split('-');
    const n = VAGAS.filter(v => v.loja === l.nome).length;
    const count = breve ? 'Em breve' : n ? (n === 1 ? '1 vaga' : n + ' vagas') : 'Banco de talentos';
    const tipo = breve ? l.tipo + ' · Inaugura em ' + MESES[+m - 1] + '/' + y : l.tipo;
    const end = breve ? l.endereco : l.endereco + ', ' + l.cidade + ', SP';
    const maps = l.maps || 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(l.endereco + ', ' + l.cidade + ', SP');
    return '<li class="store"><div class="store__photo"><img src="' + fotoLoja(l) + '" alt="Fachada do McDonald’s ' + esc(l.nome) + ', em ' + esc(l.cidade) + '" loading="lazy"></div>' +
      '<div class="store__body"><div class="store__top"><div><p class="store__city">' + esc(l.cidade) + '</p><h3>' + esc(l.nome) + '</h3></div><span class="store__count">' + count + '</span></div>' +
      '<span class="tag">' + esc(tipo) + '</span><p class="store__addr">' + esc(end) + '</p>' +
      '<div class="store__actions"><button type="button" class="btn btn--outline btn--sm" data-filtrar="' + esc(l.cidade) + '">Ver vagas</button>' +
      (breve ? '' : '<a href="' + maps + '" target="_blank" rel="noopener">Ver no mapa</a>') + '</div></div></li>';
  }).join('');

  $('#filtro-cidade').innerHTML = '<option value="">Todas as cidades</option>' + CIDADES.map(c => '<option>' + esc(c) + '</option>').join('');
  $('#chips-area').innerHTML = [{ id: '', label: 'Todas' }, ...AREAS].map(a => '<button type="button" class="chip" data-area="' + a.id + '" aria-pressed="' + (a.id === '') + '">' + esc(a.label) + '</button>').join('');

  $('#lista-processo').innerHTML = PROCESSO.map((p, i) =>
    '<li class="step"><div class="step__num"><b aria-hidden="true">' + (i + 1) + '</b><i aria-hidden="true"></i></div><div class="step__text"><h3><span class="sr-only">Etapa ' + (i + 1) + ': </span>' + esc(p.titulo) + '</h3><p>' + esc(p.texto) + '</p><span class="step__time"><i class="ph ph-timer" aria-hidden="true"></i>' + esc(p.prazo) + '</span></div></li>').join('');

  $('#lista-depoimentos').innerHTML = DEPOIMENTOS.map(d =>
    '<li><figure class="testimonial"><div class="testimonial__photo"><img src="' + d.foto + '" alt="Foto de ' + esc(d.nome) + '" loading="lazy"></div><div class="testimonial__body"><i class="ph-fill ph-quotes" aria-hidden="true"></i><blockquote>' + esc(d.texto) + '</blockquote><figcaption><strong>' + esc(d.nome) + '</strong><span>' + esc(d.cargo) + '</span></figcaption></div></figure></li>').join('');

  $('#lista-faq').innerHTML = FAQ.map((q, i) =>
    '<div class="faq__item"><h3><button type="button" id="faq-b' + i + '" aria-expanded="' + (i === 0) + '" aria-controls="faq-p' + i + '">' + esc(q.pergunta) + '<span class="faq__plus" aria-hidden="true"><i class="ph ph-plus"></i></span></button></h3><div class="faq__panel" id="faq-p' + i + '" role="region" aria-labelledby="faq-b' + i + '"' + (i === 0 ? '' : ' hidden') + '><p>' + esc(q.resposta) + '</p></div></div>').join('');

  $('#lista-redes').innerHTML = CONFIG.socials.map(s => '<li><a href="' + s.url + '" target="_blank" rel="noopener" aria-label="' + esc(s.label) + '"><i class="ph ' + s.icon + '" aria-hidden="true"></i></a></li>').join('');

  $('#f-cidade').innerHTML = '<option value="">Selecione</option>' + CIDADES.map(c => '<option>' + esc(c) + '</option>').join('');
  $('#f-vaga').innerHTML = vagaOpts().map(o => '<option value="' + o.value + '">' + esc(o.label) + '</option>').join('');
  $('#f-nascimento').max = new Date().toISOString().slice(0, 10);
  $('#disp-opcoes').innerHTML = DISPONIBILIDADE.map((o, i) => '<label class="check-chip" for="f-disp-' + i + '"><input id="f-disp-' + i + '" type="checkbox" name="disp" value="' + o.id + '">' + esc(o.label) + '</label>').join('');
}

function vagaOpts() {
  return [{ value: '', label: 'Selecione' },
    ...VAGAS.map(v => ({ value: v.id, label: v.titulo + ' · ' + v.cidade })),
    ...AREAS.map(a => ({ value: 'banco-' + a.id, label: 'Banco de talentos · ' + a.label }))];
}

function renderVagas() {
  const lista = VAGAS.filter(v => (!state.filtroCidade || v.cidade === state.filtroCidade) && (!state.filtroArea || v.area === state.filtroArea))
    .sort((a, b) => b.data.localeCompare(a.data));
  $('#filtro-cidade').value = state.filtroCidade;
  $$('#chips-area .chip').forEach(c => c.setAttribute('aria-pressed', c.dataset.area === state.filtroArea));
  $('#vagas-count').textContent = lista.length === 1 ? '1 vaga encontrada' : lista.length + ' vagas encontradas';
  $('#lista-vagas').hidden = !lista.length;
  $('#vagas-vazio').hidden = !!lista.length;
  $('#vagas-vazio-titulo').textContent = state.filtroCidade ? 'Nenhuma vaga com esse filtro em ' + state.filtroCidade + ' agora' : 'Nenhuma vaga com esse filtro agora';
  $('#lista-vagas').innerHTML = lista.map(v => {
    const foto = v.foto || fotoLoja(lojaDe(v.loja));
    return '<li class="job"><div class="job__photo"><img src="' + foto + '" alt="Fachada do McDonald’s ' + esc(v.loja) + ', em ' + esc(v.cidade) + '" loading="lazy"></div>' +
      '<div class="job__body"><div class="job__meta"><span class="job__area">' + esc(areaLabel(v.area)) + '</span><span class="job__date">Publicada em ' + fmtData(v.data) + '</span></div>' +
      '<div><h3>' + esc(v.titulo) + '</h3><p class="job__desc">' + esc(v.descricao) + '</p></div>' +
      '<ul class="plain job__info"><li><i class="ph ph-map-pin" aria-hidden="true"></i>' + esc(v.loja) + ' · ' + esc(v.cidade) + '</li><li><i class="ph ph-clock" aria-hidden="true"></i>' + esc(v.turno) + '</li><li><i class="ph ph-briefcase" aria-hidden="true"></i>' + esc(v.regime) + '</li></ul>' +
      '<button type="button" class="btn btn--yellow" data-aplicar="' + v.id + '" aria-label="Quero a vaga de ' + esc(v.titulo) + ' em ' + esc(v.cidade) + '">Quero esta vaga</button></div></li>';
  }).join('');
}

/* ---------- Formulário ---------- */
const form = () => $('#form');
function lerForm() {
  const f = form(), g = n => (f.elements[n] ? f.elements[n].value : '');
  return {
    nome: g('nome'), nascimento: g('nascimento'), whatsapp: g('whatsapp'), recado: g('recado'), recadoNome: g('recadoNome'),
    email: g('email'), cep: g('cep'), cidade: g('cidade'), bairro: g('bairro'), rua: g('rua'), numero: g('numero'), complemento: g('complemento'),
    vaga: g('vaga'), disp: $$('input[name="disp"]:checked', f).map(i => i.value), lgpd: f.elements.lgpd.checked
  };
}
function mostrarErros() {
  const errs = validar(lerForm(), state.file);
  let n = 0;
  ORDER.forEach(k => {
    const p = document.getElementById('e-' + k);
    if (!p) return;
    const m = (state.submitted || state.touched[k]) ? errs[k] || '' : '';
    if (k === 'arquivo' && p.dataset.fileErr) { n++; return; }
    p.textContent = m;
    const inp = document.getElementById('f-' + k);
    if (inp) inp.setAttribute('aria-invalid', m ? 'true' : 'false');
    if (m) n++;
  });
  $('#form-resumo').textContent = state.submitted && n ? (n === 1 ? 'Falta ajustar 1 campo.' : 'Faltam ajustar ' + n + ' campos.') : '';
  return errs;
}
async function buscarCep(cep) {
  const d = cep.replace(/\D/g, ''), msg = $('#cep-msg');
  if (d.length !== 8) { msg.textContent = ''; return; }
  msg.textContent = 'Buscando endereço…';
  try {
    const r = await (await fetch('https://viacep.com.br/ws/' + d + '/json/')).json();
    if (r.erro) throw 0;
    const f = form();
    const cid = CIDADES.find(c => c.localeCompare(r.localidade, 'pt', { sensitivity: 'base' }) === 0);
    if (r.logradouro) f.elements.rua.value = r.logradouro;
    if (r.bairro) f.elements.bairro.value = r.bairro;
    if (cid) f.elements.cidade.value = cid;
    msg.textContent = cid ? 'Endereço preenchido. Confira e complete o número.' : 'CEP de ' + r.localidade + '. Escolha a cidade mais próxima.';
    mostrarErros();
  } catch (_) { msg.textContent = 'Não achamos esse CEP. Preencha o endereço manualmente.'; }
}
function setArquivo(file) {
  const e = $('#e-arquivo');
  e.textContent = ''; delete e.dataset.fileErr;
  if (file && !/\.(pdf|docx?)$/i.test(file.name)) { e.textContent = 'Envie um arquivo PDF ou Word (.doc, .docx).'; e.dataset.fileErr = '1'; file = null; }
  else if (file && file.size > 5 * 1024 * 1024) { e.textContent = 'O arquivo passou de 5 MB. Tente um PDF menor.'; e.dataset.fileErr = '1'; file = null; }
  state.file = file;
  if (!file) $('#f-arquivo').value = '';
  $('#upload').hidden = !!file;
  $('#file-box').hidden = !file;
  $('#file-name').textContent = file ? file.name : '';
}
async function enviar(ev) {
  ev.preventDefault();
  state.submitted = true;
  const errs = mostrarErros();
  const first = ORDER.find(k => errs[k]);
  if (first) {
    const id = first === 'disp' ? 'f-disp-0' : 'f-' + first;
    document.getElementById(id)?.focus();
    return;
  }
  const btn = $('#form-enviar');
  btn.disabled = true; btn.setAttribute('aria-busy', 'true'); btn.textContent = 'Enviando candidatura…';
  $('#form-erro').hidden = true;
  const f = lerForm();
  const vagaLabel = (vagaOpts().find(o => o.value === f.vaga) || {}).label || f.vaga;
  try {
    if (CONFIG.endpoint) {
      const fd = new FormData();
      Object.entries({ ...f, disp: f.disp.join(', '), vaga: vagaLabel, lgpd: 'sim', origem: 'lp-trabalhe-conosco-alto-tiete' }).forEach(([k, v]) => fd.append(k, v));
      if (state.file) fd.append('curriculo', state.file);
      const r = await fetch(CONFIG.endpoint, { method: 'POST', body: fd });
      if (!r.ok) throw new Error(r.status);
    } else {
      await new Promise(r => setTimeout(r, 1200)); // modo demonstração: defina CONFIG.endpoint para enviar de verdade
    }
    $('#sucesso-nome').textContent = f.nome.trim().split(/\s+/)[0] || '';
    $('#sucesso-whats').textContent = f.whatsapp;
    $('#sucesso-protocolo').textContent = 'MC-AT-' + String(Math.floor(100000 + Math.random() * 899999));
    form().hidden = true;
    $('#sucesso').hidden = false;
    setTimeout(() => { goTo('candidatura'); $('#sucesso').focus({ preventScroll: true }); }, 50);
  } catch (_) {
    $('#form-erro').hidden = false;
  } finally {
    btn.disabled = false; btn.removeAttribute('aria-busy'); btn.textContent = 'Enviar candidatura';
  }
}
function resetForm() {
  form().reset();
  state.submitted = false; state.touched = {};
  setArquivo(null);
  $('#cep-msg').textContent = '';
  mostrarErros();
  $('#sucesso').hidden = true;
  form().hidden = false;
  $('#f-nome').focus();
}

/* ---------- Eventos ---------- */
function bind() {
  document.addEventListener('click', e => {
    const t = e.target;
    const a = t.closest('a[href^="#"]');
    if (a && e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey) {
      const id = a.getAttribute('href').slice(1);
      if (id && document.getElementById(id)) {
        e.preventDefault();
        setMenu(false);
        goTo(id);
        history.replaceState(null, '', '#' + id);
        return;
      }
    }
    const fil = t.closest('[data-filtrar]');
    if (fil) { state.filtroCidade = fil.dataset.filtrar; state.filtroArea = ''; renderVagas(); goTo('vagas'); return; }
    const chip = t.closest('[data-area]');
    if (chip) { state.filtroArea = chip.dataset.area; renderVagas(); return; }
    const ap = t.closest('[data-aplicar]');
    if (ap) {
      const v = VAGAS.find(x => x.id === ap.dataset.aplicar);
      form().elements.vaga.value = v.id;
      if (!form().elements.cidade.value) form().elements.cidade.value = v.cidade;
      goTo('candidatura');
      setTimeout(() => $('#f-nome').focus({ preventScroll: true }), 700);
      return;
    }
    const fq = t.closest('.faq__item button');
    if (fq) {
      const open = fq.getAttribute('aria-expanded') === 'true';
      $$('.faq__item button').forEach(b => { b.setAttribute('aria-expanded', 'false'); document.getElementById(b.getAttribute('aria-controls')).hidden = true; });
      if (!open) { fq.setAttribute('aria-expanded', 'true'); document.getElementById(fq.getAttribute('aria-controls')).hidden = false; }
    }
  });

  $('#burger').addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
  window.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  matchMedia('(min-width: 960px)').addEventListener('change', e => { if (e.matches) setMenu(false); });
  ['wheel', 'touchstart', 'keydown'].forEach(t => addEventListener(t, stopScroll, { passive: true }));

  $('#filtro-cidade').addEventListener('change', e => { state.filtroCidade = e.target.value; renderVagas(); });
  $('#limpar-filtros').addEventListener('click', () => { state.filtroCidade = ''; state.filtroArea = ''; renderVagas(); });

  const f = form();
  f.addEventListener('submit', enviar);
  f.addEventListener('input', e => {
    const t = e.target;
    if (t.dataset.mask === 'phone') t.value = maskPhone(t.value);
    if (t.name === 'cep') { t.value = maskCep(t.value); buscarCep(t.value); }
    if (t.name === 'disp') state.touched.disp = true;
    if (t.name === 'lgpd') state.touched.lgpd = true;
    $('#form-erro').hidden = true;
    mostrarErros();
  });
  f.addEventListener('change', () => mostrarErros());
  f.addEventListener('focusout', e => { if (e.target.name) { state.touched[e.target.name] = true; mostrarErros(); } });
  $('#f-arquivo').addEventListener('change', e => setArquivo(e.target.files && e.target.files[0]));
  $('#file-remove').addEventListener('click', () => setArquivo(null));
  $('#nova-candidatura').addEventListener('click', resetForm);
}

/* ---------- Efeitos de rolagem ---------- */
function effects() {
  const links = () => $$('.nav-desk a');
  const io = new IntersectionObserver(ents => ents.forEach(en => {
    if (!en.isIntersecting) return;
    links().forEach(a => a.setAttribute('aria-current', a.getAttribute('href') === '#' + en.target.id ? 'location' : 'false'));
  }), { rootMargin: '-45% 0px -50% 0px' });
  NAV.forEach(([h]) => { const el = $(h); if (el) io.observe(el); });

  if (!reduced() && 'IntersectionObserver' in window) {
    const rev = new IntersectionObserver(ents => ents.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.classList.add('reveal-in');
      rev.unobserve(en.target);
    }), { rootMargin: '0px 0px -10% 0px' });
    $$('[data-reveal]').forEach(el => {
      if (el.getBoundingClientRect().top < innerHeight) return;
      el.classList.add('reveal-init');
      rev.observe(el);
    });
  }

  const words = $$('#tagline-text span');
  let ticking = false;
  const onScroll = () => {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const r = $('#tagline').getBoundingClientRect(), vh = innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (vh * 0.5 + r.height * 0.6)));
      const n = Math.round(p * words.length);
      words.forEach((w, i) => w.classList.toggle('on', i < n));
    });
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---------- SEO: JSON-LD JobPosting ---------- */
function jsonLd() {
  const s = document.createElement('script');
  s.type = 'application/ld+json';
  s.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': VAGAS.map(v => ({
      '@type': 'JobPosting', title: v.titulo, description: v.descricao, datePosted: v.data,
      validThrough: new Date(new Date(v.data).getTime() + 45 * 864e5).toISOString().slice(0, 10),
      employmentType: v.area === 'aprendiz' ? 'INTERN' : (/Meio|Intermitente/.test(v.regime) ? 'PART_TIME' : 'FULL_TIME'),
      hiringOrganization: { '@type': 'Organization', name: CONFIG.empresaSchema, sameAs: 'https://www.mcdonalds.com.br' },
      jobLocation: { '@type': 'Place', address: { '@type': 'PostalAddress', addressLocality: v.cidade, addressRegion: 'SP', addressCountry: 'BR' } },
      directApply: true
    }))
  });
  document.head.appendChild(s);
}

renderStatic();
renderVagas();
bind();
effects();
jsonLd();
})();
