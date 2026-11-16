/*
 * Diretório Global Clean. Fonte: https://globalcleanbrasil.com/ (consulta em 16/11/2026)
 * Os números representam os links divulgados nas páginas oficiais; não comprovam ativação do WhatsApp.
 * status: 'direto' = número com DDD e formato brasileiro completo; 'link' = link oficial do WhatsApp;
 *         'conferir' = fonte publica número aparentemente incompleto ou link inconsistente.
 * SEM correspondência aproximada: cidades não listadas NÃO serão encaminhadas a uma unidade vizinha.
 */
const UNIDADES = [
  {id:'brasilia', nome:'Brasília', uf:'DF', cidades:['Brasília'], numero:'556195174256', status:'conferir', pagina:'https://globalcleanbrasil.com/unidades/brasilia-df/', nota:'O link publicado contém um número com formato possivelmente incompleto.'},
  {id:'bh', nome:'Belo Horizonte', uf:'MG', cidades:['Belo Horizonte'], numero:'5531982962217', status:'direto', pagina:'https://globalcleanbrasil.com/unidades/belo-horizonte-mg/'},
  {id:'chapeco', nome:'Chapecó', uf:'SC', cidades:['Chapecó'], numero:'5549989164334', status:'direto', pagina:'https://globalcleanbrasil.com/unidades/chapeco-sc/'},
  {id:'camboriu', nome:'Camboriú', uf:'SC', cidades:['Camboriú'], numero:'5547989097328', status:'direto', pagina:'https://globalcleanbrasil.com/unidades/camboriu-sc/'},
  {id:'campogrande', nome:'Campo Grande', uf:'MS', cidades:['Campo Grande'], numero:'556793363710', status:'conferir', pagina:'https://globalcleanbrasil.com/unidades/campo-grande-ms-2/', nota:'O número da página oficial aparenta ter menos dígitos do que o padrão celular brasileiro.'},
  {id:'cascavel', nome:'Cascavel', uf:'PR', cidades:['Cascavel'], numero:'5545984043993', status:'direto', pagina:'https://globalcleanbrasil.com/unidades/cascavel-e-toledo-pr/'},
  {id:'criciuma', nome:'Criciúma e Tubarão', uf:'SC', cidades:['Criciúma','Tubarão'], numero:'5548988060157', status:'direto', pagina:'https://globalcleanbrasil.com/unidades/criciuma-e-tubarao-sc/'},
  {id:'curitiba', nome:'Curitiba e São José dos Pinhais', uf:'PR', cidades:['Curitiba','São José dos Pinhais'], numero:'5541992444335', status:'direto', pagina:'https://globalcleanbrasil.com/unidades/curitiba-e-sao-jose-dos-pinhais-pr/'},
  {id:'cuiaba', nome:'Cuiabá', uf:'MT', cidades:['Cuiabá'], numero:'556593091400', status:'conferir', pagina:'https://globalcleanbrasil.com/unidades/cuiaba-mg/', nota:'Página com sigla inconsistente na URL e telefone em formato possivelmente incompleto.'},
  {id:'franca', nome:'Franca', uf:'SP', cidades:['Franca'], numero:'5516993164309', status:'direto', pagina:'https://globalcleanbrasil.com/unidades/franca-sp/'},
  {id:'goiania', nome:'Goiânia', uf:'GO', cidades:['Goiânia'], numero:'5562991048497', status:'direto', pagina:'https://globalcleanbrasil.com/unidades/goiania-go/'},
  {id:'campinas', nome:'Campinas e região', uf:'SP', cidades:['Indaiatuba','Itu','Salto','Campinas','Piracicaba'], numero:'5519991348004', status:'direto', pagina:'https://globalcleanbrasil.com/unidades/indaiatuba-itu-salto-campinas-e-piracicaba-sp/'},
  {id:'joinville', nome:'Joinville', uf:'SC', cidades:['Joinville'], numero:'5547988086271', status:'direto', pagina:'https://globalcleanbrasil.com/unidades/joinville-sc/'},
  {id:'jundiai', nome:'Jundiaí', uf:'SP', cidades:['Jundiaí'], numero:'5511978134736', status:'direto', pagina:'https://globalcleanbrasil.com/unidades/jundiai-sp/'},
  {id:'londrina', nome:'Londrina e região', uf:'PR', cidades:['Londrina','Cambé','Rolândia','Arapongas','Apucarana'], numero:'5543988479595', status:'direto', pagina:'https://globalcleanbrasil.com/unidades/londrina-cambe-e-rolandia-pr/'},
  {id:'pontagrossa', nome:'Ponta Grossa', uf:'PR', cidades:['Ponta Grossa'], numero:'5542988024222', status:'direto', pagina:'https://globalcleanbrasil.com/unidades/ponta-grossa-pr/', nota:'O link oficial estava sem o prefixo +55, acrescentado para padronização.'},
  {id:'maringa', nome:'Maringá e Umuarama', uf:'PR', cidades:['Maringá','Umuarama'], status:'link', link:'https://wa.me/message/WY3BYZAN5GUCL1', pagina:'https://globalcleanbrasil.com/', nota:'A página oficial utiliza um link curto do WhatsApp sem publicar o número.'},
  {id:'manaus', nome:'Manaus', uf:'AM', cidades:['Manaus'], numero:'5592984668723', status:'direto', pagina:'https://globalcleanbrasil.com/unidades/manaus-am/'},
  {id:'rioverde', nome:'Rio Verde', uf:'GO', cidades:['Rio Verde'], numero:'556492323196', status:'conferir', pagina:'https://globalcleanbrasil.com/unidades/rio-verde-go/', nota:'O número divulgado aparenta estar incompleto.'},
  {id:'riopreto', nome:'São José do Rio Preto', uf:'SP', cidades:['São José do Rio Preto'], numero:'5517991461728', status:'direto', pagina:'https://globalcleanbrasil.com/unidades/sao-jose-do-rio-preto-sp/'},
  {id:'sorocaba', nome:'Sorocaba', uf:'SP', cidades:['Sorocaba'], numero:'5515992365982', status:'direto', pagina:'https://globalcleanbrasil.com/unidades/sorocaba-sp/'},
  {id:'toledo', nome:'Toledo', uf:'PR', cidades:['Toledo'], numero:'5545999327335', status:'direto', pagina:'https://globalcleanbrasil.com/unidades/toledo-pr-2/'},
  {id:'floripa', nome:'Florianópolis e região', uf:'SC', cidades:['Florianópolis','São José','Palhoça'], status:'conferir', pagina:'https://globalcleanbrasil.com/', nota:'O item Floripa, São José e Palhoça no diretório oficial redireciona a uma página de Toledo. Contato local não confirmado.'},
  {id:'uberlandia', nome:'Uberlândia', uf:'MG', cidades:['Uberlândia'], numero:'553484089629', status:'conferir', pagina:'https://globalcleanbrasil.com/unidades/uberlandia-mg/', nota:'O número divulgado aparenta estar incompleto.'}
];
const CIDADES = UNIDADES.flatMap(u=>u.cidades.map(cidade=>({ cidade, uf:u.uf, unidadeId:u.id, nomeUnidade:u.nome })));
function normalizar(str){ return String(str||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\s+/g,' ').trim(); }
function procurarCidades(term,limite=12){ const t=normalizar(term); if(!t)return []; return CIDADES.filter(c=>normalizar(`${c.cidade} ${c.uf}`).includes(t)||normalizar(c.cidade).includes(t)).sort((a,b)=>normalizar(a.cidade).startsWith(t)===normalizar(b.cidade).startsWith(t)?a.cidade.localeCompare(b.cidade,'pt-BR'):normalizar(a.cidade).startsWith(t)?-1:1).slice(0,limite); }
function obterUnidade(id){return UNIDADES.find(u=>u.id===id)||null;}
function numeroFormatado(numero){if(!numero)return null;const d=numero.replace(/\D/g,'').replace(/^55/,'');return d.length===11?`(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`:d;}
function linkAtendimento(unidade,cidade){
 if(!unidade || !['direto','link'].includes(unidade.status))return null;
 if(unidade.status==='link')return unidade.link;
 const texto=`Olá! Encontrei a Global Clean pelo site e gostaria de solicitar uma avaliação para ${cidade || unidade.nome} - ${unidade.uf}.`;
 return `https://wa.me/${unidade.numero}?text=${encodeURIComponent(texto)}`;
}

window.GCData={UNIDADES,CIDADES,normalizar,procurarCidades,obterUnidade,numeroFormatado,linkAtendimento};
