# ---- build stage ----
FROM node:22--alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci 
COPY . . 
RUN npm run build 
RUN npm prune --omit=dev

# ---- runtime stage ----
FROM node:22-alpine 
WORKDIR /app 
ENV NODE_ENV=production
COPY --from=build /app/build ./build
COPY --from=build /app/node_modules ./node_modules
COPY package.json .
EXPOSE 3000 
USER node 
CMD [ "node", "build" ]