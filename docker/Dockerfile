# pull official base image
FROM node:current-alpine

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

# add app
COPY . ./

RUN npm run build

# start app
CMD ["npm", "start"]
