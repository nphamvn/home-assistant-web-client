# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:latest as build
# Set the working directory
WORKDIR /app
# Copy source code
COPY package.json package-lock.json ./
# Install dependencies
RUN npm install
# Copy source code
COPY . .
# Build 
RUN npm run build


# Stage 2: Serve app with Nginx
FROM nginx:latest
COPY default.conf /etc/nginx/conf.d/default.conf
# Copy the build output to replace the default nginx contents.
COPY --from=build /app/dist/home-assistant/ /usr/share/nginx/html

# Expose port 80
EXPOSE 80
