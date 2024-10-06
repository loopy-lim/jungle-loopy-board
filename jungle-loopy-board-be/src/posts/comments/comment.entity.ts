import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Post } from "../posts.entity";
import { User } from "src/users/users.entity";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  comment_pk: number;

  @Column()
  content: string;

  @Column({ nullable: true })
  parent_comment_pk: number;

  @ManyToOne(() => Post, post => post.post_pk)
  post: Post

  @ManyToOne(() => User, user => user.user_pk)
  user: User

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
