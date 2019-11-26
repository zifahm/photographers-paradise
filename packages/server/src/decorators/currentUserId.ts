import { createParamDecorator } from "type-graphql";
import { MyContext } from "../types/myContext";

// this is a parameter decorator

export function CurrentUserId() {
  return createParamDecorator<MyContext>(
    ({ context }) => context.req.session!.userId
  );
}
