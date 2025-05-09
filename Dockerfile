# Build stage
FROM node:16-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY --from=build /app/dist ./dist
COPY src/app.js ./src/

EXPOSE 5000

CMD ["node", "src/app.js"]