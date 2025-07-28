#use official node image

FROM node:18
# set working directory
WORKDIR /app

# copy package.json and package-lock.json
COPY package*.json ./
# install dependencies
RUN npm install

# copy the rest of the application code
COPY . .

# expose the port the app runs on
EXPOSE 5000

# start the application
CMD ["node", "index.js"]