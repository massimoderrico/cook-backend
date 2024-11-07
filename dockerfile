# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

# Install dependencies
RUN npm install

# Install Prisma globally and generate the client
RUN npm install -g prisma
RUN npx prisma generate

# Expose the port the app runs on
EXPOSE 4000

# Start the application
CMD [ "npm", "run", "start:dev" ]
