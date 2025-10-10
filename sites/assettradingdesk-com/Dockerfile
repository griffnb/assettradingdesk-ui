# ARG declarations at the top of the Dockerfile
ARG PACKAGE_DIR

ARG SENTRY_AUTH_TOKEN

# Base image
FROM node:lts AS base
WORKDIR /app

# Install PNPM globally
RUN npm install -g pnpm

COPY . .
# Install dependencies

ARG PACKAGE_DIR
ENV PACKAGE_DIR=$PACKAGE_DIR
# Build the project
FROM base AS build


ARG PACKAGE_DIR
ENV PACKAGE_DIR=$PACKAGE_DIR

RUN pnpm install

# Extract the package name, verify it, and build the project
RUN PACKAGE_NAME=$(echo $PACKAGE_DIR | cut -d'/' -f2) && \
    echo "Building package: $PACKAGE_NAME" && \
    pnpm --filter "$PACKAGE_NAME" run build

# Prune down to production dependencies
FROM build AS prod

ARG PACKAGE_DIR
ENV PACKAGE_DIR=$PACKAGE_DIR

# Extract the package name, verify it, and build the project
RUN PACKAGE_NAME=$(echo $PACKAGE_DIR | cut -d'/' -f2) && \
    echo "Deploying package: $PACKAGE_NAME" && \
    pnpm --filter "$PACKAGE_NAME" --prod deploy deployment


# Create final runtime image
FROM node:lts AS runtime
WORKDIR /app

ARG PACKAGE_DIR
ENV PACKAGE_DIR=$PACKAGE_DIR

# Copy production dependencies and built files
COPY --from=prod /app/deployment/node_modules ./node_modules
COPY --from=build /app/$PACKAGE_DIR/dist ./dist


RUN ls -la /app

# Set environment variables
ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000

# Start the server
CMD ["node", "./dist/server/entry.mjs"]