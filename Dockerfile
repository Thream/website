FROM node:18.12.1 AS dependencies
WORKDIR /usr/src/app
COPY ./package*.json ./
RUN npm install

FROM node:18.12.1 AS builder
WORKDIR /usr/src/app
COPY ./ ./
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
RUN npm run build

FROM node:18.12.1 AS runner
WORKDIR /usr/src/app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=builder /usr/src/app/.next/standalone ./
COPY --from=builder /usr/src/app/.next/static ./.next/static
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/locales ./locales
COPY --from=builder /usr/src/app/next.config.js ./next.config.js
CMD ["node", "server.js"]
