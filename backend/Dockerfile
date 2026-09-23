FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY . .

EXPOSE 3001

ENV PORT=3001
ENV HOST=0.0.0.0

CMD ["npm", "run", "dev"]
