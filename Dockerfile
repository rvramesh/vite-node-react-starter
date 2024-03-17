# Build stage
FROM node:alpine as builder
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first
COPY package*.json ./
COPY src/client/package*.json ./src/client/
COPY src/server/package*.json ./src/server/
COPY src/shared/package*.json ./src/shared/

# Install dependencies
RUN npm ci

# Copy the rest of the files
COPY . .

# Build the application
RUN npm run build

RUN npm ci --prefix dist/server

# Final image
FROM node:alpine

# Create a non-root user and group to run node with
RUN addgroup -S nodegroup && adduser -S nodeuser -G nodegroup -D

COPY --from=builder /usr/src/app/dist /usr/src/app/dist

WORKDIR /usr/src/app/dist/server
USER nodeuser
CMD ["npm", "start" ]

