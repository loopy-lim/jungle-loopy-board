import { User } from "src/users/users.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Comment } from "./comments/comment.entity";

@Entity({ name: 'post' })
export class Post {
  @PrimaryGeneratedColumn({ name: 'post_pk' })
  post_pk: number;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'content' })
  content: string;

  @ManyToOne(() => User, user => user.user_pk)
  @JoinColumn({ name: 'user_pk' })
  user: User

  @OneToMany(() => Comment, comment => comment.post)
  comments: Comment[]

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: Date;
}