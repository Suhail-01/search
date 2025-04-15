#!/bin/bash

# Create a build directory if it doesn't exist
mkdir -p build

# Copy the root index.html to the build directory
cp index.html build/

# Create client directory in build
mkdir -p build/client

# Build the client application
cd client
npm run build
cd ..

# Copy the built client files to the build/client directory
cp -r client/dist/* build/client/

echo "Build completed! Files are ready in the 'build' directory."
echo "To deploy to GitHub Pages, copy all contents of the 'build' directory to your repository root."