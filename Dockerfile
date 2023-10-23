FROM node:20.9.0 AS builder-dependencies
WORKDIR /usr/src/application
COPY ./.npmrc ./
COPY ./package*.json ./
RUN npm clean-install

FROM node:20.9.0 AS builder
WORKDIR /usr/src/application
COPY --from=builder-dependencies /usr/src/application/node_modules ./node_modules
COPY ./ ./
RUN npm run build

FROM gcr.io/distroless/nodejs20-debian12:latest AS runner
WORKDIR /usr/src/application
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=builder /usr/src/application/.next/standalone ./
COPY --from=builder /usr/src/application/.next/static ./.next/static
COPY --from=builder /usr/src/application/public ./public
COPY --from=builder /usr/src/application/locales ./locales
COPY --from=builder /usr/src/application/next.config.js ./next.config.js
CMD ["./server.js"]
