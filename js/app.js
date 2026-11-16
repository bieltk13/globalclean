/* Global Clean — Busca e interações, sem dependências externas */
(() => {
  'use strict';
  const {UNIDADES,CIDADES,procurarCidades,obterUnidade,numeroFormatado,linkAtendimento,normalizar}=window.GCData;
  const $ = sel=>document.querySelector(sel);
  const search=$('#citySearch'), options=$('#cityOptions'), hint=$('#searchHint');
  const card=$('#unitResult'), action=$('#resultAction'), clear=$('#clearSearch');
  const toggle=$('#toggleAllUnits'), all=$('#allUnits'), grid=$('#allUnitsGrid');
  let selected=null, activeIndex=0, currentMatches=[];

  const whatsappIcon='<img class="wa-icon" src="assets/whatsapp.svg" width="22" height="22" alt="" aria-hidden="true">';
  const escapeText=(s)=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function defaultCard(){
    selected=null;
    card.querySelector('.result-eyebrow').lastChild.textContent=' Unidade em destaque';
    card.querySelector('h3').textContent='Selecione sua cidade';
    card.querySelector('p').textContent='Mostraremos qual unidade atende a localidade informada, com o contato correto.';
    const status=card.querySelector('.result-status');status.textContent='Nenhuma cidade selecionada';status.className='result-status';
    action.disabled=true;
    action.innerHTML=whatsappIcon+' Selecionar cidade primeiro';
    const old=card.querySelector('.unit-source');if(old)old.remove();
  }
  function closeOptions(){options.hidden=true;options.innerHTML='';search.setAttribute('aria-expanded','false');search.setAttribute('aria-activedescendant','');}
  function renderOptions(){
    const query=search.value.trim();clear.hidden=!query;
    currentMatches=procurarCidades(query,24);
    activeIndex=0;
    if(!query){closeOptions();hint.textContent='Comece a digitar para encontrar uma cidade ou selecione uma sugestão abaixo.';return;}
    if(!currentMatches.length){closeOptions();hint.textContent=`Não há unidade cadastrada para “${query}”. Verifique a lista oficial antes de entrar em contato.`;return;}
    options.innerHTML=currentMatches.map((item,i)=>{
      const u=obterUnidade(item.unidadeId);const complete=u.status==='direto'||u.status==='link';
      return `<button class="city-option" role="option" type="button" id="city-opt-${i}" aria-selected="${i===activeIndex}" data-index="${i}"><svg class="ico"><use href="#i-pin"/></svg><strong>${escapeText(item.cidade)} — ${escapeText(item.uf)}</strong><small>${complete?'WhatsApp local':'Consultar contato'}</small></button>`;
    }).join('');
    options.hidden=false;search.setAttribute('aria-expanded','true');search.setAttribute('aria-activedescendant','city-opt-0');
    hint.textContent=`${currentMatches.length} cidade(s) encontrada(s). Escolha uma opção para confirmar o atendimento.`;
  }
  function highlight(){[...options.querySelectorAll('.city-option')].forEach((b,i)=>b.setAttribute('aria-selected',String(i===activeIndex)));search.setAttribute('aria-activedescendant',`city-opt-${activeIndex}`);const active=options.querySelector(`[data-index="${activeIndex}"]`);if(active)active.scrollIntoView({block:'nearest'});}
  function selectCity(item,scroll){
    if(!item)return;
    const unit=obterUnidade(item.unidadeId);
    if(!unit)return;
    selected={unit,city:item.cidade,uf:item.uf};
    search.value=`${item.cidade} — ${item.uf}`;
    clear.hidden=false;closeOptions();
    card.querySelector('.result-eyebrow').lastChild.textContent=' Unidade correspondente';
    card.querySelector('h3').textContent=`${item.cidade} — ${item.uf}`;
    const group=unit.cidades.length>1?`Unidade responsável: ${unit.nome} — ${unit.uf}. `:'';
    card.querySelector('p').textContent=group+'Você será direcionado ao canal publicado para esta região.';
    const stat=card.querySelector('.result-status');
    const dest=linkAtendimento(unit,item.cidade);
    if(dest){
      stat.textContent=unit.status==='link'?'Link direto de atendimento divulgado pela unidade':`Contato divulgado: ${numeroFormatado(unit.numero)}`;
      stat.className='result-status status-ok';
      action.disabled=false;
      action.innerHTML=whatsappIcon+' Conversar com esta unidade';
      hint.textContent=`Unidade selecionada: ${item.cidade} — ${item.uf}. Revise o contato e clique para abrir o WhatsApp.`;
    }else{
      stat.textContent='Contato local precisa de confirmação';stat.className='result-status status-review';
      action.disabled=false;
      action.innerHTML='<svg class="ico"><use href="#i-arrow"/></svg> Ver a fonte oficial';
      const note=unit.nota||'Contato ainda não confirmado.';
      hint.textContent=note;
      card.querySelector('p').textContent=group+note;
    }
    let source=card.querySelector('.unit-source');if(!source){source=document.createElement('a');source.className='unit-source';source.target='_blank';source.rel='noopener noreferrer';card.append(source);}
    source.href=unit.pagina;source.textContent='Conferir página de origem';
    if(scroll){document.getElementById('unidades').scrollIntoView({behavior:'smooth',block:'start'});}
  }
  search.addEventListener('input',()=>{defaultCard();renderOptions();});
  search.addEventListener('focus',()=>{if(search.value.trim()&&!selected)renderOptions();});
  search.addEventListener('keydown',e=>{
    if(e.key==='Escape'){closeOptions();return;}
    if(options.hidden)return;
    if(e.key==='ArrowDown'){e.preventDefault();activeIndex=(activeIndex+1)%currentMatches.length;highlight();}
    if(e.key==='ArrowUp'){e.preventDefault();activeIndex=(activeIndex-1+currentMatches.length)%currentMatches.length;highlight();}
    if(e.key==='Enter'){e.preventDefault();selectCity(currentMatches[activeIndex],false);}
  });
  options.addEventListener('click',e=>{const target=e.target.closest('[data-index]');if(target)selectCity(currentMatches[Number(target.dataset.index)],false);});
  clear.addEventListener('click',()=>{search.value='';defaultCard();renderOptions();search.focus();});
  document.addEventListener('click',e=>{if(!e.target.closest('.unit-search-area'))closeOptions();});
  document.querySelectorAll('[data-city]').forEach(btn=>btn.addEventListener('click',()=>{
    const hit=CIDADES.find(c=>c.cidade===btn.dataset.city&&c.uf===btn.dataset.uf);selectCity(hit,false);
  }));
  action.addEventListener('click',()=>{
    if(!selected)return;
    const link=linkAtendimento(selected.unit,selected.city)||selected.unit.pagina;
    if(!/^https:\/\//.test(link))return;
    const opened=window.open(link,'_blank','noopener,noreferrer');
    if(!opened){const a=document.createElement('a');a.href=link;a.target='_blank';a.rel='noopener noreferrer';document.body.appendChild(a);a.click();a.remove();}
  });
  const alphabetical=[...CIDADES].sort((a,b)=>a.cidade.localeCompare(b.cidade,'pt-BR')||a.uf.localeCompare(b.uf));
  $('#cityCount').textContent=`${alphabetical.length} municípios • ${UNIDADES.length} entradas regionais`;
  grid.innerHTML=alphabetical.map((c,i)=>{
    const unit=obterUnidade(c.unidadeId);return `<button type="button" data-city-index="${i}">${escapeText(c.cidade)} — ${escapeText(c.uf)}<small>${unit.status==='conferir'?'Contato a confirmar':unit.nome===c.cidade?'WhatsApp divulgado':`Unidade ${escapeText(unit.nome)}`}</small></button>`;
  }).join('');
  grid.addEventListener('click',e=>{const b=e.target.closest('[data-city-index]');if(b)selectCity(alphabetical[Number(b.dataset.cityIndex)],true);});
  toggle.addEventListener('click',()=>{all.hidden=!all.hidden;toggle.setAttribute('aria-expanded',String(!all.hidden));toggle.innerHTML=all.hidden?'Ver todas as cidades atendidas <svg class="ico"><use href="#i-arrow"/></svg>':'Ocultar lista de cidades <svg class="ico"><use href="#i-chevron"/></svg>';});

  document.querySelectorAll('[data-compare]').forEach(card=>{
    const range=card.querySelector('input[type="range"]');const comp=card.querySelector('.compare-image');
    const update=()=>comp.style.setProperty('--position',`${range.value}%`);
    range.addEventListener('input',update);update();
  });
  const nav=$('#mainNav'),menu=$('#menuToggle');
  menu.addEventListener('click',()=>{const isOpen=nav.classList.toggle('nav-open');menu.setAttribute('aria-expanded',String(isOpen));menu.setAttribute('aria-label',isOpen?'Fechar menu':'Abrir menu');menu.innerHTML=isOpen?'<svg class="ico"><use href="#i-close"/></svg>':'<svg class="ico"><use href="#i-menu"/></svg>';});
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('nav-open');menu.setAttribute('aria-expanded','false');menu.innerHTML='<svg class="ico"><use href="#i-menu"/></svg>';nav.querySelectorAll('a').forEach(l=>l.classList.remove('is-active'));a.classList.add('is-active');}));
  const sections=[...document.querySelectorAll('main section[id],header[id]')];
  if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>{entries.filter(x=>x.isIntersecting).forEach(entry=>{const link=nav.querySelector(`a[href="#${entry.target.id}"]`);if(link){nav.querySelectorAll('a').forEach(l=>l.classList.remove('is-active'));link.classList.add('is-active');}});},{rootMargin:'-20% 0px -65% 0px'});sections.forEach(s=>observer.observe(s));}
  $('#year').textContent=String(new Date().getFullYear());
})();
