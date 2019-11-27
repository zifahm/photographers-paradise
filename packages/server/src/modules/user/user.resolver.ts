import { Query, Resolver } from "type-graphql";
import { UserService } from "./user.service";

@Resolver()
class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  async hello(): Promise<string> {
    return this.userService.hello();
  }
}
