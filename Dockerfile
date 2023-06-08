FROM node:alpine

# create destination directory
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

# copy the app, note .dockerignore
COPY . /usr/src/nuxt-app/
COPY .env.production /usr/src/nuxt-app/.env
RUN npm install

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

RUN npm run build
RUN npm run generate
CMD [ "npm", "run", "preview" ]