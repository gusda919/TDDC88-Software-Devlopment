FROM node:16-alpine3.11 as base
 
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
 
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
 
# Install any needed packages
RUN npm install
RUN npm install -g @angular/cli@latest
RUN npm i --save-dev @types/node
 
# Bundle app source
COPY . .

FROM base as production

ENV NODE_PATH=./build

RUN npm run build
 
EXPOSE 8080
 
CMD [ "npm", "start" ]
