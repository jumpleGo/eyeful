# Используем официальный Node.js образ как базовый
FROM node:18-alpine

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json в рабочую директорию
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект в рабочую директорию
COPY . .

# Сборка проекта
RUN npm run build

# Указываем порт, который будет использовать контейнер
EXPOSE 3000

# Запускаем приложение
CMD ["npm", "start"]
