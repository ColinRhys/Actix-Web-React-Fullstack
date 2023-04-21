FROM node:16-slim
ENV NODE_ENV development
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package.json .
RUN yarn install
# Install bash
#RUN apk add --no-cache bash
# Copy app files
COPY . .
# Expose port
EXPOSE 3000 4040
# Start the app
CMD [ "yarn", "start" ]