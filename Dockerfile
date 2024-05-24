
FROM node:18-alpine As development

# Create app directory
WORKDIR /app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY --chown=node:node package*.json yarn.lock ./

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN yarn

# Bundle app source
COPY --chown=node:node . .

# Use the node user from the image (instead of the root user)
USER node
