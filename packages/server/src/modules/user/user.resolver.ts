import { Query, Resolver } from "type-graphql";

@Resolver()
class UserResolver {
  @Query(() => String)
  async hello() {
    return "hello world";
  }
}
