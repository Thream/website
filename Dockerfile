FROM node:14.15.1-alpine3.12

WORKDIR /app
ENV HUSKY_SKIP_INSTALL=1

COPY ./package*.json ./
RUN npm install
COPY ./ ./

CMD ["npm", "run", "dev"]
