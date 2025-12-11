# Use official Bun image
FROM oven/bun:1.1.13

WORKDIR /app

# Copy dependencies manifests
COPY bun.lock package.json tsconfig.json ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source files
COPY . .

EXPOSE 3000

# Run the NestJS app directly with Bun
CMD ["bun", "src/main.ts"]
