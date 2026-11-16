# Global Clean — prévia de site one-page

Site estático para demonstração e aprovação visual. Não é um site oficial publicado pela Global Clean. Projeto independente, com identidade baseada na arte enviada pelo solicitante.

## Como abrir

1. Extraia o `.zip` mantendo todas as pastas.
2. Abra `index.html` em um navegador. A busca de cidades funciona mesmo sem servidor local e sem bibliotecas externas.
3. Para publicar no GitHub Pages, envie todo o conteúdo da pasta para a raiz do repositório e ative **Settings > Pages**.

## Recursos implementados

- Site responsivo com navegação mobile, serviços, etapas do atendimento, sobre, FAQ funcional, comparadores antes/depois, rodapé e metadados básicos para SEO.
- Busca de cidades com sugestões, suporte a acentos e variações de caixa, navegação pelo teclado, exibição da unidade responsável e botão de WhatsApp da unidade.
- Diretório completo das 24 entradas regionais encontradas no site oficial em 16/11/2026, com associação individual a municípios.
- Sem encaminhamento por proximidade ou número genérico: localidades não cadastradas não são atribuídas a outra unidade.
- Quando o link oficial contém número possivelmente incompleto/inconsistente, o botão mostra apenas a fonte para conferência.

## Alterar unidades/WhatsApp

Edite `js/unidades.js`. Para cada região:
- `cidades`: nomes de municípios cobertos, sem misturar regiões diferentes;
- `numero`: somente dígitos, formato `55` + DDD + número (ex.: `5545984043993`);
- `status: 'direto'`: habilita abertura em `wa.me` com mensagem personalizada;
- `status: 'link'`: usa `link` de WhatsApp fornecido pela unidade (por exemplo `wa.me/message/...`);
- `status: 'conferir'`: não manda para WhatsApp; mostra a página de origem e informação de contato a confirmar;
- `pagina`: link da fonte oficial para auditoria.

Depois de alterar, recarregue a página. Não é necessário recompilar o projeto.

## Atenções antes de publicar para clientes

- **Verificar os contatos com as unidades.** Link do WhatsApp publicado no site não significa que a conta continua ativa. Brasília, Campo Grande, Cuiabá, Rio Verde e Uberlândia têm números possivelmente incompletos; o item Florianópolis/São José/Palhoça no site oficial aparentemente aponta a Toledo. Esses casos estão identificados para conferência.
- **Ajustar fotografias.** As fotos e comparativos desta prévia foram recortados dos layouts ilustrativos fornecidos pelo solicitante. Não são registros comprobatórios de serviços reais.
- **Aprovar identidade:** a marca GC foi extraída da imagem original enviada. Para publicação profissional, substitua pelo arquivo vetorial oficial sem modificações se disponível.
- **Substituir conteúdos genéricos** por textos aprovados pela empresa, depoimentos reais com consentimento, detalhes de políticas e informações de contato oficiais.
- **Política de privacidade/LGPD:** publicar a política verdadeira se coletar dados; esta prévia não coleta formulário nem dados pessoais no servidor. A abertura do WhatsApp ocorre diretamente entre cliente e WhatsApp.
- **SEO:** atualizar a URL canônica, Open Graph com endereço absoluto e sitemap quando houver domínio de produção definido.

## Fonte de informações

Diretório nacional e páginas de unidades: https://globalcleanbrasil.com/ — pesquisado em 16 de novembro de 2026. Horários, valores, cobertura e números podem ser alterados pelos responsáveis sem aviso.

## Estrutura

```
index.html
css/style.css
js/app.js
js/unidades.js
assets/*.webp / *.png
README.md
```

Sem framework, APIs, pacotes, rastreadores ou serviços de backend.


## Correções da revisão visual (16/11/2026)

- Logo no cabeçalho e no rodapé unificada como `assets/global-clean-horizontal.png`, preservando o emblema GC, sem esticar imagem ou tipografia.
- Botões do WhatsApp em todas as posições usam `assets/whatsapp.svg` (ícone vetorial com proporção fixa de 1:1). O rodapé usa `assets/whatsapp-teal.svg` para contraste.
- A imagem do WhatsApp no resultado de busca é atualizada em JavaScript sem regressão do ícone.
- Para substituir o emblema da logo pela versão vetorial oficial da empresa, mantenha as proporções em `global-clean-horizontal.png`.
- Em hospedagens com cache, recarregue com Ctrl+F5 após substituir os arquivos.
