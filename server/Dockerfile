FROM node:16-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY ./ ./
RUN npm run build

FROM node:16-alpine as production-stage
WORKDIR /app
COPY --from=build-stage /app/ ./
COPY --from=build-stage /app/.env.example ./.env
EXPOSE 3000
CMD [ "node", "dist/main" ]
