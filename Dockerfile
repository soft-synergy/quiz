FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3100

COPY --from=builder /app/public ./public
COPY --from=builder /app/lib ./lib
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Create translations-data directory — mount a volume here on the host to persist admin edits across deploys
RUN mkdir -p translations-data/current translations-data/history

# Install sharp for Next.js image optimization (after standalone copy so it lands in the right node_modules)
RUN npm install --no-save sharp

EXPOSE 3100
CMD ["node", "server.js"]
