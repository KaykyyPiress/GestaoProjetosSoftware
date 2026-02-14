
<div align="center">

  <img width="700" height="600" alt="a9652bcd-b406-49f3-8b95-d833f0a63a37" src="https://github.com/user-attachments/assets/0f8d325f-6f43-41c6-a253-1b236fd7adf9" />
  <h1>Cidadão+</h1>
  <p>Seu aliado nas urgências</p>
</div>

# Cidadão+

> Aplicativo acessível para registro de ocorrências via internet, integrado ao COPOM, voltado a pessoas que não conseguem realizar ligações de voz, mas têm acesso à rede de dados.

---

## Visão geral

O **Cidadão+** é um protótipo de aplicativo voltado ao registro de ocorrências (e não urgências médicas imediatas), permitindo que o usuário envie uma mensagem estruturada ao COPOM sem precisar realizar uma chamada telefônica.
A solução busca apoiar principalmente pessoas que, em determinadas situações, não têm acesso à rede móvel tradicional (voz/SMS), mas conseguem se conectar à internet.

---

## Problema e motivação

- Muitos serviços de emergência ainda dependem de chamadas de voz, o que exclui pessoas com deficiência auditiva, limita quem está sem sinal de telefonia ou se encontra em situação em que falar é arriscado. 
- Ao mesmo tempo, há cenários em que a conexão de dados (Wi‑Fi ou rede fixa) está disponível, mesmo sem cobertura de rede móvel.
- Faltam canais digitais simples, acessíveis e padronizados para enviar informações de ocorrência diretamente aos centros de operações de segurança pública.

---

## Objetivo do aplicativo

- Permitir que o usuário registrado envie um “ticket” de ocorrência para o COPOM, com dados como tipo de ocorrência, localização e descrição do fato. 
- Garantir uma interface mais acessível, com textos claros e fluxo guiado, voltada a pessoas com diferentes necessidades de comunicação.  
- Apoiar o trabalho do COPOM na triagem e administração de ocorrências, sem substituir canais já existentes para urgências de risco imediato à vida.
---

## Escopo do projeto (versão atual)

- Cadastro de usuário (dados pessoais básicos e contato).  
- Registro de ocorrência com formulário estruturado (tipo, local, descrição).  
- Envio das informações ao backend (simulação de envio ao COPOM por API, mensagem ou e‑mail institucional).  
- Tela de acompanhamento simples do status da ocorrência (ex.: recebida, em análise, encaminhada).  

> Observação: o projeto está em desenvolvimento, portanto telas, fluxos e regras de negócio ainda podem mudar ao longo das próximas sprints.

---

## Não é objetivo do sistema

- Atender urgências médicas ou situações de risco iminente de morte (não substitui SAMU, Corpo de Bombeiros, etc.).
- Substituir completamente os canais oficiais de emergência existentes; ele atua como um canal complementar focado em acessibilidade.
---

## Público-alvo

- Pessoas com deficiência auditiva ou com limitações de fala, que encontram barreiras na comunicação por telefone.
- Usuários temporariamente sem sinal de rede móvel, mas com acesso à internet via Wi‑Fi ou rede cabeada.
- Cidadãos que preferem registrar ocorrências por texto, com mais detalhes e calma, quando não se trata de urgência imediata.

---

## Principais funcionalidades previstas

- Autenticação e cadastro de usuários.  
- Formulário guiado para relato de ocorrência, com categorias pré‑definidas.  
- Anexos opcionais (fotos, por exemplo) para apoiar a análise da ocorrência.  
- Envio dos dados para um painel/sistema administrativo do COPOM (prototipado).  
- Indicadores básicos de status da ocorrência para o cidadão.  

---

## Tecnologias

> Ajuste esta lista de acordo com o stack real do projeto.

- Frontend: (ex.: React Native, Flutter, ou web responsivo).  
- Backend: (ex.: Node.js, Java Spring, etc.).  
- Banco de dados: (ex.: PostgreSQL, MySQL).  
- Metodologia: Scrum com apoio de Kanban para visualização do fluxo de trabalho.

---

## Metodologia de desenvolvimento

- O projeto é desenvolvido utilizando princípios de Scrum, com papéis bem definidos (Product Owner, Scrum Master, Time de Desenvolvimento) e sprints curtas para entrega incremental. 
- O quadro Kanban é utilizado para visualizar tarefas nas etapas “A Fazer”, “Em Progresso” e “Concluído”, facilitando o acompanhamento pela equipe.

---

## Equipe

- **Beatriz Cristina** – Dev (Desenvolvedora).  
- **Kayky Pires** – Scrum Master.  
- **Larissa Fiuza** – Dev (Desenvolvedora).  
- **Rafael Dias** – P.O. (Product Owner).  

---

## Status do projeto

- Projeto em andamento, com foco atual em:  
  - Refinar casos de uso e fluxos principais do usuário.  
  - Prototipar telas com foco em acessibilidade.  
  - Implementar o fluxo mínimo de registro e envio de ocorrências.  

---

## Próximos passos

- Implementar melhorias de acessibilidade na interface (contraste, texto alternativo, fluxos simplificados).
- Integrar de forma mais realista com um backend que simule o COPOM (fila de atendimento, triagem e histórico de ocorrências).  
- Elaborar documentação complementar: diagrama de casos de uso, diagrama de classes e descrição dos requisitos funcionais e não funcionais.
