

import "reflect-metadata";
import { Connection, createConnection } from "typeorm";
import express, { Express } from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { FlashCards } from "./entinties/card";
import { cardResolver } from "./resolvers/card";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import 'dotenv/config'

const main = async () => {
  const conn: Connection = await createConnection({
    type: "postgres", // replace with the DB of your choice
    url:process.env.DbUrl,
    logging: true, // this shows the SQL that's being run
    synchronize: true, // this automatically runs all the database migrations, so you don't have to :)
    entities: [FlashCards], // we'll add our database entities here later.
    port: 5432,
    extra: {
      ssl:  {
        require: true,
        rejectUnauthorized: false
    },
    },
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [cardResolver],
      validate: false,
      
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });


  await apolloServer.start();
  const app: Express = express();

  apolloServer.applyMiddleware({ app });

  app.get("/", (_req, res) => res.send("hello world!"));

  const PORT = process.env.PORT || 8001;
  app.listen(PORT, () => console.log(`server started on port ${PORT}`));
};

main().catch((err) => console.error(err));
  