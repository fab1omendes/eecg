# E-ECG: Sistema de Análise de Eletrocardiogramas

Bem-vindo ao **E-ECG**, uma plataforma moderna para processamento e análise de exames de ECG em formato PDF. Este sistema oferece duas modalidades de análise, integrando tecnologias de processamento de sinal e inteligência artificial para auxiliar na triagem médica.

## 🚀 Funcionalidades

### 1. Análise Simples (Sample Analysis)
Análise básica do sinal de ECG, focada na extração de dados e visualização rápida do resultado.
- Processamento via backend local Django.
- Histórico dedicado em `/sample/history`.

### 2. Análise Avançada com CardioFlux_Mark1 (IA)
Integração com o modelo de IA **CardioFlux**, que fornece métricas detalhadas e diagnósticos sugeridos.
- **Integração Externa**: A aplicação se comunica com a API CardioFlux (rodando na porta 8001) para processar o exame.
- **Métricas Detalhadas**:
  - Avaliação do Segmento ST (Status e Elevação Média).
  - Análise de Variabilidade Cardíaca (Gráfico de Poincaré: SD1, SD2, Razão S1/S2).
  - Score de Irregularidade.
  - Classificação Automática e Diagnóstico Sugerido.
- Histórico dedicado em `/cardioflux/history`.

### 3. Gestão de Histórico e Impressão
- Todos os resultados são salvos de forma persistente no banco de dados local.
- Relatórios otimizados para impressão direto do navegador, ocultando elementos de interface desnecessários (Sidebar, Botões) para gerar um PDF limpo.

## 🛠️ Arquitetura Técnica

### Frontend (Next.js 14)
- **Framework**: Next.js com App Router.
- **UI Components**: Shadcn UI + Tailwind CSS.
- **Autenticação**: NextAuth.js (Google OAuth e Credentials).
- **Hooks Customizados**: `useCardioFlux` para orquestração da API externa.

### Backend (Django 5)
- **API Framework**: Django REST Framework.
- **Análise**: Serviços modulares para processamento de ECG.
- **Banco de Dados**: Armazenamento de usuários e histórico de exames.

### API Externa CardioFlux
O módulo **CardioFlux_Mark1** opera como um microserviço independente que:
1. Recebe o arquivo PDF do exame.
2. Digitaliza o sinal e aplica o modelo de IA.
3. Retorna um objeto JSON com as métricas de saúde cardiovascular.

## 📋 Como Usar

1. **Acessar a Aplicação**: Navegue para `http://localhost:3000`.
2. **Fazer Login**: Utilize sua conta Google ou credenciais de acesso.
3. **Escolher Modelo**: No menu lateral (Sidebar), escolha entre "Análise Simples" ou "CardioFlux_Mark1".
4. **Fazer Upload**: Insira o nome do paciente, data do exame e o arquivo PDF.
5. **Analisar**: Clique em "Iniciar Análise".
6. **Gerar Relatório**: No resultado, utilize o botão "Imprimir" para gerar um documento PDF do laudo.
7. **Consultar Histórico**: Acesse a aba de histórico do modelo escolhido para rever análises passadas.

---
> [!WARNING]
> **AVISO MÉDICO**: Esta é uma ferramenta experimental para fins de demonstração tecnológica. Os resultados gerados por algoritmos computacionais não substituem o diagnóstico médico profissional. Consulte sempre um cardiologista.
