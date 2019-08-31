FROM node:10.16.3-jessie

COPY ./zilla-frontend/frontend /frontend

WORKDIR /frontend

RUN npm i

ENV PATH "$PATH:/frontend/node_modules/.bin/"

RUN ng build --prod --extract-css=false

COPY ./zilla-frontend/docker/entrypoint.sh entrypoint.sh

RUN chmod +x entrypoint.sh

ENTRYPOINT [ "/frontend/entrypoint.sh" ]
