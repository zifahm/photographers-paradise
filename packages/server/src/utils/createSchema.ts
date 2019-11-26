import { buildSchema } from "type-graphql";
import Container from "typedi";
import { useContainer } from "typeorm";

useContainer(Container);
export const createSchema = () => {
  return buildSchema({
    resolvers: [__dirname + "/../modules/**/*.resolver.ts"],
    emitSchemaFile: true,
    container: Container,
    validate: false
  });
};
