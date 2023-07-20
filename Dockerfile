FROM node:latest
ENV NODE_ENV=production
ENV NODE_OPTIONS=--openssl-legacy-provider
WORKDIR /app
RUN apt-get update 
COPY . /app
RUN apt-get install openssl
RUN npm install -g npm@latest
CMD ["npm", "start"]
