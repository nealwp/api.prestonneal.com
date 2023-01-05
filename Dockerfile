FROM node:19 as build

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm ci
COPY . .
RUN npm run build

FROM node:alpine as run
COPY --from=build /app/dist .
EXPOSE 8081
CMD ["node", "server.js"]