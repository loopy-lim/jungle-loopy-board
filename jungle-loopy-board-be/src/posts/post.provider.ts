
import { DataSource } from "typeorm";
import { Post } from "./posts.entity";

export const postProviders = [
  {
    provide: 'POST_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Post),
    inject: ['DATABASE_SOURCE'],
  }
];