#!/bin/bash

# Create project directory
mkdir -p ~/ip-tracker-app
cd ~/ip-tracker-app || exit

# Initialize a new Next.js app (if not already initialized)
if [ ! -f package.json ]; then
  npx create-next-app@latest . --typescript --eslint --tailwind --src-dir --app
fi

# Install dependencies
npm install react react-dom next
npm install leaflet react-leaflet @types/leaflet --legacy-peer-deps

# Copy existing source files (assuming you will copy the files manually or via git)

echo "Setup complete. To run the app:"
echo "1. cd ~/ip-tracker-app"
echo "2. PORT=8000 npm run dev"
echo "3. Open http://localhost:8000 in your browser"
