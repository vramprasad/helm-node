FROM node:20.15.1
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 5001
CMD ["npm", "start"]

 