#!/bin/bash

# Copy node_modules to reuse the dev dependencies later 
cp -ar node_modules node_modules_dev 


# Install only production dependencies
npm install --production --install-links

# Copy things around
rm -rf lambda-layer/dependency-layer
mkdir -p lambda-layer/dependency-layer/nodejs 
mv node_modules lambda-layer/dependency-layer/nodejs/node_modules

mv node_modules_dev node_modules 