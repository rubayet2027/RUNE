# RUNE Production Multi-Stage Dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package manifests & install dependencies
COPY package*.json ./
COPY server/package*.json ./server/
COPY client/package*.json ./client/

RUN npm install --prefix server
RUN npm install --prefix client

# Copy source files
COPY . .

# Generate Prisma Client & Build Frontend static dist
RUN npm --prefix server run prisma:generate
RUN npm --prefix client run build

# Production Runner Stage
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=5000

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/server ./server
COPY --from=builder /app/client/dist ./client/dist

EXPOSE 5000

CMD ["node", "server/src/index.js"]
