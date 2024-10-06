import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { DatabaseModule } from 'src/database/database.module';
import { postProviders } from './post.provider';
import { userProviders } from 'src/users/users.providers';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [DatabaseModule, CommentsModule],
  controllers: [PostsController],
  providers: [
    PostsService,
    ...postProviders,
    ...userProviders,
  ]
})
export class PostsModule { }
