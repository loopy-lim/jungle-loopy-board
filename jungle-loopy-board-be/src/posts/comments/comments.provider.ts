
import { DataSource } from "typeorm";
import { Comment } from "./comment.entity";

export const commentProvider = [
  {
    provide: 'COMMENT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Comment),
    inject: ['DATABASE_SOURCE'],
  }
];