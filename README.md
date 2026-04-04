Sistema web para análise automatizada de exames de eletrocardiograma (ECG) a partir de arquivos PDF escaneados, com objetivo de apoiar a triagem clínica.

Pre requisitos:
Ter o python instalado, rode no terminal:
python --version

Se nao estiver instalado, instale em:
https://www.python.org/downloads/

Ter o node instalado, rode no terminal:
node --version

Se nao estiver instalado, instale em:
https://nodejs.org/pt-br/download

Ter o npm instalado, rode no terminal:
npm --version

Se nao estiver instalado, instale em:
https://www.npmjs.com/get-started

Se não tiver algum dos itens acima, instale-os.

windows

apos clonar o repositorio
acesse a pasta eecg/backend
instale o ambiente virtual:
python -m venv .venv
ative a execucao de scripts na politica de execução:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
acesse o ambiente virtual:
.venv\Scripts\activate
instale as dependencias:
pip install -r requirements.txt
rode o backend:
python manage.py runserver

Abra um novo terminal sem fechar o anterior

acesse o frontend:
cd ../frontend
npm install
npm run dev