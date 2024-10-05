import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './board/post.module';

@Module({
  imports: [UsersModule, DatabaseModule, AuthModule, PostModule],
})
export class AppModule { }
