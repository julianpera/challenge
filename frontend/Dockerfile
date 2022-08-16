FROM node:18-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install 
RUN npm run build

FROM nginx:1.23.1-alpine

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/dist .