# ==== CONFIGURE =====
# Use a Node 18 base image
FROM node:18-alpine 
# Create the app directory
#RUN mkdir -p /usr/src/app
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY . .
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm i 
RUN npm ci
RUN npm run populate
# Expose the port on which the server will be running
EXPOSE 3001
# Start the app
CMD [ "npm", "start", "index.js"]