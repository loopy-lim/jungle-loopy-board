import { Post } from "src/posts/posts.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_pk: number;

  @Column({ length: 8 })
  name: string;

  @Column({ length: 32 })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Post, post => post.post_pk)
  posts: Post[];
}