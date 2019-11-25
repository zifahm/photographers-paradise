import { ApolloServer } from "apollo-server-express";
import * as express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";

(async () => {
  const app = express();

  await createConnection();

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [__dirname + "/./modules/**/*.resolver.ts"],
      emitSchemaFile: true
    })
  });

  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
})();
