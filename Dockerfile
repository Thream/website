FROM node:14.15.5-alpine3.12

WORKDIR /app

COPY ./package*.json ./
RUN npm install
COPY ./ ./

CMD ["npm", "run", "dev"]
