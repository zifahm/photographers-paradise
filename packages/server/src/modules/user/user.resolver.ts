import { signupInputSchema } from "@photographers-paradise/common";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { ValidateArgs } from "../../decorators/validateArgs";
import { ErrorResponse } from "../shared/errorResponse";
import { SignupInput } from "./inputs/singup.input";
import { UserService } from "./user.service";

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  async hello() {
    return "hello world";
  }

  @ValidateArgs(signupInputSchema)
  @Mutation(() => [ErrorResponse], { nullable: true })
  async signup(
    @Arg("signupInput") signupInput: SignupInput
  ): Promise<ErrorResponse[] | null> {
    return this.userService.signup(signupInput);
  }
}
