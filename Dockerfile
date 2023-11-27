# Use the official Nginx Alpine image as the base image
FROM nginx:alpine

ARG FRONTEND_VERSION
ENV FRONTEND_VERSION = ${FRONTEND_VERSION}

# Set the working directory inside the container to /app
WORKDIR /app

# Copy the entire content of the current directory into the container at /app
COPY . .

# EXPOSE 000
EXPOSE 8080

# Copy the custom Nginx configuration file to the specified location
COPY ./nginx.conf /etc/nginx/nginx.conf

# Labels providing metadata for the image
LABEL maintainer="Jae <jae@example.com>, Jato <jato@example.com>, Kyle <kyle@example.com>"
LABEL version="1.0"
LABEL description="Docker image for the Cert Tracker Nginx server"
