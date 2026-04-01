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
ENV NEXT_SHARP_PATH=/app/node_modules/sharp

# sharp needs vips libs on Alpine
RUN apk add --no-cache vips && \
    npm install --no-save --platform=linux --arch=x64 sharp@0.33.4

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3100
CMD ["node", "server.js"]
