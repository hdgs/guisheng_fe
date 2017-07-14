FROM node:latest

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

# Build static file
RUN npm install --registry=https://registry.npm.taobao.org
RUN npm run build

WORKDIR /usr/src/app/server

#Build server file
RUN npm install --registry=https://registry.npm.taobao.org

# Bundle app source
EXPOSE 3000
CMD [ "npm", "start" ]