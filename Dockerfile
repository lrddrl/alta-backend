# Use the official Node.js image as the base image
FROM node:16

# Create and set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the application code to the working directory
COPY . .

# Expose the port the application will run on
EXPOSE 4000

# Define the command to run the application
CMD ["npm", "start"]
