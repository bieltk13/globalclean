// Rode: node testes/validar-busca.cjs
const assert=require('node:assert/strict');
global.window={};
require('../js/unidades.js');
const {UNIDADES,CIDADES,procurarCidades,obterUnidade,linkAtendimento}=window.GCData;
function findCity(city,uf){return CIDADES.find(x=>x.cidade===city&&x.uf===uf)}
function url(city,uf){const x=findCity(city,uf);return x&&linkAtendimento(obterUnidade(x.unidadeId),city)}
assert.equal(UNIDADES.length,24);
assert.ok(CIDADES.length>30);
assert.match(url('Cascavel','PR'),/wa\.me\/5545984043993/);
assert.match(url('Toledo','PR'),/wa\.me\/5545999327335/);
assert.notEqual(url('Toledo','PR'),url('Cascavel','PR'));
assert.match(url('São José dos Pinhais','PR'),/wa\.me\/5541992444335/);
assert.equal(url('São José','SC'),null);
assert.equal(url('Florianópolis','SC'),null);
assert.equal(procurarCidades('cidade inexistente').length,0);
assert.equal(procurarCidades('maringa')[0].cidade,'Maringá');
assert.equal(procurarCidades('chapeco')[0].cidade,'Chapecó');
assert.equal(procurarCidades('sao jose').length,3);
for(const u of UNIDADES){
 assert.ok(u.cidades?.length>0);
 assert.ok(/^https:\/\//.test(u.pagina));
 if(u.status==='direto')assert.match(u.numero,/^55\d{11}$/);
 if(u.status==='link')assert.match(u.link,/^https:\/\/wa\.me\//);
}
console.log('OK: 24 entradas regionais,',CIDADES.length,'municípios e 12 verificações de roteamento.');
