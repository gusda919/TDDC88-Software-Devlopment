#stage 1: build
FROM node:16-alpine3.11 as build-stage

WORKDIR /usr/src/app
COPY package*.json .
RUN npm install
COPY . .
ARG configuration=production
RUN npm run build -- --output-path=./dist/out --configuration $configuration

#stage 2: nginx
FROM nginx:alpine

COPY --from=build-stage /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /usr/src/app/dist/out /usr/share/nginx/html

EXPOSE 80