import * as bcrypt from "bcryptjs";
import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { INVALID_EMAIL_OR_PASSWORD } from "../../constants";
import { User } from "../../entity/User";
import { errorMessage } from "../shared/errorMessage";
import { ErrorResponse } from "../shared/errorResponse";
import { SignupInput } from "./inputs/singup.input";

@Service()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>
  ) {}

  async signup(signupInput: SignupInput): Promise<ErrorResponse[] | null> {
    const userExist = await this.userRepo.findOne({
      where: { email: signupInput.email }
    });

    if (userExist && userExist.password === null) {
      const hashedPassword = await bcrypt.hash(signupInput.password, 10);
      await this.userRepo.update(
        { email: signupInput.email },
        {
          password: hashedPassword,
          firstName: signupInput.firstName,
          lastName: signupInput.lastName
        }
      );
      return null;
    }

    if (userExist && userExist.password !== null) {
      return errorMessage("email", INVALID_EMAIL_OR_PASSWORD);
    }

    await this.userRepo.save(signupInput);
    // todo remove the comment below
    // await sendEmail(
    //   signupInput.email,
    //   await confirmEmailLink(user.id),
    //   "confirm email"
    // );

    return null;
  }
}
