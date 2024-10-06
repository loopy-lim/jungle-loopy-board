import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { commentProvider } from './comments.provider';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from 'src/users/users.providers';
import { postProviders } from '../post.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [CommentsController],
  providers: [
    CommentsService,
    ...commentProvider,
    ...userProviders,
    ...postProviders,
  ],
})
export class CommentsModule { }
