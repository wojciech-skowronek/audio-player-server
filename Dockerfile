FROM node:10.8.0-alpine

ENV APP_HOME /app
COPY . $APP_HOME
WORKDIR $APP_HOME

# Install requirements
RUN npm install

# Update path
ENV PATH "./node_modules:${PATH}"

# Download dumb-init script
RUN wget -O /usr/local/bin/dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.2.2/dumb-init_1.2.2_amd64 && chmod +x /usr/local/bin/dumb-init

# dumb-init as entrypoint
ENTRYPOINT ["/usr/local/bin/dumb-init"]

# Start client
CMD ["node", "node_modules/nodemon/bin/nodemon.js", "src/index.js"]
