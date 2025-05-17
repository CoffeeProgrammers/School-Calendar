FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install patch-package postinstall-postinstall

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]