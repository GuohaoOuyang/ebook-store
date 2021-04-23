#!/bin/bash
# Base Image
FROM node

# Copy Workdir contents
WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run client-install

EXPOSE 3001

# Runtime App
CMD npm run dev
