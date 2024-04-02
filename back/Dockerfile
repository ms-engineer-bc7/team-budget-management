FROM node:lts

WORKDIR /usr/src/app

# package.json と package-lock.json をコピー
COPY ./package*.json ./

RUN npm install

# アプリケーションのソースをコピー
COPY . .

# Prisma スキーマの変更を適用
# RUN npx prisma migrate deploy

EXPOSE 3002

CMD "npm" "run" "start"