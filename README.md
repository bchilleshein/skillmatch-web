# Recrutando Você

Plataforma interativa para análise de compatibilidade de competências entre candidatos e vagas de tecnologia, oferecendo recomendações de estudo personalizadas.

---

## O Projeto

O **Recrutando Você** é uma aplicação web voltada para o mercado de tecnologia. O sistema permite que profissionais insiram o seu perfil (nome, área, anos de experiência e competências técnicas) para verificar em tempo real o seu nível de compatibilidade com as vagas de tecnologia disponíveis. Além disso, a aplicação aponta quais competências estão faltando e sugere materiais de estudo direcionados.

---

### Regra de Compatibilidade
Para calcular o índice de compatibilidade de cada vaga, o sistema compara a quantidade de requisitos exigidos com as habilidades dominadas pelo candidato. O cálculo é realizado dividindo a quantidade de requisitos atendidos pelo total de requisitos da vaga e multiplicando o resultado por 100 para obter o percentual:

$$\text{Compatibilidade (\%)} = \left( \frac{\text{Requisitos Atendidos}}{\text{Total de Requisitos da Vaga}} \right) \times 100$$

A partir do percentual gerado, a vaga é classificada nas seguintes faixas:
* **Alta compatibilidade:** 80% a 100%
* **Média compatibilidade:** 50% a 79%
* **Baixa compatibilidade:** 0% a 49%

---

### Critério da Recomendação de Estudo
O critério adotado para sugerir treinamentos prioritários baseia-se na identificação de requisitos fundamentais para vagas de nível júnior que ainda não constam no perfil do candidato, fornecendo o link direto para sua capacitação. Para selecionar a habilidade, verifica-se quais requisitos faltantes são mais frequentes entre as vagas analisadas, assim, a habilidade com maior ocorrência torna-se o foco de estudo. Caso JavaScript ES6 esteja entre as mais frequentes, ela é priorizada automaticamente, visto que é o requisito base para a aplicação das demais tecnologias nas vagas.

---

## Problema que Resolve
Muitos profissionais de tecnologia encontram dificuldades para identificar quais requisitos específicos do mercado estão em falta nos seus currículos ao candidatarem-se a vagas de emprego. 

O **Recrutando Você** resolve este problema ao:
* Automatizar o cruzamento de competências do candidato com os requisitos de vagas de empresas de tecnologia.
* Classificar o nível de adequação (Alta, Média ou Baixa compatibilidade) de forma visual e intuitiva.
* Apontar com precisão as competências faltantes e recomendar links oficiais de estudo para preencher essas lacunas técnicas.
* Persistir os dados do perfil do utilizador utilizando o armazenamento local (`localStorage`), agilizando testes futuros sem perda de dados.

---

## Tecnologias e Técnicas Utilizadas

O projeto foi construído utilizando as seguintes tecnologias:

* **HTML**: Estrutura acessível com tags apropriadas e boas práticas de SEO/metadata.
* **CSS**: Estilização responsiva com Flexbox, variáveis de design e media queries para suporte a dispositivos móveis e desktops.
* **JavaScript**:
  * **Módulos ES6 (`import`/`export`)**: Organização modular do código.
  * **Programação Orientada a Objetos (POO)**: Utilização de classes (`Job`, `TechJob`, `Candidate`, `MatchAnalyzer`) e herança (`TechJob extends Job`).
  * **Fetch API**: Leitura assíncrona dos dados das vagas a partir de um arquivo JSON estático (`vagas.json`).
  * **Closures**: Implementação de contador de análises privadas (`createJobCounter`).
  * **Web Storage API (`localStorage`)**: Persistência do perfil do candidato entre sessões e recarregamentos da página.
* **JSON**: Base de dados estruturada para gerir as vagas de emprego.

---

## Arquitetura do Projeto

A organização dos diretórios e arquivos está disposta assim:

```text
skillmatch-web/
│
├── assets/
│   ├── data/
│   │   └── vagas.json          # Base de dados com as vagas disponíveis
│   ├── img/
│   │   └── logo.svg            # Logotipo corporativo da Recrutando Você
│   ├── scripts/
│   │   ├── dados.js            # Gestão de fetch assíncrono e localStorage
│   │   ├── main.js             # Controlador principal e eventos DOM
│   │   ├── motor.js            # Regras de negócio, classes e motor de match
│   │   └── ui.js               # Manipulação da interface e renderização de cards
│   └── styles/
│       └── index.style.css     # Estilos globais e responsivos da aplicação
│
├── index.html                  # Página principal
└── README.md                   # Documentação do projeto
```

---

## Como Executar o Projeto

### Pré-requisitos
* **Git** instalado na sua máquina.
* **VS Code** com a extensão **Live Server**.

### Passo a Passo

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/bchilleshein/skillmatch-web.git
   ```

2. **Acessar a pasta do projeto:**
   ```bash
   cd skillmatch-web
   ```

3. **Executar a aplicação:**
**Via Server:** Clique com o botão direito do mouse no arquivo index.html e clique em **Open with Live Server**.

4. **Como executar a aplicação**: Com a aplicação aberta, preencha os campos solicitados e clique em **Analisar Vagas**. Após a análise estar concluída, você obterá uma recomendação de estudos conforme critério supracitado, conseguirá ver quais os percentuais de compatibilidade com cada uma das vagas, quais habilidades você já possui e quais ainda precisa desenvolver.

---
## Pontos de Melhoria
* Adição de filtros avançados por faixa salarial, modalidade e localização geográfica;
* Indicação de forma mais explícita de qual vaga se adequa mais ao perfil do candidato;
* Limitação dos preenchimentos em cada campo. Por exemplo na da área de interesse, restringir para que o candidato digite apenas áreas reais e não qualquer palavra, bem como no campo de nome;
* Incrementar a parte visual para que seja um pouco mais robusta;
* Utilizar os anos de experiência e a localização para fazer o cruzamento das vagas e o perfil do candidato.

## Links

* **Vídeo de Apresentação:** 

* **Quadro Kanban de Tarefas:** https://trello.com/invite/b/6ac2971f33d41d57698052f5/ATTI1783ee0993cecdb87f7f63e18191cf07A790FDCD/skillmatch-web-p2