FROM node:22-alpine

WORKDIR /app

# Install dependencies including WASM support
RUN apk add --no-cache libc6-compat 

# Copy package files
COPY package*.json ./

# Install dependencies
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# Copy Prisma schema before generating
COPY prisma ./prisma

# Copy the rest (will be overridden by volume mount in docker-compose for dev)
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

EXPOSE 3000

CMD ["npm", "run", "dev"]