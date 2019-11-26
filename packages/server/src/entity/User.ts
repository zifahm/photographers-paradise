import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Listing } from "./Listing";

@ObjectType()
@Entity("users")
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column()
  firstName!: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  lastName!: string;

  @Field()
  @Column({ length: 255, unique: true })
  email!: string;

  @Column({ nullable: true })
  password!: string;

  @Column({ default: false })
  confirmed!: boolean;

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  biography: string;

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  avatar: string;

  @Field()
  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt: Date;

  @Column({ default: false })
  forgotPasswordLocked: boolean;

  @Column("text", { nullable: true, unique: true })
  googleId: string;

  @OneToMany(() => Listing, listing => listing.user)
  listings: Promise<Listing[]>;
}
