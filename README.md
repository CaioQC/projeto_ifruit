# Integrantes
1. **Ana Júlia Borges Pereira , UC22201192**
2. **Caio Caetano Queiroz, UC23101272**
3. **Daniel Leal Pimenta, UC23100132**
4. **Dimitri Kael Pires Vieira, UC23100672**
5. **Erick Tavares Nunes, UC23101665**

### 🎥 Link do vídeo de apresentação: [www.youtube.com](https://youtu.be/uCd8xgZvHRA)
<br>

## ⚙️ Pré-requisitos

Antes de iniciar, você precisará ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

---
## 🖥️ Back-end

## 🛠️ Passo a Passo para rodar o BACK-END

1. **Clone o repositório:**

   ```bash
   git clone --branch front/back https://github.com/CaioQC/projeto_ifruit.git

2. **Confira se está na Branch correta:**

   ```bash
   Verifique se está na branch chamada front/back

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
<br><br>

## 🛠️ Como acessar os fluxos da aplicação:

- Na raíz do projeto, abra o arquivo "requisicoes.http".
<br><br><br>

## 🛠️ Como acessar a documentação da API no Swagger:
1. **Execute o projeto**

    ```bash
    npm run start:dev

2. **No navegador, acesse a URL:**

    ```bash
    http://localhost:3000/api#
<br><br>


## 🖥️ Front-end

### Observações para antes de rodar o FRONT-END: 
-  É necessário que o projeto do back-end e do front-end fiquem em pastas separadas dentro de um mesmo diretório.
- Lembre-se de subir o servidor do seu back-end quando for testar o do front.

## 🛠️ Passo-a-passo para rodar o FRONT-END:

1. **Acesse a pasta do projeto**

    ```bash
    cd front

2. **Instale todas as dependências necessárias**

    ```bash
    npm i


3. **Suba o servidor do front-end**

    ```bash
    npm run dev

4. **No navegador, acesse a URL:**

    ```bash
    http://localhost:5173
