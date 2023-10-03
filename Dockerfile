FROM node:alpine AS builder

WORKDIR /app

COPY package-lock.json package.json ./
RUN npm i
COPY public .eslintrc.cjs index.html vite.config.js ./
COPY src src
RUN npm run build

FROM nginx AS deploy

COPY --from=builder app/dist/ /usr/share/nginx/html
