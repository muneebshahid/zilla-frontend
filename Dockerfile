FROM node:10.16.3-jessie

COPY ./zilla-frontend/frontend /frontend

WORKDIR /frontend

RUN npm i

ENV PATH "$PATH:/frontend/node_modules/.bin/"

COPY ./scripts/docker/entrypoint_f.sh entrypoint.sh

RUN chmod +x entrypoint.sh

ENTRYPOINT [ "/frontend/entrypoint.sh" ]
