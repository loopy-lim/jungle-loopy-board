import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { DatabaseModule } from 'src/database/database.module';
import { postProviders } from './post.provider';
import { userProviders } from 'src/users/users.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [PostsController],
  providers: [
    PostsService,
    ...postProviders,
    ...userProviders,
  ]
})
export class PostsModule { }
