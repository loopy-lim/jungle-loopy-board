import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Post } from "../posts.entity";
import { User } from "src/users/users.entity";

@Entity({ name: 'comment' })
export class Comment {
  @PrimaryGeneratedColumn({ name: 'comment_pk' })
  comment_pk: number;

  @Column({ name: 'content' })
  content: string;

  @Column({ nullable: true, name: 'parent_comment_pk' })
  parent_comment_pk: number;

  @ManyToOne(() => Post, post => post.post_pk)
  @JoinColumn({ name: 'post_pk' })
  post: Post

  @ManyToOne(() => User, user => user.user_pk)
  @JoinColumn({ name: 'user_pk' })
  user: User

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: Date;
}
