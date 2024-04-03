# Estágio 1: Construir a aplicação
FROM node:20.11-alpine as builder

# Definir o diretório de trabalho no container
WORKDIR /usr/src/app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar as dependências
RUN npm install --only=production

# Copiar todos os arquivos de código fonte para o container
COPY . .

# Compilar a aplicação TypeScript para JavaScript
RUN npm run build

# Estágio 2: Executar a aplicação
FROM node:20.11-alpine

WORKDIR /usr/src/app

# Copiar arquivos de dependências
COPY --from=builder /usr/src/app/package*.json ./

# Instalar apenas as dependências de produção
RUN npm install --only=production

# Copiar arquivos de build construídos
COPY --from=builder /usr/src/app/dist ./dist

# Expõe a porta que o NestJS irá rodar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["node", "dist/main"]
