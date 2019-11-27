import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { User } from "../../entity/User";

@Service()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userReop: Repository<User>
  ) {}

  async hello(): Promise<string> {
    return "hello worlds";
  }
}
