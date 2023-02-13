FROM cypress/browsers:latest

USER 1000

RUN mkdir /home/node/temp

WORKDIR /home/node/temp

COPY package.json /home/node/temp

RUN npm i

CMD ["npx", "cypress", "run"]