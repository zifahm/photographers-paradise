import { ApolloError, ApolloServer } from "apollo-server-express";
import * as Store from "connect-redis";
import * as cors from "cors";
import * as dotenv from "dotenv";
import * as express from "express";
import * as session from "express-session";
import { GraphQLError } from "graphql";
import "reflect-metadata";
import { getConnection } from "typeorm";
import { v4 } from "uuid";
import { SESSION_SECRET } from "./constants";
import { DisplayError } from "./errors/DisplayErrors";
import { userLoader } from "./loaders/userLoader";
import { redis } from "./redis";
import { createSchema } from "./utils/createSchema";
import { createTypeormConn } from "./utils/createTypeormConn";
import { logManager } from "./utils/logManager";
import { setupErrorHandling } from "./utils/shutdown";
dotenv.config();

const logger = logManager();
logger.info("Loading environment...");

logger.info("Connecting Store");
const RedisStore = Store(session);

(async () => {
  logger.info("Connecting database...");

  const conn = await createTypeormConn();
  if (conn) {
    logger.info("database connected ");
    // await conn.runMigrations();
  }

  logger.info("Creating express server...");
  const app = express();

  logger.info("Creating GQL server...");
  const server = new ApolloServer({
    schema: await createSchema(),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
      userLoader: userLoader()
      // url: req.protocol + "://" + req.get("host") // to get the host url eg: localhost:4000
    }),
    formatError: (error: GraphQLError) => {
      if (
        error.originalError instanceof ApolloError ||
        error.originalError instanceof DisplayError
      ) {
        return error;
      }

      const errId = v4();
      console.log("errId: ", errId);
      console.log(error);
      console.log(JSON.stringify(error));

      return new GraphQLError(`Internal Error: ${errId}`);
    }
  });

  app.use(
    session({
      store: new RedisStore({
        client: redis
      }),
      name: "qid",
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
      }
    })
  );

  const appCors: cors.CorsOptions = {
    credentials: true,
    origin: process.env.FRONTEND_HOST
  };

  server.applyMiddleware({ app, cors: appCors }); // app is from an existing express app

  let nodeServer;

  if (process.env.NODE_ENV !== "test") {
    nodeServer = app.listen({ port: 4000 }, () =>
      console.log(
        `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
      )
    );
  }

  if (nodeServer) {
    setupErrorHandling({
      db: getConnection(),
      logger,
      nodeServer,
      redisClient: redis
    });
  }
})();
