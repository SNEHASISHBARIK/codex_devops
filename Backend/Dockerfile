# Use Node 20 image
FROM node:20

# Set working directory inside container
WORKDIR /app

# Copy backend package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "run", "dev"]
