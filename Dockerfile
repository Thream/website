FROM node:14.16.1
RUN npm install --global npm@7

WORKDIR /website

COPY ./package*.json ./
RUN npm install
COPY ./ ./

CMD ["npm", "run", "dev", "--", "--port", "${PORT}"]
