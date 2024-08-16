# Stage 1: Build the Angular application
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular application
RUN npm run build -- --output-path=dist

# Stage 2: Serve the Angular application with http-server
FROM node:18-alpine

# Install http-server globally
RUN npm install -g http-server

# Copy the built Angular application from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Set the working directory
WORKDIR /usr/share/nginx/html

# Expose port 8080
EXPOSE 8080

# Start http-server
CMD ["http-server", "-p", "8080"]