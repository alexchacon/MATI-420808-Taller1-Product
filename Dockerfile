FROM node:6.9.2
EXPOSE 3000
COPY package*.json ./
COPY . .
RUN npm install
CMD sequelize db:migrate
CMD npm run start:dev