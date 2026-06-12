FROM node:20-alpine
RUN npm install -g pnpm@10
WORKDIR /app
EXPOSE 5173
CMD ["pnpm", "run", "dev"]
