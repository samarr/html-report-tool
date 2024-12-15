# Use the official Node.js image from the Docker Hub
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that the app will run on
EXPOSE 3000

# Command to run your app
CMD ["node", "server.js"]
