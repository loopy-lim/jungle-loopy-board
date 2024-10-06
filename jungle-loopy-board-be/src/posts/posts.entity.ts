import { User } from "src/users/users.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Comment } from "./comments/comment.entity";

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

  @OneToMany(() => Comment, comment => comment.post)
  comments: Comment[]

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}