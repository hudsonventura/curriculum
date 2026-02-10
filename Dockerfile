# Etapa 1: Construção
FROM node:18 AS build

# Define o diretório de trabalho no container
WORKDIR /app

# Copia o package.json e package-lock.json
COPY package*.json ./

# Instala as dependências (força reinstalação do esbuild para a plataforma correta)
RUN npm ci --force || npm install --force

# Copia os diretórios public e src
COPY public/ ./public
COPY src/ ./src

# Copia qualquer outro arquivo necessário (como .env, vite.config.js, etc.)
COPY . .

# Constrói a aplicação para produção
RUN npm run build

CMD ["npm", "run", "preview"]

