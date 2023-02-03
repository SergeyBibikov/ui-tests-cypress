FROM cypress/browsers:latest

USER 1000

WORKDIR /home/node

RUN mkdir temp && cd temp && npm init -y && npm i -D cypress typescript

CMD ["npx", "cypress", "run"]