
<div align="center">

  <img width="700" height="600" alt="549714179-0f8d325f-6f43-41c6-a253-1b236fd7adf9" src="https://github.com/user-attachments/assets/86d7ade0-feff-44f7-9666-89a15674ee90" />
  <h1>Cidadão+</h1>
  <p>Seu aliado nas urgências</p>
</div>


> Aplicativo acessível para registro de ocorrências via internet, integrado ao COPOM, voltado a pessoas que não conseguem realizar ligações de voz, mas têm acesso à rede de dados.

---

## Visão geral

O **Cidadão+** é um protótipo de aplicativo voltado ao registro de ocorrências (e não urgências imediatas), permitindo que o usuário envie uma mensagem estruturada ao COPOM sem precisar realizar uma chamada telefônica.  
A solução busca apoiar principalmente pessoas que, em determinadas situações, não têm acesso à rede móvel tradicional (voz/SMS), mas conseguem se conectar à internet.

---

## Problema e motivação

- Muitos serviços de emergência ainda dependem de chamadas de voz, o que exclui pessoas com barreiras de fala ou audição e limita quem está sem sinal de telefonia.  
- Ao mesmo tempo, há cenários em que a conexão de dados (Wi‑Fi ou rede fixa) está disponível, mesmo sem cobertura de rede móvel.  
- Faltam canais digitais simples e acessíveis para enviar informações de ocorrência diretamente aos centros de operações de segurança pública.

---

## Objetivo do aplicativo

- Permitir que o usuário registrado envie um “ticket” de ocorrência para o COPOM, com dados como tipo de ocorrência, localização e descrição do fato.  
- Garantir uma interface acessível, com textos claros e fluxo guiado, voltada a pessoas com diferentes necessidades de comunicação.  
- Apoiar o trabalho do COPOM na triagem e administração de ocorrências, sem substituir canais já existentes para urgências de risco imediato à vida.

---

## Escopo do projeto (versão atual)

- Cadastro de usuário (dados pessoais básicos e contato).  
- Registro de ocorrência com formulário estruturado (tipo, local, descrição).  
- Envio das informações ao backend (simulação de envio ao COPOM por API, mensagem ou e‑mail institucional).  

> Observação: o projeto está em desenvolvimento, portanto telas, fluxos e regras de negócio ainda podem mudar ao longo das próximas sprints.

---

## Não é objetivo do sistema

- Atender urgências médicas ou situações de risco iminente de morte (não substitui SAMU, Corpo de Bombeiros, etc.).  
- Substituir completamente os canais oficiais de emergência existentes; ele atua como um canal complementar focado em acessibilidade.

---

## Público-alvo

- Pessoas que encontram barreiras na comunicação por telefone.  
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

<!--
> Ajuste esta lista de acordo com o stack real do projeto.

- Frontend: (ex.: React Native, Flutter, ou web responsivo).  
- Backend: (ex.: Node.js, Java Spring, etc.).  
- Banco de dados: (ex.: PostgreSQL, MySQL).  
- Metodologia: Scrum com apoio de Kanban para visualização do fluxo de trabalho.
-->

---

## Metodologia de desenvolvimento

- O projeto é desenvolvido utilizando princípios de Scrum, com papéis bem definidos (Product Owner, Scrum Master, Time de Desenvolvimento) e sprints curtas para entrega incremental.  
- O quadro Kanban é utilizado para visualizar tarefas nas etapas “A Fazer”, “Em Progresso” e “Concluído”, facilitando o acompanhamento pela equipe.  
- Quadro Jira: [https://cidadao-plus.atlassian.net/jira/software/projects/CID/summary](https://cidadao-plus.atlassian.net/jira/software/projects/CID/summary)

---

## Equipe

- **Rafael Dias** – P.O. (Product Owner).  
- **Kayky Pires** – S.M. (Scrum Master).  
- **Beatriz Cristina** – Dev (Desenvolvedora).  
- **Larissa Fiuza** – Dev (Desenvolvedora).  

---

## Status do projeto

~~- Projeto em andamento, com foco atual em:~~
  ~~- Refinar casos de uso e fluxos principais do usuário.~~  
  ~~- Prototipar telas com foco em acessibilidade.~~
  ~~- Implementar o fluxo mínimo de registro e envio de ocorrências.~~  
- Implementado:
  - Front-End e Back-End funcional.
  - Conexão com banco de dados.
  - Histórias de usuário testadas e confirmadas.
- Futuras implementações:
  - Envio de confirmação por email para o usuário.
  - Visualizações das ocorrências feitas pelo usuário(histórico).
  - Dashbord para funcionário COPOM.
    
---

## Próximos passos (Sprint 1)

-  ~~- Implementar a tela de **cadastro de cidadão** com validação de campos obrigatórios e mensagens de erro/sucesso.~~
-  ~~- Criar a **tabela de cidadãos** e regras de validação (CPF válido, unicidade, regras de senha) no backend.~~
-  ~~- Implementar a tela de **login do cidadão**, com mensagens de erro e redirecionamento para a área principal após -  autenticação.~~ 
-  ~~- Desenvolver a lógica de **autenticação** no backend (busca e validação de credenciais na tabela de cidadãos).~~
 -   ~~- Implementar a tela de **registro de ocorrência** (tipo, descrição, localização, validação de campos) e envio.~~  
-  ~~- Criar a **tabela de ocorrências** e métodos de validação, gravação e integração com a API do COPOM.~~ 

- Implementar conexão com email após cadastro
  <img width="1478" height="889" alt="image" src="https://github.com/user-attachments/assets/7794299a-1762-4474-84f7-2e960b4e27f4" />
  

  
## Próximos passos (Sprint 2)
- Implementar a funcionalidade de envio de confirmação por e-mail após o registro de ocorrência, incluindo template de mensagem e integração com serviço de e-mail.
-  Criar a tela de histórico de ocorrências para o cidadão, permitindo visualização detalhada (data, tipo, status) e filtros de busca.
-  Implementar o dashboard para funcionários do COPOM, com métricas principais (quantidade de ocorrências, status).
-  Integrar o dashboard de ocorrências, permitindo atualização em tempo real dos dados exibidos.

## Planning Poker(Sprint2)


- História de usuário
- Eu como cidadão cadastrado, quero receber a confirmação de envio de ocorrência para saber que a ocorrência foi registrada com sucesso.
  <img width="275" height="540" alt="image" src="https://github.com/user-attachments/assets/14631d73-bf04-4611-95e3-a41406d6bb43" />
  <img width="275" height="540" alt="image" src="https://github.com/user-attachments/assets/4a8d5dad-50ff-4f8b-8476-d4e2cac04bb2" />

- Eu como cidadão cadastrado, quero visualizar todas as ocorrências registradas para poder acompanha-lás.
  <img width="275" height="540" alt="image" src="https://github.com/user-attachments/assets/6c7d6633-3c27-4952-9891-4d0ad950574d" />
  <img width="275" height="540" alt="image" src="https://github.com/user-attachments/assets/1cb51e87-8147-445e-be2a-e5957a789fdb" />
  
- Eu como funcionário do COPOM, quero visualizar um dashboard das áreas de foco das ocorrências e filtrar tipos de ocorrência.  
  <img width="275" height="540" alt="image" src="https://github.com/user-attachments/assets/79d13d71-f549-48ed-9c5f-f6cb1cfac021" />    
  <img width="275" height="540" alt="image" src="https://github.com/user-attachments/assets/588623ce-3932-484f-9096-5c34cca975bb" />


## Riscos⚠️
# Quadro Kanban
<img width="657" height="917" alt="image" src="https://github.com/user-attachments/assets/47a485f0-5c8e-4061-8f1e-698bbc7d721f" />

<img width="642" height="893" alt="image" src="https://github.com/user-attachments/assets/218486b9-ba6e-4fea-9bd2-0f983b86e39d" />

<img width="430" height="938" alt="image" src="https://github.com/user-attachments/assets/0bba930b-db9f-479c-b703-ea207a22504c" />









## 📱 Demonstração

<div align="center">
  <img src="./PDFs/Demo.gif" width="300" alt="Demo do app Cidadão+"/>
</div>

