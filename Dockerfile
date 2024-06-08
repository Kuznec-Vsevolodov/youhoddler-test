# Use the official Node.js 16 image as a base image
FROM node:latest

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code to the container image
COPY . .

# Build the application
RUN npm run build

# Set environment variables
ENV PORT=${PORT}

# Expose the port the app runs on
EXPOSE ${PORT}

# Run the web service on container startup
CMD ["node", "dist/main"]