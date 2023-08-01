FROM node:latest
ENV NODE_ENV=production
ENV NODE_OPTIONS=--openssl-legacy-provider
WORKDIR /app
COPY ./package.json /app/package.json
RUN apt-get update 
RUN apt-get install openssl
RUN npm install -g npm@latest
RUN npm install
COPY . /app
CMD ["npm", "start"]
