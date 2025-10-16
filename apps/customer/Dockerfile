# Multi-stage Dockerfile optimized for React Router 7 SSR with pnpm workspace
# Usage from monorepo root: 
# docker build -f apps/customer/Dockerfile --build-arg PACKAGE_DIR=apps/customer -t customer-app .

# ARG declarations at the top of the Dockerfile
ARG PACKAGE_DIR
ARG SENTRY_AUTH_TOKEN

# Base image with pnpm
FROM node:20-alpine AS base
WORKDIR /app

# Install PNPM globally
RUN npm install -g pnpm@8.10.0

# Copy entire workspace for proper dependency resolution
COPY . .

# Configure pnpm store and install dependencies
RUN pnpm config set store-dir /root/.local/share/pnpm/store/v3 && \
    rm -rf node_modules */node_modules && \
    pnpm install --frozen-lockfile && \
    pnpm add -D @rollup/rollup-linux-x64-musl @rollup/rollup-linux-arm64-musl --workspace-root

# Build stage
FROM base AS build

ARG PACKAGE_DIR
ENV PACKAGE_DIR=$PACKAGE_DIR

# Extract the package name, verify it, and build the project
RUN PACKAGE_NAME=$(echo $PACKAGE_DIR | cut -d'/' -f2) && \
    echo "Building package: $PACKAGE_NAME" && \
    pnpm --filter "$PACKAGE_NAME" run build

# Production dependencies stage
FROM build AS prod

ARG PACKAGE_DIR
ENV PACKAGE_DIR=$PACKAGE_DIR

# Extract the package name and deploy production dependencies
RUN PACKAGE_NAME=$(echo $PACKAGE_DIR | cut -d'/' -f2) && \
    echo "Deploying package: $PACKAGE_NAME" && \
    pnpm --filter "$PACKAGE_NAME" --prod deploy deployment

# Final runtime image
FROM node:20-alpine AS runtime

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S reactrouter -u 1001

WORKDIR /app

ARG PACKAGE_DIR
ENV PACKAGE_DIR=$PACKAGE_DIR

# Copy production dependencies and built files
COPY --from=prod --chown=reactrouter:nodejs /app/deployment/node_modules ./node_modules
COPY --from=build --chown=reactrouter:nodejs /app/$PACKAGE_DIR/build ./build

# Debug: List contents to verify build artifacts
RUN ls -la /app && ls -la /app/build/


# Switch to non-root user
USER reactrouter

# Set environment variables
ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000

# Start the React Router 7 SSR server using react-router-serve
CMD ["npx", "react-router-serve", "./build/server/index.js"]