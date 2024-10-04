import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 8 })
  name: string;

  @Column({ length: 32 })
  email: string;

  @Column()
  password: string;
}