import * as bcrypt from "bcryptjs";
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent
} from "typeorm";
import { User } from "../entity/User";

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  /**
   * Indicates that this subscriber only listen to Post events.
   */
  listenTo() {
    return User;
  }

  /**
   * Called before post insertion.
   */
  async beforeInsert(event: InsertEvent<User>) {
    if (event.entity.password) {
      event.entity.password = await bcrypt.hash(event.entity.password, 10);
    }
  }
}
