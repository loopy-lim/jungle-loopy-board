import { Comment } from "src/posts/comments/comment.entity";
import { Post } from "src/posts/posts.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn({ name: 'user_pk' })
  user_pk: number;

  @Column({ length: 8, name: 'name' })
  name: string;

  @Column({ length: 32, name: 'email' })
  email: string;

  @Column({ name: 'password', select: false })
  password: string;

  @OneToMany(() => Post, post => post.post_pk)
  posts: Post[];

  @OneToMany(() => Comment, comment => comment.comment_pk)
  comments: Comment[];
}