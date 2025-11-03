FROM node:20-alpine AS base

WORKDIR /app

# Install dependencies separate from source for better layer caching
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Copy source
COPY src ./src

# Expose port
EXPOSE 5000

ENV NODE_ENV=production

CMD ["node", "src/app.js"]


