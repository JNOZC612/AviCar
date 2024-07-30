FROM node:20.15.0
WORKDIR /
COPY package*.json ./
RUN npm install
COPY . .
#RUN npm uninstall react-scripts
#RUN npm install react-scripts
RUN npm run build
EXPOSE 3000
CMD [ "npm", "start" ]