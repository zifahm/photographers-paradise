import * as DataLoader from "dataloader";
import { Request, Response } from "express";
import { Redis } from "ioredis";
import { User } from "../entity/User";

export interface MyContext {
  req: Request;
  res: Response;
  redis: Redis;
  userLoader: DataLoader<string, User>;
}
