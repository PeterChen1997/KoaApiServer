FROM node:carbon
# Create app directory
WORKDIR /usr/src/app
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# If you are building your code for production
RUN npm install --only=production --registry=https://registry.npm.taobao.org

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]

# # Install global pm2 
# RUN npm install pm2 -g --registry=https://registry.npm.taobao.org


# # Create app directory
# RUN mkdir -p /usr/src/app
# WORKDIR /usr/src/app

# # Install app dependencies
# COPY package.json /usr/src/app/
# RUN npm install --registry=https://registry.npm.taobao.org


# # Bundle app source
# COPY . /usr/src/app

# ENV NODE_ENV dev

# RUN ["chmod", "+x", "/usr/src/app/docker_start.sh"]
# CMD /bin/bash /usr/src/app/docker_start.sh $NODE_ENV



# # Build image
# # docker build -t pm2_test:v1 .

# # Run docker
# # docker run -e NODE_ENV=staging --name pm2_test -p 3500:3500  -d  pm2_test:v1