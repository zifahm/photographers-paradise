import { Field, InputType } from "type-graphql";
import { User } from "../../../entity/User";

@InputType()
export class SignupInput implements Partial<User> {
  // dont worry about google auth, its taken care of in oauth bypassing lastname and password
  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field()
  email!: string;

  @Field()
  password!: string;
}
