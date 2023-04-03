# Dockerfile

# Use node alpine as it's a small node image
FROM node:16.13.0-alpine3.12

# Create the directory on the node image 
# where our Next.js app will live
RUN mkdir -p /app

# Set /app as the working directory
WORKDIR /app

# Install the Prisma CLI and Migrate
RUN yarn global add prisma@3.5.0 @prisma/migrate

# Copy package.json and package-lock.json
# to the /app working directory
COPY package*.json /app

# Install dependencies in /app
RUN yarn install

# Copy the rest of our Next.js folder into /app
COPY . /app

# Copy our bash script into /app
COPY run.sh /app/

# Allow our bash script to be executable
RUN chmod +x /app/run.sh

# Execute our bash script after the web and mongo containers are up
# This will run the prisma migrate dev command
CMD ["sh", "/app/run.sh"]

# Ensure port 3000 is accessible to our system
EXPOSE 3000
