# Horizonte Viagens | Experiências Premium

**Status do Projeto:** Concluído e Publicado via GitHub Pages

## Descrição do Site

O site "Horizonte Viagens" é uma landing page de demonstração desenvolvida para simular a vitrine de uma agência de viagens de luxo, utilizando recursos avançados de front-end.

### Funcionalidades Principais

* **Design Responsivo e Temas:** Totalmente adaptável a qualquer dispositivo, incluindo um seletor de Dark Mode/Light Mode.
* **Filtros Dinâmicos:** Permite a filtragem e busca de destinos por categoria (Praia, Cidade, Montanha, etc.) e por termo de pesquisa.
* **Sistema de Favoritos:** Utiliza o `localStorage` do navegador para salvar destinos favoritos.
* **Modal Interativo:** Exibe detalhes e previsão do tempo simulada para cada destino.
* **Navbar com Efeito Glassmorphism/Scroll:** O cabeçalho se adapta ao scroll para garantir legibilidade.
* **Chatbot (Simulado):** Widget de chat interativo simulando respostas rápidas para o usuário.

## Tecnologias Utilizadas

* **HTML5:** Estrutura semântica (com CSS e JS embutidos).
* **CSS3:** Estilização customizada e variáveis CSS para suporte a temas.
* **JavaScript (ES6+):** Lógica de filtros, Dark Mode e manipulação de DOM (`localStorage`).
* **Bootstrap 5.3:** Framework principal de layout e componentes (Navbar, Grid, Modal, Offcanvas).
* **Font Awesome e Animate.css:** Ícones e animações.

## Processo de Desenvolvimento

O projeto foi construído em etapas, focando na organização do código e na interatividade:

1.  **Estruturação:** Montagem inicial do layout e componentes com HTML/Bootstrap.
2.  **Estilização:** Criação das variáveis de cor e estilos.
3.  **Refatoração (Separação de Arquivos):** O código foi integralmente separado em três arquivos (`index.html`, `style.css`, `script.js`) para modularidade e organização.
4.  **Lógica Interativa:** Inclusão das funcionalidades interativas, como o sistema CRUD de Favoritos e a renderização dinâmica.

## Facilidades e Dificuldades

### Facilidades

* **Uso do Bootstrap 5:** Simplificou a criação da interface de usuário e garantiu a responsividade.
* **Organização do CSS com Variáveis:** Facilitou a implementação centralizada do Dark Mode.
* **Dados Centralizados em JS:** A organização dos destinos em um array de objetos JavaScript (`destinationsData`) permitiu uma renderização dinâmica e um gerenciamento centralizado dos dados.

### Dificuldades

* **Sincronização de Componentes:** Garantir que o contador de favoritos fosse atualizado em múltiplos pontos (Navbar e Offcanvas) e que a função `updateNavbar()` funcionasse corretamente no scroll e na mudança de tema.
* **Manipulação de DOM:** A renderização dinâmica dos cards (`renderDestinations`) e a atualização síncrona dos ícones de coração (favoritos) após as interações.
* **UX do Chatbot:** Ajustar o scroll automático das mensagens para melhorar a experiência do usuário.

## Links para Submissão

* **Repositório do Código:** `https://github.com/fernandofilh0/horizonte-viagens`
* **Página Online (GitHub Pages):** (https://fernandofilh0.github.io/horizonte-viagens/#)







