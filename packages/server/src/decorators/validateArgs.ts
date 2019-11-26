import { createMethodDecorator } from "type-graphql";
import { Schema } from "yup";
import { serializeValidationError } from "../utils/serializeValidationError";

type FirstField = object | string;

export function ValidateArgs(schema: Schema<{}>) {
  return createMethodDecorator(async ({ args }, next) => {
    const firstField: FirstField = args[Object.keys(args)[0]];
    try {
      if (typeof firstField === "object") {
        await schema.validate(firstField, { abortEarly: false });
      } else {
        await schema.validate(args, { abortEarly: false });
      }
    } catch (err) {
      return serializeValidationError(err);
    }
    return next();
  });
}
