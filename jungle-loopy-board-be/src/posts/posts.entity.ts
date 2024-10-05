import { User } from "src/users/users.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  post_pk: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => User, user => user.user_pk)
  user: User

  @Column("datetime", { default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column("datetime", { default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;
}