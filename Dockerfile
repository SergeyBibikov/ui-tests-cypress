FROM cypress/browsers:latest

USER 1000

WORKDIR /home/node

RUN mkdir temp && cd temp && npm init -y && npm i cypress --save-dev

CMD ["npx", "cypress", "run"]