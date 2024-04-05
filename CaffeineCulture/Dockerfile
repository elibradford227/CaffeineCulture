FROM node:alpine

RUN mkdir -p /app

WORKDIR /app

COPY package.json .

COPY . /app

RUN npm install

RUN npx next build

EXPOSE 3000

EXPOSE 80

CMD ["npm", "start"]
