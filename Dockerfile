FROM node:20-alpine as development
RUN corepack enable
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN pnpm build

FROM node:20-alpine as production
RUN corepack enable
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV PORT=5000
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
RUN pnpm prune --prod
COPY --from=development /app/dist ./dist
CMD ["node", "dist/server.js"]