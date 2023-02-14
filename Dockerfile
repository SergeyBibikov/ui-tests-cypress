FROM cypress/browsers:latest

USER 1000

RUN mkdir /home/node/temp

WORKDIR /home/node/temp

COPY package.json cypress.config.ts /home/node/temp
COPY cypress /home/node/temp/cypress

USER 0

RUN chown -R 1000 /home/node/temp

USER 1000

RUN npm i

CMD ["npx", "cypress", "run"]