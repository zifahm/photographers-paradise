import { Field, InputType } from "type-graphql";

@InputType()
export class ForgotPasswordChangeInput {
  @Field()
  newPassword: string;

  @Field()
  key: string;
}
