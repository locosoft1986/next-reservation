This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Mongo DB setup
According to the document of mongo db connection module of Prisma, the mongo db should be in a replica set.

Suppose your local db file is stored in ~/projects/db/mongodb

By using docker as a faster database setup, run the following command:

```bash
docker run --rm -d -p 27017:27017 -h $(hostname) --name mongo -v ~/projects/db/mongodb:/data/db mongo:latest --replSet=dbrs && sleep 5 && docker exec mongo mongosh --quiet --eval "rs.initiate();"
```

Remember to replace the host directory for the "~/projects/db/mongodb" for your own settings.

Reference article for the single replica mongoDB local development environment.

https://nmihaylov.medium.com/setting-up-a-local-mongodb-replica-set-with-a-single-node-e04fb3213123


## Getting Started
1. First, copy the local env-example file in the project root and rename it to ".env".

```
DATABASE_URL=mongodb://127.0.0.1:27017/restaurant?replicaSet=dbrs
NEXTAUTH_SECRET=

GITHUB_ID=
GITHUB_SECRET=
LOG_FILE=app.log
```

If you are in local development environment, the DATABASE_URL should be unchanged.

Fill in the NEXTAUTH_SECRET as randomly as you want.

2. run the following commands to initialize and push the Prisma schema into mongodb

```bash
yarn

npx prisma db push 

npx prisma generate 
```

3. run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

4. You should register your first account. For the demo purpose, the first account that is registered will automatically be an admin account.
5. Admin can create tables first, then users can create reservations based on the date selection on the top.


