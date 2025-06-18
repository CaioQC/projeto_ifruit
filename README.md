# Integrantes
1. **Ana Júlia Borges Pereira , UC22201192**
2. **Caio Caetano Queiroz, UC23101272**
3. **Daniel Leal Pimenta, UC23100132**
4. **Dimitri Kael Pires Vieira, UC23100672**
5. **Erick Tavares Nunes, UC23101665**

## ⚙️ Pré-requisitos

Antes de iniciar, você precisará ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

---

## 🛠️ Passo a Passo para Rodar o Projeto

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/CaioQC/projeto_ifruit.git

2. **Confira se está na Branch correta:**

   ```bash
   git checkout

   Caso não esteja na branch auth

   git checkout auth

3. **Instale as dependências:**

   ```bash
   npm i

4. **Crie o .env na raiz do projeto**

   Crie um arquivo ".env" na raiz do projeto e coloque essas informações:
   ```bash
    JWT_SECRET=<SuaSenha>
    PORT=<SuaPorta> (O padrão é 3000)

5. **Execute o projeto**

    ```bash
    npm run start:dev

6. **Acesse o fluxo do sistema**

    ```bash
    Navegue até a pasta requests e acesse o arquivo Fluxos, que contém todo o fluxo do sistema.


## 🖥️ Front-end

1. **Crie um novo projeto React**

   Crie um projeto React na pasta do projeto
    ```bash
    npm create vite@latest nomeDoSeuApp --template react-ts

2. **Acesse a pasta do projeto**

    ```bash
    cd lojinha

3. **Instale todas as dependências necessárias**

    ```bash
    npm i

4. **Instale o axios**

    ```bash
    npm install axios
