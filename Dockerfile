# Use the latest LTS version of Node.js with the Alpine-based image as the base for the container
FROM node:lts-alpine

# create destination directory
RUN mkdir -p /usr/src/nuxt-app

# Set /usr/src/nuxt-app as the working directory inside the container
WORKDIR /usr/src/nuxt-app

# Copy the contents of the current directory to /usr/src/nuxt-app/ inside the container
COPY . /usr/src/nuxt-app/

# Copy the .env.production file to /usr/src/nuxt-app/.env inside the container
# This file is used for environment-specific configuration
COPY .env.production /usr/src/nuxt-app/.env

# Run npm install inside the container to install the project dependencies
RUN npm install

# Expose port 3000 on the container
# This line doesn't actually publish the port, it just documents the intended port usage
EXPOSE 3000

# Set the environment variable NUXT_HOST to 0.0.0.0
# This configures the Nuxt.js application to listen on all network interfaces
ENV NUXT_HOST=0.0.0.0

# Set the environment variable NUXT_PORT to 3000
# This configures the Nuxt.js application to use port 3000
ENV NUXT_PORT=3000

# Run the npm run build command inside the container
# This typically triggers the build process for a Nuxt.js application, generating optimized production-ready files
RUN npm run build

# Run the npm run generate command inside the container
# This command is typically used in Nuxt.js to generate a static website from the application
# It may be optional depending on your specific use case
RUN npm run generate

# Set the default command to run when the container starts
# In this case, it executes the npm run preview command inside the container
# This command typically starts the Nuxt.js development server for previewing the application
CMD [ "npm", "run", "preview" ]
