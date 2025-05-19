# Stage 1: Build
FROM node:18

WORKDIR /app
COPY . .
RUN npm install

# Відкриваємо порт для dev server
EXPOSE 3000

# Запускаємо React development server
CMD ["npm", "start"]
